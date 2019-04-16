'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the waiter function below.
 */
function isnotPrime(x)
{
    for (var i = 2; i < x; i++)
    {
        if (x % i == 0)
            return true;
    }
    return false;
}
function waiter(number, q) {
    /*
     * Write your code here.
     */
    var primes = [];
    var n = q;
    var x = 2,m=0;
    while (n)
    {
        if (!isnotPrime(x)) {
            primes[m++] = x;
            n--;
        }
        x++;

    }
    var w;
    var brr = [[]];
    for (var i = 0; i < q; i++) {
        var len = number.length;
        w = 0;
        for (var j = 0; j < len; j++) {

            if (number[j] != null && number[j] % primes[i] == 0) {

                for (var o = 0; o < w; o++) {
                    brr[[i, o + 1]] = brr[[i, o]];
                }
                brr[[i, 0]] = number[j];
                w++;
                for (var k = j; k < len - 1; k++)
                    number[k] = number[k + 1];
                number[len - 1] = null;
                j--;
            }
            // console.log(number);
            //console.log(brr);
        }
    }
    var s = "";
        for (n in brr) {
            if (n != 0)
                s = s + brr[n]+"\n";
        }
    for (var i = 0; i < len;i++) {
            if (number[i]!=null)
                s = s + number[i]+"\n";
        }
    console.log(s);
    return s;

    
    


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nq = readLine().split(' ');

    const n = parseInt(nq[0], 10);

    const q = parseInt(nq[1], 10);

    const number = readLine().split(' ').map(numberTemp => parseInt(numberTemp, 10));

    let result = waiter(number, q);

    ws.write(result);

    ws.end();
}
