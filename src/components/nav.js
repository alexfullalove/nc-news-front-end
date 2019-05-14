import React, { Component } from "react";
import { Link } from "@reach/router";

class Nav extends Component {
  state = { username: "", showLogin: true };
  render() {
    return (
      <nav className="nav">
        <Link to="/">Home</Link> | <Link to="/topics">Topics</Link> |{" "}
        <Link to="/">Home</Link>
        {this.state.showLogin && (
          <form
            className="login-form"
            onSubmit={e => {
              e.preventDefault();
              this.setState({ username: "", showLogin: false });
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
        )}
        {!this.state.showLogin && <p>{this.props.currentUser}</p>}
        {!this.state.showLogin && <button>Sign out</button>}
      </nav>
    );
  }
  handleChange = e => {
    this.setState({ username: e.target.value });
  };
}

export default Nav;
