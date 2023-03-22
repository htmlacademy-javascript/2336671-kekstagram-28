import {picturesList, getPhotoObject } from './random-photos.js';
import {updateBigPicture, loadNewComments} from './popup_update.js';

const picturePopup = document.querySelector('.big-picture');
const closePicturePopup = picturePopup.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const loadCommentsButton = picturePopup.querySelector('.comments-loader');

const isEscape = (evt) => {
  if (evt.key === 'Escape') {
    closePicturePopup.click();
  }
};

const isClickOutside = (evt) => {
  if (evt.target.className === 'big-picture overlay') {
    closePicturePopup.click();
  }
};

const onLoadCommentClick = () => {
  loadNewComments();
};

const openBigPhoto = (photoObject) => {
  picturePopup.classList.remove('hidden');
  body.classList.add('modal-open');

  updateBigPicture (photoObject);

  document.addEventListener('keydown', isEscape);
  body.addEventListener('click', isClickOutside);
  loadCommentsButton.addEventListener('click', onLoadCommentClick);
};

const closeBigPhoto = () => {
  picturePopup.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', isEscape);
  body.removeEventListener('click', isClickOutside);
  loadCommentsButton.removeEventListener('click', onLoadCommentClick);
};

const onPhotoClick = (evt) => {
  if (evt.target.className === 'picture__img') {
    const photoObject = getPhotoObject (evt.target.dataset.id);
    openBigPhoto(photoObject);
  }
};

picturesList.addEventListener('click', onPhotoClick);
closePicturePopup.addEventListener('click', closeBigPhoto);
