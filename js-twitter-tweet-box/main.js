const editableInput = document.querySelector('.editable');
const readonlyInput = document.querySelector('.readonly');
const placeholder = document.querySelector('.placeholder');
const counter = document.querySelector('.counter');
const button = document.querySelector('button');

window.addEventListener('load', () => {
  editableInput.focus();
});

function checkInput(e) {
  let maxLength = 100;
  let innerText = e.target.innerText;
  let innerHTML = e.target.innerHTML;
  let currentLength = innerText.length;

  if (currentLength <= 0) {
    placeholder.style.display = 'block';
    counter.style.display = 'none';
    button.classList.remove('active');
  } else {
    placeholder.style.display = 'none';
    counter.style.display = 'block';
    button.classList.add('active');
  }
  counter.innerText = maxLength - currentLength;

  if (currentLength > maxLength) {
    let overText = innerText.substring(maxLength);
    overText = `<span class='highlight'>${overText}</span>`;
    innerHTML = innerText.substring(0, maxLength) + overText;
    counter.style.color = '#e0245e';
    readonlyInput.style.zIndex = '1';
    button.classList.remove('active');
  } else {
    counter.style.color = '#333';
    readonlyInput.style.zIndex = '-1';
  }
  readonlyInput.innerHTML = innerHTML;
}

editableInput.addEventListener('input', (e) => {
  checkInput(e);
});
