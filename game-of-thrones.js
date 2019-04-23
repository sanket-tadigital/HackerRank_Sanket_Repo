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

// Complete the gameOfThrones function below.
function gameOfThrones(s) {
    var txt = "abcdefghijklmnopqrstuvwxyz", count = [], x = 0,vflag,flag;
    var len = s.length;
    if (len % 2 == 0)
        vflag = 0;
    else
        vflag = -1;
    for (var i = 0; i < 26; i++)
    {
        count[txt[i]] = 0;
    }
    for (var i = 0; i < len; i++)
    {
        count[s[i]] = count[s[i]] + 1;
    }
    for (var i = 0; i < 26; i++)
    {
        if (count[txt[i]] % 2 == 0)
            flag = 1;
        else if (count[txt[i]] % 2 != 0 && vflag == -1)
        {
            flag = 1;
            vflag = 0;
        }
        else if (count[txt[i]] % 2 != 0 && vflag == 0)
        {
            flag = -2;
            break;
        }
    }
    if (flag == 1)
        return "YES";
    else
        return "NO";


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = gameOfThrones(s);

    ws.write(result + "\n");

    ws.end();
}
