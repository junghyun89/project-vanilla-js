const result = document.querySelector('.result input');
const deleteIcon = document.querySelector('.result span');
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const calculateBtn = document.querySelector('.calculate');

let numOne = '';
let operator = '';
let numTwo = '';

function onClickNumber(num) {
  if (numOne && numTwo) {
    numTwo += num;
  } else {
    operator ? (numTwo += num) : (numOne += num);
  }
  result.value += num;
}

function onClickOperator(op) {
  if (numOne && !numTwo) {
    operator = op;
    result.value += op;
  } else if (!numOne) {
    alert('숫자를 먼저 입력하세요.');
  }
}

function clearInput() {
  numOne = '';
  operator = '';
  numTwo = '';
  result.value = '';
}

function resultCalculate() {
  if (!numOne || !numTwo || !operator) {
    alert('올바른 식을 입력하세요.');
    clearInput();
  }
  switch (operator) {
    case '+':
      result.value = parseFloat(numOne) + parseFloat(numTwo);
      break;
    case '-':
      result.value = parseFloat(numOne) - parseFloat(numTwo);
      break;
    case '*':
      result.value = parseFloat(numOne) * parseFloat(numTwo);
      break;
    case '/':
      result.value = parseFloat(numOne) / parseFloat(numTwo);
      break;
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    setTimeout(() => {
      e.target.blur();
    }, 100);
  });
});

numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    const num = e.target.textContent;
    e.preventDefault();
    onClickNumber(num);
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    const op = e.target.textContent;
    e.preventDefault();
    onClickOperator(op);
  });
});

calculateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  resultCalculate();
  numOne = result.value;
  numTwo = '';
  operator = '';
});

deleteIcon.addEventListener('click', (e) => {
  e.preventDefault();
  clearInput();
});
