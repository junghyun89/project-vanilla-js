const body = document.querySelector('body');
const card = document.querySelector('.card');

body.addEventListener('mousemove', (e) => {
  const rotateX = -(window.innerWidth / 2 - e.pageX) / 20;
  const rotateY = -(window.innerHeight / 2 - e.pageY) / 10;
  card.style.transform = `rotateX(${+rotateX}deg) rotateY(${+rotateY}deg)`;
});
document.addEventListener('mouseout', () => {
  card.style.transform = '';
});
