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

// Complete the makingAnagrams function below.
function makingAnagrams(s1, s2) {
    var l1 = s1.length;
    var l2 = s2.length;
    var count = 0;
    //console.log(s1 + " " + s2);
    for (var i = 0; i < l1; i++) {

        for (var j = 0; j < l2; j++) {
            if (s1[i] == s2[j]) {
                count=count+2;
                s2 = s2.slice(0, j) + s2.slice(j + 1, l2);
                break;
            }
        }

    }
    return (l1 + l2 - count);

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    let result = makingAnagrams(s1, s2);

    ws.write(result + "\n");

    ws.end();
}
