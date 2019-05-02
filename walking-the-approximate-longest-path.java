import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int m = in.nextInt();
        int n1=0;
        int n2=0;
        ArrayList<ArrayList<Integer>> nodeConn = new ArrayList<ArrayList<Integer>>();
        int[] nodeLen = new int[n];
        for (int i=0; i<n; i++){
            nodeConn.add(new ArrayList<Integer>());
        }
        for (int i=0; i<m; i++){
            n1 = in.nextInt()-1;
            n2 = in.nextInt()-1;
            nodeConn.get(n1).add(n2);
            nodeLen[n1]++;
            nodeConn.get(n2).add(n1);
            nodeLen[n2]++;
        }
        int min=0;
        for (int i=0; i<n; i++){
            //System.out.print((i+1) + " "+ nodeLen[i]+" ");
            if(nodeLen[i]<nodeLen[min])
                min=i;
            //System.out.println(min+1);
        }
        ArrayList<Integer> temp = new ArrayList<Integer>();
        int currNode = 0;
        int newMin = 0;
        int count = 0;
        int[] path = new int[n];
        while(nodeLen[min]!=0&&count<=n){
            path[count]=min+1;
            temp = nodeConn.get(min);
            newMin=temp.get(0);
            for(int i=0; i<temp.size(); i++){
                currNode = temp.get(i);
                nodeConn.get(currNode).remove((Integer)min);
                nodeLen[currNode]--;
                if(nodeLen[currNode]<nodeLen[newMin])
                    newMin=currNode;
            }
            min = newMin;
            count++;
        }
        if(count!=n){
            path[count]=min+1;
            count++;
        }
        System.out.println(count);
        for (int i=0; i<count; i++){
            System.out.print(path[i] + " ");
        }
    }
}