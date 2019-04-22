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

// Complete the minimumNumber function below.
function minimumNumber(n, password) {
    // Return the minimum number of characters to make the password strong
    var num = "0123456789", bigacheck = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", acheck = "abcdefghijklmnopqrstuvwxyz", sym = "!@#$%^&*()-+",check=0;
    for (var i = 0; i < 10; i++)
    {
        if (password.includes(num[i]))
        {
            check++;
            break;
        }
    }
    for (var i = 0; i < 26; i++) {
        if (password.includes(bigacheck[i])) {
            check++;
            break;
        }
    }
    for (var i = 0; i < 26; i++) {
        if (password.includes(acheck[i])) {
            check++;
            break;
        }
    }
    for (var i = 0; i < 12; i++) {
        if (password.includes(sym[i])) {
            check++;
            break;
        }
    }
    var x;
    if (check < 4)
    {
        x = 4 - check;
    }
    if (n + x < 6)
    {
        x = 6 - (n + x)+x;
    }
    console.log(x);
    return x;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const password = readLine();

    let answer = minimumNumber(n, password);

    ws.write(answer + "\n");

    ws.end();
}
