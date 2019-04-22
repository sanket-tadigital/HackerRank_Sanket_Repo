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

// Complete the pangrams function below.
function pangrams(s) {
    s = s.toLowerCase();
    var txt = "abcdefghijklmnopqrstuvwxyz",arr=[],count=0;
    var len = s.length;
    for (var i = 0; i < 26; i++)
        arr[txt[i]] = 0;
    for (var i = 0; i < len; i++)
    {
        arr[s[i]] = arr[s[i]] + 1;
    }
    console.log(arr);
    for (var i = 0; i < 26; i++)
    {
        if (arr[txt[i]] > 0)
        {
            count++;
        }
    }
    if (count == 26)
        return "pangram";
    else
        return "not pangram";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = pangrams(s);

    ws.write(result + "\n");

    ws.end();
}
