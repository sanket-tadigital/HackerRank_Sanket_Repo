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

// Complete the palindromeIndex function below.
function palindromeIndex(s) {
    var len = s.length;
    var j = len - 1;
    var x2, x1;
    for (var i = 0; i < len / 2; i++ , j--)
    {
        if (s[i] != s[j])
        {
            x1 = null;
            x2 = null;
            if (s[j] == s[i + 1])
                return i;
            else if (s[i] == s[j - 1])
                return j;
            else
                return -1;
        }
    }

    if (x1 != null && x2 != null && x1 > x2)
        return x2;
    else if (x1 != null && x2 != null && x2 > x1)
        return x1;
    return -1;


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = palindromeIndex(s);

        ws.write(result + "\n");
    }

    ws.end();
}
