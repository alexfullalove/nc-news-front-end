import React, { Component } from "react";

class AddComment extends Component {
  state = {
    author: "",
    isLoggedIn: false
  };
  render() {
    return (
      <div className="comment-form">
        <form />
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
    console.log(prevProps, this.props);
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      // console.log(this.state);
      this.setState({ isLoggedIn: this.props.isLoggedIn });
    }
  }
}

export default AddComment;
