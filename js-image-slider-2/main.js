const images = document.querySelector('.images');
const buttons = document.querySelector('.buttons');

const imageUrls = ['0.jpg', '1.jpg', '2.jpg'];
let indexValue = 0;

function showImage() {
  images.innerHTML = `<img src=images/${imageUrls[indexValue]} class='show'>`;
  buttons.querySelectorAll('span')[indexValue].classList.add('active');
}

function clickSlide(i) {
  showImage((indexValue = i));
  for (let i = 0; i < buttons.children.length; i++) {
    buttons.children[i].classList.remove('active');
  }
  buttons.children[indexValue].classList.add('active');
}

window.addEventListener('load', () => {
  for (let i = 0; i < imageUrls.length; i++) {
    buttons.innerHTML += `<span onclick='clickSlide(${i})'></span>`;
  }
  showImage(indexValue);
});
