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
 * Complete the runningMedian function below.
 */
function runningMedian(a) {
    /*
     * Write your code here.
     */
    var len = a.length;
    var med = [], x = 0;
    for (var m = 0; m < len; m++) {
            var key = a[m];
            var j = m - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j = j - 1;
            }
            a[j + 1] = key;
        if (m % 2 == 0)
        {
            var l = parseInt(m / 2);
            med[x++] = parseFloat(a[l]);
        } else {
            var l = Math.floor(m / 2);
            med[x++] = parseFloat((a[l] + a[l + 1]) / 2);
        }
    }
    return med;
}
    


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const aCount = parseInt(readLine(), 10);

    let a = [];

    for (let aItr = 0; aItr < aCount; aItr++) {
        const aItem = parseInt(readLine(), 10);
        a.push(aItem);
    }

    let result = runningMedian(a);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
