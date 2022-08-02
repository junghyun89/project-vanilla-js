const captcha = document.querySelector('.captcha');
const reloadBtn = document.querySelector('.reload-btn');
const inputField = document.querySelector('input');
const checkBtn = document.querySelector('.check-btn');
const statusTxt = document.querySelector('.status-txt');

let allCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
];

function getCaptcha() {
  captcha.innerText = '';
  for (let i = 0; i < 6; i++) {
    let randomChar =
      allCharacters[Math.floor(Math.random() * allCharacters.length)];
    captcha.innerText += ` ${randomChar}`;
  }
}
getCaptcha();

function compareChars() {
  let inputValue = inputField.value.split('').join(' ');
  statusTxt.style.display = 'block';
  if (inputValue == captcha.innerText) {
    statusTxt.style.color = '#4db2ec';
    statusTxt.innerText = `Nice! You don't appear to be a robot.`;
    setTimeout(() => {
      statusTxt.style.display = '';
      getCaptcha();
    }, 4000);
  } else {
    statusTxt.style.color = '#ff0000';
    statusTxt.innerText = 'Captcha not matched. Please try again!';
  }
}

reloadBtn.addEventListener('click', getCaptcha);

checkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  compareChars();
  inputField.value = '';
  inputField.focus();
});
