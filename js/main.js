const searchWrapper = document.querySelector('.search-input');
const input = searchWrapper.querySelector('input');
const suggBox = searchWrapper.querySelector('.autocom-box');

function select(e) {
  let selectedValue = e.textContent;
  input.value = selectedValue;
  searchWrapper.classList.remove('active');
}

function addOnClick() {
  let allList = suggBox.querySelectorAll('li');
  for (let i = 0; i < allList.length; i++) {
    allList[i].setAttribute('onclick', 'select(this)');
  }
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    inputValue = input.value;
    listData = `<li>${inputValue}</li>`;
  } else {
    listData = list.join('');
  }
  suggBox.innerHTML = listData;
}

function findSuggestions(inputValue) {
  let emptyArray = [];
  if (inputValue) {
    emptyArray = suggestions.filter((data) => {
      return data
        .toLocaleLowerCase()
        .startsWith(inputValue.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      return (data = `<li>${data}</li>`);
    });
    searchWrapper.classList.add('active');
    showSuggestions(emptyArray);
    addOnClick();
  } else {
    searchWrapper.classList.remove('active');
  }
}

input.addEventListener('input', (e) => {
  let inputValue = e.target.value;
  findSuggestions(inputValue);
});
