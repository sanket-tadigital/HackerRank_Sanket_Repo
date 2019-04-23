'use strict';

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

// Complete the countSort function below.
function countSort(arr) {
    var len = arr.length;
    var check=[];
    for (var i = 0; i < 100; i++)
        check[i] = 0;
    for (var i = 0; i < len; i++)
    {
        check[parseInt(arr[i][0])] = check[parseInt(arr[i][0])] + 1;
    }
    var s = "";
    for (var i = 0; i < 100; i++)
    {
        if (check[i] > 0)
        {
            for (var j = 0; j < len; j++)
            {
                if (parseInt(arr[j][0]) == i) {
                    if (j < len / 2)
                        s = s + "- ";
                    else
                        s = s + arr[j][1] + " ";
                }
            }
        }
    }
    console.log(s);
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    countSort(arr);
}
