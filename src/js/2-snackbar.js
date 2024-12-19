import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/snackbar.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const { delay, state } = event.currentTarget;

  const delayValue = Number(delay.value);
  const stateValue = state.value;

  createPromise(delayValue, stateValue);
}

function createPromise(delay, state) {
  const shouldResolve = state === 'fulfilled';

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight', // Вказуємо правильну позицію
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight', // Вказуємо правильну позицію
      });
    });
}
