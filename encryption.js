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

// Complete the encryption function below.
function encryption(s) {
    var enc = [[]];
    var len = s.length;
    var base = Math.floor(Math.sqrt(s.length));
    var top = Math.ceil(Math.sqrt(s.length));
    var x = 0;
    for (var i = 0; i < base; i++)
    {
        for (var j = 0; j < top; j++)
        {
            if(s[x]!=null)
            enc[[i,j]] = s[x++];
        }
    }
    s = "";
    console.log(enc);
    for (var i = 0; i < top; i++) {
        for (var j = 0; j < base; j++) {
            if (enc[[j,i]] != null)
                s = s + enc[[j, i]]; 
        }
        s = s + " ";
    }
    console.log(s + " " + enc);
    return s;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = encryption(s);

    ws.write(result + "\n");

    ws.end();
}
