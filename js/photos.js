import {photoPosts} from './data.js';

const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const randomPhotos = photoPosts();

const randomPhotosFragment = document.createDocumentFragment();

randomPhotos.forEach((photo) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  randomPhotosFragment.append(pictureElement);
});

picturesList.append(randomPhotosFragment);
