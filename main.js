const input = document.querySelector('.display input');
const copyIcon = document.querySelector('.far');
const copiedIcon = document.querySelector('.fas');
const generateBtn = document.querySelector('button');

let chars =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';

copyIcon.addEventListener('click', () => {
  let inputValue = input.value;
  navigator.clipboard.writeText(inputValue);
  copiedIcon.style.display = 'block';
  copyIcon.style.display = 'none';
});

generateBtn.addEventListener('click', () => {
  let randomPassword = '';
  for (let i = 0; i < 16; i++) {
    let randomNum = Math.floor(Math.random() * chars.length);
    randomPassword = randomPassword + chars.charAt(randomNum);
  }
  input.value = randomPassword;
  copyIcon.style.display = 'block';
  copiedIcon.style.display = 'none';
});
