import {showAlert} from './utils.js';
import {getData} from './api.js';

const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesListElement = document.querySelector('.pictures');

let randomPhotos;

getData().then((photos) => {

  randomPhotos = photos;
  const randomPhotosFragment = document.createDocumentFragment();

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
  picturesListElement.append(randomPhotosFragment);
  return photos;
}).catch((err) => {
  showAlert(err.message);
});

const getPhotoObject = (id) => randomPhotos.find((obj) => obj.id === Number(id));

export {picturesListElement, getPhotoObject};
