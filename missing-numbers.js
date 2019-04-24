'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the missingNumbers function below.
function missingNumbers(arr, brr) {
    var alen = arr.length;
    var blen = brr.length;
    var absent = [], x = 0,nf=0;
    var plen = alen;
    var flag;
    for (var i = 0; i < blen; i++)
    {
        flag = 0;
        for (var j = 0; j < alen; j++)
        {
            if (brr[i] == arr[j])
            {
                arr[j] = -100;
                flag = 1;
                break;
            }
            else {
                flag=0
            }
        }
        if (flag==0)
        {
            var bc = 1;
            if (absent[x - 1] < brr[i])
                nf = 1;
            else {
                nf = 0;
                for (var f = 0; f < x; f++) {
                    if (absent[f] == brr[i]) {
                        bc = 0;
                        break;
                    } else {
                        bc = 1;
                    }
                }
            }
            if(bc==1)
                absent[x++] = brr[i];   
        }
        //console.log(arr);
       
    }
    //console.log(absent);
    if (nf == 0) {
        for (var i = 1; i < x; ++i) {
            var k = absent[i];
            var j = i - 1;
            while (j >= 0 && absent[j] > k) {
                absent[j + 1] = absent[j];
                j = j - 1;
            }
            absent[j + 1] = k;
        }
    }
    return absent;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const m = parseInt(readLine(), 10);

    const brr = readLine().split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const result = missingNumbers(arr, brr);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
