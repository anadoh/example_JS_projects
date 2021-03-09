const wordElement = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notifiction = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");




const words = ['dog','cat','bubbles','door']
console.log(words)
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ["o", "c", "w"];
const wrongLetters = [];

function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
            </span>`
      )
      .join("")}
    `;

  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}

function updateWrongLettersElement() {
  //LETTERS
  wrongLettersEl.innerHTML = `
${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
${wrongLetters.map((letter) => `<span>${letter}</span>`)}
`;
  //PARTS
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //LOST GAME
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost.";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notifiction.classList.add("show");

  setTimeout(() => {
    notifiction.classList.remove("show");
  }, 2500);
}

//if letter press
window.addEventListener("keydown", (e) => {
  //console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game
playAgainBtn.addEventListener('click', () => {
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersElement();
  popup.style.display = 'none'
}) 

displayWord();
