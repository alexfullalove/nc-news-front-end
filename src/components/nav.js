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
          <form className="login-form" onSubmit={this.handleLogIn}>
            <input
              onChange={this.handleChange}
              type="text"
              value={this.state.username}
            />
            <button>Log in</button>
          </form>
        )}
        {!this.state.showLogin && this.props.isLoggedIn && (
          <p>{this.props.currentUser}</p>
        )}
        {!this.state.showLogin && this.props.isLoggedIn && (
          <button
            onClick={e => {
              this.setState({ showLogin: true });
              this.props.handleSignOut();
            }}
          >
            Sign out
          </button>
        )}
      </nav>
    );
  }
  handleChange = e => {
    this.setState({ username: e.target.value });
  };
  handleLogIn = e => {
    e.preventDefault();
    console.log(this.props.isLoggedIn);
    const showLogin = this.props.isLoggedIn ? false : true;
    this.setState({
      username: "",
      showLogin
    });
    this.props.handleSubmit(this.state.username);
  };
}

export default Nav;
