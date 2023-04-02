import { randomPhotos, renderPhotos } from './random-photos.js';
import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filtersFormElement = document.querySelector('.img-filters__form');
const filterElements = filtersFormElement.querySelectorAll('.img-filters__button');

const getMostCommentedPhotos = (photos) => Array.from(photos).sort((a, b) => b.comments.length - a.comments.length);

const getRandomPhotos = (photos, count = 10) => {
  const shuffled = Array.from(photos).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const onFilterClick = (evt) => {
  const selectedButton = evt.target.closest('button');

  if (!selectedButton) {
    return;
  }

  filterElements.forEach((element) => element.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');

  selectedButton.classList.add('img-filters__button--active');
  selectedButton.dispatchEvent(new Event('change'));
};

const onFilterChange = debounce((evt) => {
  if (evt.target.id === 'filter-random') {
    renderPhotos(getRandomPhotos(randomPhotos, RANDOM_PHOTOS_COUNT));
  }
  if (evt.target.id === 'filter-discussed') {
    renderPhotos(getMostCommentedPhotos(randomPhotos));
  }
  if (evt.target.id === 'filter-default') {
    renderPhotos(randomPhotos);
  }
}, DEBOUNCE_DELAY);

filtersFormElement.addEventListener('click', onFilterClick);
filtersFormElement.addEventListener('change', onFilterChange, true);
