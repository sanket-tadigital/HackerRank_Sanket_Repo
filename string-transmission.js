var readLine = (function () {
    let input = "", line = 0;
    process.stdin.resume();
    process.stdin.setEncoding('ascii');  // or 'utf-8'
    process.stdin.on('data', data => { input += data; });
    process.stdin.on('end',    () => {
        input = input.trim().split('\n').map(str => str.trim());
        main();
    });
    return function () { return input[line++]; };
})()

function main() {
    const t = parseInt(readLine());
    for (let i=0; i<t; i++) {
        const nk = readLine().split(' ').map(x => parseInt(x));
        const str = readLine().split('').map(x => parseInt(x));
        console.assert(str.length == nk[0]);
        process.stdout.write(check(str, nk[1])+"\n");
    }
}

function mult(a,b) {  // mult that stays under 48 bits
    return ((a*(b>>16)%1000000007)*65536 + a*(b%65536)) % 1000000007;
}

// return x^-1 mod 1000000007
function inverse(x) {
    var pow = 1000000005;
    var ret = 1;
    while (pow) {
        if (pow % 2)
            ret = mult(ret,x) % 1000000007;
        x = mult(x,x) % 1000000007;
        pow >>= 1;
    }
    return ret;
}

function check(str, k) {
    // inverse of 1,..,1000
    var inv = [];
    for (var i=1;i<=1000; i++) {
        inv[i] = inverse(i);
    }
    // sum nCr for r=0,..,k
    var ncr = [1];
    for (var i=1; i<=k; i++) {
        ncr[i] = mult(ncr[i-1],inv[i]) * (str.length+1-i) % 1000000007;
    }
    var total = ncr.reduce((acc,x) => acc+x) % 1000000007;

    // for each integer divisor of str.length (not self), check for near repeats
    var reps = [0];
    for (var i=1; i<str.length; i++) {
        if (str.length % i == 0) {
            var diff = [1];
            for (var m=0; m<i; m++) {
                var swap = [];
                var pop = 0;  // high bit count (i-spaced comb)
                for (var n=m; n<str.length; n+=i)
                    pop += str[n];
                diff.forEach((x,idx) => { swap[idx+pop] = swap[idx+pop] ? x+swap[idx+pop]%1000000007 : x; })
                pop = str.length/i - pop;   // low bit count (in comb)
                diff.forEach((x,idx) => { swap[idx+pop] = swap[idx+pop] ? x+swap[idx+pop]%1000000007 : x; })
                diff = swap;
            }
            reps[i] = (diff.reduce((acc,x,idx) => ((idx<=k) ? acc+x : acc),0) -
                      reps.reduce((acc,x,idx) => ((i%idx) ? acc : acc+x))) %1000000007
        }
    }
    return (1000000007*reps.length+total-reps.reduce((acc,x)=>acc+x))%1000000007;
}