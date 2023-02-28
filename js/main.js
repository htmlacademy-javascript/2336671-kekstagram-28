const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Эклектика подрывает мир.',
  'Дуализм неоднозначен.',
  'Принцип восприятия подрывает непредвиденный язык образов.',
  'Гносеология вырождена.',
  'Созерцание, как принято считать, подчеркивает неоднозначный интеллект.',
  'Апостериори, искусство контролирует знак.'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error(`Перебраны все числа из диапазона от ${ min } до ${ max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const randomCommentId = createRandomIdFromRangeGenerator(1, 1000);

const generateComment = () => ({
  id: randomCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const randomPostId = createRandomIdFromRangeGenerator(1, 25);
const randomUrlId = createRandomIdFromRangeGenerator(1, 25);

const createPhotoPost = () => ({
  id: randomPostId(),
  url: `photos/${ randomUrlId()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 10)}, generateComment)
});

const photoPosts = Array.from({length: 25}, createPhotoPost);

console.log(photoPosts);
