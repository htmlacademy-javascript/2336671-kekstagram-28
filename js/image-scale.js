const imageUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const setDefaultScale = () => {
  imageUploadPreview.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
};

const setImageScale = (scaleValue) => {
  imageUploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

const onMinusClick = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  scaleValue -= SCALE_STEP;

  if (scaleValue < MIN_SCALE) {
    scaleValue = MIN_SCALE;
  }

  scaleControlValue.value = `${scaleValue}%`;
  setImageScale(scaleValue);
};

const onPlusClick = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  scaleValue += SCALE_STEP;

  if (scaleValue > MAX_SCALE) {
    scaleValue = MAX_SCALE;
  }

  scaleControlValue.value = `${scaleValue}%`;
  setImageScale(scaleValue);
};

scaleControlSmaller.addEventListener('click', onMinusClick);
scaleControlBigger.addEventListener('click', onPlusClick);

export {setDefaultScale};
