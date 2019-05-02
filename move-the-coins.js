import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class MoveCoins {
	private static class Node {
		int coins;
		List<Integer> connections = new ArrayList<>();
	}

	public static boolean isChild(int v1, int v2, int[] left, int[] right) {
		return (left[v1] > left[v2] && right[v1] <= right[v2]);
	}

	public static int dfs(int v, boolean isEven, Node[] nodes, int c, int[] left, int[] right, boolean[] even) {
		left[v] = c;
		even[v] = isEven;

		for (int connection : nodes[v].connections) {
			if (left[connection] == 0) {
				c = dfs(connection, !isEven, nodes, c + 1, left, right, even);
			}
		}
		right[v] = c;
		return c;
	}

	public static int calc(int v, boolean isEven, Node[] nodes, int[] resEven, int[] resOdd, int[] left) {
		int res = isEven ? nodes[v].coins : 0;

		for (int connection : nodes[v].connections) {
			if (left[connection] > left[v]) {
				res ^= calc(connection, !isEven, nodes, resEven, resOdd, left);
			}
		}
		if (isEven) {
			resEven[v] = res;
		} else {
			resOdd[v] = res;
		}
		return res;
	}

	public static void main(String args[]) {
		Scanner in = new Scanner(System.in);

		int n = in.nextInt();
		Node[] nodes = new Node[n];

		for (int i = 0; i < n; i++) {
			nodes[i] = new Node();
			nodes[i].coins = in.nextInt();
		}

		for (int i = 0; i < n - 1; i++) {
			int v1 = in.nextInt() - 1;
			int v2 = in.nextInt() - 1;

			nodes[v1].connections.add(v2);
			nodes[v2].connections.add(v1);
		}

		int[] left = new int[n], right = new int[n];
		boolean[] even = new boolean[n];
		dfs(0, false, nodes, 1, left, right, even);

		int[] resEven = new int[n], resOdd = new int[n];
		calc(0, false, nodes, resEven, resOdd, left);
		calc(0, true, nodes, resEven, resOdd, left);

		int xor = resOdd[0];

		int q = in.nextInt();
		for (int test=0; test<q; test++) {
			int v = in.nextInt() - 1;
			int p = in.nextInt() - 1;

			if (isChild(p, v, left, right)) {
				System.out.println("INVALID");
			} else {
				int r = xor;
				if (even[v]) {
					r ^= resEven[v];
				} else {
					r ^= resOdd[v];
				}
				if (even[p]) {
					r ^= resOdd[v];
				} else {
					r ^= resEven[v];
				}
				System.out.println(r > 0 ? "YES" : "NO");
			}
		}
	}
}