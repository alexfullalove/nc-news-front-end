import React, { Component } from "react";

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
          }}
        >
          <textarea
            onChange={this.handleTypeComment}
            placeholder="type your comment here..."
          />
          {this.props.isLoggedIn && <button type="submit">Post</button>}
          {this.props.isLoggedIn && <button type="button">Cancel</button>}
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
