const ingredients = ['Potatoes', 'Mushrooms', 'Garlic', 'Tomatos', 'Herbs', 'Condiments'];

/* Напиши скрипт, который для каждого элемента массива ingredients:

Создаст отдельный элемент <li>. Обзательно используй метод document.createElement().
Добавит название ингредиента как его текстовое содержимое.
Добавит элементу класс item.
После чего вставит все <li> за одну операцию в список ul.ingredients. */

const ulRef = document.querySelector('#ingredients');

const itemAll = ingredients.map(el => {
  const itemLi = document.createElement('li');
  itemLi.classList.add('item');
  itemLi.textContent = el;
  return itemLi;
});

ulRef.append(...itemAll);
