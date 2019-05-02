import java.io.*;
import java.math.BigInteger;
import java.util.*;

public class Solution implements Runnable {

    // leave empty to read from stdin/stdout
    private static final String TASK_NAME_FOR_IO = "";

    // file names
    private static final String FILE_IN = TASK_NAME_FOR_IO + ".in";
    private static final String FILE_OUT = TASK_NAME_FOR_IO + ".out";

    BufferedReader in;
    PrintWriter out;
    StringTokenizer tokenizer = new StringTokenizer("");

    public static void main(String[] args) {
        new Solution().run();
    }

    class State {
        int[] d;

        public State(int num) {
            this(Arrays.asList(num));
        }

        public State(int num1, int num2) {
            this(Arrays.asList(num1, num2));
        }

        public State(int num1, int num2, int num3) {
            this(Arrays.asList(num1, num2, num3));
        }

        State(Collection<Integer> current) {
            d = new int[current.size()];
            int idx = 0;
            for (int v : current) {
                d[idx++] = v;
            }
            Arrays.sort(d);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            State state = (State) o;

            if (!Arrays.equals(d, state.d)) return false;

            return true;
        }

        @Override
        public int hashCode() {
            return d != null ? Arrays.hashCode(d) : 0;
        }

        public State replaceAndTrim(int idxReplace, State replaceWith) {
            List<Integer> all = new ArrayList<Integer>();
            for (int i = 0; i < d.length; i++)
                if (i != idxReplace && d[i] >= 3) {
                    all.add(d[i]);
                }
            for (int i = 0; i < replaceWith.d.length; i++)
                if (replaceWith.d[i] >= 3) {
                    all.add(replaceWith.d[i]);
                }
            return new State(all);
        }

        public boolean isEmpty() {
            return d.length <= 0;
        }
    }

    class Split {
        List<State> list = new ArrayList<State>();

        public void add(LinkedList<Integer> current) {
            list.add(new State(current));
        }

    }

    class GameState {
        State state;
        int who;

        GameState(State state, int who) {
            this.state = state;
            this.who = who;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            GameState gameState = (GameState) o;

            if (who != gameState.who) return false;
            if (state != null ? !state.equals(gameState.state) : gameState.state != null) return false;

            return true;
        }

        @Override
        public int hashCode() {
            int result = state != null ? state.hashCode() : 0;
            result = 31 * result + who;
            return result;
        }
    }

    int MAX_STONES = 50;
    Split[] splits = new Split[MAX_STONES + 1];
    Map<GameState, Boolean> answer = new HashMap<GameState, Boolean>();
    Map<GameState, Long> answerGrandi = new HashMap<GameState, Long>();

    int[] GRANDI = new int[] {
            0,
            0,
            0,
            1,
            0,
            2,
            3,
            4,
            0,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            46
    };

    private void solve() throws IOException {
        for (int i = 0; i <= MAX_STONES; i++) {
            splits[i] = new Split();
            genSplits(i, 0, splits[i], new LinkedList<Integer>());
        }

        /*
        for (int i = 0; i <= 50; i++) {
            System.out.println(grandi(new State(i), 0) + ", ");
        }
        */

        int tc = nextInt();
        for (int t = 0; t < tc; t++) {
            int n = nextInt();
            int xor = 0;
            for (int i = 0; i < n; i++) {
                // xor ^= grandi(new State(nextInt()), 0);
                xor ^= GRANDI[nextInt()];
            }

            if (xor != 0) {
                out.println("ALICE");
            } else {
                out.println("BOB");
            }
        }
    }

