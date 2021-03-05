const wordElement = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notifiction = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["baby", "wolf", "cow", "flower"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ['o','c','w'];
const wrongLetters = [];

function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </span>`
      )
      .join('')}
    `;

    const innerWord = wordElement.innerText.replace(/\n/g, '');
        if(innerWord === selectedWord) {
            finalMessage.innerText = 'Congratulations! You won!';
            popup.style.display = 'flex'
        }
}
displayWord();
