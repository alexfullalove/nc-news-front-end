import React, { Component } from "react";
import { patchCommentVotes } from "../api";
import { FaRegCalendarAlt, FaRegHeart, FaUser } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import "../Comment.css";

class CommentCard extends Component {
  state = { currentVote: 0 };
  render() {
    return (
      <div className="comment">
        <p>
          <IoIosChatbubbles /> {this.props.comment.body}
        </p>
        <p>
          <FaUser /> {this.props.comment.author}
        </p>
        <h5>
          <FaRegHeart /> {this.props.comment.votes + this.state.currentVote}
        </h5>
        <p>
          <FaRegCalendarAlt /> {this.props.comment.created_at}
        </p>
        {this.props.isLoggedIn && (
          <button
            id="like-button"
            disabled={this.state.currentVote === 1}
            onClick={e =>
              this.state.currentVote === -1
                ? this.handleCommentVote(e, 2)
                : this.handleCommentVote(e, 1)
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
                ? this.handleCommentVote(e, -2)
                : this.handleCommentVote(e, -1)
            }
          >
            DISLIKE
          </button>
        )}
        {this.props.currentUser === this.props.comment.author && (
          <button
            id="delete-button"
            onClick={e =>
              this.props.handleDeleteComment(e, this.props.comment.comment_id)
            }
          >
            DELETE
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
