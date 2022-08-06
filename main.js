const selectBox = document.querySelector('.select-box');
const selectXBtn = document.querySelector('.playerX');
const selectOBtn = document.querySelector('.playerO');
const players = document.querySelector('.players');
const playBoard = document.querySelector('.play-board');
const playArea = document.querySelector('.play-area');
const resultBox = document.querySelector('.result-box');
const wonText = document.querySelector('.won-text');
const replayBtn = document.querySelector('.result-box button');

let turn = 'O';
let playerXIcon = 'fas fa-times';
let playerOIcon = 'far fa-circle';
let rows = [];
let cells = [];
let runComputer = true;

selectXBtn.addEventListener('click', () => {
  selectBox.classList.add('hide');
  playBoard.classList.add('show');
  turn = 'X';
});

selectOBtn.addEventListener('click', () => {
  selectBox.classList.add('hide');
  playBoard.classList.add('show');
  players.classList.add('active');
  turn = 'O';
});

// computer click function
function computerClick() {
  let array = [];
  if (!runComputer) return;
  console.log(turn);
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].childElementCount == 0) {
      array.push(i);
    }
  }
  let randomCell = array[Math.floor(Math.random() * array.length)];
  if (array.length <= 0) return;
  if (turn == 'O') {
    cells[randomCell].innerHTML = `<i class='${playerOIcon}'></i>`;
    cells[randomCell].setAttribute('class', turn);
  } else if (turn == 'X') {
    cells[randomCell].innerHTML = `<i class='${playerXIcon}'></i>`;
    cells[randomCell].setAttribute('class', turn);
  }
  selectWinner();
  cells[randomCell].style.pointerEvents = 'none';
  players.classList.toggle('active');
}

//user click function
function clickedBox(e) {
  console.log(turn);
  if (!runComputer) return;
  if (turn == 'O') {
    e.innerHTML = `<i class='${playerOIcon}'></i>`;
    e.setAttribute('class', turn);
  } else if (turn == 'X') {
    e.innerHTML = `<i class='${playerXIcon}'></i>`;
    e.setAttribute('class', turn);
  }
  selectWinner();
  players.classList.toggle('active');
  e.style.pointerEvents = 'none'; // 다시 선택 nono

  let randomDelayTime = (Math.random() * 1000 + 200).toFixed();
  setTimeout(() => {
    computerClick();
  }, randomDelayTime);
}

function makeBoard() {
  playArea.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const section = document.createElement('section');
    for (let j = 0; j < 3; j++) {
      const span = document.createElement('span');
      span.setAttribute('onclick', 'clickedBox(this)');
      cells.push(span);
      section.append(span);
    }
    rows.push(section);
    playArea.append(section);
  }
}
makeBoard();

function getSign(e) {
  return cells[e - 1].classList.value;
}

function checkSign(val1, val2, val3, sign) {
  if (getSign(val1) == sign && getSign(val2) == sign && getSign(val3) == sign) {
    return true;
  }
}

function selectWinner() {
  if (
    checkSign(1, 2, 3, turn) ||
    checkSign(4, 5, 6, turn) ||
    checkSign(7, 8, 9, turn) ||
    checkSign(1, 4, 7, turn) ||
    checkSign(2, 5, 8, turn) ||
    checkSign(3, 6, 9, turn) ||
    checkSign(1, 5, 9, turn) ||
    checkSign(3, 5, 7, turn)
  ) {
    runComputer = false;
    computerClick(runComputer);
    setTimeout(() => {
      console.log(turn);
      wonText.innerHTML = `Player <p>${turn}</p> won the game!`;
      resultBox.classList.add('show');
      playBoard.classList.remove('show');
    }, 700);
    console.log('win');
    return;
  } else {
    if (
      getSign(1) != '' &&
      getSign(2) != '' &&
      getSign(3) != '' &&
      getSign(4) != '' &&
      getSign(5) != '' &&
      getSign(6) != '' &&
      getSign(7) != '' &&
      getSign(8) != '' &&
      getSign(9) != ''
    ) {
      runComputer = false;
      computerClick(runComputer);
      setTimeout(() => {
        wonText.innerHTML = `Match has been drawn!`;
        resultBox.classList.add('show');
        playBoard.classList.remove('show');
      }, 700);
    }
  }
  console.log(turn);
  turn = turn === 'O' ? 'X' : 'O';
}

replayBtn.addEventListener('click', () => {
  window.location.reload();
});
