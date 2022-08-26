const txtInput = document.querySelector('.form input');
const checkBtn = document.querySelector('.form button');
const resultTxt = document.querySelector('.info-txt');

let filteredTxt;

txtInput.addEventListener('input', () => {
  filteredTxt = txtInput.value.toLowerCase().replace(/[^A-Z0-9]/gi, '');
  filteredTxt
    ? checkBtn.classList.add('active')
    : checkBtn.classList.remove('active');
  resultTxt.style.display = 'none';
});

checkBtn.addEventListener('click', () => {
  let reversedTxt = filteredTxt.split('').reverse().join('');
  reversedTxt == filteredTxt
    ? (resultTxt.innerHTML = `Yes, <span>'${txtInput.value}'</span> is a palindrome!`)
    : (resultTxt.innerHTML = `No, <span>'${txtInput.value}'</span> isn't a palindrome!`);
  resultTxt.style.display = 'block';
});
