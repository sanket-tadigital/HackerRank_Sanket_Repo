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

// Complete the camelcase function below.
function camelcase(s) {
    var bigacheck = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", acheck="abcdefghijklmnopqrstuvwxyz", arr=[];
    var count = 1;
    var len = s.length;
    for (var i = 0; i < 26; i++)
    {
        arr[bigacheck[i]] = 0;
        arr[acheck[i]] = 0;
    }
    for (var i = 0; i < len; i++)
    {
        arr[s[i]] = arr[s[i]] + 1;
    }
    for (i = 0; i < 26; i++)
    {
        if (arr[bigacheck[i]] > 0)
            count = count + arr[bigacheck[i]];
    }
    return count;


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = camelcase(s);

    ws.write(result + "\n");

    ws.end();
}
