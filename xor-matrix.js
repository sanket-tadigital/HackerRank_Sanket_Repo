String.prototype.setCharAt = function(index,chr) {
	if(index > this.length-1) return str;
	return this.substr(0,index) + chr + this.substr(index+1);
}

function xor(a, b) {
    return a^b;
}

function processData(input) {
    var a1 = input.split("\n");
    var a2 = a1[0].split(" ");
    var n = a2[0]*1, m = a2[1];
    var a = [a1[1].split(" ").map(Number),[]];
    var r = '';
    var k = 0;
    while (m != '') {
        var p = 0;
        var t = '';
        for (var i=0;i<m.length;i++) {
            var x = p*10+m.charAt(i)*1;
            p = x%2;
            x = (x-p)/2;
            if (x > 0 || t != '') t += x;
        }
        if (p) r = '1'+r; else if (t != '') r = '0'+r;
        m = t;
        k++;
        if (k > 100) break;
    }
    for (var j=r.length;j>=0;j--) {
        if (r.charAt(j) == '1') {
            for (var i=j+1;i<r.length;i++) {
                r = r.setCharAt(i, '1');
            }
            r = r.setCharAt(j, '0');
            break;
        }        
    }
    var z = 0;
    for (var i=0;i<r.length;i++) {
        var k = r.length-i;
        if (r[i] == '1') {
            var j = 1;
            for (var c=1;c<k;c++) {
                j = (j*2)%n;
            }
            for (var c=0;c<n;c++) {
                var d = (c+j)%n;
                a[1-z][c]=xor(a[z][c],a[z][d]);
            }
            z = 1-z;
        }
    }    
    console.log(a[z].join(' '));
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