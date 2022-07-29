const typingText = document.querySelector('.typing-text p');
const inputField = document.querySelector('.input-field');
const timeTag = document.querySelector('.time span b');
const mistakeTag = document.querySelector('.mistake span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const tryAgainBtn = document.querySelector('.content button');

let timer;
let maxTime = 10;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function randomParagraph() {
  let randomIndex = Math.floor(Math.random() * paragraphs.length);
  paragraphs[randomIndex].split('').forEach((letter) => {
    let spanTag = `<span>${letter}</span>`;
    typingText.innerHTML += spanTag;
    typingText.querySelectorAll('span')[0].classList.add('active');
  });
}

document.addEventListener('keydown', (e) => {
  inputField.focus();
});

typingText.addEventListener('click', () => {
  inputField.focus();
});

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}

function CompareChar() {
  let characters = typingText.querySelectorAll('span');
  let typedChar = inputField.value.split('')[charIndex];

  if (charIndex >= characters.length - 1 || timeLeft <= 0) {
    inputField.value = '';
    clearInterval(timer);
    return;
  }
  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  if (typedChar == null) {
    if (charIndex > 0) {
      charIndex--;
      if (characters[charIndex].classList.contains('incorrect')) {
        mistakes--;
      }
      characters[charIndex].classList.remove('correct', 'incorrect');
    }
  } else {
    if (characters[charIndex].innerText == typedChar) {
      characters[charIndex].classList.add('correct');
    } else {
      characters[charIndex].classList.add('incorrect');
      mistakes++;
    }
    charIndex++;
  }
  characters.forEach((span) => span.classList.remove('active'));
  characters[charIndex].classList.add('active');

  let wpm = Math.round(
    // 5개 span을 한 단어로 가정
    ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
  );
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  wpmTag.innerText = wpm;
  mistakeTag.innerText = mistakes;
  cpmTag.innerText = charIndex - mistakes;
}

function startGame() {
  clearInterval(timer);
  typingText.innerHTML = '';
  inputField.value = '';
  timeLeft = maxTime;
  timeTag.innerText = maxTime;
  charIndex = 0;
  mistakes = 0;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
  isTyping = false;
  randomParagraph();
}
startGame();

inputField.addEventListener('input', CompareChar);

tryAgainBtn.addEventListener('click', startGame);
