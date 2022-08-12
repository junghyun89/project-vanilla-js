const input = document.querySelector('input');
const counter = document.querySelector('.counter');
const maxLength = input.getAttribute('maxlength');

counter.innerText = maxLength;

input.addEventListener('input', (e) => {
  counter.innerText = maxLength - e.target.value.length;
});
