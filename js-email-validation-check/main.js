const emailInput = document.querySelector('#email');
const icon1 = document.querySelector('.icon1');
const icon2 = document.querySelector('.icon2');
const errorText = document.querySelector('.error-text');
const btn = document.querySelector('button');

let regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

emailInput.addEventListener('input', () => {
  const email = emailInput.value;

  if (!email) {
    emailInput.style.borderColor = 'lightgrey';
    icon1.style.display = 'none';
    icon2.style.display = 'none';
    errorText.style.display = 'none';
    btn.style.display = 'none';
    return;
  }
  if (email.match(regExp)) {
    emailInput.style.borderColor = '#27ae60';
    icon1.style.display = 'none';
    icon2.style.display = 'block';
    errorText.style.display = 'none';
    btn.style.display = 'block';
  } else {
    emailInput.style.borderColor = '#e74c3c';
    icon1.style.display = 'block';
    icon2.style.display = 'none';
    errorText.style.display = 'block';
    btn.style.display = 'none';
  }
});
