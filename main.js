const inputTag = document.querySelector('.tag-box input');
const ulTag = document.querySelector('.tag-box ul');
const remainingTag = document.querySelector('.details span');
const removeAllBtn = document.querySelector('.details button');

let tags = [];
let remaining = 10;

countRemaining();

function countRemaining() {
  inputTag.focus();
  remainingTag.innerText = remaining - tags.length;
}

function removeTag(e, tag) {
  tags.splice(tags.indexOf(tag), 1);
  e.parentElement.remove();
  countRemaining();
}

function createTag() {
  let liTags = document.querySelectorAll('li');
  liTags.forEach((tag) => {
    tag.remove();
  });
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      const liTag = `<li>${tag} <i class="uil uil-multiply" onclick="removeTag(this, '${tag}')"></i></li>`;
      ulTag.insertAdjacentHTML('afterbegin', liTag);
    });
}

function addTag(e) {
  let value = e.target.value.replace(/\s+/g, ' ');
  if (tags.includes(value) || tags.length >= 10) return;
  value.split(',').forEach((value) => {
    tags.push(value);
    console.log(tags);
    createTag();
    countRemaining();
  });
  e.target.value = '';
  inputTag.focus();
}

inputTag.addEventListener('change', addTag);

removeAllBtn.addEventListener('click', () => {
  let liTags = document.querySelectorAll('li');
  liTags.forEach((tag) => {
    tag.remove();
  });
  tags = [];
  countRemaining();
  inputTag.value = '';
  inputTag.focus();
});

window.addEventListener('load', () => {
  inputTag.focus();
});
