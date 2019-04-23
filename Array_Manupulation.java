import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int l1 = in.nextInt();
        int l2 = in.nextInt();
        long[] offs = new long[l1 + 1];
        for(int i = 0; i < l2; i++){
            int a = in.nextInt();
            int b = in.nextInt();
            int k = in.nextInt();
            offs[a - 1] += k;
            offs[b] -= k;
        }
        
        long max = offs[0];
        for (int i = 1; i < l1; ++i) {
            offs[i] += offs[i - 1];
            max = Math.max(offs[i], max);
        }
        
        System.out.println(max);
        in.close();
    }
}