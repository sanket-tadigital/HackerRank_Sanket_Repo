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

// Complete the gemstones function below.
function gemstones(arr) {
    var txt = "abcdefghijklmnopqrstuvwxyz",check=[];
    var len = arr.length;
    var flag = -1, newflag = -2;
    //console.log(arr[0].charAt(0));
    var l = arr[0].length;
    for (var i = 0; i < 26; i++)
    {
        check[txt[i]] = 0;
    }
    for (var j = 0; j < l; j++)
    {
        check[arr[0].charAt(j)] = -1;
    }
    for (var i = 1; i < len; i++)
    {
        l = arr[i].length;
        for (var j = 0; j < l; j++)
        {
            if (check[arr[i].charAt(j)] == flag)
            {
                check[arr[i].charAt(j)] = newflag;
            }
        }
        flag = newflag;
        newflag--;
    }
    newflag++;
   // console.log(check);
    var count = 0;
    for (var i = 0; i < 26; i++)
    {
        if (check[txt[i]] == newflag)
        {
            count++;
        }
    }
    return count;

    


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = readLine();
        arr.push(arrItem);
    }

    let result = gemstones(arr);

    ws.write(result + "\n");

    ws.end();
}
