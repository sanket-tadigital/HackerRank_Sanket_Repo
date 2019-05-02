import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    static class Piece {
        public char type;
        public boolean isWhite;

        public Piece (char type, boolean isWhite) {
            this.type = type;
            this.isWhite = isWhite;
        }
        
        public Piece (Piece p) {
            this.type = p.type;
            this.isWhite = p.isWhite;
        }
    }
    
    static class Board {
        public Piece[][] pieces = new Piece[4][4];
        
        public Board(ArrayList<String> w, ArrayList<String> b) {
            for (String p : w) {
                String[] p3 = p.split(" ");
                char type = p3[0].charAt(0);
                int x = p3[1].charAt(0)-'A';
                int y = p3[2].charAt(0)-'1';
                pieces[x][y] = new Piece(type, true);
            }
            for (String p : b) {
                String[] p3 = p.split(" ");
                char type = p3[0].charAt(0);
                int x = p3[1].charAt(0)-'A';
                int y = p3[2].charAt(0)-'1';
                pieces[x][y] = new Piece(type, false);
            }
        }
        
        public Board(Board b) {
            for (int i = 0; i < 4; i++) {
                for (int j = 0; j < 4; j++) {
                    if (b.pieces[i][j] != null)
                        this.pieces[i][j] = new Piece(b.pieces[i][j]);
                }
            }
        }
        
        public ArrayList<Board> legalMoves(boolean whiteToMove) {
            ArrayList<Board> moves = new ArrayList<Board>();
            for (int a = 0; a < 4; a++) {
                for (int b = 0; b < 4; b++) {
                    if (pieces[a][b] != null && pieces[a][b].isWhite == whiteToMove) {
                        if (pieces[a][b].type == 'P') {
                            int d = whiteToMove?b+1:b-1;
                            if (pieces[a][d] == null) {
                                if (d==0||d==3) {
                                    Board newBoard = new Board(this);
                                    newBoard.pieces[a][d] = newBoard.pieces[a][b];
                                    newBoard.pieces[a][b] = null;
                                    newBoard.pieces[a][d].type = 'R';
                                    moves.add(newBoard);
                                    newBoard = new Board(this);
                                    newBoard.pieces[a][d] = newBoard.pieces[a][b];
                                    newBoard.pieces[a][b] = null;
                                    newBoard.pieces[a][d].type = 'B';
                                    moves.add(newBoard);
                                    newBoard = new Board(this);
                                    newBoard.pieces[a][d] = newBoard.pieces[a][b];
                                    newBoard.pieces[a][b] = null;
                                    newBoard.pieces[a][d].type = 'N';
                                    moves.add(newBoard);
                                }
                                else {
                                    Board newBoard = new Board(this);
                                    newBoard.pieces[a][d] = newBoard.pieces[a][b];
                                    newBoard.pieces[a][b] = null;
                                    moves.add(newBoard);
                                }
                            }
                            for (int c = a-1; c <= a+1; c+=2) {
                                if (c>=0&&c<4) {
                                    if (pieces[c][d] != null && pieces[c][d].isWhite != whiteToMove) {
                                        if (d==0||d==3) {
                                            Board newBoard = new Board(this);
                                            newBoard.pieces[c][d] = newBoard.pieces[a][b];
                                            newBoard.pieces[a][b] = null;
                                            newBoard.pieces[c][d].type = 'R';
                                            moves.add(newBoard);
                                            newBoard = new Board(this);
                                            newBoard.pieces[c][d] = newBoard.pieces[a][b];
                                            newBoard.pieces[a][b] = null;
                                            newBoard.pieces[c][d].type = 'B';
                                            moves.add(newBoard);
                                            newBoard = new Board(this);
                                            newBoard.pieces[c][d] = newBoard.pieces[a][b];
                                            newBoard.pieces[a][b] = null;
                                            newBoard.pieces[c][d].type = 'N';
                                            moves.add(newBoard);
                                        }
                                        else {
                                            Board newBoard = new Board(this);
                                            newBoard.pieces[c][d] = newBoard.pieces[a][b];
                                            newBoard.pieces[a][b] = null;
                                            moves.add(newBoard);
                                        }
                                    }
                                }
                            }
                        }
                        if (pieces[a][b].type == 'N') {
                            for (int c = -2; c <= 2; c+=4) {
                                for (int d = -1; d <= 1; d+=2) {
                                    int e = a+c;
                                    int f = b+d;
                                    int g = a+d;
                                    int h = b+c;
                                    if (e >= 0 && e < 4 && f >= 0 && f < 4) {
                                        if (pieces[e][f] == null || pieces[e][f].isWhite != whiteToMove) {
                                            Board newBoard = new Board(this);
                                            newBoard.pieces[e][f] = newBoard.pieces[a][b];
                                            newBoard.pieces[a][b] = null;
                                            moves.add(newBoard);
                                        }
                                    }
                                    if (g >= 0 && g < 4 && h >= 0 && h < 4) {
                                        if (pieces[g][h] == null || pieces[g][h].isWhite != whiteToMove) {
                                            Board newBoard = new Board(this);
                                            newBoard.pieces[g][h] = newBoard.pieces[a][b];
                                            newBoard.pieces[a][b] = null;
                                            moves.add(newBoard);
                                        }
                                    }
                                }
                            }
                        }
                        if (pieces[a][b].type == 'R' || pieces[a][b].type == 'Q') {
                            for (int c = -1; c <= 1; c += 2) {
                                for (int d = a+c; d >= 0 && d < 4; d += c) {
                                    if (pieces[d][b] == null || pieces[d][b].isWhite != whiteToMove) {
                                        Board newBoard = new Board(this);
                                        newBoard.pieces[d][b] = newBoard.pieces[a][b];
                                        newBoard.pieces[a][b] = null;
                                        moves.add(newBoard);
                                    }
                                    if (pieces[d][b] != null)
                                        break;
                                }
                                for (int d = b+c; d >= 0 && d < 4; d += c) {
                                    if (pieces[a][d] == null || pieces[a][d].isWhite != whiteToMove) {
                                        Board newBoard = new Board(this);
                                        newBoard.pieces[a][d] = newBoard.pieces[a][b];
                                        newBoard.pieces[a][b] = null;
                                        moves.add(newBoard);
                                    }
                                    if (pieces[a][d] != null)
                                        break;
                                }
                            }
                        }
                        if (pieces[a][b].type == 'B' || pieces[a][b].type == 'Q') {
                            for (int c = -1; c <= 1; c += 2) {
                                for (int d = -1; d <= 1; d += 2) {
                                    for (int e = 1; a+e*c >= 0 && a+e*c < 4 && b+e*d >= 0 && b+e*d < 4; e++) {
                                        int f = a+e*c;
                                        int g = b+e*d;
                                        
                                        if (pieces[f][g] == null || pieces[f][g].isWhite != whiteToMove) {
                                            Board newBoard = new Board(this);
                                            newBoard.pieces[f][g] = newBoard.pieces[a][b];
                                            newBoard.pieces[a][b] = null;
                                            moves.add(newBoard);
                                        }
                                        if (pieces[f][g] != null)
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return moves;
        }
        
        public boolean doesQueenExist(boolean whiteQueen) {
            for (int a = 0; a < 4; a++) {
                for (int b = 0; b < 4; b++) {
                    if (pieces[a][b] != null && pieces[a][b].type == 'Q' && pieces[a][b].isWhite == whiteQueen)
                        return true;
                }
            }
            return false;
        }
        
        public boolean canCaptureQueen(boolean whiteToMove) {
            ArrayList<Board> moves = legalMoves(whiteToMove);
            for (Board b : moves) {
                if (!b.doesQueenExist(!whiteToMove))
                    return true;
            }
            return false;
        }
        
        public boolean canReachGoalWhite(int rem) {
            if (canCaptureQueen(true))
                return true;
            if (rem==1)
                return false;
            ArrayList<Board> moves = legalMoves(true);
            for (Board b : moves) {
                if (!b.canStopGoalBlack(rem))
                    return true;
            }
            return false;
        }
        
        public boolean canStopGoalBlack(int rem) {
            if (canCaptureQueen(false))
                return true;
            ArrayList<Board> moves = legalMoves(false);
            for (Board b : moves) {
                if (!b.canReachGoalWhite(rem-1))
                    return true;
            }
            return false;
        }
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int g = sc.nextInt();
        for (int z = 0; z < g; z++) {
            int w = sc.nextInt();
            int b = sc.nextInt();
            int m = (sc.nextInt()+1)/2;
            ArrayList<String> wl = new ArrayList<String>();
            ArrayList<String> bl = new ArrayList<String>();
            sc.nextLine();
            for (int i = 0; i < w; i++) {
                wl.add(sc.nextLine());
            }
            for (int i = 0; i < b; i++) {
                bl.add(sc.nextLine());
            }
            Board start = new Board(wl, bl);
            System.out.println(start.canReachGoalWhite(m)?"YES":"NO");
        }
    }
}