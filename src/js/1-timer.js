import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.7.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/timer.css';

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]'); // Додайте цю змінну
  const daysEl = document.querySelector('[data-days]');
  const hoursEl = document.querySelector('[data-hours]');
  const minutesEl = document.querySelector('[data-minutes]');
  const secondsEl = document.querySelector('[data-seconds]');

  let timerId = null;
  let userSelectedDate = null;

  // Встановлюємо кнопку "Start" як неактивну за замовчуванням
  startBtn.setAttribute('disabled', true);

  // Функція для конвертації мілісекунд у дні, години, хвилини та секунди
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  // Функція для додавання ведучого нуля
  const addLeadingZero = value => String(value).padStart(2, '0');

  // Налаштування flatpickr
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate < new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        startBtn.setAttribute('disabled', true);
      } else {
        startBtn.removeAttribute('disabled');
      }
    },
  };

  // Ініціалізація flatpickr
  flatpickr('#datetime-picker', options);

  // Функція для оновлення таймера
  const updateTimer = () => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      startBtn.removeAttribute('disabled');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    daysEl.textContent = days;
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  };

  // Обробник події для кнопки "Start"
  startBtn.addEventListener('click', () => {
    timerId = setInterval(updateTimer, 1000);
    startBtn.setAttribute('disabled', true);
  });

  // Додатковий код для зупинки таймера
  const stopTimer = () => {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
  };

  // Додайте обробник події для зупинки таймера
  if (stopBtn) {
    stopBtn.addEventListener('click', stopTimer);
  }
});
