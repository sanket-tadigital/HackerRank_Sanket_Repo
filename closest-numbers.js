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

// Complete the closestNumbers function below.
function closestNumbers(arr) {

    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            if (parseInt(arr[i]) > parseInt(arr[j])) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    var min = 1000000;
    //var s = "";
    for (i = 0; i < len - 1; i++) {
        var dif = arr[i + 1] - arr[i];
        if (dif < min) {
            min = dif;
        }
    }
    var am=[], x = 0;
    for (i = 0; i < len - 1; i++) {
        var dif = arr[i + 1] - arr[i];
        if (dif == min) {
            am[x++] = arr[i];
            am[x++] = arr[i + 1];
        }
    }

    //console.log(am);
    return am;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = closestNumbers(arr);

    ws.write(result.join(" ") + "\n");

    ws.end();
}
