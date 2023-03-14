const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');

const createComment = (object) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = object.avatar;
  newComment.querySelector('.social__picture').alt = object.name;
  newComment.querySelector('.social__text').textContent = object.message;
  return newComment;
};

const updateBigPicture = (object) => {
  bigPicture.querySelector('.big-picture__img img').src = object.url;
  bigPicture.querySelector('.social__caption').textContent = object.description;
  bigPicture.querySelector('.likes-count').textContent = object.likes;
  bigPicture.querySelector('.comments-count').textContent = object.comments.length;

  commentsList.replaceChildren(...object.comments.map(createComment));
};

export {updateBigPicture};
