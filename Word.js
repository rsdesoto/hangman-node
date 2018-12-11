// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an
// object representing the current word the user is attempting to guess. That means the constructor should define:

var Lettermod = require("./Letter.js");

var Letter = Lettermod.Letterfunc;

// console.log(Letter);

function Word(inputWord) {
    this.arrRaw = inputWord.split("");
    this.arr = [];
    for (var i = 0; i < this.arrRaw.length; i++) {
        var newLet = new Letter(this.arrRaw[i]);
        this.arr.push(newLet);
    }
    this.displayWord = function() {
        var wordList = "";
        for (var i = 0; i < this.arr.length; i++) {
            // console.log(this.arr[i].display());
            if (i > 0) {
                wordList += " ";
            }
            wordList += this.arr[i].display();
        }
        return wordList;
    };
    this.guessWord = function(char) {
        var correctGuess = false;
        for (var i = 0; i < this.arr.length; i++) {
            var temp = this.arr[i].check(char);
            if (temp === true) {
                correctGuess = true;
            }
        }
        // console.log(correctGuess);
        return correctGuess;
    };
}

var temp = new Word("potato");
console.log(temp);
console.log(temp.guessWord("x"));

module.exports = {
    Wordfunc: Word
};
