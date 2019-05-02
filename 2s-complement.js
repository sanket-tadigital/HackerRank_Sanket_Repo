// number of 1 between 0 and 2^n - 1
function countToOrder(n) {
    if (n == 0) { return 0; }
    return (1 << (n - 1)) + 2 * countToOrder(n - 1);
}

// number of 1 between 0 and n (n >= 0)
function countZeroToN(n) {
    if (n == 0) { return 0; }
    if (n == 1) { return 1; }

    var res = 0;
    var order = Math.ceil(Math.log(n) / Math.log(2)); // 30
    for (var i = order; i >= 0; i--) {
        var bit = 1 << i;
        // process.stdout.write('-- ' +i + ' ' + n + ' ' + bit + ' ' + (n & bit) + '\n');
        if ((n & bit) != 0) {
            res = countToOrder(i) + (n - bit + 1) + countZeroToN(n - bit);
            break;
        }
    }

    return res;
}

// number of 1 between n1 and n2 inclusive
function countBetween(n1, n2) {
    if (n1 > n2) { return countBetween(n2, n1); }

    if (n1 == 0) {
        return countZeroToN(n2);
    }

    if (n2 == -1) {
        return (
              (n2 - n1 + 1)
            + countBetween(
                  n1 + (1 << 30) + (1 << 30)
                , n2 + (1 << 30) + (1 << 30)
            )
        );
    }

    var res = 0;

    if (n1 > 0) {
        res += -countBetween(0, n1 - 1);
    } else {
        res += countBetween(n1, -1);
    }

    if (n2 < -1) {
        res += -countBetween(n2 + 1, -1);
    } else {
        res += countBetween(0, n2);
    }

    return res;
}


function processData(input) {
    var lines = input.split('\n');
    var T = parseInt(lines.shift(), 10);
    
    for (var i = 0; i < T; i++) {
        var data = lines.shift().split(' ').map(function (s) { return parseInt(s, 10) });
        var A = data[0];
        var B = data[1];

        process.stdout.write(countBetween(A, B) + '\n');
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