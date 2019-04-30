import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

class graph{
    private int n;
    private int board[][];
    private int row[]=new int[8];
    private int col[]=new int[8];
    graph(int n,int a,int b){
        this.n=n;
        board=new int[n][n];
        for(int i=0;i<n;i++)
        Arrays.fill(board[i],Integer.MAX_VALUE);
        int row[]={a,a,b,b,-a,-a,-b,-b};
        int col[]={b,-b,a,-a,b,-b,a,-a};
        this.row=row;
        this.col=col;
        
    }
    public int bfs(){
        LinkedList<Integer> q=new LinkedList<Integer>();
        q.add(0);
        q.add(0);
        board[0][0]=0;
        while(q.size()>0){
            int X=q.poll();
            int Y=q.poll();
            for(int i=0;i<8;i++){
                int x=X+row[i];
                int y=Y+col[i];
                if(x<n && x>=0 && y<n && y>=0){
                    if(board[x][y]==Integer.MAX_VALUE){
                        board[x][y]=board[X][Y]+1;
                        q.add(x);
                        q.add(y);
                    }
                }
            }
               
        }
        if(board[n-1][n-1]==Integer.MAX_VALUE)
            return -1;
        return board[n-1][n-1];
    } 
}
public class Solution {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int dist[][]=new int[n][n];
       for(int i=0;i<n;i++)
        Arrays.fill(dist[i],-2);
        for(int i=1;i<n;i++){
            for(int j=1;j<n;j++){
                graph g = new graph(n,i,j);
                if(dist[j][i]!=-2)
                    dist[i][j]=dist[j][i];
                else
                   dist[i][j]= g.bfs();
            }
        }
        for(int i=1;i<n;i++){
            for(int j=1;j<n;j++){
                System.out.print(dist[i][j]+" ");
            }
            System.out.println();
        }
    }
}