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
function partition(arr = [], low, high) {
    var pivot = arr[high];
    var i = (low - 1); // index of smaller element 
    for (var j = low; j < high; j++) {
        // If current element is smaller than or 
        // equal to pivot 
        if (arr[j] <= pivot) {
            i++;

            // swap arr[i] and arr[j] 
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    // swap arr[i+1] and arr[high] (or pivot) 
    var temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}


/* The main function that implements QuickSort() 
  arr[] --> Array to be sorted, 
  low  --> Starting index, 
  high  --> Ending index */
function sort(arr = [], low, high) {
    if (low < high) {
        /* pi is partitioning index, arr[pi] is  
          now at right place */
        var pi = partition(arr, low, high);

        // Recursively sort elements before 
        // partition and after partition 
        sort(arr, low, pi - 1);
        sort(arr, pi + 1, high);
    }
}

// Complete the hackerlandRadioTransmitters function below.
function hackerlandRadioTransmitters(x, k) {
    var len;
    len = x.length;
    sort(x, 0, len - 1)
    
    var l = -1, r = -1, ans = 0;
    for (var i = 0; i < len; i++) {
        if (x[i] <= r)
            continue;
        if (l == -1)
            l = x[i];
        else if (x[i] - l > k) {
            ans++;
            if (x[i] - x[i - 1] <= k)
                l = -1;
            else
                l = x[i];
            r = x[i - 1] + k;
        }
    }
    if (l != -1)
        ans++;
    return ans;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const x = readLine().split(' ').map(xTemp => parseInt(xTemp, 10));

    let result = hackerlandRadioTransmitters(x, k);

    ws.write(result + "\n");

    ws.end();
}
