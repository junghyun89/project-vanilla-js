const startBtn = document.querySelector('.start-btn');
const modalBox = document.querySelector('.modal-box');
const closeBtn = document.querySelector('.fa-times');

startBtn.addEventListener('click', () => {
  modalBox.classList.add('active');
  startBtn.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  modalBox.classList.remove('active');
  startBtn.style.display = 'block';
});
