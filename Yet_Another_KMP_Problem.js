function processData(input) {
   console.log(mySolution(input.split(' ').map(Number)));
} 

function mySolution(array) {

    var result = '';

    var bestFrequency = 1000000000;
    var bestCharacter = '';
    var bestCharacterIndex = 0;
    var isFirstCharacter = null;
    var totalValidCharacters = 0;

    for (var i = 0; i < array.length; i++) {

        if (array[i] > 0) {
            totalValidCharacters++;
        }

        if (array[i] < bestFrequency && array[i]!=0) {
            bestFrequency = array[i];
            bestCharacter = String.fromCharCode(97 + i);
            bestCharacterIndex = i;
            isFirstCharacter = isFirstCharacter == null ? true : false;
        }
    }

    //console.log('INPUT:::',array);
    //console.log('bestFrequency',bestFrequency,'bestCharacter',bestCharacter,'bestCharacterIndex',bestCharacterIndex,'isFirstCharacter',isFirstCharacter,'totalValidCharacters',totalValidCharacters);

    //trivial cases
    
    if(totalValidCharacters==0){
        return '';
    }
    
    

    if ((bestFrequency == 1 || bestFrequency == 2 || totalValidCharacters==1 ) && isFirstCharacter) {

        result = '';

        for (var i = 0; i < array.length; i++) {

            for (var j = 0; j < array[i]; j++) {
                result += String.fromCharCode(i + 97);
            }

        }

        return result;
    }
    


    if (bestFrequency == 1 && !isFirstCharacter) {

        result = bestCharacter;
        array[bestCharacterIndex]--;

        for (var i = 0; i < array.length; i++) {

            for (var j = 0; j < array[i]; j++) {
                result += String.fromCharCode(i + 97);
            }

        }

        return result;
    }


    if (isFirstCharacter) {

        result = bestCharacter + '' + bestCharacter;

        bestFrequency -= 2;

        var i = bestCharacterIndex + 1;

        for (; i < array.length && array[i] <= 0; i++);

        var adjacentCharacter = String.fromCharCode(97 + i);
        var adjacentCharacterFrequency = array[i];

        //console.log('adjacentCharacter',adjacentCharacter,'adjacentCharacterFrequency',adjacentCharacterFrequency,'index',i)

        while (bestFrequency > 0) {
            result += adjacentCharacter + '' + bestCharacter;
            adjacentCharacterFrequency--;
            bestFrequency--;
        }

        while (adjacentCharacterFrequency > 0) {
            result += adjacentCharacter;
            adjacentCharacterFrequency--;
        }

        array[i] = 0;
        array[bestCharacterIndex] = 0;

        for (var i = 0; i < array.length; i++) {

            for (var j = 0; j < array[i]; j++) {
                result += String.fromCharCode(i + 97);
            }

        }
        return result;


    } else {

        result = bestCharacter;
        array[bestCharacterIndex]--;

        for (var i = 0; i < array.length; i++) {

            for (var j = 0; j < array[i]; j++) {
                result += String.fromCharCode(i + 97);
            }

        }

        return result;
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