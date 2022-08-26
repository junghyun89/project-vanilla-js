const typingInput = document.querySelector('.typing-input');
const inputs = document.querySelector('.inputs');
const hint = document.querySelector('.hint span');
const guessLeft = document.querySelector('.guess-left span');
const wrongLetter = document.querySelector('.wrong-letter span');
const resetBtn = document.querySelector('.reset-btn');

let word;
let corrects = [];
let incorrects = [];
let guesses = 10;

const randomWord = () => {
  guesses = 8;
  corrects = [];
  incorrects = [];
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranObj.word;

  let html = '';
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
    inputs.innerHTML = html;
  }

  hint.innerText = ranObj.hint;
  guessLeft.innerText = guesses;
  wrongLetter.innerText = incorrects;
};
randomWord();

const initInput = (e) => {
  let key = e.target.value;
  e.target.value = '';
  if (
    !key.match(/^[A-Za-z]+$/) ||
    incorrects.includes(` ${key}`) ||
    corrects.includes(key)
  )
    return;
  if (!word.includes(key)) {
    guesses--;
    incorrects.push(` ${key}`);
  }
  for (let i = 0; i < word.length; i++) {
    if (word[i] === key) {
      corrects.push(key);
      inputs.querySelectorAll('input')[i].value = key;
    }
  }
  wrongLetter.innerText = incorrects;
  guessLeft.innerText = guesses;

  setTimeout(() => {
    if (corrects.length === word.length) {
      alert(`Congrats! You found the word ${word.toUpperCase()}`);
      randomWord();
    } else if (guesses <= 0) {
      alert('Game Over!');
      for (let i = 0; i < word.length; i++)
        inputs.querySelectorAll('input')[i].value = word[i];
    }
  }, 500);
};

resetBtn.addEventListener('click', randomWord);
document.addEventListener('keydown', () => typingInput.focus());
inputs.addEventListener('click', () => typingInput.focus());
typingInput.addEventListener('input', initInput);
