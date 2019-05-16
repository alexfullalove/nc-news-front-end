import React, { Component } from "react";

class CommentCard extends Component {
  render() {
    return (
      <div>
        <h4>Author:</h4>
        <p>{this.props.comment.author}</p>
        <h5>Comment: </h5>
        <p>{this.props.comment.body}</p>
        <h5>Votes: {this.props.comment.votes}</h5>
        {this.props.currentUser === this.props.comment.author && (
          <button
            onClick={e =>
              this.props.handleDeleteComment(e, this.props.comment.comment_id)
            }
          >
            DeleteComment
          </button>
        )}
      </div>
    );
  }
}

export default CommentCard;
