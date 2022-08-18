const wrapper = document.querySelector('.wrapper');
const fileName = document.querySelector('.file-name');
const img = document.querySelector('.image img');
const defaultBtn = document.querySelector('#default-btn');
const customBtn = document.querySelector('#custom-btn');
const cancelBtn = document.querySelector('#cancel-btn');

let imgUrl;
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

function showImage(imgUrl, imageName) {
  if (imgUrl) {
    img.src = imgUrl;
    fileName.innerText = imageName.match(regExp);
    wrapper.classList.add('active');
  } else {
    wrapper.classList.remove('active');
  }
}

defaultBtn.addEventListener('change', (e) => {
  imgUrl = URL.createObjectURL(e.target.files[0]);
  const imageName = e.target.files[0].name;
  showImage(imgUrl, imageName);
});

customBtn.addEventListener('click', () => {
  defaultBtn.click();
});

cancelBtn.addEventListener('click', () => {
  imgUrl = '';
  showImage();
});
