const imageUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
};

const pristine = new Pristine(imageUploadForm, pristineConfig, true);

const addHashtagValidator = (message, validate) => {
  pristine.addValidator(textHashtags, (value) => {
    const tags = value.toLowerCase().split(' ').filter(Boolean);
    return validate(tags);
  }, message, 1, true);
};

const validateHastag = () => {

  const pattern = /^#[a-zа-яё0-9]+$/i;

  addHashtagValidator('Хэш-тэг начинается с #', (tags) => tags.every((tag) => tag.startsWith('#')));
  addHashtagValidator('Хеш-тег должен состоять из букв и чисел', (tags) => tags.every((tag) => pattern.test(tag)));
  addHashtagValidator('Хэштэг не должен быть болше 20 символов', (tags) => tags.every((tag) => tag.length < 20));
  addHashtagValidator('Нельзя указать больше пяти хэш-тегов', (tags) => tags.length <= 5);
  addHashtagValidator('Один и тот же хэш-тег не может быть использован дважды', (tags) => tags.length === new Set(tags).size);
};

const validateDescription = () => {
  pristine.addValidator(textDescription, (value) => value.length < 140, 'Комментарий не должен быть больше 140 символов', 1, true);
};

const onSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    imageUploadForm.submit();
  } else {
    console.log(pristine.getErrors());
  }
};

const onFormReset = () => {
  pristine.reset();
};

const validateForm = () => {
  validateHastag();
  validateDescription();
};

export {validateForm, onFormReset, onSubmit};
