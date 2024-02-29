function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
/* Напиши скрипт создания и очистки коллекции элементов.Пользователь вводит количество элементов в input и нажимает кнопку Создать, после чего рендерится коллекция.При нажатии на кнопку Очистить, коллекция элементов очищается.

Создай функцию createBoxes(amount), которая принимает один параметр - число. Функция создает столько <div>, сколько указано в amount и добавляет их в div#boxes.

Размеры самого первого <div> - 30px на 30px.
Каждый элемент после первого, должен быть шире и выше предыдущего на 10px.
Все элементы должены иметь случайный цвет фона в формате HEX.Используй готовую функцию getRandomHexColor для получения цвета.

Создай функцию destroyBoxes(), которая очищает содержимое div#boxes, тем самым удаляя все созданные элементы. */

const ref = {
  input: document.querySelector('input'),
  buttonCreate: document.querySelector('button[data-create]'),
  buttonDestroy: document.querySelector('button[data-destroy]'),
  divBoxes: document.querySelector('#boxes'),
};
// добовл слушателей
ref.buttonCreate.addEventListener('click', onCreateBoxes);
ref.buttonDestroy.addEventListener('click', destroyBoxes);

// Изначальный размер div, и allBoxed храняться все созд div
let sizaDivBox = 30;
let allBoxes = '';

function onCreateBoxes() {
  createBoxes(ref.input.value);
  ref.input.value = '';
}
// Функция создает столько <div>, сколько указано в amount и добавляет их в div#boxes.
function createBoxes(amount) {
  for (let i = 1; i <= amount; i += 1) {
    const randomColor = getRandomHexColor();

    const box = `<div style="background-color: ${randomColor} ; width: ${sizaDivBox}px; height: ${sizaDivBox}px"></div>`;
    allBoxes += box;
    sizaDivBox += 10;
  }
  ref.divBoxes.innerHTML = allBoxes;
}

// Функция которая которая очищает содержимое div#boxes
function destroyBoxes() {
  ref.divBoxes.innerHTML = '';
  sizaDivBox = 30;
  allBoxes = '';
}
