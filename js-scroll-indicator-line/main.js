const content = document.querySelector('.content');
const scrollLine = document.querySelector('.scroll-line');

console.log(content.scrollHeight);

window.addEventListener('scroll', () => {
  // 스크롤한 값
  const currentValue = window.scrollY;
  // document 문서 전체 높이
  const documentHeight = document.documentElement.scrollHeight;
  // 보여지는 window 높이
  const windowHeight = window.innerHeight;
  const currentPercent = (currentValue / (documentHeight - windowHeight)) * 100;
  scrollLine.style.width = `${currentPercent}%`;
});
