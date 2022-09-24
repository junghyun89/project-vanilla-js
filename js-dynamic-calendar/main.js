const currentDate = document.querySelector('.current-date');
const dateUl = document.querySelector('.days');
const dayUl = document.querySelector('.weeks');
const prevNextIcon = document.querySelectorAll('.icons span');

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const renderCalendar = () => {
  const firstDateofMonth = new Date(currentYear, currentMonth, 1).getDay(); // 이번달 시작 요일
  const lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 이번달 마지막 날짜
  const lastDayofMonth = new Date(
    currentYear,
    currentMonth,
    lastDateofMonth
  ).getDay(); // 이번달 마지막 요일
  const lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate(); // 지난달 마지막 날짜
  let dateLi = '';
  dateUl.innerHTML = '';
  dayUl.innerHTML = '';

  for (let i = firstDateofMonth; i > 0; i--) {
    dateLi += `<li class='inactive'>${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
        ? 'active'
        : '';
    dateLi += `<li class='${isToday}'>${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    dateLi += `<li class='inactive'>${i - lastDayofMonth + 1}</li>`;
  }
  for (let i = 0; i < day.length; i++) {
    const dayLi = `<li>${day[i]}</li>`;
    dayUl.innerHTML += dayLi;
  }

  currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
  dateUl.innerHTML += dateLi;
};
renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    currentMonth = icon.id === 'prev' ? currentMonth - 1 : currentMonth + 1;

    if (currentMonth < 0 || currentMonth > 11) {
      date = new Date(currentYear, currentMonth);
      currentYear = date.getFullYear();
      currentMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
