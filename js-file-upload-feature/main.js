const dropArea = document.querySelector('.drag-area');
const dragText = document.querySelector('header');
const browseFileBtn = document.querySelector('.drag-area button');
const fileInput = document.querySelector('.drag-area input');

function showImage(file) {
  dragText.innerText = 'Drag & Drop to Upload File';
  let fileType = file.type;
  let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
  let imgUrl = URL.createObjectURL(file);
  let imgTag = `<img src='${imgUrl}' alt=''>`;
  if (validExtensions.includes(fileType)) {
    dropArea.innerHTML = imgTag;
  } else {
    alert('This is not an Image File!');
    dropArea.classList.remove('active');
  }
}

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('active');
  dragText.innerText = 'Release to Upload File';
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('active');
  dragText.innerText = 'Drag & Drop to Upload File';
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  showImage(file);
});

browseFileBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  let file = e.target.files[0];
  dropArea.classList.add('active');
  showImage(file);
});
