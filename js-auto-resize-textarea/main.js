const textarea = document.querySelector('textarea');

textarea.addEventListener('input', (e) => {
  textarea.style.height = 'auto';
  let scrollHeight = e.target.scrollHeight;
  textarea.style.height = `${scrollHeight}px`;
});
