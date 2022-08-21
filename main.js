const button = document.querySelector('.button');
const menuIcon = document.querySelector('.button span');
const list = document.querySelector('ul');

button.addEventListener('click', () => {
  if (!button.classList.contains('active')) {
    button.classList.add('active');
    list.classList.add('active');
    menuIcon.classList.add('active');
  } else {
    button.classList.remove('active');
    list.classList.remove('active');
    menuIcon.classList.remove('active');
  }
});
