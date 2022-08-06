const wrapper = document.querySelector('.wrapper');
const toast = document.querySelector('.toast');
const wifiIcon = document.querySelector('.icon');
const title = document.querySelector('span');
const subTitle = document.querySelector('p');
const closeIcon = document.querySelector('.close-icon');

let timer;

function offline() {
  wrapper.classList.remove('hide');
  toast.classList.add('offline');
  title.innerText = `You're offline now`;
  subTitle.innerText = `Oops! Internet is disconnected.`;
  wifiIcon.innerHTML = `<i class="uil uil-wifi-slash"></i>`;
}

function ajax() {
  let xhr = new XMLHttpRequest(); // creating new xml object
  xhr.open('GET', 'https://naver.com', true);
  xhr.onload = () => {
    if (xhr.status == 200 && xhr.status < 300) {
      toast.classList.remove('offline');
      title.innerText = `You're online now`;
      subTitle.innerText = `Hurray! Internet is connected.`;
      wifiIcon.innerHTML = `<i class="uil uil-wifi"></i>`;

      setTimeout(() => {
        wrapper.classList.add('hide');
      }, 5000);
    } else {
      offline();
    }
  };
  xhr.onerror = () => {
    offline();
  };

  xhr.send();
}
ajax();

function close() {
  if (!toast.classList.contains('offline')) {
    wrapper.classList.add('hide');
    clearInterval(timer);
    setTimeout(() => {
      timer = setInterval(() => {
        ajax();
      }, 100);
    });
  }
}

timer = setInterval(() => {
  ajax();
}, 100);

closeIcon.addEventListener('click', close);
