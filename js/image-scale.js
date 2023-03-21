const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const SCALE_STEP = 25;

const scaleImageSmaller = () => {
  scaleControlValue.value -= SCALE_STEP;
};

export {scaleControlSmaller, scaleControlBigger, scaleImageSmaller};
