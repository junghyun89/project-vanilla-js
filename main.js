const slidePage = document.querySelector('.slidepage');
const inputs = document.querySelectorAll('input');
const selects = document.querySelectorAll('#birthInfo select');
const firstNextBtn = document.querySelector('.next-1');
const secondPrevBtn = document.querySelector('.prev-1');
const secondNextBtn = document.querySelector('.next-2');
const thirdPrevBtn = document.querySelector('.prev-2');
const thirdNextBtn = document.querySelector('.next-3');
const fourthPrevBtn = document.querySelector('.prev-3');
const submitBtn = document.querySelector('.submit');
const progressText = document.querySelectorAll('.step p');
const progressCheck = document.querySelectorAll('.check');
const bullet = document.querySelectorAll('.bullet');

let current = 1;
let optionSelected = [];

function birthOptions() {
  let now = new Date();
  let year = now.getFullYear();

  for (let i = 1900; i <= year; i++) {
    selects[0].insertAdjacentHTML('beforeend', `<option>${i}</option>`);
  }

  for (let i = 1; i <= 12; i++) {
    let mm = i > 9 ? i : '0' + i;
    selects[1].insertAdjacentHTML('beforeend', `<option>${mm}월</option>`);
  }

  for (let i = 1; i <= 31; i++) {
    let dd = i > 9 ? i : '0' + i;
    selects[2].insertAdjacentHTML('beforeend', `<option>${dd}일</option>`);
  }

  let index = [...selects[0].children].findIndex((item) => {
    return +item.innerText == year;
  });
  selects[0].children[index].setAttribute('selected', 'true');
}
birthOptions();

function checkInput(e) {
  const parentId = e.target.parentElement.parentElement.id;
  const inputs = document.querySelectorAll(`#${parentId} input`);
  const button = document.querySelector(`#${parentId} .nextBtn`);
  const inputValues = [...inputs].filter((input) => {
    return input.value;
  });
  inputValues.length >= inputs.length
    ? button.classList.add('active')
    : button.classList.remove('active');
}

function checkSelect(e) {
  const parentId = e.target.parentElement.parentElement.id;
  const button = document.querySelector(`#${parentId} .nextBtn`);
  const selected = e.target;
  switch (selected) {
    case selects[0]:
      optionSelected[0] = selected;
      break;
    case selects[1]:
      optionSelected[1] = selected;
      break;
    case selects[2]:
      optionSelected[2] = selected;
      break;
    case selects[3]:
      optionSelected[3] = selected;
      break;
  }
  optionSelected.length >= selects.length
    ? button.classList.add('active')
    : button.classList.remove('active');
}

selects.forEach((select) => {
  select.addEventListener('change', (e) => {
    checkSelect(e);
  });
});

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    checkInput(e);
  });
});

firstNextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  slidePage.style.marginLeft = '-25%';
  bullet[current - 1].classList.add('active');
  progressText[current - 1].classList.add('active');
  progressCheck[current - 1].classList.add('active');
  current += 1;
  selected = 0;
});

secondNextBtn.addEventListener('click', (e) => {
  e.preventDefault();

  slidePage.style.marginLeft = '-50%';
  bullet[current - 1].classList.add('active');
  progressText[current - 1].classList.add('active');
  progressCheck[current - 1].classList.add('active');
  current += 1;
  selected = 0;
});

thirdNextBtn.addEventListener('click', (e) => {
  e.preventDefault();

  slidePage.style.marginLeft = '-75%';
  bullet[current - 1].classList.add('active');
  progressText[current - 1].classList.add('active');
  progressCheck[current - 1].classList.add('active');
  current += 1;
});

secondPrevBtn.addEventListener('click', (e) => {
  e.preventDefault();

  slidePage.style.marginLeft = '0%';
  bullet[current - 2].classList.remove('active');
  progressText[current - 2].classList.remove('active');
  progressCheck[current - 2].classList.remove('active');
  current -= 1;
});

thirdPrevBtn.addEventListener('click', (e) => {
  e.preventDefault();

  slidePage.style.marginLeft = '-25%';
  bullet[current - 2].classList.remove('active');
  progressText[current - 2].classList.remove('active');
  progressCheck[current - 2].classList.remove('active');
  current -= 1;
});

fourthPrevBtn.addEventListener('click', (e) => {
  e.preventDefault();

  slidePage.style.marginLeft = '-50%';
  bullet[current - 2].classList.remove('active');
  progressText[current - 2].classList.remove('active');
  progressCheck[current - 2].classList.remove('active');
  current -= 1;
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  bullet[current - 1].classList.add('active');
  progressText[current - 1].classList.add('active');
  progressCheck[current - 1].classList.add('active');
  current += 1;
  setTimeout(() => {
    alert("You're successfully Signed up");
    location.reload();
  }, 800);
});
