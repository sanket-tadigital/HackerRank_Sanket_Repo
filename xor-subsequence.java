import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
    Solution sol1 = new Solution();
        sol1.process();
    }
    public void process() {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] num = new int[n+1];
        int[] xor = new int[n+1];
        int[] counts = new int[1<<16];
        int max_count = Integer.MIN_VALUE;
        counts[0] = 1;
        for (int i = 1;i < n+1; i++) {
            num[i] = sc.nextInt();
            if (i > 0)
            	xor[i] = xor[i-1] ^num[i];
            else 
            	xor[i] = num[i];
            counts[xor[i]] ++;
            if (xor[i] > max_count)
            	max_count = xor[i];
            
        }
        int[] results = new int[1<<16];
        for (int i = 0;i <= max_count ; i++) {
            for (int j = i+1; j <= max_count ; j++) {
                results[i^j] += counts[i] * counts[j];
            }
        }
        int max = Integer.MIN_VALUE;
        int max_freq = Integer.MIN_VALUE;
        for (int  i =0 ;i < results.length; i++) {
            if (max_freq < results[i]) {
                max_freq = results[i];
                max = i;
            }
            
        }
        System.out.println(max + " " + max_freq);
    }
}