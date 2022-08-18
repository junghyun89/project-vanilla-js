const errorText = document.querySelector('.error-text');
const password_1 = document.querySelector('#password_1');
const password_2 = document.querySelector('#password_2');
const showBtn = document.querySelector('.show');
const checkBtn = document.querySelector('form button');

function checkInputValue() {
  password_1.value
    ? password_2.removeAttribute('disabled', '')
    : password_2.setAttribute('disabled', '');

  password_2.value
    ? (showBtn.style.display = 'block')
    : (showBtn.style.display = 'none');

  password_1.value && password_2.value
    ? checkBtn.classList.add('active')
    : checkBtn.classList.remove('active');
}

password_1.addEventListener('input', checkInputValue);
password_2.addEventListener('input', checkInputValue);

showBtn.addEventListener('click', (e) => {
  if (password_1.type == 'password' && password_2.type == 'password') {
    password_1.type = 'text';
    password_2.type = 'text';
    e.target.textContent = 'hide';
    e.target.classList.add('active');
  } else {
    password_1.type = 'password';
    password_2.type = 'password';
    e.target.textContent = 'show';
    e.target.classList.remove('active');
  }
});

checkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (password_1.value == password_2.value) {
    errorText.textContent = 'Nice! Confirm Password Matched';
    errorText.classList.add('matched');
  } else {
    errorText.textContent = 'Error! Confirm Password Not Matched';
    errorText.classList.remove('matched');
  }
  errorText.style.display = 'block';
});
