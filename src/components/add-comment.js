import React, { Component } from "react";

class AddComment extends Component {
  state = {
    author: "",
    isLoggedIn: false
  };
  render() {
    return (
      <div className="comment-form">
        <form>
          <textarea />
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
}

export default AddComment;
