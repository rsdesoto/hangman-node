// * **Letter.js**: Contains a constructor, Letter. This constructor should be able to either
// display an underlying character or a blank placeholder (such as an underscore), depending on
// whether or not the user has guessed the letter. That means the constructor should define:

//   * A string value to store the underlying character for the letter

//   * A boolean value that stores whether that letter has been guessed yet

//   * A function that returns the underlying character if the letter has been guessed, or a placeholder
//   (like an underscore) if the letter has not been guessed

//   * A function that takes a character as an argument and checks it against the underlying character,
//   updating the stored boolean value to true if it was guessed correctly

function Letter(char) {
    this.str = char;
    this.guessed = false;
    this.display = function() {
        if (this.guessed === false) {
            return "_";
        } else {
            return this.str;
        }
    };
    this.check = function(guesschar) {
        if (guesschar === this.str) {
            this.guessed = true;
        }
    };
}

var g1 = new Letter("a");
console.log(g1);
console.log(g1.display());
g1.check("l");
console.log(g1);
g1.check("a");
console.log(g1);
console.log(g1.display());
