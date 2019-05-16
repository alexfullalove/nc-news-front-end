import React from "react";
import CommentList from "./comment-list";
import { getSingleArticle, getComments, postComment } from "../api";

class ArticleCard extends React.Component {
  state = {
    article: [],
    loading: true,
    comments: [],
    showComments: false,
    isLoggedIn: this.props.isLoggedIn,
    currentUser: this.props.currentUser
  };
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
        <button onClick={this.toggleComments}>Show / Hide comments</button>
        {this.state.showComments && (
          <ul className="comment-list">
            <CommentList
              comments={this.state.comments}
              currentUser={this.props.currentUser}
              isLoggedIn={this.props.isLoggedIn}
              handlePostComment={this.handlePostComment}
            />
          </ul>
        )}
        <p>Total comments: {this.state.article.comment_count}</p>
      </div>
    );
  }
  handlePostComment = comment => {
    const newComment = {
      author: this.props.currentUser,
      body: comment,
      created_at: Date.now(),
      votes: 0,
      comment_id: Date.now()
    };
    postComment(newComment, this.props.article_id);
    this.setState({ comments: [newComment, ...this.state.comments] });
  };

  componentDidMount() {
    getSingleArticle(this.props.article_id).then(article =>
      this.setState({ article, loading: false })
    );
    getComments(this.props.article_id).then(comments =>
      this.setState({ comments })
    );
  }
  toggleComments = () => {
    this.setState(prevState => {
      return { showComments: !prevState.showComments };
    });
  };
}

export default ArticleCard;
