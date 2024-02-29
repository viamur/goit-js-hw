const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');

btnStopRef.disabled = true;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const reversDisabledBtn = () => {
  if (btnStartRef.disabled) {
    btnStartRef.disabled = false;
    btnStopRef.disabled = true;
  } else {
    btnStartRef.disabled = true;
    btnStopRef.disabled = false;
  }
};

let timerId;

const onStartChangeBg = () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  reversDisabledBtn();
};

const onStopChangeBg = () => {
  clearInterval(timerId);

  reversDisabledBtn();
};

btnStartRef.addEventListener('click', onStartChangeBg);
btnStopRef.addEventListener('click', onStopChangeBg);
