import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


let timerId = null;
let targetDate = null;

const selectors = {
  buttonStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
selectors.buttonStart.addEventListener('click', handelrClickTimer);
selectors.buttonStart.disabled = true;

function handelrClickTimer() {
  timerId = setInterval(() => {
   const currentDate = new Date();
    let dateDifference = targetDate - currentDate;

    let objectDate = convertMs(dateDifference);
    let days = addLeadingZero(objectDate.days.toString());
    let hours = addLeadingZero(objectDate.hours.toString());
    let minutes = addLeadingZero(objectDate.minutes.toString());
    let seconds = addLeadingZero(objectDate.seconds.toString());

    selectors.days.textContent = days;
    selectors.hours.textContent = hours;
    selectors.minutes.textContent = minutes;
    selectors.seconds.textContent = seconds;

    if (dateDifference <= 0) {
      clearInterval(timerId);
      selectors.days.textContent = '00';
      selectors.hours.textContent = '00';
      selectors.minutes.textContent = '00';
      selectors.seconds.textContent = '00';
    }
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    targetDate = new Date(selectedDates[0]);

   const currentDate = new Date();
    console.log(currentDate);

    if (targetDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');

      selectors.buttonStart.disabled = true;
    } else {
      selectors.buttonStart.disabled = false;
    }
  },
};
flatpickr('input[type="text"]', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
