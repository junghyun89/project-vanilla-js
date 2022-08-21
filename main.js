const outer = document.querySelector('.outer');
const inner = document.querySelector('.inner');
const percent = document.querySelector('span');

let count = 0;

inner.addEventListener('click', () => {
  const loading = setInterval(counter, 200);

  function counter() {
    if (count == 100) {
      outer.classList.remove('active-loader');
      outer.classList.add('active-loader-2');
      clearInterval(loading);
      return;
    }
    count++;
    percent.innerText = `${count}%`;
    outer.classList.add('active-loader');
  }
});
