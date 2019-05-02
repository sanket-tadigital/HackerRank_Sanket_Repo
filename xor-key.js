var BITS = 15;
var HI   = 1 << (BITS - 1);
var MASK = 0;
for (var i = 0, j = 1; i < BITS; i++, j *= 2) { MASK |= j; }

function binarySearch(arr, pi, qi, idx0, idx1) {
    var v0 = arr[idx0];
    var v1 = arr[idx1];

    if (pi <= v0 && v0 <= qi) { return idx0; }
    if (pi <= v1 && v1 <= qi) { return idx1; }

    if (qi < v0) { return -1; } // v0 < pi
    if (v1 < pi) { return -1; } // qi < v1

    if (idx1 - idx0 <= 1) { return -1; }

    var idx = idx0 + Math.floor((idx1 - idx0 + 1) / 2);
    if (arr[idx] < pi) { return binarySearch(arr, pi, qi, idx, idx1); }
    if (arr[idx] > qi) { return binarySearch(arr, pi, qi, idx0, idx); }

    return idx;
}


function processData(input) {
    var parse_fun = function (s) { return parseInt(s, 10); };

    var lines = input.split('\n');
    var T = parseInt(lines.shift(), 10);

    for (var t = 0; t < T; t++) {
        var params = (
             lines
            .shift()
            .split(' ')
            .map(parse_fun)
        );
        var N = params[0];
        var Q = params[1];

        var X = (
             lines
            .shift()
            .split(' ')
            .splice(0, N)
            .map(parse_fun)
        );

        var arr = [];
        for (var i = 0; i < N; i++) {
            if (arr[X[i]] === undefined) { arr[X[i]] = []; }
            arr[X[i]].push(i);
        }
        for (var i in arr) {
            arr[i].sort(function (n1, n2) { return n1 - n2; });
        }

        var res = [];
        var queries = lines.splice(0, Q); // lines.shift() was a bottleneck
        for (var i = 0; i < Q; i++) {
            var query = queries[i].split(' ').map(parse_fun);
            var ai = query[0];
            var pi = query[1] - 1; // 0 based idx
            var qi = query[2] - 1;

            // Best result: ai ^ MASK
            var path = ai ^ MASK;

            var val = null;
            for (var mask = 0; mask < MASK; mask++) {
                var idx = (path ^ mask);
                var candidates = arr[idx];
                if (candidates === undefined) { continue; }

                var c = binarySearch(candidates, pi, qi, 0, candidates.length - 1);
                if (c != -1) { val = idx; break; }
            }

            res.push(ai ^ val);
        }
        console.log(res.join('\n'));
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