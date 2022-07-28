const cardBox = document.querySelector('.cards');
const cards = document.querySelector('.card');

let shuffledNum = [];
let number = Array(8)
  .fill()
  .map((arr, i) => {
    return i + 1;
  });
let numberCopy = number.concat(number);
let clicked = [];
let clickable = false;
let matchedCard = 0;

function shuffleNum() {
  for (let i = 0; numberCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * numberCopy.length);
    shuffledNum = shuffledNum.concat(numberCopy.splice(randomIndex, 1));
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == number.length) {
      setTimeout(() => {
        alert('끝!');
        resetGame();
      }, 500);
      return;
    }

    clicked[0].removeEventListener('click', clickCard);
    clicked[1].removeEventListener('click', clickCard);
    clickable = true;
    clicked = [];
    return;
  }
  setTimeout(() => {
    clicked[0].classList.add('shake');
    clicked[1].classList.add('shake');
    clickable = false;
  }, 400);
  setTimeout(() => {
    clicked[0].classList.remove('shake', 'flip');
    clicked[1].classList.remove('shake', 'flip');
    clicked = [];
    clickable = true;
  }, 800);
}

function clickCard() {
  if (!clickable || clicked[0] === this) {
    return;
  }
  this.classList.toggle('flip');
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }

  let cardOneImg = clicked[0].querySelector('img').src;
  let cardTwoImg = clicked[1].querySelector('img').src;
  matchCards(cardOneImg, cardTwoImg);
}

function createCard(i) {
  const card = document.createElement('li');
  card.className = 'card';
  const cardFront = document.createElement('div');
  cardFront.className = 'view front-view';
  const frontImg = document.createElement('span');
  frontImg.className = 'material-icons';
  frontImg.innerText = 'question_mark';
  const cardBack = document.createElement('div');
  cardBack.className = 'view back-view';
  const backImg = document.createElement('img');
  backImg.src = `img/img-${shuffledNum[i]}.png`;
  cardFront.appendChild(frontImg);
  cardBack.appendChild(backImg);
  card.appendChild(cardFront);
  card.appendChild(cardBack);
  return card;
}

function startGame() {
  clickable = false;
  shuffleNum();
  for (let i = 0; i < shuffledNum.length; i++) {
    const card = createCard(i);
    card.addEventListener('click', clickCard);
    cardBox.appendChild(card);
  }
  clickable = true;
}
startGame();

function resetGame() {
  cardBox.innerHTML = '';
  numberCopy = number.concat(number);
  shuffledNum = [];
  matchedCard = 0;
  clicked = [];
  startGame();
}
