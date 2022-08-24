const ul = document.querySelector('ul');
const barIcon = document.querySelector('#icon');

barIcon.addEventListener('click', () => {
  ul.classList.toggle('show');
});
