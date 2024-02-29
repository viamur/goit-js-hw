import throttle from 'lodash.throttle';

const KEY_FORM_LOCALSTORAGE = 'feedback-form-state';
const form = document.querySelector('form');

let formData = {};

const setLocalStorage = (key, value) => {
  try {
    const makeJSON = JSON.stringify(value);
    localStorage.setItem(key, makeJSON);
  } catch (error) {
    console.log(error.message);
  }
};

const onSaveFormData = e => {
  const input = e.target;
  formData[input.name] = input.value;

  setLocalStorage(KEY_FORM_LOCALSTORAGE, formData);
};

form.addEventListener('input', throttle(onSaveFormData, 500));

const getLocalStorage = key => {
  try {
    const getItem = localStorage.getItem(key);
    return getItem === null ? undefined : JSON.parse(getItem);
  } catch (error) {
    console.log(error.message);
  }
};

const formFromStorage = getLocalStorage(KEY_FORM_LOCALSTORAGE);

if (formFromStorage) {
  for (const key in formFromStorage) {
    form.elements[key].value = formFromStorage[key];
    formData[key] = formFromStorage[key];
  }
}

const onSubmitForm = e => {
  e.preventDefault();

  console.log(formData);
  form.reset();
  localStorage.removeItem(KEY_FORM_LOCALSTORAGE);
};

form.addEventListener('submit', onSubmitForm);
