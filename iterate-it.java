import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    private static final int l = 60000;
    
    private static int gcd(int a, int b){
        if (a < b) return gcd(b, a);
        if (b == 0) return a;
        return gcd(b, a % b);
    }
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        boolean[] list = new boolean[l+1];
        Set<Integer> set = new HashSet<Integer>();
        for (int i = 0; i < n; i++){
            int a = in.nextInt();
            set.add(a);
            list[a] = true;
        }
        boolean[] nList = new boolean[l+1];
        for (int e : set){
            for (int i = 1; i + e < l; i++){
                nList[i] |= list[i + e];
                /*
                if (i < 10){
                    if ((list[i + e / b] >> (e % b)) > 0 || (list[i + e / b + 1] << (b - (e % b))) > 0){
                        System.out.println(bits(list[i + e / b] >> (e % b)));
                        System.out.println(bits(list[i + e / b + 1] << (b - (e % b))));
                    }
                    else{
                        System.out.println(bits(list[i + e / b]) + " " + (e % b));
                        System.out.println(bits(list[i + e / b + 1]) + " " + (b - (e % b)));
                    }
                    System.out.println(e + " " + i);
                }*/
            }
        }
        list = nList;
        int g = 0;
        int min = -1;
        int max = 0;
        //for (int a : set)
            //System.out.println(a);
        //System.out.println("-----");
        set.clear();
        for (int i = 0; i < l+1; i++){
                if (list[i]){
                    //System.out.println(a);
                    set.add(i);
                    if (min < 0) min = i;
                    max = i;
                    g = gcd(i, g);
                }
        }
        //System.out.println("-----");
        //System.out.println(min);
        //System.out.println(max);
        //System.out.println(g);
        int o = 1;
        if (set.size() == 0){
            System.out.println(o);
            return;
        }
        Set<Integer> nSet = new HashSet<Integer>();
        for (int a : set)
            nSet.add(a / g);
        set = nSet;
        min /= g;
        max /= g;
        list = new boolean[l+1];
        for (int a : set)
            list[a] = true;
        while (min > 1){
            nList = new boolean[l+1];
            for (int a = min; a <= max; a++){
                if (list[a]){
                    for (int k = 1; k + a < l; k++){
                        nList[k] |= list[k + a];
                    }
                }
            }
            list = nList;
            max -= min;
            for (int a = 1; a <= max; a++){
                if (list[a]){
                    min = a;
                    break;
                }
            }
            o++;
        }
        System.out.println(o + max);
    }
    /*
    private static String bits(int i){
        String s = "";
        for (int j = b-1; j >= 0; j--)
            s += (i & (1 << j)) > 0 ? 1 : 0;
        return s;
    }*/
}//[]{}