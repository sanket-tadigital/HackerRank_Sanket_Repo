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

// Complete the balancedSums function below.
function balancedSums(arr) {
    var len = arr.length,sum2=0, sum1=0,flag;
	if(len==1)
		return "YES";
    for (var i = 0; i < len - 1; i++)
    {
        flag = 0
        sum1 = 0;
        sum2 = 0;
        for (var j = 0; j < i; j++)
            sum1 = sum1 + arr[j];

        for (var j = i+1; j < len; j++)
            sum2 = sum2 + arr[j];
        if (sum1 == sum2)
        {
            flag = 1;
            return "YES";
        } else {
            flag = 0;
        }
    }
    if (flag == 0)
        return "NO";


}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = balancedSums(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
