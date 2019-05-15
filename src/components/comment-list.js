import CommentCard from "./comment-card";
import AddComment from "./add-comment";
import React, { Component } from "react";

class CommentList extends Component {
  state = {
    isLoggedin: false,
    currentUser: "",
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
  togglePostComment = () => {
    this.setState({ showAddComment: true });
  };
}

export default CommentList;
