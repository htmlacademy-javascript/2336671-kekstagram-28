import {setImageScale} from './image-scale.js';
import {resetEffects} from './effects.js';
import {sendData} from './api.js';
import {isEscape} from './utils.js';
import {showMessage} from './status-popup.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = uploadFormElement.querySelector('#upload-file');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionElement = uploadFormElement.querySelector('.text__description');
const imagePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const formSubmitElement = uploadFormElement.querySelector('.img-upload__submit');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
};

const PATTERN = /^#[a-zа-яё0-9]+$/i;

const pristine = new Pristine(uploadFormElement, pristineConfig, true);

const onDocumentKeydown = (evt) => {
  const isTextField = evt.target.matches('input[type="text"], textarea');
  if (isEscape(evt) && !isTextField) {
    uploadCancelElement.click();
  }
};

const onUploadFileChange = (evt) => {
  uploadOverlayElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  const data = evt.target.files.item(0);
  imagePreviewElement.src = URL.createObjectURL(data);

  setImageScale(100);
  resetEffects();
};

const blockSubmitButton = () => {
  formSubmitElement.disabled = true;
};

const unblockSubmitButton = () => {
  formSubmitElement.disabled = false;
};

const onCancelFormClick = () => {
  uploadOverlayElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const addHashtagValidator = (message, validate) => {
  pristine.addValidator(hashtagsElement, (value) => {
    const tags = value.toLowerCase().split(' ').filter(Boolean);
    return validate(tags);
  }, message, 1, true);
};

addHashtagValidator('Хэш-тэг начинается с #', (tags) => tags.every((tag) => tag.startsWith('#')));
addHashtagValidator('Хеш-тег должен состоять из букв и чисел', (tags) => tags.every((tag) => PATTERN.test(tag)));
addHashtagValidator('Хэштэг не должен быть болше 20 символов', (tags) => tags.every((tag) => tag.length < 20));
addHashtagValidator('Нельзя указать больше пяти хэш-тегов', (tags) => tags.length <= 5);
addHashtagValidator('Один и тот же хэш-тег не может быть использован дважды', (tags) => tags.length === new Set(tags).size);

pristine.addValidator(descriptionElement, (value) => value.length < 140, 'Комментарий не должен быть больше 140 символов', 1, true);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    const data = new FormData(evt.target);
    sendData(data)
      .then(() => {
        uploadCancelElement.click();
        showMessage(successTemplate);
      })
      .catch(() => {
        showMessage(errorTemplate);
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
};

const onFormReset = () => {
  pristine.reset();
};

uploadFileElement.addEventListener('change', onUploadFileChange);
uploadCancelElement.addEventListener('click', onCancelFormClick);
uploadFormElement.addEventListener('submit', onFormSubmit);
uploadFormElement.addEventListener('reset', onFormReset);
