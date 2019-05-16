import Axios from "axios";
const url = "https://thawing-fortress-68943.herokuapp.com/api";

const getArticles = params => {
  return Axios.get(`${url}/articles`, { params }).then(
    ({ data: { articles } }) => articles
  );
};

const getSingleArticle = article_id => {
  return Axios.get(`${url}/articles/${article_id}`).then(
    ({ data: { article } }) => article
  );
};

const getComments = article_id => {
  return Axios.get(`${url}/articles/${article_id}/comments`).then(
    ({ data: { comments } }) => comments
  );
};

const getTopics = () => {
  return Axios.get(`${url}/topics`).then(({ data: { topics } }) => topics);
};

const logIn = username => {
  return Axios.get(`${url}/users/${username}`)
    .then(({ data: { user } }) => user)
    .catch(({ message }) => message);
};

const postComment = (newComment, article_id) => {
  const commentToPost = {
    username: newComment.author,
    body: newComment.body
  };
  return Axios.post(`${url}/articles/${article_id}/comments`, commentToPost)
    .then(({ data: { comment } }) => comment)
    .catch(({ message }) => message);
};

const deleteComment = comment_id => {
  console.log(comment_id, "<---- comment to delete");
  return Axios.delete(`${url}/comments/${comment_id}`).catch(
    ({ message }) => message
  );
};

export {
  getArticles,
  getSingleArticle,
  getComments,
  getTopics,
  logIn,
  postComment,
  deleteComment
};
