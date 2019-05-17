import React, { Component } from "react";
import { TiArrowShuffle } from "react-icons/ti";
import "../Sortby.css";

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
          <div>
            <select className="selector" onChange={this.handleSelectChange}>
              <option value="created_at">Date</option>
              <option value="comment_count">Comment Count</option>
              <option value="votes">Votes</option>
            </select>
          </div>
          <button>
            <TiArrowShuffle />
          </button>
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
