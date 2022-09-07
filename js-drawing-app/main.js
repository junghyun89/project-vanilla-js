const canvas = document.querySelector('canvas');
const toolBtn = document.querySelectorAll('.tool');
const fillColor = document.querySelector('#fill-color');
const sizeSlider = document.querySelector('#size-slider');
const colorBtns = document.querySelectorAll('.colors .option');
const colorPicker = document.querySelector('#color-picker');
const clearCanvasBtn = document.querySelector('.clear-canvas');
const saveImgBtn = document.querySelector('.save-img');

const ctx = canvas.getContext('2d');

let prevMouseX;
let prevMouseY;
let snapShot;
let isDrawing = false;
let brushWidth = 5;
let selectedTool = 'brush';
let selectedColor = '#000';

function drawRect(e) {
  if (!fillColor.checked) {
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
}

function drawCircle(e) {
  ctx.beginPath(); // 새로운 지점에서 그리기
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke();
}

function drawTriangle(e) {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  ctx.stroke();
  fillColor.checked ? ctx.fill() : ctx.stroke();
}

function drawing(e) {
  if (!isDrawing) return;
  ctx.putImageData(snapShot, 0, 0);

  switch (selectedTool) {
    case 'brush':
    case 'eraser':
      ctx.strokeStyle = selectedTool === 'eraser' ? '#fff' : selectedColor;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      break;
    case 'rectangle':
      drawRect(e);
      break;
    case 'circle':
      drawCircle(e);
      break;
    case 'triangle':
      drawTriangle(e);
      break;

    default:
      break;
  }
}

function startDraw(e) {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  // this avoids dragging the image
  snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function setCanvasBackground() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = selectedColor;
}

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  setCanvasBackground();
});

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mousemove', drawing);

toolBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .active').classList.remove('active');
    btn.classList.add('active');
    selectedTool = btn.id;
  });
});

sizeSlider.addEventListener('change', (e) => (brushWidth = e.target.value));

colorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .selected').classList.remove('selected');
    btn.classList.add('selected');
    selectedColor = window
      .getComputedStyle(btn)
      .getPropertyValue('background-color');
  });
});

colorPicker.addEventListener('input', (e) => {
  e.target.parentElement.style.background = e.target.value;
  selectedColor = e.target.value;
  e.target.parentElement.style.opacity = '1';
});

clearCanvasBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setCanvasBackground();
});

saveImgBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});
