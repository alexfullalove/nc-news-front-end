import CommentCard from "./comment-card";
import AddComment from "./add-comment";
import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

class CommentList extends Component {
  state = {
    isLoggedIn: this.props.isLoggedIn,
    currentUser: this.props.currentUser,
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
            isLoggedIn={this.props.isLoggedIn}
            currentUser={this.props.currentUser}
            showAddComment={this.props.showAddComment}
            handlePostComment={this.props.handlePostComment}
          />
        )}
        <InfiniteScroll
          dataLength={this.props.comments.length}
          next={this.props.fetchMoreData}
          hasMore={this.props.hasMore}
          loader={<h4>Loading...</h4>}
        >
          {this.props.comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                <CommentCard
                  isLoggedIn={this.props.isLoggedIn}
                  comment={comment}
                  currentUser={this.props.currentUser}
                  handleDeleteComment={this.props.handleDeleteComment}
                />
              </li>
            );
          })}
        </InfiniteScroll>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoggedIn !== this.state.isLoggedIn) {
      this.setState({ showAddComment: false });
    }
  }

  togglePostComment = () => {
    this.setState({ showAddComment: !this.state.showAddComment });
  };
}

export default CommentList;
