import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryDivRef = document.querySelector('.gallery');

const allItemsHtml = galleryItems
  .map(({ description, original, preview }) => {
    const htmlCode = `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    return htmlCode;
  })
  .join('');

galleryDivRef.innerHTML = allItemsHtml;

galleryDivRef.addEventListener('click', event => {
  event.preventDefault();
  const elem = event.target;

  if (elem.nodeName !== 'IMG') {
    return;
  }

  elem.src = elem.dataset.source;

  const modal = basicLightbox.create(elem.outerHTML);
  modal.show(addListenerOnKeyDown());

  function addListenerOnKeyDown() {
    document.addEventListener('keydown', onModalClosewichKeyDown);
  }

  function onModalClosewichKeyDown(event) {
    if (event.code === 'Escape') {
      modal.close();
      document.removeEventListener('keydown', onModalClosewichKeyDown);
    }
  }
});
