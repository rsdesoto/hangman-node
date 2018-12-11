// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

// * Randomly selects a word and uses the `Word` constructor to store it

// * Prompts the user for each guess and keeps track of the user's remaining guesses

var Wordmod = require("./Word.js");
var inquirer = require("inquirer");

var Word = Wordmod.Wordfunc;
guessesLeft = 10;

var wordOptions = [
    "awkward",
    "bagpipes",
    "banjo",
    "bungler",
    "croquet",
    "crypt",
    "fervid",
    "gazebo",
    "haphazard",
    "jukebox"
];

// randomly select a word (in this case it won't be random, but)

// assign to the word constructor
var newWord = new Word(wordOptions[1]);

// tell the player it's game time!
console.log(`\n\n
##########################
WELCOME TO HANGMAN
##########################
\nYour first word:\n`);

// display the word
console.log(newWord.displayWord());
console.log(`\n`);

var guessedLetters = [];

// prompt the user for a guess:
function playGame() {
    inquirer
        .prompt([
            {
                type: "input",
                // Taken from the pizza example from inquirer
                name: "letterGuess",
                message: "Guess a letter",
                validate: function(value) {
                    if (
                        value.length === 1 &&
                        value.match(/[A-Za-z]/i) &&
                        guessedLetters.indexOf(value) < 0
                    ) {
                        console.log(value);
                        return true;
                    } else {
                        return "Please enter a single character that hasn't already been guessed!";
                    }
                }
            }
        ])
        .then(function(answers) {
            console.log(answers);
            var answer = answers.letterGuess.toLowerCase();
            guessedLetters.push(answer);
            var correctorno = newWord.guessWord(answer);
            console.log(correctorno);

            if (correctorno) {
                console.log("Good job!");
            } else {
                console.log("Too bad!");
                guessesLeft--;
            }

            if (checkWin()) {
                console.log("You won!");
            } else if (guessesLeft > 0) {
                console.log(`${guessesLeft} guesses remaining!`);
                console.log(newWord.displayWord());
                console.log(`You have guessed: "${guessedLetters}"`);
                playGame();
            } else {
                console.log(newWord);
                console.log("Game over!");
            }
            // console.log(newWord);
        });
}

playGame();

// using that guess, check against the word

// if right, hurrah! the number of guesses stays the same

// if wrong, decrease the number of guesses remaining

// if guesses = 0, end the game. offer for new game or quit

// check for win condition each time

// var newWord = new Word("pizza");
// // newWord.arrUpdate();

// console.log(newWord);
// console.log(newWord.displayWord());
// newWord.guessWord("o");

// console.log(newWord);
function checkWin() {
    var isDone = true;
    for (var i = 0; i < newWord.arr.length; i++) {
        if (!newWord.arr[i].guessed) {
            isDone = false;
        }
    }
    return isDone;
}
