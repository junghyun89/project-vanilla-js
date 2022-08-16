const slider = document.querySelector('.slider input');
const img = document.querySelector('.img-2');
const dragLine = document.querySelector('.drag-line');

slider.addEventListener('input', () => {
  let sliderValue = slider.value;
  dragLine.style.left = `${sliderValue}%`;
  img.style.width = `${sliderValue}%`;
});
