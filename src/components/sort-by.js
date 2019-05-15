import React from "react";

function SortBy(props) {
  return (
    <form className="sort-by">
      <p>Sort By:</p>
      <select>
        <option value="created_at">Date</option>
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
      </select>
      <button>Sort</button>
    </form>
  );
}

export default SortBy;
