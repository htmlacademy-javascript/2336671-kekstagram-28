import { randomPhotos, renderPhotos } from './random-photos.js';
import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;

const filtersFormElement = document.querySelector('.img-filters__form');
const filterElements = filtersFormElement.querySelectorAll('.img-filters__button');

const getMostCommentedPhotos = (photos) => Array.from(photos).sort((a, b) => b.comments.length - a.comments.length);

const getRandomPhotos = (photos, count = 10) => {
  const shuffled = Array.from(photos).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const debounceDefault = debounce(() => renderPhotos(randomPhotos), 500);
const debounceRandom = debounce(() => renderPhotos(getRandomPhotos(randomPhotos, RANDOM_PHOTOS_COUNT)), 500);
const debounceCommented = debounce(() => renderPhotos(getMostCommentedPhotos(randomPhotos)), 500);

const toggleTab = (target) => {
  filterElements.forEach((element) => element.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
};

const setFilterClick = (evt) => {
  if (evt.target.id === 'filter-default') {
    toggleTab(evt.target);
    debounceDefault();
  }
  if (evt.target.id === 'filter-random') {
    toggleTab(evt.target);
    debounceRandom();
  }
  if (evt.target.id === 'filter-discussed') {
    toggleTab(evt.target);
    debounceCommented();
  }
};

filtersFormElement.addEventListener('click', setFilterClick);
