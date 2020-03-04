import java.io.*;
import java.util.*;

public class Solution {
	public static void main(String[] args) {
		new Solution().run();
	}

	BufferedReader br;
	StringTokenizer in;
	PrintWriter out;

	public String nextToken() throws IOException {
		while (in == null || !in.hasMoreTokens()) {
			in = new StringTokenizer(br.readLine());
		}
		return in.nextToken();
	}

	public int nextInt() throws IOException {
		return Integer.parseInt(nextToken());
	}

	public long nextLong() throws IOException {
		return Long.parseLong(nextToken());
	}

	public void solve(int n) throws IOException {
		int[] a = new int[n];

		for (int i = 0; i < a.length; i++) {
			a[i] = nextInt();
		}

		long ans = 0;

		for (int st = 2; st <= 3; st++) {
			HashMap<Integer, Integer> cnt = new HashMap<>();
			cnt.put(0, 1);
			int xor = 0;
			for (int i = a.length - st; i >= 0; i -= 2) {
				xor ^= a[i + 1] - a[i];
				if (!cnt.containsKey(xor)) {
					cnt.put(xor, 0);
				}
				int z = cnt.get(xor);
				ans += z;
				cnt.put(xor, z + 1);

				if (i > 0) {
					if (cnt.containsKey(xor ^ a[i - 1])) {
						ans += cnt.get(xor ^ a[i - 1]);
					}
				}
			}
		}

		out.println(1L * n * (n - 1) / 2 - ans);
	}

	public void run() {
		try {
			br = new BufferedReader(new InputStreamReader(System.in));
			out = new PrintWriter(System.out);

			solve(nextInt());

			out.close();
		} catch (IOException e) {
			e.printStackTrace();
			System.exit(1);
		}
	}
}