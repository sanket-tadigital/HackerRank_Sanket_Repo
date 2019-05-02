import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.InputMismatchException;
import java.util.PriorityQueue;

public class Solution {
	static InputStream is;
	static PrintWriter out;
	static String INPUT = "";
	
	static void solve()
	{
		for(int T = ni();T >= 1;T--){
			int n = ni(), K = ni();
			long xx = 1;
			int U = Math.min(K, n-1);
			for(int i = 1;i <= U;i++){
				xx *= n-1+K-i+1;
				xx /= i;
			}
			int x = (int)xx;
			long[] a = new long[x];
			for(int i = 0;i < x;i++)a[i] = nl();
			Arrays.sort(a);
			long[] ret = new long[n];
			ret[0] = a[0] / K;
			if(n == 1){
				out.println(ret[0]);
				continue;
			}
			if(n == 2){
				ret[1] = a[x-1] / K;
				out.println(ret[0] + " " + ret[1]);
				continue;
			}
			// K <= 16
			PriorityQueue<Long> pq = new PriorityQueue<Long>(x+1);
			for(long v : a)pq.add(v);
			PriorityQueue<Long> ng = new PriorityQueue<Long>(x+1);
			pq.poll();
			for(int i = 1;i < n;i++){
				while(!ng.isEmpty() && ng.peek().equals(pq.peek())){
					pq.poll(); ng.poll();
				}
//				tr("pq", pq);
//				tr("ng", ng);
				ret[i] = pq.poll() - (K-1)*ret[0];
//				tr(ng);
				if(i < n-1){
					dfs(K-1, ret[i], 0, i, ret, ng);
					ng.poll();
				}
			}
			for(int i = 0;i < n;i++){
				if(i > 0)out.print(" ");
				out.print(ret[i]);
			}
			out.println();
		}
	}
	
	static void dfs(int rem, long cur, int ind, int sup, long[] ret, PriorityQueue<Long> ng)
	{
		if(rem == 0){
			ng.add(cur);
		}else{
			for(int j = ind;j <= sup;j++){
				dfs(rem-1, cur+ret[j], j, sup, ret, ng);
			}
		}
	}
	
	static void dff(int rem, long cur, int ind, int sup, long[] ret, StringBuilder sb)
	{
		if(rem == 0){
			sb.append(cur + " ");
		}else{
			for(int j = ind;j <= sup;j++){
				dff(rem-1, cur+ret[j], j, sup, ret, sb);
			}
		}
	}
	
	public static void main(String[] args) throws Exception
	{
//		Random gen = new Random();
//		StringBuilder sb = new StringBuilder();
//		int n = 0, K = 0;
//		int x = 0;
//		outer:
//		while(true){
//			n = gen.nextInt(50)+1;
//			K = gen.nextInt(50)+1;
//			long xx = 1;
//			for(int i = 1;i <= K;i++){
//				xx *= n-1+K-i+1;
//				xx /= i;
//				if(xx >= 10000000)continue outer;
//			}
//			if(xx <= 100000){
//				x = (int)xx;
//				break;
//			}
//		}
//		tr(n, K);
//		sb.append(1 + " ");
//		sb.append(n + " ");
//		sb.append(K + " ");
//		
//		long[] a = new long[n];
//		for(int i = 0;i < n;i++){
//			long M = 1000000000000000000L / K;
////			long M = 100L / K;
//			a[i] = Math.abs(gen.nextLong() % M) + 1;
//		}
//		Arrays.sort(a);
//		tr(a);
//		dff(K, 0, 0, n-1, a, sb);
//		tr(sb);
//		INPUT = sb.toString();
		
		long S = System.currentTimeMillis();
		is = INPUT.isEmpty() ? System.in : new ByteArrayInputStream(INPUT.getBytes());
		out = new PrintWriter(System.out);
		
		solve();
		out.flush();
		long G = System.currentTimeMillis();
		tr(G-S+"ms");
	}
	
	private static boolean eof()
	{
		if(lenbuf == -1)return true;
		int lptr = ptrbuf;
		while(lptr < lenbuf)if(!isSpaceChar(inbuf[lptr++]))return false;
		
		try {
			is.mark(1000);
			while(true){
				int b = is.read();
				if(b == -1){
					is.reset();
					return true;
				}else if(!isSpaceChar(b)){
					is.reset();
					return false;
				}
			}
		} catch (IOException e) {
			return true;
		}
	}
	
	private static byte[] inbuf = new byte[1024];
	static int lenbuf = 0, ptrbuf = 0;
	
	private static int readByte()
	{
		if(lenbuf == -1)throw new InputMismatchException();
		if(ptrbuf >= lenbuf){
			ptrbuf = 0;
			try { lenbuf = is.read(inbuf); } catch (IOException e) { throw new InputMismatchException(); }
			if(lenbuf <= 0)return -1;
		}
		return inbuf[ptrbuf++];
	}
	
	private static boolean isSpaceChar(int c) { return !(c >= 33 && c <= 126); }
	private static int skip() { int b; while((b = readByte()) != -1 && isSpaceChar(b)); return b; }
	
	private static double nd() { return Double.parseDouble(ns()); }
	private static char nc() { return (char)skip(); }
	
	private static String ns()
	{
		int b = skip();
		StringBuilder sb = new StringBuilder();
		while(!(isSpaceChar(b))){ // when nextLine, (isSpaceChar(b) && b != ' ')
			sb.appendCodePoint(b);
			b = readByte();
		}
		return sb.toString();
	}
	
	private static char[] ns(int n)
	{
		char[] buf = new char[n];
		int b = skip(), p = 0;
		while(p < n && !(isSpaceChar(b))){
			buf[p++] = (char)b;
			b = readByte();
		}
		return n == p ? buf : Arrays.copyOf(buf, p);
	}
	
	private static char[][] nm(int n, int m)
	{
		char[][] map = new char[n][];
		for(int i = 0;i < n;i++)map[i] = ns(m);
		return map;
	}
	
	private static int[] na(int n)
	{
		int[] a = new int[n];
		for(int i = 0;i < n;i++)a[i] = ni();
		return a;
	}
	
	private static int ni()
	{
		int num = 0, b;
		boolean minus = false;
		while((b = readByte()) != -1 && !((b >= '0' && b <= '9') || b == '-'));
		if(b == '-'){
			minus = true;
			b = readByte();
		}
		
		while(true){
			if(b >= '0' && b <= '9'){
				num = num * 10 + (b - '0');
			}else{
				return minus ? -num : num;
			}
			b = readByte();
		}
	}
	
	private static long nl()
	{
		long num = 0;
		int b;
		boolean minus = false;
		while((b = readByte()) != -1 && !((b >= '0' && b <= '9') || b == '-'));
		if(b == '-'){
			minus = true;
			b = readByte();
		}
		
		while(true){
			if(b >= '0' && b <= '9'){
				num = num * 10 + (b - '0');
			}else{
				return minus ? -num : num;
			}
			b = readByte();
		}
	}
	
	private static void tr(Object... o) { if(INPUT.length() != 0)System.out.println(Arrays.deepToString(o)); }
}