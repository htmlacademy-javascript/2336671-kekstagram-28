import {picturesListElement, getPhotoObject } from './random-photos.js';
import {updateBigPicture, loadNewComments} from './random-photos-preview-updates.js';
import {isEscape} from './utils.js';

const popupElement = document.querySelector('.big-picture');
const closePopupElement = popupElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const loadCommentsElement = popupElement.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    closePopupElement.click();
  }
};

const onOutsideClick = (evt) => {
  if (evt.target.className === 'big-picture overlay') {
    closePopupElement.click();
  }
};

const onLoadCommentClick = (evt) => {
  evt.preventDefault();
  loadNewComments();
};

const openBigPhoto = (photoObject) => {
  popupElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  updateBigPicture (photoObject);

  document.addEventListener('keydown', onDocumentKeydown);
  bodyElement.addEventListener('click', onOutsideClick);
  loadCommentsElement.addEventListener('click', onLoadCommentClick);
};

const onPopupCloseClick = () => {
  popupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyElement.removeEventListener('click', onOutsideClick);
  loadCommentsElement.removeEventListener('click', onLoadCommentClick);
};

const onPhotoClick = (evt) => {
  if (evt.target.className === 'picture__img') {
    evt.preventDefault();
    const photoObject = getPhotoObject (evt.target.dataset.id);
    openBigPhoto(photoObject);
  }
};

picturesListElement.addEventListener('click', onPhotoClick);
closePopupElement.addEventListener('click', onPopupCloseClick);

