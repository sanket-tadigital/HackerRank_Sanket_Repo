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

// Complete the findMedian function below.
function findMedian(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++)
    {
        for (var j = i + 1; j < len; j++)
        {
            if (arr[i] > arr[j])
            {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
   // console.log(arr);
    len = Math.floor(len / 2);
    //console.log(len);
    return (arr[len]);


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = findMedian(arr);

    ws.write(result + "\n");

    ws.end();
}
