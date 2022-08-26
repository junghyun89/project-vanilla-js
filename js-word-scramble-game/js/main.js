const wordTag = document.querySelector('.word');
const hintTag = document.querySelector('.hint');
const timeTag = document.querySelector('.time b');
const input = document.querySelector('input');
const refreshBtn = document.querySelector('.refresh-word');
const checkBtn = document.querySelector('.check-word');

let correctWord;
let timer;

function initTimer(maxTime) {
  clearInterval(timer);
  timeTag.innerText = maxTime;
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeTag.innerText = maxTime);
    }
    clearInterval(timer);
    alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
    initGame();
  }, 1000);
}

function display(word, hint) {
  input.value = '';
  input.focus();
  input.setAttribute('maxlength', correctWord.length);
  wordTag.innerText = word;
  hintTag.innerText = hint;
}

function scrambleWord(word, hint) {
  const wordArray = word.split('');
  for (let i = 0; i < wordArray.length; i++) {
    let randomNum = Math.floor(Math.random() * (i + 1));
    // let temp = wordArray[i];
    // wordArray[i] = wordArray[j];
    // wordArray[j] = temp 줄여서 아래로
    [wordArray[i], wordArray[randomNum]] = [wordArray[randomNum], wordArray[i]];
  }
  const scrambledWord = wordArray.join('');
  display(scrambledWord, hint);
}

function getRandomWord() {
  const randomNum = Math.floor(Math.random() * words.length);
  const selectedWord = words[randomNum].word;
  const selectedHint = words[randomNum].hint;
  correctWord = selectedWord.toLowerCase();
  scrambleWord(selectedWord, selectedHint);
}

function initGame() {
  initTimer(20);
  getRandomWord();
}
initGame();

function checkUserAnswer() {
  const userAnswer = input.value.toLowerCase();

  if (userAnswer !== correctWord) {
    alert(`Oops! ${userAnswer} is not a correct word`);
    input.value = '';
    input.focus();
    return;
  }
  alert(`Congrats! ${userAnswer.toUpperCase()} is a correct word`);
  initGame();
}

input.addEventListener('input', () => {
  input.value
    ? checkBtn.classList.add('active')
    : checkBtn.classList.remove('active');
});

refreshBtn.addEventListener('click', initGame);

checkBtn.addEventListener('click', checkUserAnswer);
