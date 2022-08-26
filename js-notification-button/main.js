const pushBtn = document.querySelector('.push-btn');
const notify = document.querySelector('.notify');

let count = 0;

pushBtn.addEventListener('click', () => {
  count++;
  notify.innerText = count;
  notify.style.opacity = '1';
});
