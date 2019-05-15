import CommentCard from "./comment-card";
import AddComment from "./add-comment";
import React, { Component } from "react";

class CommentList extends Component {
  state = {
    isLoggedIn: this.props.isLoggedIn,
    currentUser: this.props.currentUser,
    comments: this.props.comments,
    showAddComment: false
  };
  render() {
    return (
      <div>
        <h3>Comments</h3>
        <button
          disabled={!this.props.isLoggedIn}
          onClick={this.togglePostComment}
        >
          {!this.props.isLoggedIn ? (
            <p>Log in to add a comment</p>
          ) : (
            <p>Add comment</p>
          )}
        </button>
        {this.state.showAddComment && (
          <AddComment
            isLoggedIn={this.state.isLoggedIn}
            currentUser={this.state.currentUser}
            showAddComment={this.state.showAddComment}
            handlePostComment={this.handlePostComment}
          />
        )}
        {this.state.comments.map(comment => {
          return (
            <li key={comment.comment_id}>
              <CommentCard comment={comment} />
            </li>
          );
        })}
      </div>
    );
  }
  handlePostComment = comment => {
    console.log(comment);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoggedIn !== this.state.isLoggedIn) {
      console.log(this.state.showAddComment, "<---- show comment");
      this.setState({ showAddComment: false });
    }
  }

  togglePostComment = () => {
    this.setState({ showAddComment: !this.state.showAddComment });
  };
}

export default CommentList;
