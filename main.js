const clock = document.querySelector('.display');

setInterval(() => {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm;

  ampm = hours > 12 ? 'PM' : 'AM';
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? '0' + hours : hours;
  hours = hours == 0 ? 12 : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  clock.innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
}, 1000);
