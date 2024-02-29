import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');
const { delay, step, amount } = form.elements;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const onCreatePromises = e => {
  e.preventDefault();

  let delayAndStep = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delayAndStep)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });
    delayAndStep += Number(step.value);
  }
};

form.addEventListener('submit', onCreatePromises);
