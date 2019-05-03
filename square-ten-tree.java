import java.io.*;
import java.util.*;
import java.text.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    public static void main(String[] args)
    {
        Scanner scan = new Scanner( System.in );
        String sL = scan.next();
        String sR = scan.next();

        if ( sL.substring( 0, sL.length() - 1 ).equals( sR.substring( 0, sR.length() - 1 ) ) )
        {
            System.out.println( 1 );
            System.out.println( 0 + " " + ( lastDigit( sR ) - lastDigit( sL ) + 1 ) );
            return;
        }
        
        if ( isOneLess( sL.substring( 0, sL.length() - 1 ), sR.substring( 0, sR.length() - 1 ) ) )
        {
            boolean isLowerFull = ( lastDigit( sL ) == 1 );
            boolean isUpper = !( lastDigit( sR ) == 0 );
            
            if ( isLowerFull && isUpper )
            {
                System.out.println( 2 );
                System.out.println( 1 + " " + 1 );
                System.out.println( 0 + " " + lastDigit( sR ) );
            }
            
            if ( isLowerFull && !isUpper )
            {
                System.out.println( 1 );
                System.out.println( 1 + " " + 1 );
            }
            
            if ( !isLowerFull )
            {
                System.out.println( 1 );
                System.out.println( 0 + " " + ( 10 - lastDigit( sL ) + 1 + lastDigit( sR ) ) );
            }
            
            return;
        }
        
        String up = "";
        String middle = null;
        String down = "";
        int count = 0;
        
        int lastDigitL = lastDigit( sL );
        int lastDigitR = lastDigit( sR );
        
        if ( lastDigitL == 1 )
            sL = setLastNDigitZero( sL, 1 );
        else if ( lastDigitL == 0 )
        {
            up = 0 + " " + 1 + "\n";
            count++;
        }
        else
        {
            int add = 10 - lastDigitL;
            up = 0 + " " + ( add + 1 ) + "\n";
            sL = setLastNDigitAndAdd1( sL, 1 );
            count++;
        }
        
        if ( lastDigitR != 0 )
        {
            sR = setLastNDigitZero( sR, 1 );
            down = 0 + " " + lastDigitR + "\n";
            count++;
        }
        
        int level = 1;
        /*BigInteger levelMod = BigInteger.valueOf( 100 );
        BigInteger levelDiv = BigInteger.TEN;*/
        int levelDigits = 2;
        
        while ( !sL.equals( sR ) )
        {
            if ( sR.length() <= levelDigits || ( sR.length() == sL.length() &&
                                                sR.substring( 0, sR.length() - levelDigits ).equals( sL.substring( 0, sL.length() - levelDigits ) ) ) )
            {
                count++;
                String op1 = sR.length() >= levelDigits/2 ? sR.substring( 0, sR.length() - levelDigits/2 ) : "";
                String op2 = sL.length() >= levelDigits/2 ? sL.substring( 0, sL.length() - levelDigits/2 ) : "";
                middle = level + " " + subtract( op1, op2 ) + "\n";
                break;
            }
            
            String upUnits = "0";
            //BigInteger upUnits2 = BigInteger.ZERO;
            String lMod = sL.length() <= levelDigits ? sL : sL.substring( sL.length() - levelDigits );
            if ( !allZero( lMod ) )
            {
                String toAdd = subtract( create10Power( levelDigits ), lMod );
                upUnits = toAdd.substring( 0, toAdd.length() - levelDigits/2 );
                //BigInteger toAdd2 = levelMod.subtract( new BigInteger( lMod ) );
                //upUnits2 = toAdd2.divide( levelDiv );
                sL = setLastNDigitAndAdd1( sL, levelDigits );
            }
            
            String downUnits = "0";
            //BigInteger downUnits2 = BigInteger.ZERO;
            String rMod = sR.length() <= levelDigits ? sR : sR.substring( sR.length() - levelDigits );
            if ( !allZero( rMod ) )
            {
                downUnits = ( rMod.length() <= levelDigits/2 ) ? "0" : rMod.substring( 0, rMod.length() - levelDigits/2 );
                downUnits = stripLeadingZeros( downUnits );
                //downUnits2 = ( new BigInteger( rMod ) ).divide( levelDiv );
                //if ( !downUnits.equals( downUnits2.toString() ) )
                    //System.out.println( rMod + " " + downUnits + " " + downUnits2 );
                sR = setLastNDigitZero( sR, levelDigits );
            }
            
            if ( sL.equals( sR ) )
            {
                middle = level + " " + add( upUnits, downUnits ) + "\n";
                //middle = level + " " + ( new BigInteger( upUnits ).add( new BigInteger( downUnits ) ) ) + "\n";
                //middle = level + " " + ( new BigInteger( upUnits ).add( downUnits2 ) ) + "\n";
                count++;
                break;
            }
            else
            {
                if ( !"0".equals( upUnits ) )
                //if ( upUnits2 != BigInteger.ZERO )
                {
                    up = up + ( level + " " + upUnits + "\n" );
                    count++;
                }
                
                /*if ( ( !"0".equals( downUnits ) ) != ( downUnits2 != BigInteger.ZERO ))
                    throw new RuntimeException();*/
                
                if ( !"0".equals( downUnits ) )
                //if ( downUnits2 != BigInteger.ZERO )
                {
                    down = ( level + " " + downUnits + "\n" ) + down;
                    count++;
                }
            }

            level++;
            /*levelDiv = levelMod;
            levelMod = levelMod.multiply( levelMod );*/
            levelDigits *= 2;
        }
        
        System.out.println( count );
        System.out.print( up );
        if ( middle != null )
            System.out.print( middle );
        System.out.print( down );
    }
    
    private static boolean isOneLess( String s1, String s2 )
    {
        boolean nine = true;
        boolean wasMore = false;
        for ( int i = 1; i <= s2.length(); i++ )
        {
            int pos1 = s1.length() - i;
            int pos2 = s2.length() - i;
            
            int c1 = pos1 >= 0 ? digit( s1, pos1 ) : pos1 + 1;
            int c2 = digit( s2, pos2 );
            
            if ( nine && c1 == 9 && c2 == 0 )
                continue;
            
            nine = false;
            
            if ( !wasMore && c1 == c2 - 1 )
            {
                wasMore = true;
                continue;
            }
            
            if ( c1 != c2 )
                return false;
        }
        
        return true;
    }
    
    private static int lastDigit( String s ) {
        return digit( s, s.length() - 1 );
    }
    
    private static int digit( String s, int pos ) {
        return s.charAt( pos ) - '0';
    }
    
    private static String setLastNDigitZero( String s, int n ) {
        char[] chars = s.toCharArray();
        for ( int i = 1; i <= n; i++ )
            chars[chars.length - i] = '0';
        return new String( chars );
    }
    
    private static String setLastNDigitAndAdd1( String s, int n ) {
        if ( s.length() <= n ) {
            char[] c = new char[n+1];
            c[0] = '1';
            for ( int i = 1; i <= n; i++ )
                c[i] = '0';
            return new String( c );
        }
        
        char[] chars = s.toCharArray();
        for ( int i = 1; i <= n; i++ )
            chars[chars.length - i] = '0';
        
        int pos = chars.length - ( n + 1 );
        while ( pos >= 0 ) {
            if ( chars[pos] < '9' ) {
                chars[pos] = (char)( chars[pos] + 1 );
                break;
            }
            else {
                chars[pos] = '0';
                pos--;
            }
        }
        
        if ( pos >= 0 )
            return new String( chars );
        else
            return "1" + new String( chars );
    }
    
    private static boolean allZero( String s ) {
        for ( char c : s.toCharArray() )
            if ( c != '0' )
                return false;
        
        return true;
    }
    
    private static String subtract( String s1, String s2 ) {
        char[] c = s1.toCharArray();
        
        int carry = 0;
        for ( int i = 1; i <= s1.length(); i++ )
        {
            int c1 = c[c.length - i] - '0';
            int c2 = ( i > s2.length() ? 0 : ( s2.charAt( s2.length() - i ) - '0' ) ) + carry;
            
            int d = c1 - c2;
            if ( d < 0 )
            {
                d += 10;
                carry = 1;
            }
            else
                carry = 0;
            
            c[c.length - i] = Integer.toString( d ).charAt( 0 );
        }
        
        String s = new String( c );
        int lz = 0;
        while ( s.charAt( lz ) == '0' )
            lz++;
        
        return s.substring( lz );
    }
    
    private static String create10Power( int n ) {
        char[] c = new char[n+1];
        c[0] = '1';
        for ( int i = 1; i <= n; i++ )
            c[i] = '0';
        return new String( c );
    }
    
    private static String add( String s1, String s2 ) {
        if ( s1.length() < s2.length() )
            return add( s2, s1 );
        
        char[] c = s1.toCharArray();
        
        int carry = 0;
        for ( int i = 1; i <= s1.length(); i++ )
        {
            int c1 = c[c.length - i] - '0';
            int c2 = ( i > s2.length() ? 0 : ( s2.charAt( s2.length() - i ) - '0' ) );
            
            int d = c1 + c2 + carry;
            if ( d > 10 )
            {
                d -= 10;
                carry = 1;
            }
            else
                carry = 0;
            
            c[c.length - i] = Integer.toString( d ).charAt( 0 );
        }
        
        return carry == 1 ? "1" : "" + new String( c );
    }
    
    private static String stripLeadingZeros( String s ) {
        if ( allZero( s ) )
            return "0";
        
        int lz = 0;
        while ( s.charAt( lz ) == '0' )
            lz++;
        
        return s.substring( lz );
    }
}