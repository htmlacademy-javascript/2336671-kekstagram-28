import {isEscape} from './utils.js';

const bodyElement = document.querySelector('body');

let modalElement;

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    document.removeEventListener('keydown', onDocumentKeydown, true);
    evt.stopPropagation();
    modalElement.remove();
    modalElement = '';
  }
};

const closeModal = () => {
  document.removeEventListener('keydown', onDocumentKeydown, true);
  modalElement.remove();
  modalElement = '';
};

const onCloseButtonClick = (evt) => {
  if (evt.target.className === 'success__button') {
    closeModal();
  }
  if (evt.target.className === 'error__button') {
    closeModal();
  }
};

const onOutsideClick = (evt) => {
  if (evt.target.className === 'success') {
    closeModal();
  }
  if (evt.target.className === 'error') {
    closeModal();
  }
};

const showMessage = (template) => {
  const element = template.cloneNode(true);
  element.querySelector('button').addEventListener('click', onCloseButtonClick);
  element.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onDocumentKeydown, true);
  modalElement = element;
  bodyElement.append(element);
};

export { showMessage };
