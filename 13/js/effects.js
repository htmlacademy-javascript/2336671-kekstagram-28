const effectList = document.querySelector('.effects__list');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

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

noUiSlider.create(slider, {
  start: 100,
  step: 10,
  range: {
    'min': 0,
    'max': 100
  },
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

const resetEffects = () => {
  effectLevel.classList.add('hidden');
  imageUploadPreview.style.filter = '';
  imageUploadPreview.classList = '';
};

const setEffect = (effect) => {
  if (effect !== 'none') {
    currentEffect = effect;
    imageUploadPreview.style.filter = `${effects[effect].filter}(${effects[effect].slider.start}${effects[effect].unit})`;
    effectLevel.classList.remove('hidden');

    if (currentToken === '') {
      currentToken = `effects__preview--${effect}`;
      imageUploadPreview.classList.add(currentToken);
      slider.noUiSlider.updateOptions(effects[effect].slider);
      effectLevelValue.value = slider.noUiSlider.get();
      return;
    }

    imageUploadPreview.classList.replace(currentToken, `effects__preview--${effect}`);
    currentToken = `effects__preview--${effect}`;
    slider.noUiSlider.updateOptions(effects[effect].slider);
    effectLevelValue.value = slider.noUiSlider.get();
  } else {
    imageUploadPreview.classList.remove(currentToken);
    effectLevel.classList.add('hidden');
    effectLevelValue.value = '';
    imageUploadPreview.style.filter = '';
    currentEffect = '';
    currentToken = '';
  }
};

const onEffectClick = (evt) => {
  setEffect(evt.target.value);
};

const onSliderChange = () => {
  effectLevelValue.value = slider.noUiSlider.get();
  imageUploadPreview.style.filter = `${effects[currentEffect].filter}(${effectLevelValue.value}${effects[currentEffect].unit})`;
};

effectList.addEventListener('change', onEffectClick);
slider.noUiSlider.on('slide', onSliderChange);

export {resetEffects};
