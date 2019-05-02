import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    private static StringBuffer out;
    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner in = new Scanner(System.in);
        out = new StringBuffer();
        int n = in.nextInt();
        char[] chars = new char[n];
        String s = in.next();
        for(int i = 0; i < n; i++) chars[i] = s.charAt(i);
        int m = in.nextInt();
        while(m-- > 0) {
            String exec = in.next();
            
            if(exec == null){
                System.out.println("Null!");
            }else switch(exec){
                case "C":
                    change(chars, in.nextInt() - 1, in.nextInt() - 1, in.next().charAt(0));
                    break;
                case "S":
                    swap(chars, in.nextInt() - 1, in.nextInt() - 1, in.nextInt() - 1,in.nextInt() - 1);
                    break;
                case "R":
                    reverse(chars, in.nextInt() - 1, in.nextInt() - 1);
                    break;
                case "W":
                    write(chars, in.nextInt() - 1, in.nextInt() - 1);
                    break;
                default: // "H"
                    hamilton(chars, in.nextInt() - 1, in.nextInt() - 1, in.nextInt());
             }
             //System.out.println("After Exec:"  + exec + ", String=" + new String(chars,0, 10));
        }
        System.out.println(out.toString());
    }
    
    private static void swap(char[] chars, int l1, int r1, int l2, int r2){
        char[] tmp = new char[r2-l1+1];        
        tmp  = Arrays.copyOfRange(chars, l1, r2+1);
        int p = l1;
        for(int i = 0 ; i < r2 - l2 + 1; i++){
            chars[p] = tmp[l2+i-l1];    
            p++;
        } 
        for (int i = 0; i <l2-r1-1 ;i++){
            chars[p] = tmp[r1 + 1 + i-l1];
            p++;
        }
        for (int i = 0; i <r1-l1+1 ; i++){
            chars[p] = tmp[l1 + i-l1];
            p++;
        }
    }
    private static void change(char[] chars, int l, int r, char c){
       for (int i = l; i <= r; i++){
           chars[i] = c;
       } 
    }
    private static void reverse(char[] chars, int l, int r){
        int lp = l;
        int rp = r;
        while (lp < rp){
            char tmp = chars[lp];
            chars[lp] = chars[rp];
            chars[rp] = tmp;
            lp++;
            rp--;
        }
    }
    private static void write(char[] chars, int l, int r){
        for (int i = l; i <= r; i++) out.append(chars[i]);
        out.append("\n");
    }
    private static void hamilton(char[] chars, int a, int b, int l){
        int dist = 0;
        for (int i = 0; i < l; i++){
           dist += (chars[a+i] == chars[b+i])? 0 : 1; 
        }
        out.append(dist + "\n");
    }
}