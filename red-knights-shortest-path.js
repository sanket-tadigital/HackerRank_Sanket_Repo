process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function printShortestPath(n, i_start, j_start, i_end, j_end) {
    //  Print the distance along with the sequence of moves.
    
    var rows_away = Math.abs(i_end - i_start);
    var columns_away = Math.abs(j_end - j_start);
    
    // if the columns are off by one, impossible
    if (rows_away % 2 == 1) {
        
        process.stdout.write("Impossible\n");
        return;
    }
    
    // if you are two up/down hops away, must be on same parity column
    if (rows_away % 4 == 0 && columns_away % 2 == 1) {
        
        process.stdout.write("Impossible\n");
        return;
    }
    
    if (rows_away % 4 == 2 && columns_away %2 == 0) {
        
        process.stdout.write("Impossible\n");
        return;
    }
    
    if (j_end >= n || i_end >= n || j_end < 0 || i_end < 0) {
        process.stdout.write("Impossible\n");
        return;
    }
    
    var i_cur = i_start;
    var j_cur = j_start;
    var moves = [];
    
    while(i_cur !== i_end || j_cur !== j_end) {
        
        if (j_cur > j_end) {
            // Hop left, and maybe up or down
            
            if (i_cur > i_end) {
                moves.push('UL');
                i_cur -= 2;
                j_cur -= 1;
            } else if (i_cur < i_end) {
                
                // Hold on... are we going to hit our column and need to LR later?
                if ((i_end - i_cur) > 2 * (j_cur - j_end)) {
                    moves.push('LR');
                    i_cur += 2;
                    j_cur += 1;
                } else {
                    moves.push('LL');
                    i_cur += 2;
                    j_cur -= 1;
                }
            } else {
                moves.push('L');
                j_cur -= 2;
            }
        } else if (j_cur < j_end) {
            // Hop right, and maybe up or down
            
            if (i_cur > i_end) {
                
                // Hold on... are we going to get there too fast and need to UL later?
                
                if ((i_cur - i_end) > 2 * (j_end - j_cur)) {
                    moves.push('UL');
                    i_cur -= 2;
                    j_cur -= 1;
                } else {
                    moves.push('UR');
                    i_cur -= 2;
                    j_cur += 1;
                }
                
            } else if (i_cur < i_end) {
                
                // If you will have to jump right eventually, better now.
                if (2 * (j_end - j_cur) > (i_end - i_cur)) {
                    moves.push('R');
                    j_cur += 2;
                } else {
                    moves.push('LR');
                    i_cur += 2;
                    j_cur += 1;
                }
            } else {
                moves.push('R');
                j_cur += 2;
            }
        } else { // On the same column as target
        
            if (i_cur > i_end) {
                // Hop up, prioritize left
                if (j_cur > 0) {
                    moves.push('UL');
                    i_cur -= 2;
                    j_cur -= 1;
                } else {
                    moves.push('UR');
                    i_cur -= 2;
                    j_cur += 1;
                }
            } else {
                // Hop down, prioritize right
                if (j_cur < n-1) {
                    moves.push('LR');
                    i_cur += 2;
                    j_cur += 1;
                } else {
                    moves.push('LL');
                    i_cur += 2;
                    j_cur -= 1;
                }
            }
        }
    }
    
    const move_string = moves.join(' ');
    process.stdout.write("" + moves.length + "\n");
    process.stdout.write(move_string + "\n");
}

function main() {
    var n = parseInt(readLine());
    var i_start_temp = readLine().split(' ');
    var i_start = parseInt(i_start_temp[0]);
    var j_start = parseInt(i_start_temp[1]);
    var i_end = parseInt(i_start_temp[2]);
    var j_end = parseInt(i_start_temp[3]);
    printShortestPath(n, i_start, j_start, i_end, j_end);

}