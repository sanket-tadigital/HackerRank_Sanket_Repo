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
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the quickSort function below.
function quickSort(arr) {
    var len = arr.length;
    var p = arr[0];
    var left = [], right = [], equal = [], l = 0, r = 0, e = 0;
    for (var i = 0; i < len; i++)
    {
        if (arr[i] < p)
            left[l++] = arr[i];
        else if (arr[i] > p)
            right[r++] = arr[i];
        else if (arr[i] == p)
            equal[e++] = arr[i];
    }
    var s = [],y=0;
    for (var x in left)
    {
        s[y++] =left[x];
    }
    for (var x in equal) {
        s[y++] =equal[x];
    }
    for (var x in right) {
        s[y++] = right[x];
    }


    console.log(s);
    return s;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = quickSort(arr);

    ws.write(result.join(" ") + "\n");

    ws.end();
}
