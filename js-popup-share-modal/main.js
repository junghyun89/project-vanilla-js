const viewModalBtn = document.querySelector('.view-modal');
const popupBox = document.querySelector('.popup');
const closeBtn = document.querySelector('.close');
const field = document.querySelector('.field');
const copyBtn = document.querySelector('.field button');
const urlInput = document.querySelector('.field input');

viewModalBtn.addEventListener('click', () => {
  popupBox.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  popupBox.classList.remove('active');
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(urlInput.value).then(() => {
    field.classList.add('active');
    copyBtn.innerText = 'Copied';
    setTimeout(() => {
      field.classList.remove('active');
      copyBtn.innerText = 'Copy';
    }, 2000);
  });
});
