function xorSum(ar) {
  var orNum = 0;
  var sum;
  var mod = Math.pow(10, 9) + 7;
  
  for (var i = 0; i < ar.length; i++) {
    orNum |= ar[i];
  }
  
  sum = (orNum * 2) % mod;
  for (var i = 0; i < ar.length - 2; i++) {
    sum = (sum * 2) % mod;
  }
 
  return sum;
}

function processData(input) {
  var data = input.split('\n');
  var n = +data[0];
  for (var i = 0; i < n; i++) {
    var ar = data[i*2 + 2].split(' ').map(function(x) { return +x; });
    console.log(xorSum(ar));
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