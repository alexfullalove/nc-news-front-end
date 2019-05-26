import React, { Component } from "react";
import "../CSS/Addcomment.css";

class AddComment extends Component {
  state = {
    author: "",
    comment: ""
  };
  render() {
    return (
      <div className="comment-form">
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.handlePostComment(this.state.comment);
            this.props.togglePostComment();
          }}
        >
          <textarea
            id="text-area"
            onChange={this.handleTypeComment}
            placeholder="type your comment here..."
          />
          <div id="comment-submit">
            {this.props.isLoggedIn && (
              <button
                id="post-comment"
                disabled={!this.state.comment}
                type="submit"
              >
                Post
              </button>
            )}
            {this.props.isLoggedIn && (
              <button
                id="cancel-comment"
                disabled={!this.state.comment}
                onClick={this.props.togglePostComment}
                type="button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
  componentDidMount() {
    this.setState({
      author: this.props.currentUser,
      isLoggedIn: this.props.isLoggedIn
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      this.setState({ isLoggedIn: this.props.isLoggedIn });
    }
  }

  handleTypeComment = e => {
    this.setState({ comment: e.target.value });
  };
}

export default AddComment;
