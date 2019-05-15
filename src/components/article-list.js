import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import { getArticles } from "../api";
import SortBy from "./sort-by";

class ArticleList extends Component {
  state = {
    articles: [],
    loading: true,
    sortBy: ""
  };

  render() {
    if (this.state.loading) return <p>loading...</p>;
    return (
      <div className="article-list">
        <h1>{this.props.topic} Articles</h1>
        <SortBy />
        <ul>
          {this.state.articles.map(article => {
            return (
              <li key={article.article_id} article={article}>
                <Link to={`/articles/${article.article_id}`}>
                  <h3>{article.title}</h3>
                </Link>
                <p>Author: {article.author}</p>
                <p>Comments: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
                <p>Created: {article.created_at}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    const { topic } = this.props;
    getArticles({ topic }).then(articles =>
      this.setState({ articles, loading: false })
    );
  }
}

export default ArticleList;
