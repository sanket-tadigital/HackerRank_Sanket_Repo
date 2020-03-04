import java.io.*;
import java.util.*;

public class Solution {

	BufferedReader br;
	PrintWriter out;
	StringTokenizer st;
	boolean eof;

	static class SuffixTree {
		class Node {
			Node par;
			Node child, sibling;
			Node sufLink;
			int l, r;

			int size;

			int len() {
				return getR() - l;
			}

			int getR() {
				return r == -1 ? s.length() : r;
			}

			Node() {
			}

			Node(Node par, Node child, Node sibling, Node sufLink, int l, int r) {
				this.par = par;
				this.child = child;
				this.sibling = sibling;
				this.sufLink = sufLink;
				this.l = l;
				this.r = r;
			}

			Node go(char c) {
				for (Node to = child; to != null; to = to.sibling) {
					if (s.charAt(to.l) == c)
						return to;
				}
				return null;
			}

			private long maxVal(int depth) {
				if (child == null) {
					size = 1;
					return depth - 1;
				}
				long ret = 0;
				for (Node to = child; to != null; to = to.sibling) {
					ret = Math.max(ret, to.maxVal(depth + to.len()));
					size += to.size;
				}
				return Math.max(ret, (long) size * depth);
			}
		}

		void splitEdge() {
			Node v = new Node(curNode.par, curNode, curNode.sibling, null,
					curNode.l, curNode.l + curPos);
			curNode.sibling = null;
			curNode.par = v;
			curNode.l = curNode.l + curPos;

			for (Node to = v.par.child; to != null; to = to.sibling) {
				if (to.sibling == curNode) {
					to.sibling = v;
					break;
				}
			}

			if (v.par.child == curNode) {
				v.par.child = v;
			}

			curNode = v;

		}

		private boolean addChar(char c) {

			if (curPos < curNode.len()) {
				if (s.charAt(curNode.l + curPos) == c) {
					curPos++;
					return false;
				}
				splitEdge();
			}

			if (curPos != curNode.len()) {
				throw new AssertionError("Bug in edge splitting");
			}

			Node tmp = curNode.go(c);
			if (tmp != null) {
				curNode = tmp;
				curPos = 1;
				return false;
			}

			// add child
			Node add = new Node(curNode, null, curNode.child, null, curExt
					+ curDepth, -1);
			curNode.child = add;

			return true;

		}

		void add(char c) {
			s.append(c);

			Node needSufLink = null;

			while (curExt < s.length()) {

				// Already have sufLink
				if (curPos == curNode.len() && needSufLink != null) {
					needSufLink.sufLink = curNode;
					needSufLink = null;
				}

				if (!addChar(c)) {
					// type 3 extension
					curDepth++;
					break;
				}

				// Just created sufLink
				if (needSufLink != null) {
					needSufLink.sufLink = curNode;
					needSufLink = null;
				}

				if (curExt == s.length() - 1) {
					curExt++;
					break;
				}

				if (curNode.sufLink == null) {

					needSufLink = curNode;

					// up to parent
					int downL = curNode.l;
					int downR = curNode.l + curPos;
					curDepth -= curNode.len();
					curNode = curNode.par;

					if (curNode == root) {
						downL = curExt + 1;
						downR = s.length() - 1;
					} else {
						// use sufLink
						curNode = curNode.sufLink;
						curDepth--;
					}

					curDepth += downR - downL;

					// go down
					outer: while (true) {
						if (downL == downR) {
							// stopped in node
							curPos = curNode.len();
							break;
						}

						curNode = curNode.go(s.charAt(downL));

						if (curNode == null) {
							throw new AssertionError("Skip/count bug");
						}

						if (downL + curNode.len() > downR) {
							// stopped in edge
							curPos = downR - downL;
							break outer;
						} else {
							downL += curNode.len();
							continue outer;
						}

					}
				} else {
					curNode = curNode.sufLink;
					curDepth--;
					curPos = curNode.len();
				}

				curExt++;
			}
		}

		long maxVal() {
			return root.maxVal(0);
		}

		Node root = new Node();
		StringBuilder s = new StringBuilder();

		int curExt;
		Node curNode = root;
		int curPos;
		int curDepth;
	}

	void solve() throws IOException {
		SuffixTree t = new SuffixTree();
		char[] s = nextToken().toCharArray();
		for (char c : s) {
			t.add(c);
		}
		t.add('$');
		out.println(t.maxVal());
	}

	Solution() throws IOException {
		br = new BufferedReader(new InputStreamReader(System.in));
		out = new PrintWriter(System.out);
		solve();
		out.close();
	}

	public static void main(String[] args) throws IOException {
		new Solution();
	}

	String nextToken() {
		while (st == null || !st.hasMoreTokens()) {
			try {
				st = new StringTokenizer(br.readLine());
			} catch (Exception e) {
				eof = true;
				return null;
			}
		}
		return st.nextToken();
	}

	String nextString() {
		try {
			return br.readLine();
		} catch (IOException e) {
			eof = true;
			return null;
		}
	}

	int nextInt() throws IOException {
		return Integer.parseInt(nextToken());
	}

	long nextLong() throws IOException {
		return Long.parseLong(nextToken());
	}

	double nextDouble() throws IOException {
		return Double.parseDouble(nextToken());
	}
}\