import React, { Component } from "react";
import { getArticles } from "../api";

class SortBy extends Component {
  state = { sort: "created_at" };
  render() {
    return (
      <div>
        <form
          className="sort-by"
          onSubmit={e => {
            e.preventDefault();
            this.props.handleSort(this.state.sort);
          }}
        >
          <p>Sort By:</p>
          <select onChange={this.handleSelectChange}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
          <button>Sort</button>
        </form>
      </div>
    );
  }
  handleSelectChange = e => {
    this.setState({
      sort: e.target.value
    });
  };
}

export default SortBy;
