function make_array(n,s,k) {
    if (k < 0) {
        return false;
    }
    if (s < 0) {
        return false;
    }
    if (n == 1) {
        if (k == 0) {
            return [s];
        } else {
            return false;
        }
    }
    // find the min and max starting values we could use
    // we have to leave enough that we can consume k
    // k <= (n-1)*(s-a*n)
    // k <= ns-s-ann+an
    // k - ns + s <= -an(n-1)
    // s(n-1) - k >= an(n-1)
    // a <= ( s(n-1) - k ) / ( n(n-1) )
    // we have to leave a non-negative s
    // a*n <= s
    // a <= s/n
    // We have to take enough that k is non negative
    // k >= s - an 
    // an >= s-k
    // a >= (s-k)/n
    let a = 0;
    if (s > k) {
        a = Math.ceil( (s-k)/n );
    }
    //console.error('sub',n,s,k,a);
    while ( ((a*n) <= s) && ((a*n*(n-1)) <= ( (s*(n-1)) - k )) ) {
        let s1 = s - (n*a);
        let k1 = k - s1;
        let sub = make_array(n-1,s1,k1);
        if (sub) {
            //we got one!
            return [a].concat( sub.map( x=> x+a) );
        }
        a++;
    }
    return false;
}

function processData(input) {
    //Enter your code here
    var lines = input.split('\n');
    var q = Number(lines.shift());
    for (var i=0; i<q; i++) {
        var [n,s,k] = lines.shift().split(' ').map(Number);
        //console.error(n,s,k);
        var arr = make_array(n,s,k);
        if (arr) {
            console.log(arr.join(' '));
        } else {
            console.log('-1');
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