const wrapper = document.querySelector('.wrapper');
const backIcon = document.querySelector('header i');
const inputPart = document.querySelector('.input-part');
const inputTag = document.querySelector('.input-part input');
const infoTxt = document.querySelector('.info-txt');
const getLocationBtn = document.querySelector('.input-part button');
const weatherIcon = document.querySelector('.weather-part img');
console.log(weatherIcon.src);

let api;

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=15158171cb4853122d769e6733803088`;
  fetchData();
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add('error');
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert('Your browser not support geolocation api');
  }
}

function showWeatherInfo(info) {
  if (info.cod == '404') {
    infoTxt.innerText = `${inputTag.value} isn't a valid city name.`;
    infoTxt.classList.replace('pending', 'error');
    return;
  }
  const city = info.name;
  const country = info.sys.country;
  const { description, id } = info.weather[0];
  const { feels_like, humidity, temp } = info.main;

  infoTxt.classList.remove('pending', 'error');
  wrapper.classList.add('active');
  console.log(typeof id);
  if (id == 800) {
    weatherIcon.src = 'icons/clear.svg';
  } else if (id >= 200 && id <= 232) {
    weatherIcon.src = 'icons/storm.svg';
  } else if (id >= 600 && id <= 622) {
    weatherIcon.src = 'icons/snow.svg';
  } else if (id >= 701 && id <= 781) {
    weatherIcon.src = 'icons/haze.svg';
  } else if (id >= 801 && id <= 804) {
    weatherIcon.src = 'icons/cloud.svg';
  } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
    weatherIcon.src = 'icons/rain.svg';
  }

  document.querySelector('.numb').innerText = Math.floor(temp);
  document.querySelector('.weather').innerText = description;
  document.querySelector('.numb-2').innerText = Math.floor(feels_like);
  document.querySelector('.humidity span').innerText = `${humidity}%`;
  document.querySelector('.location span').innerText = `${city}, ${country}`;

  inputTag.value = '';
  infoTxt.classList.remove('pending', 'error');
  wrapper.classList.add('active');
}

function fetchData() {
  infoTxt.innerText = 'Getting weather details...';
  infoTxt.classList.add('pending');
  fetch(api)
    .then((res) => res.json())
    .then((result) => showWeatherInfo(result));
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=15158171cb4853122d769e6733803088`;
  fetchData();
}

backIcon.addEventListener('click', () => {
  wrapper.classList.remove('active');
  inputTag.focus();
});

inputTag.addEventListener('change', (e) => {
  requestApi(e.target.value);
});

getLocationBtn.addEventListener('click', getLocation);
