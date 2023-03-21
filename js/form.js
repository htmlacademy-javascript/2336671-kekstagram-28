import { validateForm, onFormReset, onSubmit } from './form-validation.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imageUploadForm.querySelector('#upload-file');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
const imageUploadCancel = imageUploadForm.querySelector('.img-upload__cancel');

const isEscape = (evt) => {
  if (evt.key === 'Escape') {
    imageUploadCancel.click();
  }
};

const openUploadForm = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', isEscape);
  const [image] = uploadFile.files;
  imageUploadPreview.src = URL.createObjectURL(image);
  validateForm();
};

const closeUploadForm = () => {
  imageUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

imageUploadForm.addEventListener('change', openUploadForm);
imageUploadCancel.addEventListener('click', closeUploadForm);
imageUploadForm.addEventListener('submit', onSubmit);
imageUploadForm.addEventListener('reset', onFormReset);
