// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

// * Randomly selects a word and uses the `Word` constructor to store it

// * Prompts the user for each guess and keeps track of the user's remaining guesses

var Wordmod = require("./Word.js");
var inquirer = require("inquirer");

var Word = Wordmod.Wordfunc;

var guessedLetters;

var guessesLeft;
var newWord;

// https://www.asciiart.eu/clothing-and-accessories/footwear
var bootart = `
    ._......     
    |X/.*| |     
    |X/+ | |     
    |X/* | |     
____/     ; ;       
\\_____/|_/_/
`;

var hatart = `
     .~~~~ \\~~\\
     ;       ~~ \\
     |           ;
 ,--------,______|---.
/          \\-----'    \\  
\\.__________\\-_______-'
`;
// note: there is velcro on the inside of this hat.

var skullart = `
  _____
 /#####\\
| () () |
 \\  ^  /
  |||||
  |||||
`;

// http://www.asciiworld.com/-Death-Co-.html

console.log(bootart);

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

function randomNum(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function initializeGame() {
    var i = randomNum(wordOptions.length - 1, 0);
    newWord = new Word(wordOptions[i]);

    guessesLeft = 1;
    guessedLetters = [];

    printStart();

    console.log("Your word is: ");
    // display the word
    console.log(newWord.displayWord());
    console.log(`\n`);

    playGame();
}

function printStart() {
    console.log(`\n\n
##########################
WELCOME TO HANGMAN
##########################
\n`);

    console.log(bootart);

    console.log(
        "Saddle up, partner! Are your spurs sharp enough to solve my puzzles?"
    );
}

// https://www.asciiart.eu/clothing-and-accessories/hats
// mild editing to take backticks

function printWin() {
    console.log(hatart);
}

function printLose() {
    console.log(skullart);
}

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
            var correctorno = newWord.guessWord(answer);

            console.log(`You guessed ${answer}!`);

            if (correctorno) {
                console.log("Good job!");
            } else {
                console.log("Too bad!");
                guessesLeft--;
            }

            if (checkWin()) {
                console.log(newWord.displayWord());
                printWin();

                console.log(
                    "Well alright, there -- I suppose you've beaten my boots!"
                );
                playAgain();
            } else if (guessesLeft > 0) {
                console.log(`${guessesLeft} guesses remaining!`);
                console.log(newWord.displayWord());
                console.log(`You have guessed: "${guessedLetters}"`);
                playGame();
            } else {
                console.log(
                    "Shucks, partner! I thought you were supposed to be a problem solver!"
                );
                printLose();
                playAgain();
            }
        });
}

function checkWin() {
    var isDone = true;
    for (var i = 0; i < newWord.arr.length; i++) {
        if (!newWord.arr[i].guessed) {
            isDone = false;
        }
    }
    return isDone;
}

function playAgain() {
    inquirer
        .prompt([
            {
                type: "input",
                // Taken from the pizza example from inquirer
                name: "playagain",
                message: "Play again? y/n"
            }
        ])
        .then(function(answers) {
            // console.log(answers);
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

initializeGame();
