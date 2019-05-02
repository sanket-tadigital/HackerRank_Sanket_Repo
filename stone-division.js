const Big = require('bignumber.js');
function processData(input) {
    input = input.split('\n');
    let first_line = input[0].split(' ');
    let second_line = input[1].split(' ');
    let n = new Big(first_line[0]);
    let m = first_line[1];
    let S = second_line.map(i=> new Big(i));
    console.log(solve(n, m, S));
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
function solve(n, m, S){
    n = new Big(n);
    m = new Big(m);
    S = S.map(i=> new Big(i));
    if (n.eq(0)) return 'Second';
    if (!S.length) return 'Second';
    if (S.length === 1) {
        let moves = [1];
        let count = 1;
        let temp = S[0];
        while (temp.lt(n)){
            moves.push(temp);
            temp.multiply(S[0]);
        }
        if (count % 2){
            return('First');
        } else {
            return('Second');
        }
        return;
    }
    let won = false;
    let factors = S.filter(s=>{
        if (n.eq(s)) won = true;
        return n.mod(s).isZero();
    });
    factors.filter(s=>{
        if (s.mod(2).isZero()) won = true;
        return false;
    });
    if (won) return ('First');
    let ops = 0;
    let win = false;
    let number = n.trunc();
    let i = 0;
    while (!number.equals(1) && factors[i]){
        if (number.mod(factors[i]).isZero()){
            number = number.div(factors[i]);
            ops += 1;
            win = !win;
        } else {
            i += 1;
        }
    }
    if (win) return 'First';
    return 'Second';
}