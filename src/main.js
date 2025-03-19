import pixabayApi, { hitsPerPage } from './js/pixabay-api';
import {
  clearGallery,
  hideLoader,
  renderGallery,
  resetForm,
  responseError,
  showLoader,
  setLoadMoreButton,
  scroll,
} from './js/render-functions';

const inputField = document.querySelector("[type='text']");
const form = document.querySelector('.form');
const loadButton = document.querySelector('.loadMoreButton');

let input;
let page = 1;
let currentQuery = '';

const isInputvalid = input => {
  return input.trim() !== '';
};

const handleSubmit = async (event, input) => {
  event.preventDefault();
  if (!isInputvalid(input) || input === currentQuery) {
    inputField.value = '';
    return;
  }

  if (input !== currentQuery) {
    page = 1;
  }

  currentQuery = input;
  showLoader();
  clearGallery();
  handleLoad(input, page);
};

const handleLoad = async (query, page) => {
  try {
    const data = await pixabayApi(query, page);
    const hits = data.hits;

    if (hits.length === 0) {
      responseError();
      setLoadMoreButton(false);

      return;
    }

    const totalHits = data.totalHits;
    const loadedHits = page * hitsPerPage;
    const noResultsLeft = loadedHits >= totalHits;

    if (noResultsLeft) {
      responseError(
        `We're sorry, but you've reached the end of search results.`
      );
      setLoadMoreButton(false);
      return;
    }

    setLoadMoreButton(true);
    renderGallery(hits);
  } catch (error) {
    console.log('error', error);
  } finally {
    hideLoader();
    resetForm();
  }
};

const handleLoadMore = async (event, query) => {
  event.preventDefault();
  page++;
  handleLoad(query, page);
};

form.addEventListener('submit', event => handleSubmit(event, input));
loadButton.addEventListener('click', event =>
  handleLoadMore(event, currentQuery)
);
inputField.addEventListener('input', e => {
  input = e.target.value;
});
