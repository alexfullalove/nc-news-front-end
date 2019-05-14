import React from "react";
import { getSingleArticle } from "../api";

class ArticleCard extends React.Component {
  state = { article: [], loading: true };
  render() {
    if (this.state.loading) return <p>loading...</p>;
    return (
      <div className="article-card">
        <h1>{this.state.article.title}</h1>
        <h3>Author: {this.state.article.author}</h3>
        <h4>Topic: {this.state.article.topic}</h4>
        <h5>Article:</h5>
        <p>{this.state.article.body}</p>
        <p>Date: {this.state.article.created_at}</p>
        <p>Votes: {this.state.article.votes}</p>
        <p>Total comments: {this.state.article.comment_count}</p>
      </div>
    );
  }
  componentDidMount() {
    getSingleArticle(this.props.article_id).then(article =>
      this.setState({ article, loading: false })
    );
  }
}

export default ArticleCard;
