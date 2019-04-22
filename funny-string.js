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

// Complete the funnyString function below.
function funnyString(s) {
    var len = s.length;
    var srev = "",x=0;
    for (var i = len - 1; i >= 0; i--)
    {
        srev = srev + s[i];
    }
    var arr = [], rarr = [];
    for (var i = 0; i < len-1; i++)
    {
        rarr[x] = Math.abs(parseInt(srev[i].charCodeAt()) - parseInt(srev[i + 1].charCodeAt()))
        //console.log(srev[i].charCodeAt());
        arr[x++] = Math.abs(parseInt(s[i].charCodeAt()) - parseInt(s[i + 1].charCodeAt()))
        
    }
    console.log(rarr + " " + arr);
    var f = 0;
    for (i = 0; i < x; i++)
    {
        if (arr[i] == rarr[i])
            f = 1;
        else {
            f = 0;
            break;
            }
    }
    if (f == 1)
        return "Funny";
    else
        return "Not Funny";

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = funnyString(s);

        ws.write(result + "\n");
    }

    ws.end();
}
