import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { getArticles } from "../api";
import SortBy from "./sort-by";
import { IoMdSync } from "react-icons/io";
import "../Article-list.css";

class ArticleList extends Component {
  state = {
    articles: [],
    loading: true,
    sortBy: ""
  };

  render() {
    if (this.state.loading)
      return (
        <p className="loading">
          <IoMdSync />
        </p>
      );
    return (
      <div className="article-list">
        <h1 id="articles-title">{this.props.topic} Articles</h1>
        <SortBy handleSort={this.handleSort} />
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
    getArticles({ topic, sort_by: this.state.sortBy })
      .then(articles => this.setState({ articles, loading: false }))
      .catch(({ response: { data, status } }) => {
        this.setState({ loading: false });
        navigate("/error", {
          state: { from: "articles", message: data.message, status }
        });
      });
  }
  handleSort = sortBy => {
    this.setState({ sortBy: sortBy });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortBy !== this.state.sortBy) {
      const { topic } = this.props;
      getArticles({ topic, sort_by: this.state.sortBy }).then(articles =>
        this.setState({ articles, loading: false })
      );
    }
  }
}

export default ArticleList;
