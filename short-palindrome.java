import java.io.*;
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String s = input.next();
        int[] freq = new int[26];
        int[][] pfreq = new int[26][26];
        int[] tfreq = new int[26];
        final int CONST = 1000000000+7;
        int ans = 0;
        for(char c:s.toCharArray()){
            ans = (ans+tfreq[c-'a'])%CONST;
            for(int i=0; i<26; i++){
                tfreq[i] = (tfreq[i] + pfreq[i][c-'a'])%CONST;
            }
            for(int i=0; i<26; i++){
                pfreq[i][c-'a'] = (pfreq[i][c-'a'] + freq[i])%CONST;
            }
            freq[c-'a']++;
        }
        System.out.println(ans);
    }
}