'use strict';

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

// Complete the insertionSort1 function below.
function insertionSort1(n, arr) {
   // console.log(n + " " + arr);
    var check = arr[n - 1];
    for (var i=n-2; i >=0; i--)
    {
        if (arr[i] > check)
        {
            arr[i + 1] = arr[i];
        }
        else
        {
            arr[i + 1] = check;
            var flag = 1;
        }
        var s = "";
        for (var x in arr)
        {
            s = s+arr[x]+" ";
        }
        console.log(s);
        if (flag == 1)
            break;
    }
    //console.log(arr);
    if (arr[0] > check)
    {
        arr[0] = check;
        var s = "";
        for (var x in arr) {
            s = s + arr[x] + " ";
        }
        console.log(s);

    }

}

function main() {
    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    insertionSort1(n, arr);
}
