const wrapper = document.querySelector('.wrapper');
const form = document.querySelector('form');
const selectedImg = document.querySelector('form img');
const fileInput = document.querySelector('form input');
const infoText = document.querySelector('.content p');
const textArea = document.querySelector('.details textarea');
const closeBtn = document.querySelector('.close');
const copyTextBtn = document.querySelector('.copy');

const fetchRequest = (formData, file) => {
  infoText.innerText = 'Scanning QR Code...';
  fetch('http://api.qrserver.com/v1/read-qr-code/', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? 'Upload QR Code to Scan'
        : "Couldn't Scan QR Code";
      if (!result) return;
      selectedImg.src = URL.createObjectURL(file);
      textArea.innerText = result;
      wrapper.classList.add('active');
    })
    .catch(() => {
      infoText.innerText = "Couldn't Scan QR Code";
    });
};

fileInput.addEventListener('change', (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append('file', file);
  fetchRequest(formData, file);
});

form.addEventListener('click', () => fileInput.click());

closeBtn.addEventListener('click', () => {
  wrapper.classList.remove('active');
});

copyTextBtn.addEventListener('click', () => {
  let text = textArea.textContent;
  navigator.clipboard.writeText(text);
});
