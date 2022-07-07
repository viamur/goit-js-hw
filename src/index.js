const fetchData = () => {
  console.log('object');
  return fetch('https://api.privatbank.ua/p24api/pboffice?city=Днепропетровск&address=Титова&json');
};

document.addEventListener('click', fetchData);
