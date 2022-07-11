import { GalleryApi } from './js/galleryApi';
import createItem from './partials/gallery.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

const message = {
  textNotFound: '"Sorry, there are no images matching your search query. Please try again."',
  textLastPage: "We're sorry, but you've reached the end of search results.",

  notFound() {
    Notify.failure(this.textNotFound);
  },
  lastPage() {
    Notify.warning(this.textLastPage);
  },
  totalHits(value) {
    Notify.info(`Hooray! We found ${value} images.`);
  },
};

const galleryClass = new GalleryApi();
const gla = new SimpleLightbox('.gallery a');

const scrollTop = () => {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const fetchAndRender = async () => {
  const arrayPromis = await galleryClass.fetchGalley();
  if (arrayPromis.length !== 0) {
    gallery.insertAdjacentHTML('beforeend', createItem(arrayPromis));
    gla.refresh();
  } else {
    message.notFound();
  }
};

const startIntersectionObserver = () => {
  const callback = async (entries, observer) => {
    if (galleryClass.page !== galleryClass.totalPages) {
      if (entries[0].isIntersecting) {
        galleryClass.increasePage();
        await fetchAndRender();
        scrollTop();
        observer.unobserve(entries[0].target);
        observer.observe(document.querySelector('.photo-card:last-child'));
      }
    } else {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        message.lastPage();
      }
    }
  };

  const observer = new IntersectionObserver(callback, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.0,
  });
  observer.observe(document.querySelector('.photo-card:last-child'));
};

const onSubmitForm = async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  galleryClass.resetPage();

  const { searchQuery } = e.currentTarget.elements;
  galleryClass.setQuary(searchQuery.value.trim());
  await fetchAndRender();
  if (galleryClass.getTotalHits() !== 0) {
    message.totalHits(galleryClass.getTotalHits());
    startIntersectionObserver();
  }
};

form.addEventListener('submit', onSubmitForm);
