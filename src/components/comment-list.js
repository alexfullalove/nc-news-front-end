import React from "react";
import CommentCard from "./comment-card";
import AddComment from "./add-comment";

const CommentList = ({ isLoggedIn, currentUser, comments }) => {
  return (
    <div>
      <h3>Comments</h3>
      <button>Add comment</button>
      <AddComment isLoggedIn={isLoggedIn} currentUser={currentUser} />
      {comments.map(comment => {
        return (
          <li key={comment.comment_id}>
            <CommentCard comment={comment} />
          </li>
        );
      })}
    </div>
  );
};

export default CommentList;
