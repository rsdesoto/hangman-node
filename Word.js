// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an
// object representing the current word the user is attempting to guess. That means the constructor should define:

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
        for (var i = 0; i < this.arr.length; i++) {
            this.arr[i].check(char);
        }
    };
}

var newWord = new Word("potato");
// newWord.arrUpdate();

console.log(newWord);
console.log(newWord.displayWord());
newWord.guessWord("o");

console.log(newWord);
