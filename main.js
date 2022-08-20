const second = document.querySelector('.sec');
const minute = document.querySelector('.min');
const hour = document.querySelector('.hr');

setInterval(() => {
  const time = new Date();
  const seconds = time.getSeconds() * 6;
  const minutes = time.getMinutes() * 6;
  const hours = time.getHours() * 30;

  second.style.transform = `rotateZ(${seconds}deg)`;
  minute.style.transform = `rotateZ(${minutes}deg)`;
  hour.style.transform = `rotateZ(${hours}deg)`;
}, 1000);
