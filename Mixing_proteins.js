function processData(input) {
    var translation = {'A': 0, 'B': 1, 'C': 2, 'D': 3};
    var translation2 = {'0': 'A', '1': 'B', '2': 'C', '3': 'D'};
    var n = input.split(' ')[0];
    var k = input.split(' ')[1].split('\n')[0];
    var sequence = input.split(' ')[1].split('\n')[1];
    var translatedString = '';
	var result = '';
	for (var i = 0; i < sequence.length; i++) {
		translatedString += translation[sequence[i]];
	}
	while (k > 0) {
		var powerNumber = Math.pow(2, Math.floor(Math.log(k) / Math.log(2)));
		var indexShift = powerNumber % n;
		var newSequence = '';
		for (var j = 0; j < translatedString.length; j++) {
			if (j + indexShift >= translatedString.length) {
				var shiftBy = j + indexShift - n;
				newSequence += translatedString[j] ^ translatedString[shiftBy];
			} else {
				newSequence += translatedString[j] ^ translatedString[j + indexShift];	
			}
		}
		k -= powerNumber;
		translatedString = newSequence;
	}
	for (var k = 0; k < translatedString.length; k++) {
		result += translation2[translatedString[k]];
	}
	return result;
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   var res = processData(_input);
    process.stdout.write(res);
});