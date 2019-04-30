import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
    static MyScanner sc;
    private static PrintWriter out;
    static long M2 = 1_000_000_000L + 7;

    public static void main(String[] s) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        if (stringBuilder.length() == 0) {
            sc = new MyScanner(System.in);
        } else {
            sc = new MyScanner(new BufferedReader(new StringReader(stringBuilder.toString())));
        }

        out = new PrintWriter(new OutputStreamWriter(System.out));
        initData();
        solve();
        out.flush();
    }


    private static void initData() {
    }


    private static void solve() throws IOException {
        String s = sc.next();
        int q = sc.nextInt();
        int[][] ff = new int[s.length() + 1][26];
        for (int t = 0; t < s.length(); t++) {
            ff[t + 1] = Arrays.copyOf(ff[t], 26);
            ff[t + 1][s.charAt(t) - 'a']++;
        }
        for (int i = 0; i < q; i++) {
            int l = sc.nextInt();
            int r = sc.nextInt();
            int[] diff = new int[26];
            for (int k = 0; k < 26; k++) {
                diff[k] = ff[r][k] - ff[l - 1][k];
            }
            int odd = 0;
            int sum = 0;
            for (int j = 0; j < 26; j++) {
                if (diff[j] % 2 == 1) {
                    odd++;
                    diff[j]--;
                }
                sum += diff[j] / 2;
            }
            long res = Math.max(odd, 1);

            for (int t : diff) {
                t /= 2;
                if (t == 0) continue;
                res *= c(t, sum);
                res %= M2;
                sum -= t;
            }
            out.println(res);
        }
    }

    static long[] f;
    static long[] fi;

    static {
        f = new long[100001];
        fi = new long[100001];
        f[0] = fi[0] = 1;
        for (int k = 1; k < f.length; k++) {
            f[k] = f[k - 1] * k;
            f[k] %= M2;
            fi[k] = pow(f[k], M2 - 2, M2);
        }
    }

    private static long c(int t, int sum) {
        long r0 = f[sum];

        long r1 = (fi[t] * fi[sum - t]) % M2;
        return (r0 * r1) % M2;
    }


    private static void solveT() throws IOException {
        int t = sc.nextInt();
        while (t-- > 0) {
            solve();
        }
    }

    private static long gcd(long l, long l1) {
        if (l > l1) return gcd(l1, l);
        if (l == 0) return l1;
        return gcd(l1 % l, l);
    }

    private static long pow(long a, long b, long m) {
        if (b == 0) return 1;
        if (b == 1) return a;
        long pp = pow(a, b / 2, m);
        pp *= pp;
        pp %= m;
        return (pp * (b % 2 == 0 ? 1 : a)) % m;
    }


    static class MyScanner {
        BufferedReader br;
        StringTokenizer st;

        MyScanner(BufferedReader br) {
            this.br = br;
        }

        public MyScanner(InputStream in) {
            this(new BufferedReader(new InputStreamReader(in)));
        }

        void findToken() {
            while (st == null || !st.hasMoreTokens()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        String next() {
            findToken();
            return st.nextToken();
        }

        Integer[] nab(int n) {
            Integer[] k = new Integer[n];
            for (int i = 0; i < n; i++) {
                k[i] = sc.fi();
            }
            return k;
        }

        int[] na(int n) {
            int[] k = new int[n];
            for (int i = 0; i < n; i++) {
                k[i] = sc.fi();
            }
            return k;
        }

        long[] nl(int n) {
            long[] k = new long[n];
            for (int i = 0; i < n; i++) {
                k[i] = sc.nextLong();
            }
            return k;
        }

        int nextInt() {
            return Integer.parseInt(next());
        }

        int fi() {
            String t = next();
            int cur = 0;
            boolean n = t.charAt(0) == '-';
            for (int a = n ? 1 : 0; a < t.length(); a++) {
                cur = cur * 10 + t.charAt(a) - '0';
            }
            return n ? -cur : cur;
        }

        long nextLong() {
            return Long.parseLong(next());
        }

        double nextDouble() {
            return Double.parseDouble(next());
        }
    }


}