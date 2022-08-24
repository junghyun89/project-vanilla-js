const result = document.querySelector('input');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const calculateBtn = document.querySelector('.calculate');

let previousNum = '';
let operator = '';
let currentNum = '';

function clickNumber(e) {
  const selectedNum = e.target.innerText;
  currentNum += selectedNum;
  result.value += selectedNum;
}

function clickOperator(e) {
  const selectedOp = e.target.innerText;
  if (currentNum === '') {
    alert('숫자를 먼저 입력하세요.');
  }
  if (previousNum !== '') {
    calculate();
  }
  operator = selectedOp;
  previousNum = currentNum;
  currentNum = '';
  result.value += selectedOp;
}

function calculate() {
  let calResult;

  if (!previousNum || !currentNum || !operator) {
    alert('올바른 식을 입력하세요');
    clear();
  }

  switch (operator) {
    case '+':
      calResult =
        parseFloat(previousNum) + parseFloat(currentNum) || previousNum;
      break;
    case '-':
      calResult =
        parseFloat(previousNum) - parseFloat(currentNum) || previousNum;
      break;
    case '*':
      calResult =
        parseFloat(previousNum) * parseFloat(currentNum) || previousNum;
      break;
    case '/':
      calResult =
        parseFloat(previousNum) / parseFloat(currentNum) || previousNum;
      break;
  }
  currentNum = calResult;
  operator = '';
  previousNum = '';
}

function clear() {
  previousNum = '';
  currentNum = '';
  operator = '';
  result.value = '';
}

numbers.forEach((num) => {
  num.addEventListener('click', (e) => {
    e.preventDefault();
    clickNumber(e);
  });
});

operators.forEach((op) => {
  op.addEventListener('click', (e) => {
    e.preventDefault();
    clickOperator(e);
  });
});

calculateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  calculate();
  result.value = currentNum;
});

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clear();
});
