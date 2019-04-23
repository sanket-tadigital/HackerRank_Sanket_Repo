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

// Complete the bigSorting function below.
function bigSorting(unsorted) {
    var len = unsorted.length;
    for (var i = 0; i < len; i++)
    {
        for (var j = i; j < len; j++)
        {
            if (unsorted[i].length > unsorted[j].length)
            {
                var temp = unsorted[i].slice();
                unsorted[i] = unsorted[j].slice();
                unsorted[j] = temp.slice();
            }
            if (unsorted[i].length == unsorted[j].length)
            {
                if (parseInt(unsorted[i]) > parseInt(unsorted[j]))
                {
                    //console.log(unsorted[i] + " " + unsorted[j]);
                    var temp = unsorted[i];
                    unsorted[i] = unsorted[j];
                    unsorted[j] = temp;
                    unsorted[i] = unsorted[i].toString();
                    unsorted[j] = unsorted[j].toString();
                }
            }
        }
    }
    //unsorted.sort();

   // console.log(unsorted);
    return unsorted;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let unsorted = [];

    for (let i = 0; i < n; i++) {
        const unsortedItem = readLine();
        unsorted.push(unsortedItem);
    }

    let result = bigSorting(unsorted);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
