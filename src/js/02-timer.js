import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputDateRef = document.querySelector('#datetime-picker');
const bntStartRef = document.querySelector('button');
const span = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

bntStartRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const selectDate = flatpickr(inputDateRef, options);

const diffTime = () => {
  const dateNow = Date.now();
  const selectDateMs = selectDate.selectedDates[0].getTime();
  return selectDateMs - dateNow;
};
const onChangeInput = () => {
  const diff = diffTime();
  if (diff < 0) {
    Notify.failure('Please choose a date in the future', {
      timeout: 4000,
    });
  } else {
    bntStartRef.disabled = false;
  }
};

const addLeadingZero = value => {
  return value.toString().padStart('2', '0');
};
const convertMs = ms => {
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
};

const onStartTimer = () => {
  const intervalId = setInterval(() => {
    const diff = diffTime() - 1000;
    if (diff < 0) {
      clearInterval(intervalId);
      return;
    }

    const objTime = convertMs(diff);

    for (let key in objTime) {
      span[key].textContent = addLeadingZero(objTime[key]);
    }
  }, 1000);
};

inputDateRef.addEventListener('change', onChangeInput);
bntStartRef.addEventListener('click', onStartTimer);
