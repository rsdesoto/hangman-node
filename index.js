//////////////////////////////////////////////////////////////////////////////////////////////////
/////////// REQUIRED PACKAGES AND MODULES ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

var wordMod = require("./Word.js");
var artMod = require("./images.js");
var inquirer = require("inquirer");
var Word = wordMod.Wordfunc;
var printArt = artMod.printArtFunc;

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////// INITIALIZE VARIABLES /////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

var guessedLetters;
var guessesLeft;
var newWord;

var wordOptions = [
    "buckaroo",
    "cowpuncher",
    "rustler",
    "above snakes",
    "make tracks",
    "spurs",
    "vaquero",
    "greenhorn",
    "jingle bobs",
    "running iron",
    "stampede string"
];

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////// HELPER FUNCTIONS /////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a random number between max and min numbers
 * @param {int} max
 * @param {int} min
 */
function randomNum(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Print the welcome screen to the game
 */
function printStart() {
    console.log(`\n\n
##################
WELCOME TO HANGMAN
##################
\n`);
    printArt(artMod.bootart);

    console.log(
        "Saddle up, partner! Are your spurs sharp enough to solve my puzzles?"
    );
}

/**
 * Print win condition!
 */
function printWin() {
    console.log(newWord.displayWord());
    printArt(artMod.hatart);
    console.log("Well alright, there -- I suppose you've beaten my boots!");
}

/**
 * Print lose condition :c
 */
function printLose() {
    console.log(`The answer was:
${newWord.arrRawDisp()}`);
    printArt(artMod.skullart);
    console.log(
        "Shucks, greenhorn! I thought you were supposed to be a problem solver!"
    );
}

/**
 * Sets the word that will be guessed, sets the number of guesses, clears out the letters guessed array, and then
 * prep to run playGame()
 */
function initializeGame() {
    var i = randomNum(wordOptions.length - 1, 0);
    newWord = new Word(wordOptions[i]);

    guessesLeft = 10;
    guessedLetters = [];

    printStart();

    console.log("Your word is: ");

    console.log(newWord.displayWord());
    console.log(`\n`);

    playGame();
}

/**
 * Pass the guessed letter into the function guessWord(); if the answer is true, tell the player they've
 * guessed correctly. Otherwise, tell them they guessed wrong and decreate the number of guesses
 * @param {str} answer
 */
function checkLetter(answer) {
    console.log(`You guessed ${answer}! \n`);

    var correctorno = newWord.guessWord(answer);

    if (correctorno) {
        console.log("################\nCorrect! Yeehaw!\n################\n");
    } else {
        console.log(
            "##################\nIncorrect! Shucks!\n##################\n"
        );
        guessesLeft--;
    }
}

/**
 * Go through all letters of the word.
 * If all letters have been guessed (guessed = true for all), the game has been won.
 * If any letters have not been guessed (guessed = false), the word has not been guessed.
 * If guesses left are 0, the game is over and the user lost. Otherwise, keep playing.
 */
function checkWin() {
    var isDone = true;
    for (var i = 0; i < newWord.arr.length; i++) {
        if (!newWord.arr[i].guessed) {
            isDone = false;
        }
    }

    if (isDone) {
        printWin();
        playAgain();
    } else if (guessesLeft > 0) {
        console.log(`${guessesLeft} guesses remaining!`);
        console.log(newWord.displayWord());
        console.log(`You have guessed: "${guessedLetters}"\n`);
        playGame();
    } else {
        printLose();
        playAgain();
    }
}

/**
 * Prompt the user to either play again or quit. Include something to check to make sure the player entered either Y or
 * N and do not let them continue until they have.
 */
function playAgain() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "playagain",
                message: "Play again? y/n"
            }
        ])
        .then(function(answers) {
            if (answers.playagain.toLowerCase() === "y") {
                initializeGame();
            } else if (answers.playagain.toLowerCase() === "n") {
                console.log("See ya!");
            } else {
                console.log("Yes or No, partner? (y/n)");
                playAgain();
            }
        });
}

/**
 * Creates an inquirer prompt to get the player to guess a letter.
 */
function playGame() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "letterGuess",
                message: "Guess a letter",
                validate: function(value) {
                    if (
                        value.length === 1 &&
                        value.match(/[A-Za-z]/i) &&
                        guessedLetters.indexOf(value.toLowerCase()) < 0
                    ) {
                        return true;
                    } else {
                        return "Please enter a single character that hasn't already been guessed!";
                    }
                }
            }
        ])
        .then(function(answers) {
            var answer = answers.letterGuess.toLowerCase();
            guessedLetters.push(answer);
            checkLetter(answer);
            checkWin();
        });
}

initializeGame();
