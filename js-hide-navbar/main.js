const navbar = document.querySelector('nav');
const menus = document.querySelectorAll('nav ul li');

let scrollPrevious = window.pageYOffset;

menus.forEach((menu) => {
  menu.addEventListener('click', (e) => {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].classList.contains('active')) {
        menus[i].classList.remove('active');
      }
    }
    e.target.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  const scrollCurrent = window.pageYOffset;

  if (scrollPrevious > scrollCurrent) {
    navbar.style.top = '0px';
  } else {
    navbar.style.top = '-90px';
  }
  console.log(scrollPrevious);

  console.log(scrollCurrent);
  scrollPrevious = scrollCurrent;
});
