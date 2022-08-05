const urlField = document.querySelector('.field input');
const previewArea = document.querySelector('.preview-area');
const imgTag = document.querySelector('.thumbnail');
const downloadBtn = document.querySelector('.download-btn');

let thumbnailUrl;
console.log(thumbnailUrl);

function fetchFile() {
  fetch(thumbnailUrl)
    .then((res) => res.blob())
    .then((file) => {
      console.log(file);
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement('a');
      aTag.href = tempUrl;
      aTag.download = thumbnailUrl.replace(/^.*[\\\/]/, '');
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      URL.revokeObjectURL(tempUrl);
      downloadBtn.innerText = 'Downloading image...';
    })
    .catch(() => {
      downloadBtn.innerText = 'Download image...';
      alert('Failed to download file!');
    });
  urlField.value = '';
  previewArea.classList.remove('active');
}

urlField.addEventListener('input', (e) => {
  e.preventDefault();
  thumbnailUrl = '';
  let imgUrl = e.target.value;

  if (!e.target.value) {
    previewArea.classList.remove('active');
  }
  previewArea.classList.add('active');

  if (imgUrl.indexOf('youtube.com/watch?v=') != -1) {
    let vidId = imgUrl.split('v=')[1].substring(0, 11);
    thumbnailUrl = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
    imgTag.src = thumbnailUrl;
    console.log(thumbnailUrl);
  } else if (imgUrl.indexOf('https://youtu.be/') != -1) {
    let vidId = imgUrl.split('be/')[1].substring(0, 11);
    thumbnailUrl = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
    imgTag.src = thumbnailUrl;
    console.log(thumbnailUrl);
  } else if (imgUrl.match(/\.(jpe?g|png|gif|bmp|webp)$/i)) {
    thumbnailUrl = imgUrl;
    imgTag.src = imgUrl;
  } else {
    imgTag.src = '';
    previewArea.classList.remove('active');
  }
});

downloadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  downloadBtn.innerText = 'Downloading image...';
  fetchFile();
});
