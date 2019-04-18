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

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
    for (var i = 0; i < 5; i++)
    {
        for (var j = i; j < 5; j++)
        {
            if (arr[i] < arr[j])
            {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    var maxsum = arr[0] + arr[1] + arr[2] + arr[3];
    var minsum = arr[4] + arr[1] + arr[2] + arr[3];
    console.log(minsum+" "+maxsum);
    var sum = [maxsum, minsum];
    return sum;


}

function main() {
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
