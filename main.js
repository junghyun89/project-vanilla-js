const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

const now = new Date();
const secondsDeg = (now.getSeconds() / 60) * 360;
const minutesDeg = (now.getMinutes() / 60) * 360 + (now.getSeconds() / 60) * 6;
const hoursDeg = (now.getHours() / 12) * 360 + (now.getMinutes() / 60) * 30;

const animation = [
  `@keyframes sec-hand{
      from {
        transform: rotate(${secondsDeg}deg);
      }
      to {
        transform: rotate(${+secondsDeg + 360}deg);
      }
    }`,
  `@keyframes min-hand{
      from {
        transform: rotate(${minutesDeg}deg);
      }
      to {
        transform: rotate(${+minutesDeg + 360}deg);
      }
    }`,
  `@keyframes hr-hand{
      from {
        transform: rotate(${hoursDeg}deg);
      }
      to {
        transform: rotate(${+hoursDeg + 360}deg);
      }
    }`,
].join('');

document.querySelector('#clock-animate').innerHTML = animation;
