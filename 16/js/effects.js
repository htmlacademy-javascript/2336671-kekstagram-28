const effectsListElement = document.querySelector('.effects__list');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

let currentToken = '';
let currentEffect = '';

const effects = {
  chrome: {
    filter: 'grayscale',
    slider: {
      start: 1,
      step: 0.1,
      range: {
        'min': 0,
        'max': 1
      }
    },
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    slider: {
      start: 1,
      step: 0.1,
      range: {
        'min': 0,
        'max': 1
      }
    },
    unit: ''
  },
  marvin: {
    filter: 'invert',
    slider: {
      start: 100,
      step: 1,
      range: {
        'min': 0,
        'max': 100
      }
    },
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    slider: {
      start: 3,
      step: 0.1,
      range: {
        'min': 0,
        'max': 3
      }
    },
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    slider: {
      start: 3,
      step: 0.1,
      range: {
        'min': 1,
        'max': 3
      }
    },
    unit: ''
  }
};

noUiSlider.create(sliderElement, {
  start: 100,
  step: 10,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  },
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  }
});

const resetEffects = () => {
  effectLevelElement.classList.add('hidden');
  imagePreviewElement.removeAttribute('style');
  imagePreviewElement.removeAttribute('class');
};

const setEffect = (effect) => {
  if (effect !== 'none') {
    currentEffect = effect;
    imagePreviewElement.style.setProperty('filter',`${effects[effect].filter}(${effects[effect].slider.start}${effects[effect].unit})`);
    effectLevelElement.classList.remove('hidden');

    if (currentToken === '') {
      currentToken = `effects__preview--${effect}`;
      imagePreviewElement.classList.add(currentToken);
      sliderElement.noUiSlider.updateOptions(effects[effect].slider);
      effectLevelValueElement.value = sliderElement.noUiSlider.get();
      return;
    }

    imagePreviewElement.classList.replace(currentToken, `effects__preview--${effect}`);
    currentToken = `effects__preview--${effect}`;
    sliderElement.noUiSlider.updateOptions(effects[effect].slider);
    effectLevelValueElement.value = sliderElement.noUiSlider.get();
  } else {
    imagePreviewElement.classList.remove(currentToken);
    effectLevelElement.classList.add('hidden');
    effectLevelValueElement.value = '';
    imagePreviewElement.style.setProperty('filter', '');
    currentEffect = '';
    currentToken = '';
  }
};

const onEffectClick = (evt) => {
  setEffect(evt.target.value);
};

const onSliderChange = () => {
  effectLevelValueElement.value = sliderElement.noUiSlider.get();
  imagePreviewElement.style.setProperty('filter', `${effects[currentEffect].filter}(${effectLevelValueElement.value}${effects[currentEffect].unit})`);
};

effectsListElement.addEventListener('change', onEffectClick);
sliderElement.noUiSlider.on('slide', onSliderChange);

export {resetEffects};
