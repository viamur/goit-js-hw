import axios from 'axios';

export class GalleryApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28511639-fd0b78e787d23185784d45556';

  constructor() {
    this.page = 1;
    this.quary = null;
    this.totalPages = 0;
    this.totalHits = 0;
  }

  async fetchGalley() {
    const search = new URLSearchParams({
      key: this.#API_KEY,
      q: this.quary,
      page: this.page,
      per_page: 40,
      imageType: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
    try {
      const response = await axios.get(`${this.#BASE_URL}?${search}`);
      this.totalPages = Math.ceil(response.data.totalHits / 40);
      this.totalHits = response.data.totalHits;
      return response.data.hits;
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  increasePage() {
    this.page += 1;
  }

  setQuary(quary) {
    this.quary = quary;
  }

  getTotalHits() {
    return this.totalHits;
  }
}
