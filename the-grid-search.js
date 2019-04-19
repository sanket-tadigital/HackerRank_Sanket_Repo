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

// Complete the gridSearch function below.
function gridSearch(G, P) {
    var glen = G.length;
    var plen = P.length;
    var flag = 0, t = 0, arr = [], m,l=0;
    //G = toString(G);
    //P = toString(P);
    for (var i = 0; i < glen;)
    {
        flag = 0;
        for (var j = 0; j < plen;) {
            console.log(G[i] + " " + P[j]);
            m = j;
            t = i;
            if (G[i].includes(P[j])) {
                /*var check = G[i].split(P[j]);
                var fl1 = check[0].length;
                var fb1 = check[1].length;
                if (j != 0 && fb1 == fb2 && fl1 == fl2) {*/
                    console.log("YES" + G[i] + " " + P[j]);
                    i++;
                    j++;
                    flag = 1;
                   /* var fb2 = fb1;
                    var fl2 = fl1;
                }
                else {
                    flag = 0;
                    i = t;
                    j = 0;
                    console.log("NO" + G[i] + " " + P[j]);
                    i++;
                }*/
            }
            else {
                flag = 0;
                i = t;
                j = 0;
                console.log("NO" + G[i] + " " + P[j]);
                i++;
            }
            if (i >= glen)
                break;
        }
         
        if (flag == 1)
            break;
        else
            j++;
    }
    if (flag == 1) {
        console.log("YES");
        arr[l++] = "YES";
    }
    else {
        console.log("NO");
        arr[l++] = "NO";
    }
    return arr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const RC = readLine().split(' ');

        const R = parseInt(RC[0], 10);

        const C = parseInt(RC[1], 10);

        let G = [];

        for (let i = 0; i < R; i++) {
            const GItem = readLine();
            G.push(GItem);
        }

        const rc = readLine().split(' ');

        const r = parseInt(rc[0], 10);

        const c = parseInt(rc[1], 10);

        let P = [];

        for (let i = 0; i < r; i++) {
            const PItem = readLine();
            P.push(PItem);
        }

        let result = gridSearch(G, P);

        ws.write(result + "\n");
    }

    ws.end();
}
