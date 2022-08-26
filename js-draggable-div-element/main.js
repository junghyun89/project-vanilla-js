const wrapper = document.querySelector('.wrapper');
const body = document.querySelector('body');

function onDrag({ movementX, movementY }) {
  let getStyle = window.getComputedStyle(wrapper);
  let left = parseInt(getStyle.left);
  let top = parseInt(getStyle.top);
  wrapper.style.left = `${left + movementX}px`;
  wrapper.style.top = `${top + movementY}px`;
}

body.addEventListener('mousedown', () => {
  body.classList.add('active');
  body.addEventListener('mousemove', onDrag);
});

document.addEventListener('mouseup', () => {
  body.classList.remove('active');
  body.removeEventListener('mousemove', onDrag);
});
