const fileInput = document.querySelector('input');
const downloadBtn = document.querySelector('button');

const fetchFile = (url) => {
  // fetching file & returning response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      // URL/createObjectURL creates a url of passed object
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement('a');
      aTag.href = tempUrl;
      // passing file last name & extension as download value of <a> tag
      aTag.download = url.replace(/^.*[\\\/]/, '');
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      URL.revokeObjectURL(tempUrl);
      downloadBtn.innerText = 'Download File';
    })
    .catch(() => {
      downloadBtn.innerText = 'Download File';
      alert('Failed to download file!');
    });
};

downloadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  downloadBtn.innerText = 'Downloading file...';
  fetchFile(fileInput.value);
});
