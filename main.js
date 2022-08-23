const text = document.querySelector('.text');

document.addEventListener('mousemove', (e) => {
  const cursorX = -e.pageX;
  const cursorY = -e.pageY;
  const transX = (7 * cursorX) / 570 + 40;
  const transY = (7 * cursorY) / 570 + 50;

  text.style.backgroundPosition = `${transX}% ${transY}%`;
});
