import React, { Component } from "react";
import { TiArrowShuffle } from "react-icons/ti";
import "../CSS/Sortby.css";

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
              <option value="created_at">DATE</option>
              <option value="comment_count">COMMENTS</option>
              <option value="votes">VOTES</option>
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
