const items = document.querySelector('.items');
const images = document.querySelectorAll('.image');
const previewBox = document.querySelector('.preview-box');
const category = document.querySelector('.preview-box p');
const previewImage = document.querySelector('.image-box img');
const closeIcon = document.querySelector('.preview-box .icon');
const shadow = document.querySelector('.shadow');

let itemList = ['All', 'Bag', 'Shoe', 'Watch', 'Camera', 'Headphone'];

function filter(selected) {
  let filterName = selected.getAttribute('data-name');
  images.forEach((image) => {
    image.classList.remove('show', 'hide');
    let filterImages = image.getAttribute('data-name');
    if (filterName == filterImages || filterName == 'all') {
      image.classList.add('show');
    } else {
      image.classList.add('hide');
    }
  });
}

function selectFilter(selected) {
  const item = document.querySelectorAll('.item');
  for (let i = 0; i < item.length; i++) {
    if (item[i].classList.contains('active')) {
      item[i].classList.remove('active');
    }
  }
  selected.classList.add('active');
  filter(selected);
}

itemList.forEach((item) => {
  let itemTag = `<span class="item" onclick='selectFilter(this)' data-name='${item.toLowerCase()}'>${item}</span>`;
  items.innerHTML += itemTag;
});

for (let i = 0; i < images.length; i++) {
  const imgTag = images[i].querySelector('img');
  images[i].addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('body').style.overflow = 'hidden';
    previewImage.src = imgTag.src;
    category.innerText = `${images[i].getAttribute('data-name')}`;
    previewBox.classList.add('show');
    shadow.style.display = 'block';
  });
}

closeIcon.addEventListener('click', () => {
  previewBox.classList.remove('show');
  shadow.style.display = 'none';
  document.querySelector('body').style.overflow = 'scroll';
});
