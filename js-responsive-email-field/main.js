const showBtn = document.querySelector('.showBtn');
const form = document.querySelector('form');

showBtn.addEventListener('click', () => {
  form.classList.add('active');
  showBtn.classList.add('inactive');
});
