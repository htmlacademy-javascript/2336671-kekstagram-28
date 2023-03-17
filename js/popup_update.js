const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const loadCommentsButton = bigPicture.querySelector('.social__comments-loader');

let commentsShift = 5;
let comments = [];

const createComment = (object) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = object.avatar;
  newComment.querySelector('.social__picture').alt = object.name;
  newComment.querySelector('.social__text').textContent = object.message;
  return newComment;
};

const loadComments = () => {
  const sliceComments = comments.slice(0, commentsShift).map(createComment);
  if (comments.length <= commentsShift) {
    bigPicture.querySelector('.social__comment-count').innerHTML = `${comments.length} из ${comments.length} комментариев`;
    loadCommentsButton.classList.add('hidden');
  } else {
    bigPicture.querySelector('.social__comment-count').innerHTML = `${commentsShift} из ${comments.length} комментариев`;
    loadCommentsButton.classList.remove('hidden');
  }
  commentsList.replaceChildren(...sliceComments);
};

const updateBigPicture = (object) => {
  comments = object.comments;
  commentsShift = 5;
  bigPicture.querySelector('.big-picture__img img').src = object.url;
  bigPicture.querySelector('.social__caption').textContent = object.description;
  bigPicture.querySelector('.likes-count').textContent = object.likes;
  loadComments(comments);
};

const loadNewComments = () => {
  const sliceComments = comments.slice(commentsShift, commentsShift + 5).map(createComment);
  commentsShift += 5;
  const commentCount = commentsList.childElementCount + sliceComments.length;

  if (commentCount === comments.length) {
    bigPicture.querySelector('.social__comment-count').innerHTML = `${commentCount} из ${comments.length} комментариев`;
    loadCommentsButton.classList.add('hidden');
  } else {
    bigPicture.querySelector('.social__comment-count').innerHTML = `${commentCount} из ${comments.length} комментариев`;
    loadCommentsButton.classList.remove('hidden');
  }
  commentsList.append(...sliceComments);
};

export {updateBigPicture, loadNewComments};
