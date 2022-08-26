const input = document.querySelector('input');
const chooseBtn = document.querySelector('.btn');
const fileName = document.querySelector('.file-name');

let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

input.addEventListener('change', (e) => {
  let file = e.target.files[0];
  if (file) {
    fileName.innerText = file.name.match(regExp);
    fileName.style.display = 'block';
  } else {
    fileName.innerText = 'No file chosen';
  }
});

chooseBtn.addEventListener('click', () => {
  input.click();
});
