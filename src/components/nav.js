import React, { Component } from "react";
import { Link } from "@reach/router";
import ResponsiveMenu from "react-responsive-navbar";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { FaHome, FaFolder, FaUser } from "react-icons/fa";
import "../Nav.css";

class Nav extends Component {
  state = { username: "", showLogin: true };
  render() {
    return (
      <ResponsiveMenu
        menuOpenButton={<IoMdMenu id="hamburger" />}
        menuCloseButton={<IoMdClose id="close-menu" />}
        changeMenuOn="768px"
        largeMenuClassName="large-menu-classname"
        smallMenuClassName="small-menu-classname"
        menu={
          <nav className="nav">
            <div>
              <button>
                <Link to="/">
                  <FaHome /> Home
                </Link>
              </button>
              <button>
                <Link to="/topics">
                  <FaFolder /> Topics
                </Link>
              </button>
            </div>
            {this.state.showLogin && (
              <form className="login-form" onSubmit={this.handleLogIn}>
                <div id="login">
                  <input
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.username}
                    placeholder="enter a valid username"
                  />
                  <button>
                    <FaUser /> Log in
                  </button>
                </div>
              </form>
            )}
            {!this.state.showLogin && (
              <button
                className="signout"
                onClick={e => {
                  this.setState({ showLogin: true });
                  this.props.handleSignOut();
                }}
              >
                Sign out {this.props.currentUser}
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
