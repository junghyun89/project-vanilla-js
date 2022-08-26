const button = document.querySelector('button');

function onSuccess(position) {
  button.innerText = 'Detecting your location...';
  let { latitude, longitude } = position.coords;
  let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=994e90dd1b7641fc9f650365cf1ad28d`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      let allDetails = result.results[0].components;
      let { city, postcode, country } = allDetails;
      button.innerText = `${city} ${postcode}, ${country}`;
      console.table(allDetails);
    })
    .catch(() => {
      button.innerText = 'Something went wrong';
    });
}

function onError(error) {
  if (error.code == 1) {
    button.innerText = 'You denied the request';
  } else if (error.code == 2) {
    button.innerText = 'Location not available';
  } else {
    button.innerText = 'Something went wrong';
  }
  button.setAttribute('disabled', 'true');
}

button.addEventListener('click', () => {
  if (navigator.geolocation) {
    button.innerText = 'Allow to detect location';
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    button.innerText = 'Your browser not support';
  }
  console.log();
});
