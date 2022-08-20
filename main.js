const imageBox = document.querySelector('.images');
const sideBtns = document.querySelectorAll('.slide');
const btnSlider = document.querySelector('.btn-sliders');

const images = ['0.jpg', '1.jpg', '2.jpg'];
let indexValue = 0;

function showImage() {
  if (indexValue > images.length - 1) {
    indexValue = 0;
  }
  if (indexValue < 0) {
    indexValue = images.length - 1;
  }
  imageBox.innerHTML = `<img src='images/${images[indexValue]}'>`;
}
showImage(indexValue);

function btn_slide(e) {
  showImage((indexValue = e));
  for (let i = 0; i < btnSlider.children.length; i++) {
    btnSlider.children[i].style.background = 'rgba(255,255,255,0.1)';
  }
  btnSlider.children[e].style.background = 'white';
}

sideBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.classList.contains('right') ? indexValue++ : indexValue--;
    showImage(indexValue);
  });
});

for (let i = 0; i < images.length; i++) {
  btnSlider.innerHTML += `<span onclick='btn_slide(${i})'></span>`;
}
