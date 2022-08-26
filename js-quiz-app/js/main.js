const startBtn = document.querySelector('.start-btn');
const infoBox = document.querySelector('.info-box');
const exitBtn = document.querySelector('.info-box .quit');
const continueBtn = document.querySelector('.info-box .restart');
const timeText = document.querySelector('.time-text');
const timeCount = document.querySelector('.timer-sec');
const timeLine = document.querySelector('.time-line');
const quizBox = document.querySelector('.quiz-box');
const quizBlock = document.querySelector('.quiz-box section');
const quesCounter = document.querySelector('.total-que');
const nextBtn = document.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const scoreText = document.querySelector('.score-text');
const replayBtn = document.querySelector('.result-box .restart');
const quitQuizBtn = document.querySelector('.result-box .quit');

let shuffled = [];
let quizCount = 0;
let quizNum;
let correct = 0;
let timeLimit = 15;
let time;
let counter;
let counterLine;

function randomQuizNum() {
  const numbers = Array(5)
    .fill()
    .map((el, idx) => idx);
  for (i = questions.length; i > 0; i--) {
    const random = Math.floor(Math.random() * i);
    const spliceArray = numbers.splice(random, 1);
    const value = spliceArray[0];
    shuffled.push(value);
  }
}
randomQuizNum();

function showAnswer(e, correctAnswer) {
  let allOptions = e.parentElement.children.length;
  for (let i = 0; i < allOptions; i++) {
    let answerTag = e.parentElement.children[i];
    if (answerTag.textContent.trim() == correctAnswer) {
      answerTag.classList.add('correct');
      answerTag.insertAdjacentHTML(
        'beforeend',
        `<div class="icon tick"><i class="fas fa-check"></i></div>`
      );
    }
  }
}

function checkAnswer(e) {
  clearInterval(counter);
  let correctAnswer = quizNum.answer;
  if (!e) {
    // 아무 답도 고르지 않으면
    e = quizBlock.children[1].children[0];
    showAnswer(e, correctAnswer);
    quizBlock.style.pointerEvents = 'none';
    nextBtn.style.display = 'block';
    return;
  }
  let userAnswer = e.children[0].innerText;

  if (userAnswer == correctAnswer) {
    correct++;
    e.classList.add('correct');
    e.insertAdjacentHTML(
      'beforeend',
      `<div class="icon tick"><i class="fas fa-check"></i></div>`
    );
  } else {
    e.classList.add('incorrect');
    e.insertAdjacentHTML(
      'beforeend',
      `<div class="icon cross"><i class="fas fa-times"></i></div>`
    );
    showAnswer(e, correctAnswer);
  }
  quizBlock.style.pointerEvents = 'none';
  nextBtn.style.display = 'block';
}

function queCounter() {
  quesCounter.innerHTML = `<span>
                            <p>${quizCount + 1}</p>of
                            <p>${questions.length}</p>Questions
                          </span>`;
}

function showResult() {
  if (correct > 3) {
    scoreText.innerHTML = `<span>and congrats! You got only <p>${correct}</p> out of <p>${questions.length}</p></span>`;
  } else if (correct > 1) {
    scoreText.innerHTML = `<span>and nice, You got only <p>${correct}</p> out of <p>${questions.length}</p></span>`;
  } else {
    scoreText.innerHTML = `<span>and sorry, You got only <p>${correct}</p> out of <p>${questions.length}</p></span>`;
  }
  resultBox.classList.add('active');
  quizBox.classList.remove('active');
}

function showQuizs() {
  if (quizCount >= questions.length) {
    showResult();
    return;
  }
  if (quizCount == questions.length - 1) {
    nextBtn.innerText = 'Result';
  }
  nextBtn.style.display = 'none';
  time = timeLimit;
  timeText.innerText = 'Time Left';
  if (time <= 9) {
    timeCount.innerText = '0' + time;
  } else {
    timeCount.innerText = time;
  }
  timerStart(counter);
  TimerLineStart();
  quizNum = questions[shuffled[quizCount]];
  let quizTag = `<div class="que-text">
                    <span>${quizCount + 1}. ${quizNum.question}</span>
                  </div>
                  <div class="option-list">
                    <div class="option" onclick="checkAnswer(this)">
                      <span>${quizNum.options[0]}</span>
                    </div>
                    <div class="option" onclick="checkAnswer(this)">
                      <span>${quizNum.options[1]}</span>
                    </div>
                    <div class="option" onclick="checkAnswer(this)">
                      <span>${quizNum.options[2]}</span>
                    </div>
                    <div class="option" onclick="checkAnswer(this)">
                      <span>${quizNum.options[3]}</span>
                    </div>
                  </div>
                `;
  quizBlock.innerHTML = quizTag;
  queCounter();
}

function timerStart() {
  counter = setInterval(timer, 1000);
  function timer() {
    time--;
    timeCount.innerText = time;
    if (time <= 9) {
      timeCount.innerText = '0' + timeCount.innerText;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.innerText = '00';
      timeText.innerText = 'Time Off';
      time = timeLimit;
      checkAnswer();
    }
  }
}

function TimerLineStart() {
  counterLine = setInterval(timer, 29);
  function timer() {
    timeLine.style.width = (time / timeLimit) * 100 + '%';
    if (time == 0) {
      clearInterval(counterLine);
    }
  }
}

startBtn.addEventListener('click', () => {
  infoBox.classList.add('active');
  startBtn.classList.add('hide');
});

exitBtn.addEventListener('click', () => {
  startBtn.classList.remove('hide');
  infoBox.classList.remove('active');
});

continueBtn.addEventListener('click', () => {
  quizBox.classList.add('active');
  console.log(quizBox.classList);
  infoBox.classList.remove('active');
  showQuizs();
  TimerLineStart();
});

nextBtn.addEventListener('click', () => {
  quizCount++;
  showQuizs();
  quizBlock.style.pointerEvents = 'auto';
});

replayBtn.addEventListener('click', () => {
  shuffled = [];
  quizCount = 0;
  quizNum;
  correct = 0;
  timeLimit = 15;
  resultBox.classList.remove('active');
  quizBox.classList.add('active');
  randomQuizNum();
  showQuizs();
  TimerLineStart();
});

quitQuizBtn.addEventListener('click', () => {
  window.location.reload();
});
