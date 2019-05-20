import React from "react";
import CommentList from "./comment-list";
import { navigate } from "@reach/router";
import FadeIn from "react-fade-in";
import {
  getSingleArticle,
  getComments,
  postComment,
  deleteComment,
  patchArticleVotes
} from "../api";
import "../Article-card.css";
import {
  FaPencilAlt,
  FaRegCalendarAlt,
  FaRegHeart,
  FaFolder
} from "react-icons/fa";

class ArticleCard extends React.Component {
  state = {
    article: [],
    loading: true,
    comments: [],
    votes: 0,
    currentVote: 0,
    hasMore: true,
    page: 1
  };
  render() {
    if (this.state.loading) return <p>loading...</p>;
    return (
      <FadeIn>
        <div className="article-card">
          <h1>{this.state.article.title}</h1>
          <h3>
            <FaPencilAlt /> {this.state.article.author}
          </h3>
          <h4>
            <FaFolder /> {this.state.article.topic}
          </h4>
          <p>{this.state.article.body}</p>
          <p>
            <FaRegCalendarAlt /> {this.state.article.created_at}
          </p>
          <p>
            <FaRegHeart /> {this.state.article.votes + this.state.votes}
          </p>
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
              LIKE
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
              DISLIKE
            </button>
          )}
          <ul className="comment-list">
            <CommentList
              hasMore={this.state.hasMore}
              fetchMoreData={this.fetchMoreData}
              comments={this.state.comments}
              currentUser={this.props.currentUser}
              isLoggedIn={this.props.isLoggedIn}
              handlePostComment={this.handlePostComment}
              handleDeleteComment={this.handleDeleteComment}
            />
          </ul>
        </div>
      </FadeIn>
    );
  }
  handlePostComment = comment => {
    const newComment = {
      author: this.props.currentUser,
      body: comment,
      votes: 0
    };
    postComment(newComment, this.props.article_id).then(comment => {
      this.setState({ comments: [comment, ...this.state.comments] });
    });
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
        this.setState({ article, loading: false, page: this.state.page + 1 });
      })
      .then(
        getComments(this.props.article_id, this.state.page).then(comments =>
          this.setState({ comments })
        )
      )
      .catch(({ response: { data, status } }) => {
        this.setState({ loading: false });
        navigate("/error", {
          state: { from: "articles", message: data.message, status }
        });
      });
  }

  fetchMoreData = () => {
    getComments(this.props.article_id, this.state.page)
      .then(comments =>
        this.setState({
          comments: [...this.state.comments, ...comments],
          loading: false,
          page: this.state.page + 1
        })
      )
      .catch(({ response: { data, status } }) => {
        this.setState({ loading: false, hasMore: false });
      });
  };
}

export default ArticleCard;
