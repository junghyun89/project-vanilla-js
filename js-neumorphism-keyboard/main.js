const keys = document.querySelectorAll('.keys input');
const display = document.querySelector('.display');
const textArea = document.querySelector('.display textarea');

function showKey(e) {
  let keyValue = e.target.value;
  keyValue == 'SPACE' ? (textArea.value += ' ') : (textArea.value += keyValue);
}

keys.forEach((key) => {
  key.addEventListener('click', (e) => {
    showKey(e);
  });
});

display.addEventListener('dblclick', () => {
  textArea.value = '';
});
