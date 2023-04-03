const picturePopupElement = document.querySelector('.big-picture');
const commentsListElement = document.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('.social__comment');
const loadCommentsElement = picturePopupElement.querySelector('.social__comments-loader');
const commentsCounterElement = picturePopupElement.querySelector('.social__comment-count');

const SHIFT = 5;
let commentsShift = 5;
let comments = [];

const createComment = (object) => {
  const newComment = commentTemplateElement.cloneNode(true);
  newComment.querySelector('.social__picture').src = object.avatar;
  newComment.querySelector('.social__picture').alt = object.name;
  newComment.querySelector('.social__text').textContent = object.message;
  return newComment;
};

const loadComments = () => {
  const sliceComments = comments.slice(0, commentsShift).map(createComment);
  if (comments.length <= commentsShift) {
    commentsCounterElement.innerHTML = `${comments.length} из ${comments.length} комментариев`;
    loadCommentsElement.classList.add('hidden');
  } else {
    commentsCounterElement.innerHTML = `${commentsShift} из ${comments.length} комментариев`;
    loadCommentsElement.classList.remove('hidden');
  }
  commentsListElement.replaceChildren(...sliceComments);
};

const updateBigPicture = (object) => {
  comments = object.comments;
  commentsShift = SHIFT;
  picturePopupElement.querySelector('.big-picture__img img').src = object.url;
  picturePopupElement.querySelector('.social__caption').textContent = object.description;
  picturePopupElement.querySelector('.likes-count').textContent = object.likes;
  loadComments(comments);
};

const loadNewComments = () => {
  const sliceComments = comments.slice(commentsShift, commentsShift + SHIFT).map(createComment);
  commentsShift += SHIFT;
  const commentCount = commentsListElement.childElementCount + sliceComments.length;

  if (commentCount === comments.length) {
    commentsCounterElement.innerHTML = `${commentCount} из ${comments.length} комментариев`;
    loadCommentsElement.classList.add('hidden');
  } else {
    commentsCounterElement.innerHTML = `${commentCount} из ${comments.length} комментариев`;
    loadCommentsElement.classList.remove('hidden');
  }
  commentsListElement.append(...sliceComments);
};

export {updateBigPicture, loadNewComments};
