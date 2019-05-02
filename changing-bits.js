var SZ = 29;
var MASK = 0;
for (var i = 0, j = 1; i < SZ; i++, j*=2) {
    MASK |= j;
}
var REM_MASK = 1 << SZ; // MASK + 1


var parse_fun = function (s) { return parseInt(s, 10); };


function Dirty() {
    this.lo = null;
    this.hi = null;
}


Dirty.prototype.isDirty = function () {
    if (this.lo == null || this.hi == null);
}

Dirty.prototype.resetDirty = function () {
    this.lo = this.hi = null;
}

Dirty.prototype.set = function (idx) {
    if (this.lo == null && this.hi == null) {
        this.lo = this.hi = idx;
    } else if (idx > this.hi) {
        this.hi = idx;
    } else if (idx < this.lo) {
        this.lo = idx;
    } else {}
}

var dirty = new Dirty();


function ChangeBit(s) {
    if (typeof(s) == 'string') {
        this.N = s.length;
        this.len = Math.floor((s.length) / SZ) + 1;
        this.arr = new Array(this.len);
        for (var i = 0; i < this.len; i++) { this.arr[i] = 0; }

        for (var i = s.length - SZ, j = this.len - 1; true; ) {
            if (i >= 0) {
                this.arr[j] = parseInt(s.substr(i, SZ), 2);
            } else {
                this.arr[j] = parseInt(s.substr(0, i + SZ), 2);
                break;
            }
            i -= SZ;
            j--;
        }
    } else {
        this.N = s;
        this.len = Math.floor(s / SZ) + 1;
        this.arr = new Array(this.len);
        for (var i = 0; i < this.len; i++) { this.arr[i] = 0; }
        this.carries = new Array(this.len);
        for (var i = 0; i < this.len; i++) { this.carries[i] = 0; }
    }
}


ChangeBit.prototype.set = function (bit, val) {
    var idx = this.len - 1 - Math.floor(bit / SZ);

    var mask = 1 << (bit % SZ);
    if (val == 1) {
        this.arr[idx] |= mask;
    } else {
        this.arr[idx] &= (mask ^ MASK);
    }

    dirty.set(idx);
}


ChangeBit.prototype.get = function (bit) {
    var idx = this.len - 1 - Math.floor(bit / SZ);
    if (idx < 0) { return 0; }

    var mask = 1 << (bit % SZ);
    return ((this.arr[idx] & mask) == 0) ? 0 : 1;
}


ChangeBit.prototype.add = function () {
    if (this.A === undefined || this.B === undefined) { return; }

    var i = dirty.hi;
    var carry = (i < this.len - 1) ? this.carries[i + 1] : 0;

    while ((i >= dirty.lo) || (carry == 1 && i >= 0)) {
        this.arr[i] = this.A.arr[i] + this.B.arr[i] + carry;
        if (i > 0) {
            carry = ((this.arr[i] & REM_MASK) == 0) ? 0 : 1;
        } else {
            var carryBit = (this.N % SZ) + ((this % SZ == 0) ? SZ : 0);
            carry = (this.arr[i] & (1 << carryBit)) ? 1 : 0;
            this.arr[i] &= (MASK ^ (1 << carryBit));
        }
        this.carries[i] = carry;
        this.arr[i] &= MASK;
        i--;
    }
}


ChangeBit.prototype.get_c = function (bit) {
    if (this.A === undefined || this.B === undefined) { return -1; }
    var idx = this.len - 1 - Math.floor(bit / SZ);

    if (dirty.isDirty() || idx <= dirty.hi) {
        this.add();
        dirty.resetDirty();
    }

    return (bit == this.N) ? this.carries[0] : this.get(bit);
}


function processData(input) {
    var lines = input.split('\n');
    var params = (
         lines
        .shift()
        .split(' ')
        .map(parse_fun)
    );
    var N = params[0];
    var Q = params[1];

    var aStr = lines.shift().substr(0, N);
    var bStr = lines.shift().substr(0, N);

    var A = new ChangeBit(aStr);
    var B = new ChangeBit(bStr);

    var C = new ChangeBit(N);
    C.A = A;
    C.B = B;
    dirty.lo = 0;
    dirty.hi = C.len - 1;
    C.add();

    var res = [];
    for (var q = 0; q < Q; q++) {
        var params = lines[q].split(' ');
        var op = params[0];

        if (op == 'set_a') {
            var bit = parseInt(params[1], 10);
            var val = parseInt(params[2], 10);
            A.set(bit, val);
        } else if (op == 'set_b') {
            var bit = parseInt(params[1], 10);
            var val = parseInt(params[2], 10);
            B.set(bit, val);
        } else if (op == 'get_c') {
            var bit = parseInt(params[1], 10);
            var c = C.get_c(bit);
            res.push(c);
        }
    }

    console.log(res.join(''));
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