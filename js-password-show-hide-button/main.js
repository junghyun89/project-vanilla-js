const input = document.querySelector('input');
const showHideBtn = document.querySelector('.show-hide');

showHideBtn.addEventListener('click', () => {
  if (input.type == 'password') {
    input.setAttribute('type', 'text');
    showHideBtn.classList.add('hide');
  } else {
    input.setAttribute('type', 'password');
    showHideBtn.classList.remove('hide');
  }
});
