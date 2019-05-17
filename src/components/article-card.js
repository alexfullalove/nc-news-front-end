import React from "react";
import CommentList from "./comment-list";
import { navigate } from "@reach/router";
import {
  getSingleArticle,
  getComments,
  postComment,
  deleteComment,
  patchArticleVotes
} from "../api";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "../Article-card.css";

class ArticleCard extends React.Component {
  state = {
    article: [],
    loading: true,
    comments: [],
    showComments: false,
    votes: 0,
    currentVote: 0
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
        <p>Votes: {this.state.article.votes + this.state.votes}</p>
        {this.props.isLoggedIn && (
          <button
            id="like-button"
            disabled={this.state.currentVote === 1}
            onClick={e =>
              this.state.currentVote === -1
                ? this.handleVote(e, 2)
                : this.handleVote(e, 1)
            }
          >
            <FaThumbsUp />
          </button>
        )}
        {this.props.isLoggedIn && (
          <button
            id="dislike-button"
            disabled={this.state.currentVote === -1}
            onClick={e =>
              this.state.currentVote === 1
                ? this.handleVote(e, -2)
                : this.handleVote(e, -1)
            }
          >
            <FaThumbsDown />
          </button>
        )}
        <ul className="comment-list">
          <CommentList
            comments={this.state.comments}
            currentUser={this.props.currentUser}
            isLoggedIn={this.props.isLoggedIn}
            handlePostComment={this.handlePostComment}
            handleDeleteComment={this.handleDeleteComment}
          />
        </ul>
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
  handleDeleteComment = (e, comment_id) => {
    deleteComment(comment_id);
    this.setState({
      comments: this.state.comments.filter(comment => {
        return comment.comment_id !== comment_id;
      })
    });
  };

  handleVote = (e, direction) => {
    patchArticleVotes(this.state.article.article_id, direction);
    this.setState({ currentVote: this.state.currentVote + direction });
    this.setState(prevState => {
      const newVote = prevState.votes + direction;
      return { votes: newVote };
    });
  };

  componentDidMount() {
    getSingleArticle(this.props.article_id)
      .then(article => {
        console.log(article);
        this.setState({ article, loading: false });
      })
      .then(
        getComments(this.props.article_id).then(comments =>
          this.setState({ comments })
        )
      )
      .catch(({ response: { data, status } }) => {
        console.log("<----- IN DA CATCH");
        this.setState({ loading: false });
        navigate("/error", {
          state: { from: "articles", message: data.message, status }
        });
      });
  }
}

export default ArticleCard;
