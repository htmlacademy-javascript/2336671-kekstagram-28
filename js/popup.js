import {picturesList, getPhotoObject } from './random-photos.js';
import {updateBigPicture} from './popup_update.js';

const picturePopup = document.querySelector('.big-picture');
const closePicturePopup = picturePopup.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const openBigPhoto = (photoObject) => {
  picturePopup.classList.remove('hidden');
  body.classList.add('modal-open');
  updateBigPicture (photoObject);
};

const closeBigPhoto = () => {
  picturePopup.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeBigPhoto();
    }
  });
};

const onPhotoClick = (evt) => {
  if (evt.target.className === 'picture__img') {
    const photoObject = getPhotoObject (evt.target.dataset.id);
    openBigPhoto(photoObject);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeBigPhoto();
      }
    });
  }
};

picturesList.addEventListener('click', onPhotoClick);
closePicturePopup.addEventListener('click', closeBigPhoto);
