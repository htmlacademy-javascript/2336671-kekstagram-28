import {photoPosts} from './data.js';

const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const randomPhotos = photoPosts();

const randomPhotosFragment = document.createDocumentFragment();

randomPhotos.forEach((photo) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = photo.url;
  pictureImg.alt = photo.description;
  pictureImg.setAttribute('data-id', photo.id);
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  randomPhotosFragment.append(pictureElement);
});

picturesList.append(randomPhotosFragment);

const getPhotoObject = (id) => randomPhotos.find((obj) => obj.id === Number(id));

export {picturesList, getPhotoObject};
