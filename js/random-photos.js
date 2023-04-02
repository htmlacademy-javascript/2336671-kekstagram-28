import {showAlert} from './utils.js';
import {getData} from './api.js';

const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesListElement = document.querySelector('.pictures');
const filtersElement = document.querySelector('.img-filters');

let randomPhotos;

const renderPhotos = (photos) => {
  const randomPhotosFragment = document.createDocumentFragment();
  const pictureslist = document.querySelectorAll('.picture');
  pictureslist.forEach((element) => element.parentNode.removeChild(element));
  photos.forEach((photo) => {
    const pictureElement = picturesTemplate.cloneNode(true);
    const pictureImg = pictureElement.querySelector('.picture__img');
    pictureImg.src = photo.url;
    pictureImg.alt = photo.description;
    pictureImg.setAttribute('data-id', photo.id);
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    randomPhotosFragment.append(pictureElement);
  });
  picturesListElement.appendChild(randomPhotosFragment);
};

getData().then((photos) => {
  randomPhotos = photos;
  renderPhotos(photos);
  return photos;
}).then(() => {
  filtersElement.classList.remove('img-filters--inactive');
})
  .catch((err) => {
    showAlert(err.message);
  });

const getPhotoObject = (id) => randomPhotos.find((obj) => obj.id === Number(id));

export {picturesListElement, getPhotoObject, randomPhotos, renderPhotos};
