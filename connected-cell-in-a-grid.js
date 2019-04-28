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


function findLargestRegion(grid = [], row, col) {
    var len = grid.length;
    var rows = len;
    var cols = grid[0].length;
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid == null || grid[row][col] == 0) {
        return 0;
    }

    grid[row][col] = 0; 
    var size = 1;      
    for (var r = row - 1; r <= row + 1; r++) {
        for (var c = col - 1; c <= col + 1; c++) {
            size += findLargestRegion(grid, r, c);
        }
    }

    return size;
}

// Complete the connectedCell function below.
function connectedCell(grid) {
    var len = grid.length;
    var rows = len;
    var cols = grid[0].length;
    //console.log(matrix[0][0]);
    var maxRegion = 0;

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[row][col] == 1) {
                var size = findLargestRegion(grid, i, j);
                maxRegion = Math.max(maxRegion, size);
            }
        }
    }
    return maxRegion;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let matrix = Array(n);

    for (let i = 0; i < n; i++) {
        matrix[i] = readLine().split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    let result = connectedCell(matrix);

    ws.write(result + "\n");

    ws.end();
}
