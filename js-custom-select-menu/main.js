const wrapper = document.querySelector('.wrapper');
const selectBtn = document.querySelector('.select-btn');
const optionBox = document.querySelector('.options');
const searchInput = document.querySelector('.search input');

let countries = [
  'Afghanistan',
  'Algeria',
  'Argentina',
  'Australia',
  'Bangladesh',
  'Belgium',
  'Bhutan',
  'Brazil',
  'Canada',
  'China',
  'Denmark',
  'Ethiopia',
  'Finland',
  'France',
  'Germany',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Italy',
  'Japan',
  'Korea',
  'Malaysia',
  'Maldives',
  'Mexico',
  'Morocco',
  'Nepal',
  'Netherlands',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Peru',
  'Russia',
  'Romania',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sweden',
  'Switzerland',
  'Thailand',
  'Turkey',
  'Uganda',
  'Ukraine',
  'United States',
  'United Kingdom',
  'Vietnam',
];

selectBtn.addEventListener('click', () => {
  wrapper.classList.toggle('active');
  searchInput.focus();
});

function showSelected(selected) {
  selectBtn.firstElementChild.innerText = selected.innerText;
  wrapper.classList.remove('active');
  searchInput.value = '';
  addCountry(selected.innerText);
}

function addCountry(selected) {
  optionBox.innerHTML = '';
  countries.forEach((country) => {
    let isSelected = country == selected ? 'selected' : '';
    let liTag = `<li onclick='showSelected(this)' class=${isSelected}>${country}</li>`;
    optionBox.insertAdjacentHTML('beforeend', liTag);
  });
}
addCountry();

searchInput.addEventListener('input', (e) => {
  letarr = [];
  let inputValue = e.target.value;
  arr = countries
    .filter((data) => {
      return data.toLowerCase().startsWith(inputValue);
    })
    .map((data) => `<li onclick='showSelected(this)'>${data}</li>`)
    .join('');
  optionBox.innerHTML = arr ? arr : `<p>Ooops! Country not found</p>`;
});
