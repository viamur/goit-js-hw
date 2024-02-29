/* Счетчик состоит из спана и кнопок, которые, при клике, должны увеличивать и уменьшать его значение на единицу.

Создай переменную counterValue в которой будет храниться текущее значение счетчика и инициализируй её значением 0.
Добавь слушатели кликов на кнопки, внутри которых увеличивай или уменьшай значение счтетчика.
Обновляй интерфейс новым значением переменной counterValue. */

const ref = {
  decrement: document.querySelector('button[data-action="decrement"]'),
  increment: document.querySelector('button[data-action="increment"]'),
  value: document.querySelector('#value'),
};

let counterValue = 0;

function increment() {
  counterValue += 1;
  ref.value.textContent = counterValue;
}

function decrement() {
  counterValue -= 1;
  ref.value.textContent = counterValue;
}
ref.decrement.addEventListener('click', decrement);
ref.increment.addEventListener('click', increment);
