import {getRandomInteger,createRandomIdFromRangeGenerator} from './utils.js';

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

const MAX_POSTS = 25;
const MAX_AVATARS = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS_ID = 1000;
const MAX_COMMENTS = 10;

const randomCommentId = createRandomIdFromRangeGenerator(1, MAX_COMMENTS_ID);

const generateComment = () => ({
  id: randomCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, MAX_AVATARS) }.svg`,
  message: `${MESSAGES[getRandomInteger(0, MESSAGES.length - 1)] } ${ MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]}`,
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const randomPostId = createRandomIdFromRangeGenerator(1, MAX_POSTS);
const randomUrlId = createRandomIdFromRangeGenerator(1, MAX_POSTS);

const createPhotoPost = () => ({
  id: randomPostId(),
  url: `photos/${ randomUrlId()}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS)}, generateComment)
});

export const photoPosts = () => Array.from({length: MAX_POSTS}, createPhotoPost);
