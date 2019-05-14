import React, { Component } from "react";
import { Link } from "@reach/router";

class Nav extends Component {
  state = { username: "" };
  render() {
    return (
      <nav className="nav">
        <Link to="/">Home</Link> | <Link to="/topics">Topics</Link> |{" "}
        <Link to="/">Home</Link>
        <p>{this.props.currentUser}</p>
        <form
          className="login-form"
          onSubmit={e => {
            e.preventDefault();
            this.setState({ username: "" });
            this.props.handleSubmit(this.state.username);
          }}
        >
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.username}
          />
          <button>Log in</button>
        </form>
      </nav>
    );
  }
  handleChange = e => {
    this.setState({ username: e.target.value });
  };
}

export default Nav;
