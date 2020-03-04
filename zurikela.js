var k = 1;
var m1 = 0, m2 = 0;
var v = [];
var u = {};
    
function op1(x) {
    v[k] = x;
    k++;
}

function op2(x, y) {
    if (!u[x]) u[x] = [];
    if (!u[y]) u[y] = [];
    u[x].push(y);
    u[y].push(x);
}

var was = {};
var all = {};
var ind = {};

function solve(x) {
    was[x] = 1;
    all[x] = 1;
    var y;
    for (var xx in was) if (u[xx]) {
        for (var i=0;i<u[xx].length;i++) {
            if (!was[u[xx][i]]) {
                y = u[xx][i];
                break;
            }
        }
        if (y) break;
    }
    var max = 0;
    for (var j=0;j<2;j++) {
        ind[x] = j;
        var ok = 1;
        if (j == 1 && u[x]) {
            for (var i=0;i<u[x].length;i++) {
                if (ind[u[x][i]]) {
                    ok = 0;
                    break;
                }
            }            
        }
        if (ok) {
            var curr = j*v[x];
            if (y) {
                curr += solve(y);
            }
            if (curr > max) max = curr;
        }
    }
    // console.log(was, ind, x, max);
    delete ind[x];
    delete was[x];
    return max;    
}

function op3(x) {
    was = {};
    all = {};
    // console.log(v, u);
    var n = solve(x);
    for (var i in all) {
        delete v[i];
        delete u[i];
    }
    v[k] = n;
    // console.log(v, u, all);
    k++; 
}

function op4() {
    was = {};
    all = {};
    var n = 0;
    for (var i=1;i<=k;i++) {
        if (v[i] && !all[i]) {
          n += solve(i);
        }
    }
    console.log(n);
}



function processData(input) {
    //Enter your code here
    var a = input.split(/\n/);
    var q = Number(a[0]);
    for (var i=1;i<=q;i++) {
        var b = a[i].split(' ');
        if (b[0] == 'A') op1(Number(b[1]));
        if (b[0] == 'B') op2(Number(b[1]), Number(b[2]));
        if (b[0] == 'C') op3(Number(b[1]));
    }
    op4();
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