function largestElement(map) {
    var max = 0;
    for (var key in map) {
        if (map[key] > max) {
            max = map[key]
        }
    }
    return max;
}

function processData(input) {
    input = input.split('\n');
    var n = +input.shift();
    var arr = input.shift()
                .split(' ')
                .map(Number)
                .sort((x, y) => x - y);
    
    var k = -1;
    for (var i = 31; i > 0; i--) {
        var map = {};
        arr.forEach(x => map[x >> i] = (map[x >> i] || 0) + 1);
        
        if (largestElement(map) <= Math.floor(n / 2)) {
            k = i;
            break;
        }
    }
    console.log(k);
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