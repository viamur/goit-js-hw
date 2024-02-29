import vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_LOCAL_STORAGE = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new vimeo(iframe);

const saveInLocalStorage = (key, value) => {
  try {
    const convertInJSON = JSON.stringify(value);
    localStorage.setItem(key, convertInJSON);
  } catch (error) {
    console.log(error.message);
  }
};

const onSendTimeInlocalStorage = e => {
  const timeNowPlayer = e.seconds;
  saveInLocalStorage(KEY_LOCAL_STORAGE, timeNowPlayer);
};

player.on('timeupdate', throttle(onSendTimeInlocalStorage, 1000));

const loadFromLocalStorage = key => {
  try {
    const getItem = localStorage.getItem(key);
    return getItem === null ? undefined : JSON.parse(getItem);
  } catch (error) {
    console.log(error.message);
  }
};

const timeStartOnPlay = loadFromLocalStorage(KEY_LOCAL_STORAGE);

player
  .setCurrentTime(timeStartOnPlay)
  .then(function (seconds) {})
  .catch(function (error) {});
