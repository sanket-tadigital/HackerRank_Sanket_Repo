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

// Complete the timeInWords function below.
function timeInWords(h, m) {

    h = parseInt(h);
    if (parseInt(m) > 30)
    {
        h = h + 1;
        switch (m) {
            case 31:
                m = "twenty nine minutes to";
                break;

            case 32:
                m = "twenty eight minutes to";
                break;

            case 33:
                m = "twenty seven minutes to";
                break;

            case 34:
                m = "twenty six minutes to";
                break;

            case 35:
                m = "twenty five minutes to";
                break;

            case 36:
                m = "twenty four minutes to";
                break;

            case 37:
                m = "twenty three minutes to";
                break;

            case 38:
                m = "twenty two minutes to";
                break;

            case 39:
                m = "twenty one minutes to";
                break;

            case 40:
                m = "twenty minutes to";
                break;

            case 41:
                m = "nineteen minutes to";
                break;

            case 42:
                m = "eighteen minutes to";
                break;

            case 43:
                m = "seventeen minutes to";
                break;

            case 44:
                m = "sixteen minutes to";
                break;

            case 45:
                m = "quarter to";
                break;

            case 46:
                m = "forteen minutes to";
                break;

            case 47:
                m = "thirteen minutes to";
                break;

            case 48:
                m = "tweleve minutes to";
                break;

            case 49:
                m = "eleven minutes to";
                break;

            case 50:
                m = "ten minutes to";
                break;

            case 51:
                m = "nine minutes to";
                break;

            case 52:
                m = "eight minutes to";
                break;

            case 53:
                m = "seven minutes to";
                break;

            case 54:
                m = "six minutes to";
                break;

            case 55:
                m = "five minutes to";
                break;

            case 56:
                m = "four minutes to";
                break;

            case 57:
                m = "three minutes to";
                break;

            case 58:
                m = "two minutes to";
                break;

            case 59:
                m = "one minute to";
                break;

        }
    } else {
        switch (m) {
            case 0:
                m = "o' clock";
                break;

            case 1:
                m = "one minute past";
                break;

            case 2:
                m = "two minutes past";
                break;

            case 3:
                m = "three minutes past";
                break;

            case 4:
                m = "four minutes past";
                break;

            case 5:
                m = "five minutes past";
                break;

            case 6:
                m = "six minutes past";
                break;

            case 7:
                m = "seven minutes past";
                break;

            case 8:
                m = "eight minutes past";
                break;

            case 9:
                m = "nine minutes past";
                break;

            case 10:
                m = "ten minutes past";
                break;

            case 11:
                m = "eleven minutes past";
                break;
            case 12:
                m = "tweleve minutes past";
                break;
            case 13:
                m ="thirteen minutes past";
                break;
            case 14:
                m = "forteen past";
                break;
            case 15:
                m = "quarter past";
                break;
            case 16:
                m = "sixteen minutes past";
                break;
            case 17:
                m = "seventeen minutes past";
                break;
            case 18:
                m = "eighteen minutes past";
                break;
            case 19:
                m = "nineteen minutes past";
                break;

            case 20:
                m = "twenty minutes past";
                break;

            case 21:
                m = "twenty one minutes past";
                break;

            case 22:
                m = "twenty two minutes past";
                break;

            case 23:
                m = "twenty three minutes past";
                break;

            case 24:
                m = "twenty four minutes past";
                break;

            case 25:
                m = "twenty five minutes past";
                break;

            case 26:
                m = "twenty six minutes past";
                break;

            case 27:
                m = "twenty seven minutes past";
                break;

            case 28:
                m = "twenty eight minutes past";
                break;

            case 29:
                m = "twenty nine minutes past";
                break;

            case 30:
                m = "half past";
                break;
        }

    }
    var hr;
    switch (h) {
        case 1:
            hr = "one";
            break;
        case 2:
            hr = "two";
            break;
        case 3:
            hr = "three";
            break;
        case 4:
            hr = "four";
            break;
        case 5:
            hr = "five";
            break;
        case 6:
            hr = "six";
            break;
        case 7:
            hr = "seven";
            break;
        case 8:
            hr = "eight";
            break;
        case 9:
            hr = "nine";
            break;
        case 10:
            hr = "ten";
            break;
        case 11:
            hr = "eleven";
            break;
        case 12:
            hr = "twelve";
            break;
    }

    var time;
    if (m == "o' clock")
        time = hr + " " + m;
    else
        time = m + " " + hr;
    console.log(time);
    return time;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let result = timeInWords(h, m);

    ws.write(result + "\n");

    ws.end();
}
