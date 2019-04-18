'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the diagonalDifference function below.
function diagonalDifference(arr) {

    var sum1 = 0;
    var sum2 = 0;
    var len = arr.length;
    console.log(len);
    for (var i = 0; i < len; i++)
    {
        for (var j = 0; j < len; j++)
        {
            if (i == j) {
                sum2 = sum2 + arr[i][j];
                console.log(arr[i][j]);
            }

            if (i == len - j - 1) {
                sum1 = sum1 + arr[i][j];
                console.log(arr[i][j]);
            }
        }
    }
    console.log(sum1 + " " + sum2);
    if (sum1 > sum2)
        return (sum1 - sum2);
    else
        return (sum2 - sum1);


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = diagonalDifference(arr);

    ws.write(result + '\n');

    ws.end();
}
