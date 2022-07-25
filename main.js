const wrapper = document.querySelector('.wrapper');
const qrInput = document.querySelector('.form input');
const generateBtn = document.querySelector('.form button');
const qrImg = document.querySelector('.qr-code img');

window.addEventListener('load', () => {
  qrInput.focus();
});

generateBtn.addEventListener('click', () => {
  let qrValue = qrInput.value;
  if (!qrValue) return;
  generateBtn.innerText = 'Generating QR Code...';
  qrImg.src = `http://api.qrserver.com/v1/create-qr-code/?data=${qrValue}&size=170x170`;
  qrImg.addEventListener('load', () => {
    wrapper.classList.add('active');
    generateBtn.innerText = 'Generate QR Code';
  });
});

qrInput.addEventListener('input', () => {
  wrapper.classList.remove('active');
});
