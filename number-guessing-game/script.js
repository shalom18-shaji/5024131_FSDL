// Generate random number
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 5;

const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const hintDiv = document.getElementById('hint');
const attemptsDiv = document.getElementById('attempts');

function checkGuess() {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        hintDiv.textContent = 'Please enter a number between 1 and 100.';
        return;
    }
    attempts--;
    attemptsDiv.textContent = `Attempts left: ${attempts}`;
    if (guess === randomNumber) {
        hintDiv.textContent = 'Congratulations! You guessed it right!';
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else if (guess < randomNumber) {
        const diff = randomNumber - guess;
        if (diff <= 10) {
            hintDiv.textContent = 'Too low, but close! Try again.';
        } else {
            hintDiv.textContent = 'Too low! Try again.';
        }
    } else {
        const diff = guess - randomNumber;
        if (diff <= 10) {
            hintDiv.textContent = 'Too high, but close! Try again.';
        } else {
            hintDiv.textContent = 'Too high! Try again.';
        }
    }
    if (attempts === 0 && guess !== randomNumber) {
        hintDiv.textContent = `Game over! The number was ${randomNumber}.`;
        guessButton.disabled = true;
        guessInput.disabled = true;
    }
    guessInput.value = '';
}

guessButton.addEventListener('click', checkGuess);

// To incorporate a loop, we can use a recursive approach, but since it's event-driven, this is fine.
// The loop is implicit in the event handling up to 5 times.