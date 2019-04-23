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

// Complete the anagram function below.
function anagram(s) {
    var l = s.length;
    var s1 = "", s2 = "";
   // l++;
    console.log(l);
    if (l % 2 != 0)
        return -1;
    l = l / 2;
    for (var i = 0; i < l; i++)
    {
        s1 = s1 + s[i];
        s2 = s2 + s[i + l];
    }
    var l1 = s1.length;
    var l2 = s2.length;
    var count = 0,m="0";
    console.log(s1 + " " + s2);
    for (var i = 0; i < l1; i++)
    {
    
        for (var j = 0; j < l2; j++)
        {
            if (s1[i] == s2[j]) {
                count++;
                s2 = s2.slice(0, j) + s2.slice(j+1, l2);
                break;
            }        
        }

    }
    return (l1-count);


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        let result = anagram(s);

        ws.write(result + "\n");
    }

    ws.end();
}