    private void compareWithNaive() {
        for (int i = 1; i <= 20; i++) {
            State state = new State(i);

            boolean a1 = play(state, 0);
            boolean a2 = grandi(new State(i), 0) != 0;
            if (a1 != a2) {
                throw new IllegalStateException("Error: " + i);
            }
        }

        for (int i = 1; i <= 20; i++)
            for (int j = 1; j <= 20; j++) {
                State state = new State(i, j);

                boolean a1 = play(state, 0);
                boolean a2 = (grandi(new State(i), 0) ^ grandi(new State(j), 0)) != 0;
                if (a1 != a2) {
                    throw new IllegalStateException();
                }
            }

        for (int i = 1; i <= 20; i++)
            for (int j = 1; j <= 20; j++)
                for (int k = 1; k <= 20; k++) {
                    State state = new State(i, j, k);

                    boolean a1 = play(state, 0);
                    boolean a2 = (grandi(new State(i), 0) ^ grandi(new State(j), 0) ^ grandi(new State(k), 0)) != 0;
                    if (a1 != a2) {
                        throw new IllegalStateException();
                    }
                }
    }

    private boolean play(State state, int who) {
        if (state.isEmpty()) {
            return false;
        }

        GameState gameState = new GameState(state, who);
        if (answer.containsKey(gameState)) {
            return answer.get(gameState);
        }

        boolean win = false;
        Set<Integer> tried = new HashSet<Integer>();
        for (int idxReplace = 0; idxReplace < state.d.length; idxReplace++) {
            int num = state.d[idxReplace];
            if (tried.contains(num)) {
                continue;
            }
            tried.add(num);

            for (State replaceWith : splits[num].list) {
                State nState = state.replaceAndTrim(idxReplace, replaceWith);
                boolean otherWins = play(nState, 1 - who);
                if (!otherWins) {
                    win = true;
                    break;
                }
            }
            if (win) {
                break;
            }
        }

        answer.put(gameState, win);
        return win;
    }

    private long grandi(State state, int who) {
        if (state.isEmpty()) {
            return 0;
        }

        GameState gameState = new GameState(state, who);
        if (answerGrandi.containsKey(gameState)) {
            return answerGrandi.get(gameState);
        }

        Set<Long> grandiAll = new HashSet<Long>();
        for (int idxReplace = 0; idxReplace < state.d.length; idxReplace++) {
            int num = state.d[idxReplace];

            for (State replaceWith : splits[num].list) {
                State nState = state.replaceAndTrim(idxReplace, replaceWith);
                grandiAll.add(grandi(nState, 1 - who));
            }
        }

        long result = 0;
        while (grandiAll.contains(result)) {
            result++;
        }
        answerGrandi.put(gameState, result);
        return result;
    }

    private void genSplits(int remaining, int lastUsed, Split split, LinkedList<Integer> current) {
        if (remaining < 0) {
            throw new IllegalStateException();
        }
        if (remaining == 0) {
            if (current.size() > 1) {
                split.add(current);
            }
            return;
        }

        int i = lastUsed + 1;
        while (remaining - i >= 0) {
            current.addLast(i);
            genSplits(remaining - i, i, split, current);
            current.removeLast();
            i++;
        }
    }

    public void run() {
        long timeStart = System.currentTimeMillis();

        boolean fileIO = TASK_NAME_FOR_IO.length() > 0;
        try {

            if (fileIO) {
                in = new BufferedReader(new FileReader(FILE_IN));
                out = new PrintWriter(new FileWriter(FILE_OUT));
            } else {
                in = new BufferedReader(new InputStreamReader(System.in));
                out = new PrintWriter(new OutputStreamWriter(System.out));
            }

            solve();

            in.close();
            out.close();
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
        long timeEnd = System.currentTimeMillis();

        if (fileIO) {
            System.out.println("Time spent: " + (timeEnd - timeStart) + " ms");
        }
    }

    private String nextToken() throws IOException {
        while (!tokenizer.hasMoreTokens()) {
            String line = in.readLine();
            if (line == null) {
                return null;
            }
            tokenizer = new StringTokenizer(line);
        }
        return tokenizer.nextToken();
    }

    private int nextInt() throws IOException {
        return Integer.parseInt(nextToken());
    }

    private BigInteger nextBigInt() throws IOException {
        return new BigInteger(nextToken());
    }

    private long nextLong() throws IOException {
        return Long.parseLong(nextToken());
    }

    private double nextDouble() throws IOException {
        return Double.parseDouble(nextToken());
    }

}