import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    private static final long mod = 1000000007;
    private static long m;
    private static long pow;
    
    public static void main(String[] args) {
        //long start = System.currentTimeMillis();
        
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        m = in.nextLong();
        pow = pow(2, m);
        
        long[] solves = new long[n+1];
        long[] semiSolves = new long[n+1];
        long[] products = new long[n+1];
        semiSolves[0] = 1;
        semiSolves[1] = 0;
        products[0] = 1;
        products[1] = (pow - 1 + mod) % mod;
        solves[0] = 0;
        solves[1] = products[1];
        for (int i = 2; i <= n; i++){
            products[i] = (((pow - i + mod) % mod) * products[i-1]) % mod;
            semiSolves[i] = 
                (solves[i-1] - ((i-1) * ((semiSolves[i-2] * ((pow - 1 - (i-2) + mod) % mod)) % mod)) % mod + mod) % mod;
            solves[i] = (products[i] - semiSolves[i] + mod) % mod;
        }
        
        System.out.println(solves[n]);
        /*
        for (int i = 0; i <= n; i++){
            System.out.println(i + " : " + solve(i) + " " + semiSolve(i) + " " + product(i));
        }*/
        //System.out.println(System.currentTimeMillis() - start);
    }
    /*
    private static Map<Long, Long> solves = new HashMap<Long, Long>();
    private static long solve(long n){
        if (solves.containsKey(n)) return solves.get(n);
        if (n == 0) solves.put(n, 0L);
        else solves.put(n, (product(n) - semiSolve(n) + mod) % mod);
        return solve(n);
    }
    
    private static Map<Long, Long> semiSolves = new HashMap<Long, Long>();
    private static long semiSolve(long n){
        if (semiSolves.containsKey(n)) return semiSolves.get(n);
        if (n == 0) semiSolves.put(n, 1L);
        else if (n == 1) semiSolves.put(n, 0L);
        else semiSolves.put(n, 
            (solve(n-1) - ((n-1) * ((semiSolve(n-2) * ((pow - 1 - (n-2) + mod) % mod)) % mod)) % mod + mod) % mod);
        return semiSolve(n);
    }
    
    private static Map<Long, Long> products = new HashMap<Long, Long>();
    private static long product(long n){
        if (products.containsKey(n)) return products.get(n);
        if (n == 0) products.put(n, 1L);
        else products.put(n, ((pow - n) * product(n-1)) % mod);
        return product(n);
    }*/
    
    private static long pow(long b, long p){
        if (p == 0) return 1;
        if (p % 2 == 1) return 2 * pow(b, p - 1) % mod;
        long q = pow(b, p / 2);
        return q * q % mod;
    }
}