const searchBtn = document.querySelector('.search-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const searchBox = document.querySelector('.search-box');
const searchInput = document.querySelector('input');
const searchData = document.querySelector('.search-data');

searchBtn.addEventListener('click', () => {
  searchBox.classList.add('active');
  searchInput.classList.add('active');
  searchBtn.classList.add('active');
  cancelBtn.classList.add('active');
  searchInput.focus();
  if (searchInput.value != '') {
    searchData.classList.remove('hide');
    searchData.innerHTML = `You just typed <span style='font-weight: 600'>${searchInput.value}</span>`;
  } else {
    searchData.innerHTML = '';
  }
});

cancelBtn.addEventListener('click', () => {
  searchBox.classList.remove('active');
  searchInput.classList.remove('active');
  searchBtn.classList.remove('active');
  cancelBtn.classList.remove('active');
  searchData.classList.add('hide');
  searchInput.value = '';
});
