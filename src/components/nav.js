import React, { Component } from "react";
import { Link } from "@reach/router";
import ResponsiveMenu from "react-responsive-navbar";
import { IoMdClose, IoMdMenu } from "react-icons/io";

class Nav extends Component {
  state = { username: "", showLogin: true };
  render() {
    return (
      <ResponsiveMenu
        menuOpenButton={<IoMdMenu />}
        menuCloseButton={<IoMdClose />}
        changeMenuOn="768px"
        largeMenuClassName="large-menu-classname"
        smallMenuClassName="small-menu-classname"
        menu={
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/topics">Topics</Link>
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
            {!this.state.showLogin && <p>{this.props.currentUser}</p>}
            {!this.state.showLogin && (
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
        }
      />
    );
  }
  handleChange = e => {
    this.setState({ username: e.target.value });
  };
  handleLogIn = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.username);
  };
  componentDidUpdate(prevProps, prevState) {
    const showLogin = this.props.isLoggedIn ? false : true;
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState({
        username: "",
        showLogin
      });
    }
  }
}

export default Nav;
