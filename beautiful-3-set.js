function processData(input) {
    //Enter your code here
    var inputLine = input.split("\n");
    for (var l = 0; l < inputLine[l]; l++) {
        var N = parseInt(inputLine[l]);
        var S = [];
        for (var c = 0; c < N; c++) {
            S[c] = [];
            var pairWiseCheck = [[], [], []];
            for (var i = 0; i <= N; i++) {
                pairWiseCheck[0][i] = true;
                pairWiseCheck[1][i] = true;
                pairWiseCheck[2][i] = true;
            }
            var currentT = [0, 1, N - 1];
            for (var i = 0; i <= N; i++)
                for (var j = 0; j <= N; j++) {
                    //if ( i == j )
                    //    continue;
                    //while ( currentT[0] <= N ) {
                    currentT[0] = i;
                    currentT[1] = (j + c) % N;
                    currentT[2] = N - currentT[0] - currentT[1];
                    //console.log("checking "+currentT);
                    //console.log(pairWiseCheck);
                    if (currentT[2] >= 0 && pairWiseCheck[0][currentT[0]] && pairWiseCheck[1][currentT[1]] && pairWiseCheck[2][currentT[2]]) {
                        //console.log("add "+currentT);
                        S[c].push([currentT[0], currentT[1], currentT[2]]);
                        pairWiseCheck[0][currentT[0]] = false;
                        pairWiseCheck[1][currentT[1]] = false;
                        pairWiseCheck[2][currentT[2]] = false;
                        //console.log(currentT);
                    }
                    /*currentT[0]++;
                    currentT[1]++;
                    if ( currentT[0] + currentT[1] > N )
                        currentT[1] = 0;
                    currentT[2] = N-currentT[0]-currentT[1];*/
                }
        }
        var maxIdx = 0;
        for (var c = 0; c < N; c++) {
            if (S[c].length > S[maxIdx].length)
                maxIdx = c;
            //console.log(c+": "+S[c].length);
        }
        console.log(S[maxIdx].length);
        //console.log(S);
        for (var i = 0; i < S[maxIdx].length; i++) {
            console.log(S[maxIdx][i][0] + " " + S[maxIdx][i][1] + " " + S[maxIdx][i][2]);
            //console.log(S[i][1]+" "+S[i][2]+" "+S[i][0]);
            //console.log(S[i][2]+" "+S[i][0]+" "+S[i][1]);
        }
    }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});