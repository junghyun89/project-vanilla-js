const numb = document.querySelector('.numb');

let counter = 0;

setInterval(() => {
  counter == 100 ? clearInterval() : (counter += 1);
  numb.textContent = `${counter}%`;
}, 80);
