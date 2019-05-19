import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { getArticles } from "../api";
import SortBy from "./sort-by";
import { IoMdSync } from "react-icons/io";
import "../Article-list.css";
import InfiniteScroll from "react-infinite-scroll-component";

class ArticleList extends Component {
  state = {
    articles: [],
    loading: true,
    sortBy: "",
    hasMore: true,
    page: 1
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
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}
          >
            {this.state.articles.map(article => {
              return (
                <li key={article.article_id} article={article}>
                  <h3>{article.title}</h3>
                  <p>Author: {article.author}</p>
                  <p>Comments: {article.comment_count}</p>
                  <p>Votes: {article.votes}</p>
                  <p>Created: {article.created_at}</p>
                  <Link to={`/articles/${article.article_id}`}>
                    <button className="readme">READ</button>
                  </Link>
                  <p className="underline">_______________</p>
                </li>
              );
            })}
          </InfiniteScroll>
        </ul>
      </div>
    );
  }
  componentDidMount() {
    const { topic } = this.props;
    getArticles({ topic, sort_by: this.state.sortBy, page: this.state.page })
      .then(articles =>
        this.setState({
          articles,
          loading: false,
          page: this.state.page + 1
        })
      )
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

  fetchMoreData = () => {
    const { topic } = this.props;
    getArticles({ topic, sort_by: this.state.sortBy, page: this.state.page })
      .then(articles =>
        this.setState({
          articles: [...this.state.articles, ...articles],
          loading: false,
          page: this.state.page + 1
        })
      )
      .catch(({ response: { data, status } }) => {
        this.setState({ loading: false, hasMore: false });
      });
  };
}

export default ArticleList;
