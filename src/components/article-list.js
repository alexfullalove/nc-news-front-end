import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import { getArticles } from "../api";

class ArticleList extends Component {
  state = {
    articles: [],
    loading: true
  };

  render() {
    if (this.state.loading) return <p>loading...</p>;
    return (
      <div className="article-list">
        <h1>Articles</h1>
        <ul>
          {this.state.articles.map(article => {
            return (
              <li key={article.article_id} article={article}>
                <Link to={`/articles/${article.article_id}`}>
                  <h4>{article.title}</h4>
                </Link>
                <p>Author: {article.author}</p>
                <p>Comments: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    getArticles().then(articles => this.setState({ articles, loading: false }));
  }
}

export default ArticleList;
