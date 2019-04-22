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

// Complete the caesarCipher function below.
function caesarCipher(s, k) {
    var txt1 = "abcdefghijklmnopqrstuvwxyz",txt2="ABCDEFGHIJKLMNOPQRSTUVWXYZ",m="";
    var len = s.length;
    var flag;
    while (k > 26)
        k = k - 26;
    k = parseInt(k);
    console.log(k);
    for (var i = 0; i<len ; i++)
    {
        flag = 0;
        for (var j = 0; j < 26; j++)
        {
           
            if (s[i] == txt1[j])
            {
                if (j + k < 26)
                   var n = j + k;
                else
                   var n = j + k - 26;
                m = m + txt1[n];
                flag = 1;
            }
            if (s[i] == txt2[j]) {
                if (j + k < 26)
                    var n = j + k;
                else
                    var n = j + k - 26;
                m = m + txt2[n];
                flag = 1;
            }
        }
        if (flag == 0)
            m = m + s[i];
    }
    console.log(m);
    return m;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const k = parseInt(readLine(), 10);

    let result = caesarCipher(s, k);

    ws.write(result + "\n");

    ws.end();
}
