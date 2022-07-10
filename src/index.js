import { galleryApi } from './js/galleryApi';
import createItem from './partials/gallery.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

const messageNotFound =
  '"Sorry, there are no images matching your search query. Please try again."';
const galleryClass = new galleryApi();

const onSubmitForm = e => {
  e.preventDefault();
  const { searchQuery } = e.currentTarget.elements;

  galleryClass.setQuary(searchQuery.value);
  galleryClass.fetchGalley().then(array => {
    if (array.length === 0) Notify.warning(messageNotFound);
    gallery.innerHTML = createItem(array);
  });
};

form.addEventListener('submit', onSubmitForm);
