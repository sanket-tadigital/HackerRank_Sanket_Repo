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

function main() {
    var q = parseInt(readLine());
    for(var a0 = 0; a0 < q; a0++){
        var n = parseInt(readLine());
        var M = [];
        var contTotals = [];
        var typeTotals = [];
        for(M_i = 0; M_i < n; M_i++){
            contTotals[M_i] = 0;
            typeTotals[M_i] = 0;
           M[M_i] = readLine().split(' ');
           M[M_i] = M[M_i].map(Number);
        }
        
        for (var type_i = 0; type_i < n; type_i++) {
            for (var cont_i = 0; cont_i < n; cont_i++) {
                contTotals[cont_i] += M[cont_i][type_i];
                typeTotals[type_i] += M[cont_i][type_i];
            }
        }
        contTotals.sort();
        typeTotals.sort();
        var failed = false;
        for (var i = 0; i < n; i++) {
            if (contTotals[i] != typeTotals[i]) {
                failed = true;
                break;
            }
        }
        if (failed == false)
            console.log("Possible");
        else
            console.log("Impossible");
    }

}