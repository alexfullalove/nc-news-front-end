import Axios from "axios";
const url = "https://thawing-fortress-68943.herokuapp.com/api";

const getArticles = () => {
  return Axios.get(`${url}/articles`).then(
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

export { getArticles, getSingleArticle, getComments };
