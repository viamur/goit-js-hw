function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
/* Напиши скрипт, который изменяет цвета фона элемента <body> через инлайн стиль при клике на button.change-color и выводит значение цвета в span.color.
 */

const bodyRef = document.querySelector('body');
const buttonChangeColor = document.querySelector('.change-color');
const outputSpanRef = document.querySelector('.color');

buttonChangeColor.addEventListener('click', onChangeColor);

function onChangeColor() {
  const hexColor = getRandomHexColor();
  bodyRef.style.backgroundColor = hexColor;
  outputSpanRef.textContent = hexColor;
}
