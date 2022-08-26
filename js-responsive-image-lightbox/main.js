const galleryTag = document.querySelector('.gallery');
const previewBox = document.querySelector('.preview-box');
const closeIcon = document.querySelector('.preview-box .icon');
const currentImg = document.querySelector('.current-img');
const totalImg = document.querySelector('.total-img');
const imgBox = document.querySelector('.img-box');
const previewImg = document.querySelector('.img-box img');
const prevIcon = document.querySelector('.prev');
const nextIcon = document.querySelector('.next');
const shadowBox = document.querySelector('.shadow');

const imgLength = 6;
let newIndex;
let clickImgIndex;

function showPreview(i) {
  newIndex = i;
  clickImgIndex = newIndex;
  const gallery = document.querySelectorAll('.gallery .image');
  let imgSrc = gallery[newIndex].querySelector('img').src;
  currentImg.innerText = newIndex + 1;
  totalImg.innerText = imgLength;
  previewImg.src = `${imgSrc}`;
  previewBox.classList.add('active');
  shadowBox.style.display = 'block';
  document.querySelector('body').style.overflow = 'hidden';

  if (i == 0) {
    prevIcon.style.display = 'none';
  }
  if (i >= imgLength - 1) {
    nextIcon.style.display = 'none';
  }
}

prevIcon.addEventListener('click', () => {
  newIndex--;
  if (newIndex == 0) {
    showPreview(newIndex);
    prevIcon.style.display = 'none';
  } else {
    showPreview(newIndex);
    nextIcon.style.display = 'block';
  }
});

nextIcon.addEventListener('click', () => {
  newIndex++;
  if (newIndex >= imgLength - 1) {
    showPreview(newIndex);
    nextIcon.style.display = 'none';
  } else {
    showPreview(newIndex);
    prevIcon.style.display = 'block';
  }
});

for (let i = 0; i < imgLength; i++) {
  let imageTag = `<div class='image' onclick='showPreview(${i})'><span><img src='images/${i}.jpg' alt=''></span></div>`;
  galleryTag.innerHTML += imageTag;
}

closeIcon.addEventListener('click', () => {
  newIndex = clickImgIndex;
  previewBox.classList.remove('active');
  prevIcon.style.display = 'block';
  nextIcon.style.display = 'block';
  shadowBox.style.display = 'none';
  document.querySelector('body').style.overflow = 'auto';
});
