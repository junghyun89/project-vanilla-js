const container = document.querySelector('.container');
const image = document.querySelector('.image');

const imageHeight = image.offsetHeight;

container.style.height = imageHeight + 'px';

window.addEventListener('scroll', () => {
  if (window.scrollY > imageHeight) {
    image.classList.add('popOut-bottom');
    image.style.bottom = -imageHeight + 'px';
  } else {
    image.classList.remove('popOut-bottom');
  }
});
