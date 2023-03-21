const imageUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imageUploadForm.querySelector('#upload-file');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadPreview = imageUploadForm.querySelector('.img-upload__preview img');
const imageUploadCancel = imageUploadForm.querySelector('.img-upload__cancel');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
};

const PATTERN = /^#[a-zа-яё0-9]+$/i;

const pristine = new Pristine(imageUploadForm, pristineConfig, true);

const onDocumetnKeydown = (evt) => {
  const isEscapeKey = evt.key.startsWith('Esc');
  const isTextField = evt.target.matches('input[type="text"], textarea');
  if (isEscapeKey && !isTextField) {
    imageUploadCancel.click();
  }
};

const openUploadForm = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumetnKeydown);
  const [image] = uploadFile.files;
  imageUploadPreview.src = URL.createObjectURL(image);
};

function closeUploadForm() {
  imageUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

const addHashtagValidator = (message, validate) => {
  pristine.addValidator(textHashtags, (value) => {
    const tags = value.toLowerCase().split(' ').filter(Boolean);
    return validate(tags);
  }, message, 1, true);
};

addHashtagValidator('Хэш-тэг начинается с #', (tags) => tags.every((tag) => tag.startsWith('#')));
addHashtagValidator('Хеш-тег должен состоять из букв и чисел', (tags) => tags.every((tag) => PATTERN.test(tag)));
addHashtagValidator('Хэштэг не должен быть болше 20 символов', (tags) => tags.every((tag) => tag.length < 20));
addHashtagValidator('Нельзя указать больше пяти хэш-тегов', (tags) => tags.length <= 5);
addHashtagValidator('Один и тот же хэш-тег не может быть использован дважды', (tags) => tags.length === new Set(tags).size);

pristine.addValidator(textDescription, (value) => value.length < 140, 'Комментарий не должен быть больше 140 символов', 1, true);

const onSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    imageUploadForm.submit();
  }
};

const onFormReset = () => {
  pristine.reset();
};

uploadFile.addEventListener('change', openUploadForm);
imageUploadCancel.addEventListener('click', closeUploadForm);
imageUploadForm.addEventListener('submit', onSubmit);
imageUploadForm.addEventListener('reset', onFormReset);
