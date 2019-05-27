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

function reqCoveringStains(coordinates,p,i,k,index,initialArea){
    if (coordinates[i][2]){        
        return;
    }
    // if (p.indexes.indexOf(i)>=0){
    //     return;
    // }
    // p.indexes.push(i);
    coordinates[i][2] = true;
    if (index == k-1){
        
        if (area(coordinates)<initialArea){
            p.amount++;
            // p.found = p.found || "";
            // p.found+=p.indexes.join(",") + ";";
        }        
    }else{
        for (var j = i+1;j<coordinates.length;++j){
            reqCoveringStains(coordinates,p,j,k,index+1,initialArea)
        }    
    }
    coordinates[i][2] = false;
    // p.indexes[p.indexes.indexOf(i)] = p.indexes[p.indexes.length-1];
    // p.indexes.length--;
}

/*
 * Complete the coveringStains function below.
 */
function coveringStains(k, coordinates) {
    /*
     * Write your code here.
     */
    var p = {amount:0,indexes:[]};
    const initialArea = area(coordinates);
    for (var i = 0;i<coordinates.length;++i){
            reqCoveringStains(coordinates,p,i,k,0,initialArea)
    }
    
    return p.amount;
}

function area(coordinates){
    var areaLeft = minCoordX(coordinates);
    var areaRight = maxCoordX(coordinates);
    var areaTop = minCoordY(coordinates);
    var areaBottom = maxCoordY(coordinates);
    
    var areaStart = Math.abs(areaRight-areaLeft)*Math.abs(areaBottom-areaTop);
    return areaStart;
}

function minCoordX(coordinates){
    var min;
    for (var i = 0;i<coordinates.length;++i){
        if (coordinates[i][2]){
            continue;
        }
        if (typeof(min)==="undefined"){
            min = coordinates[i][0];
        }
        min = Math.min(min,coordinates[i][0]);
    }
    return min;
}

function maxCoordX(coordinates){
    var max;
    for (var i = 0;i<coordinates.length;++i){
        if (coordinates[i][2]){
            continue;
        }
        if (typeof(max)==="undefined"){
            max = coordinates[i][0];
        }
        max = Math.max(max,coordinates[i][0]);
    }
    return max;
}

function minCoordY(coordinates){
    var min;
    for (var i = 0;i<coordinates.length;++i){
        if (coordinates[i][2]){
            continue;
        }
        if (typeof(min)==="undefined"){
            min = coordinates[i][1];
        }
        min = Math.min(min,coordinates[i][1]);
    }
    return min;
}

function maxCoordY(coordinates){
    var max;
    for (var i = 0;i<coordinates.length;++i){
        if (coordinates[i][2]){
            continue;
        }
        if (typeof(max)==="undefined"){
            max = coordinates[i][1];
        }
        max = Math.max(max,coordinates[i][1]);
    }
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    let coordinates = Array(n);

    for (let coordinatesRowItr = 0; coordinatesRowItr < n; coordinatesRowItr++) {
        coordinates[coordinatesRowItr] = readLine().split(' ').map(coordinatesTemp => parseInt(coordinatesTemp, 10));
    }

    let result = coveringStains(k, coordinates);

    ws.write(result + "\n");

    ws.end();
}