'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the superReducedString function below.
function superReducedString(s) {
    console.log(s);
    var arr = [], txt = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (var i = 0; i < 26; i++)
    {
        arr[txt[i]] = 0;
    }
    console.log(arr);
    var len = s.length;
    for (var i = 0; i < len; i++)
    {
        arr[s[i]] = arr[s[i]] + 1;
    }
    var x = "";
    for (i = 0; i < 26; i++)
    {
        if (arr[txt[i]] % 2 != 0)
        {
            x = x + txt[i];
        }
    }
    console.log(x);
    if (x == "")
        x = "Empty String";
    return x;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = superReducedString(s);

    ws.write(result + '\n');

    ws.end();
}
