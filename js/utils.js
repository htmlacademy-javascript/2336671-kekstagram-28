const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const debounce = (callback, delay = 500) => {
  let timeoutId;

  return (...args) => {

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};


const showAlert = (message) => {
  const alertContainer = document.createElement('section');
  alertContainer.classList.add('error');

  const inner = document.createElement('div');
  inner.classList.add('error__inner');

  const h2 = document.createElement('h2');
  h2.classList.add('error__title');
  h2.style.setProperty('line-height', '40px');

  h2.textContent = message;
  alertContainer.appendChild(inner);
  inner.appendChild(h2);
  document.body.append(alertContainer);
};

const isEscape = (evt) => evt.key === 'Escape';

export { getRandomInteger, createRandomIdFromRangeGenerator, showAlert, isEscape, debounce };
