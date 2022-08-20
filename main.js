const showBtn = document.querySelector('button');
const alert = document.querySelector('.alert');
const closeBtn = document.querySelector('.close-btn');

showBtn.addEventListener('click', () => {
  alert.classList.remove('hide');
  alert.classList.add('show');
  alert.classList.add('showAlert');
});

closeBtn.addEventListener('click', () => {
  alert.classList.remove('show');
  alert.classList.add('hide');
});
