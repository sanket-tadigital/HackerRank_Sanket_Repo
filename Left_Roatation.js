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



function main() {
    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));
    for (var j = 0; j < d; j++) {
        var temp = a[0];
        for (var i = 0; i < a.length - 1; i++) {
            
            a[i] = a[i + 1];

        }
        a[a.length - 1] = temp;
    }
    var tem = "";
    for (var i = 0; i < a.length; i++)
        tem = tem + a[i]+" ";
    console.log(tem);
}
