const textarea = document.querySelector('textarea');
const fileNameInput = document.querySelector('.file-name input');
const selectMenu = document.querySelector('.save-as select');
const saveBtn = document.querySelector('.save-btn');

selectMenu.addEventListener('change', () => {
  const selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
  const fileType = selectedOption.split(' ')[0];
  saveBtn.innerText = `Save As ${fileType} File`;
});

saveBtn.addEventListener('click', () => {
  const blob = new Blob([textarea.value], { type: selectMenu.value });
  const fileUrl = URL.createObjectURL(blob);
  const aTag = document.createElement('a');
  aTag.download = fileNameInput.value;
  aTag.href = fileUrl;
  aTag.click();
});
