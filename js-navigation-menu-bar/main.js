const navbar = document.querySelector('nav');

let scroll1 = window.pageYOffset;
window.addEventListener('scroll', () => {
  let scroll2 = window.pageYOffset;
  console.log(scroll1, scroll2);
  scroll1 > scroll2
    ? (navbar.style.top = '0px')
    : (navbar.style.top = '-100px');
  scroll1 = scroll2;
});
