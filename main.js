const startBtn = document.querySelector('.startBtn');
const popupBox = document.querySelector('.popup-box');
const cancelBtn = document.querySelector('.cancel-btn');
const deleteBtn = document.querySelector('.delete-btn');

function activePopup() {
  popupBox.classList.add('active');
}

startBtn.addEventListener('click', activePopup);

cancelBtn.addEventListener('click', () => {
  popupBox.classList.remove('active');
});

deleteBtn.addEventListener('click', () => {
  alert('Your Account Deleted Successfully.');
  startBtn.innerText = 'Account Deleted';
  popupBox.classList.remove('active');
  startBtn.removeEventListener('click', activePopup);
});
