import React from "react";
import CommentCard from "./comment-card";

const CommentList = props => {
  return (
    <div>
      <h3>Comments</h3>
      {props.comments.map(comment => {
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
