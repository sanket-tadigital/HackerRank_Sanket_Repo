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

// Complete the isValid function below.
function isValid(s) {
    var count = [], txt = "abcdefghijklmnopqrstuvwxyz", check = 0, len,flag=1,done=0;
    len = s.length;
    for (var i = 0; i < 26; i++)
        count[txt[i]] = 0;

    for (var i = 0; i < len; i++)
    {
        count[s[i]] = count[s[i]] + 1;
    }
    for (var i = 0; i < len-1; i++) {
        if (count[s[i]] == count[s[i + 1]])
        {
            flag = 1;
            console.log(s[i] + "yes" + s[i + 1]);
        }
        else if (done == 0 && (count[s[i]]) != count[s[i + 1]])
        {
            flag = 1;
            done = -1;
            console.log(s[i] + "first no" + s[i + 1]);
            count[s[i+1]] = count[s[i]];
        
        }
        else if (done == -1 && count[s[i]] != count[s[i + 1]]) {
            flag = 0;
            console.log(s[i] + "last no" + s[i + 1]);
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

    let result = isValid(s);

    ws.write(result + "\n");

    ws.end();
}
