const input = document.querySelector('.field input');
const showPassword = document.querySelector('.show-password');
const indicator = document.querySelector('.indicator');
const weakSpan = document.querySelector('.weak');
const mediumSpan = document.querySelector('.medium');
const strongSpan = document.querySelector('.strong');
const text = document.querySelector('.text');

let weakPassword = /[a-z]/;
let mediumPassword = /\d+/;
let strongPassword = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

function checkPassword(inputValue) {
  if (
    inputValue.length < 6 &&
    (inputValue.match(weakPassword) ||
      inputValue.match(mediumPassword) ||
      inputValue.match(strongPassword))
  ) {
    weakSpan.classList.add('active');
    text.textContent = 'Your password is too weak';
    text.style.display = 'block';
    text.classList.add('weak');
  }
  if (
    inputValue.length >= 6 &&
    ((inputValue.match(weakPassword) && inputValue.match(mediumPassword)) ||
      (inputValue.match(mediumPassword) && inputValue.match(strongPassword)) ||
      (inputValue.match(weakPassword) && inputValue.match(strongPassword)))
  ) {
    mediumSpan.classList.add('active');
    text.textContent = 'Your password is medium';
    text.classList.add('medium');
  } else {
    mediumSpan.classList.remove('active');
    text.classList.remove('medium');
  }
  if (
    inputValue.length >= 6 &&
    inputValue.match(weakPassword) &&
    inputValue.match(mediumPassword) &&
    inputValue.match(strongPassword)
  ) {
    weakSpan.classList.add('active');
    mediumSpan.classList.add('active');
    strongSpan.classList.add('active');
    text.textContent = 'Your password is strong';
    text.classList.add('strong');
  } else {
    strongSpan.classList.remove('active');
    text.classList.remove('strong');
  }
}

input.addEventListener('input', (e) => {
  let inputValue = e.target.value;
  if (inputValue != '') {
    indicator.style.display = 'flex';
    showPassword.style.display = 'block';
    checkPassword(inputValue);
  } else {
    indicator.style.display = 'none';
    showPassword.style.display = 'none';
    text.style.display = 'none';
  }
});

showPassword.addEventListener('click', () => {
  let inputType = input.type;
  if (inputType == 'password') {
    inputType = 'text';
    showPassword.innerText = 'hide';
  } else {
    inputType = 'password';
    showPassword.innerText = 'show';
  }
  input.setAttribute('type', inputType);
});
