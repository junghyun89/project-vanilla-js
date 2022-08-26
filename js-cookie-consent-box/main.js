const cookieBox = document.querySelector('.wrapper');
const acceptBtn = document.querySelector('.buttons button');

let checkCookes = document.cookie.indexOf('CookieBy=AnJung');

checkCookes != -1
  ? cookieBox.classList.add('hide')
  : cookieBox.classList.remove('hide');

acceptBtn.addEventListener('click', () => {
  document.cookie = `CookieBy=AnJung; max-age=${60 * 60 * 24 * 30}`;
  if (document.cookie) {
    cookieBox.classList.add('hide');
  } else {
    alert("Cookie can't be set!");
  }
});
