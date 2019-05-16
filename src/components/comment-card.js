import React, { Component } from "react";
import { patchCommentVotes } from "../api";

class CommentCard extends Component {
  state = { currentVote: 0 };
  render() {
    console.log(this.props);
    return (
      <div>
        <h4>Author:</h4>
        <p>{this.props.comment.author}</p>
        <h5>Comment: </h5>
        <p>{this.props.comment.body}</p>
        <h5>Votes: {this.props.comment.votes + this.state.currentVote}</h5>
        {this.props.isLoggedIn && (
          <button
            disabled={this.state.currentVote === 1}
            onClick={e =>
              this.state.currentVote === -1
                ? this.handleCommentVote(e, 2)
                : this.handleCommentVote(e, 1)
            }
          >
            like
          </button>
        )}
        {this.props.isLoggedIn && (
          <button
            disabled={this.state.currentVote === -1}
            onClick={e =>
              this.state.currentVote === 1
                ? this.handleCommentVote(e, -2)
                : this.handleCommentVote(e, -1)
            }
          >
            Dislike
          </button>
        )}
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
  handleCommentVote = (e, direction) => {
    patchCommentVotes(this.props.comment.comment_id, direction);
    this.setState({ currentVote: this.state.currentVote + direction });
    this.setState(prevState => {
      const newVote = prevState.votes + direction;
      return { votes: newVote };
    });
  };
}

export default CommentCard;
