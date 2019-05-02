import java.io.*;
import java.util.*;

public class SimpleGame {
    final static long MOD = 1000000007;
    static int K;
    static HashMap<Integer, BitSet>[] cache;
    static int[] mexCache;

    static int mex(int n) {
        if (mexCache[n] == -1) {
            mexCache[n] = 0;
            BitSet set = new BitSet();
            for (int k = 2; k <= K; ++k) {
                set.or(d(n, k));
            }
            while (set.get(mexCache[n])) {
                mexCache[n]++;
            }
        }
        return mexCache[n];
    }

    static BitSet d(int n, int k) {
        if (cache[n] == null) {
            cache[n] = new HashMap<>();
        }
        BitSet ret = cache[n].get(k);
        if (ret == null) {
            ret = new BitSet();
            if (k == 1) {
                ret.set(mex(n));
            } else {
                for (int n1 = 1; n1 < n; ++n1) {
                    BitSet s1 = d(n1, k - 1);
                    int v2 = mex(n - n1);
                    for (int v1 = s1.nextSetBit(0); v1 >= 0; v1 = s1.nextSetBit(v1 + 1)) {
                        ret.set(v1 ^ v2);
                    }
                }
            }
            cache[n].put(k, ret);
        }
        return ret;
    }

    public static void solve(Input in, PrintWriter out) throws IOException {
        int n = in.nextInt();
        int m = in.nextInt();
        K = in.nextInt();
        int[] values = new int[n + 1];
        if (K <= 3) {
            cache = new HashMap[n + 1];
            mexCache = new int[n + 1];
            Arrays.fill(mexCache, -1);
            for (int i = 0; i <= n; ++i) {
                values[i] = mex(i);
            }
        } else {
            for (int i = 2; i <= n; ++i) {
                values[i] = i - 1;
            }
        }
        int maxValue = 1;
        for (int i = 0; i <= n; ++i) {
            while (maxValue <= values[i]) {
                maxValue *= 2;
            }
        }
        long[][] d = new long[n + 1][maxValue];
        d[0][0] = 1;
        for (int it = 0; it < m; ++it) {
            long[][] d1 = new long[n + 1][maxValue];
            for (int i = 0; i <= n; ++i) {
                for (int v = 0; v < maxValue; ++v) {
                    if (d[i][v] == 0) {
                        continue;
                    }
                    for (int j = 1; i + j <= n; ++j) {
                        d1[i + j][v ^ values[j]] += d[i][v];
                    }
                }
            }
            d = d1;
            for (int i = 0; i <= n; ++i) {
                for (int v = 0; v < maxValue; ++v) {
                    d[i][v] %= MOD;
                }
            }
        }
        long ans = 0;
        for (int v = 1; v < maxValue; ++v) {
            ans += d[n][v];
        }
        out.println(ans % MOD);
    }

    public static void main(String[] args) throws IOException {
        PrintWriter out = new PrintWriter(System.out);
        solve(new Input(new BufferedReader(new InputStreamReader(System.in))), out);
        out.close();
    }

    static class Input {
        BufferedReader in;
        StringBuilder sb = new StringBuilder();

        public Input(BufferedReader in) {
            this.in = in;
        }

        public Input(String s) {
            this.in = new BufferedReader(new StringReader(s));
        }

        public String next() throws IOException {
            sb.setLength(0);
            while (true) {
                int c = in.read();
                if (c == -1) {
                    return null;
                }
                if (" \n\r\t".indexOf(c) == -1) {
                    sb.append((char)c);
                    break;
                }
            }
            while (true) {
                int c = in.read();
                if (c == -1 || " \n\r\t".indexOf(c) != -1) {
                    break;
                }
                sb.append((char)c);
            }
            return sb.toString();
        }

        public int nextInt() throws IOException {
            return Integer.parseInt(next());
        }

        public long nextLong() throws IOException {
            return Long.parseLong(next());
        }

        public double nextDouble() throws IOException {
            return Double.parseDouble(next());
        }
    }
}