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

// Complete the weightedUniformStrings function below.
function weightedUniformStrings(s, queries) {
    var len, count, arr = [], txt = "abcdefghijklmnopqrstuvwxyz";
    var ans =[], x = 0, flag = 0;
    len = txt.length;
    for (var i = 0; i < 26; i++)
    {
        arr[txt[i]] = 0;
    }
    for (var i = 0; i < len; i++)
    {
        arr[s[i]] = arr[s[i]] + 1;
    }
   /* for (var i = 0; i < 26; i++) {
        arr[txt[i]] = (i+1)*arr[txt[i]];
    }*/
    var q_len = queries.length;
    for (var i = 0; i < q_len; i++)
    {
        flag = 0;
        for (var j = 0; j < 26; j++)
        {
            if ((queries[i] % (j+1)==0 && queries[i]/(j+1)<=arr[txt[j]]) ||(queries[i]==j+1&&arr[txt[j]]>0))
            {
                flag = 1;
                break;
            }
            else {
                flag = 0;
            }
        }

        if (flag == 1)
        {
            ans[x++] = "Yes";
        }
        else {
            ans[x++] = "No";
        }
    }
    console.log(ans);
    return ans;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let i = 0; i < queriesCount; i++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = weightedUniformStrings(s, queries);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
