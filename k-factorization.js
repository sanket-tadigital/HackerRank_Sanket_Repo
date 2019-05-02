function processData(input) {
    input = input.split('\n');
    let [N,_] = input[0].split(' ').map(Number);
    input.shift();
    let numbers = input[0].split(' ').map(Number);
    numbers = numbers.sort((x,y)=>(y-x));
    let factors = [];
    for(let i = 0; i < numbers.length; i++) {
        let factor = numbers[i];
        if(N%factor == 0) {
            if(numbers.indexOf(factor)!=-1) {
                factors.push(factor);
                N/=factor;
                i = 0;
                continue;
            }
        }
    }
    factors = factors.reverse();
    let steps = "";
    if(factors.length === 0 || N !== 1) console.log(-1);
    else {
        let product = 1;
        for(let j = 0; j < factors.length; j++) {
            steps += `${product} `;
            product *= factors[j];
        }
        console.log(`${steps}${product}`);
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