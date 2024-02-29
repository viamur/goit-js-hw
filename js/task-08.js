/* Обработка отправки формы form.login-form должна быть по событию submit.
При отправке формы страница не должна перезагружаться.
Если в форме есть незаполненные поля, выводи alert с предупреждением о том, что все поля должны быть заполнены.
Если пользователь заполнил все поля и отправил форму, собери значения полей в обьект, где имя поля будет именем свойства, а значение поля - значением свойства. Для доступа к элементам формы используй свойство elements.
Выведи обьект с введенными данными в консоль и очисти значения полей формы методом reset.
 */

const formRef = document.querySelector('.login-form');

formRef.addEventListener('submit', onValidation);

function onValidation(event) {
  const { password, email } = event.currentTarget.elements;
  event.preventDefault();

  if (email.value === '' || password.value === '') {
    alert('все поля должны быть заполнены');
  } else {
    let objValue = {
      [email.name]: email.value,
      [password.name]: password.value,
    };
    console.log(objValue);
    formRef.reset();
  }
}
