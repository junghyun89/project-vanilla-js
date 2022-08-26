const percent = document.querySelector('.percent');
const progress = document.querySelector('.progress');
const text = document.querySelector('.text');

let count = 0;
let counter = setInterval(animate, 50);

function animate() {
  if (count == 100) {
    clearInterval(counter);
    percent.classList.add('text-blink');
    text.style.display = 'block';
  } else {
    count++;
    percent.innerText = `${count}%`;
    progress.style.width = `${count}%`;
  }
}
