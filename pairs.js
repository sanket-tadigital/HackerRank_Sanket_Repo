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
function partition(arr=[],low,high)
{
    var pivot = arr[high];
    var i = (low - 1);  
    for (var j = low; j < high; j++)
    {
        if (arr[j] <= pivot) {
            i++;
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    var temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
} 
function sort(arr=[],low,high)
{
    if (low < high) {
        var pi = partition(arr, low, high);
        sort(arr, low, pi - 1);
        sort(arr, pi + 1, high);
    }
}
function binarySearch(arr=[],x)
{
    var l = 0, r = arr.length - 1;
    while (l <= r) {
        var m = Math.floor(l + (r - l) / 2);
        if (arr[m] == x)
            return true;
        if (arr[m] < x)
            l = m + 1;
        else
            r = m - 1;
    }
    return false;
}

// Complete the pairs function below.
function pairs(k, arr) {
    var len = arr.length, count = 0;
    sort(arr, 0, len - 1);
    console.log(arr);
    for (var i = 0; i < len; i++)
    {
        var check = arr[i] + k;
    
        if (binarySearch(arr, check)) {
            console.log(arr[i] + " " + check);
            count++;
        }
        
    }
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = pairs(k, arr);

    ws.write(result + "\n");

    ws.end();
}
