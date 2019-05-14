import React from "react";
import { getSingleArticle } from "../api";

class ArticleCard extends React.Component {
  state = { article: [], loading: true };
  render() {
    return (
      <div className="article-card">
        <h1>{this.state.article.title}</h1>
      </div>
    );
  }
  componentDidMount() {
    getSingleArticle(this.props.article_id).then(article =>
      this.setState({ article })
    );
  }
}

export default ArticleCard;
