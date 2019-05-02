'use strict'

function processData(input) {
  var lines = input.split('\n'),
    numTests = Number(lines[0]);

  for (var i = 0; i < numTests; i++) {
    runAlgorithm(lines[2*(i+1)].split(' '));
  }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

function runAlgorithm(buckets) {
  var xor = buckets.map(function (size) {
    return getGrundy(size);
  }).reduce(function (prev, current) {
    return prev ^ current;
  });
  if (xor) {
    console.log('Manasa');
  }
  else {
    console.log('Sandy');
  }
}

function getGrundy(n) {
  var num = 0, i;
  for (i = 0; i < n.length; i++) {
    num = num * 10 + parseInt(n[i]);
    num %= 9;
  }
  return Math.floor(num / 2);
}