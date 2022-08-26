const imageBox = document.querySelector('.image-box');

const images = ['0.jpg', '1.jpg', '2.jpg'];

setInterval(() => {
  const randomIndex = Math.floor(Math.random() * images.length);
  imageBox.innerHTML = `<img src=images/${images[randomIndex]}>`;
}, 3000);
