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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    /*
     * Write your code here.
     */
    var arr = s.split(":");
    var time;
    console.log(arr);
    if (s.includes("PM"))
    {
        if(arr[0]!=12)
        arr[0] = parseInt(arr[0]) + 12;

        var sec = arr[2].split("PM");
        console.log(sec);

        time = arr[0] + ":" + arr[1] + ":" + sec[0];
        console.log(time);
    }
    else
    {
        if (arr[0] == "12")
            arr[0] = "00";
        var sec = arr[2].split("AM");
        console.log(sec);
        time = arr[0] + ":" + arr[1] + ":" + sec[0];
        console.log(time);
    }

    return time;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
