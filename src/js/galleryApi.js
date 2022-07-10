import axios from 'axios';

export class galleryApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28511639-fd0b78e787d23185784d45556';

  constructor() {
    this.page = 1;
    this.quary = null;
  }
  fetchGalley() {
    const search = new URLSearchParams({
      key: this.#API_KEY,
      q: this.quary,
      page: this.page,
      per_page: 40,
      imageType: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
    return axios
      .get(`${this.#BASE_URL}?${search}`)
      .then(response => {
        return response.data.hits;
      })
      .catch(err => console.log(err));
  }

  increasePage() {
    this.page += 1;
  }

  setQuary(quary) {
    this.quary = quary;
  }
}
