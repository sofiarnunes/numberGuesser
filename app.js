/*
RULES:
    - Player must guess a number between a min and max
    - Player gets a certain amount of guesses
    - Notify player of guesses remaining
    - Notify the player of the correct answer if loose
    - Let player choose to play again
*/

// VARIABLES
// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// ui elements
const   gameWrapper = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'),
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

// ASSIGN UI MIN & MAX - dynamic
minNum.textContent = min;
maxNum.textContent = max;

// PLAY AGAIN EVENT LISTENER
gameWrapper.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// LISTEN FOR GUESS
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // validate input
    if(isNaN(guess) || guess > max || guess < min){
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    }

    // check if is winning num
    if(guess === winningNum){
        // Game over - WON
        gameOver(true, `${winningNum} is correct, YOU WON!`);

    } else {
        // wrong number
        guessesLeft -= 1;

        // check if there are guesses left
        if(guessesLeft === 0){
            // game over - LOST
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

        } else {
            // game continues - answer wrong
            // change border color
            guessInput.style.borderColor = 'red';
            // clear input
            guessInput.value = '';
            // guesses left message
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// GAME OVER
function gameOver (won, msg){
    let color;
    won ? color = 'green' : color = 'red';
    // disable input
    guessInput.disabled = true;
    // change border color
    guessInput.style.borderColor = color;
    // set message
    setMessage(msg, color);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
    
}

// GETTING WINNING NUMBER
function getRandomNum(min, max){
    const randomNum = Math.floor(Math.random()*(max - min + 1) + min);
    return randomNum;
}

// SET MESSAGE
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

