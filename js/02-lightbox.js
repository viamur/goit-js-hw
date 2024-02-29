import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryDivRef = document.querySelector('.gallery');

const allItemsHtml = galleryItems
  .map(({ description, original, preview }) => {
    const htmlCode = `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview} " alt="${description}" />
</a>`;
    return htmlCode;
  })
  .join('');

galleryDivRef.innerHTML = allItemsHtml;

const lightbox = new SimpleLightbox('.gallery a');
lightbox.options.captionsData = 'alt';
lightbox.options.captionDelay = 250;
