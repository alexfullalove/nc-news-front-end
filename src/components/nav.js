import React, { Component } from "react";
import { Link } from "@reach/router";
import ResponsiveMenu from "react-responsive-navbar";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { FaHome, FaFolder, FaUser } from "react-icons/fa";
import "../CSS/Nav.css";

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
            <div className="navbuttons">
              <button>
                <Link to="/">
                  <FaHome /> HOME
                </Link>
              </button>
              <button>
                <Link to="/topics">
                  <FaFolder /> TOPICS
                </Link>
              </button>
            </div>
            {this.state.showLogin && (
              <form className="login-form" onSubmit={this.handleLogIn}>
                <div id="login">
                  {this.props.invalidUser && (
                    <p id="invalid">* this username is invalid</p>
                  )}
                  <input
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.username}
                    placeholder="ENTER A VALID USER"
                  />
                  <button>
                    <FaUser /> SIGN IN
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
                SIGN OUT {this.props.currentUser}
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
    if (this.state.username) this.props.handleSubmit(this.state.username);
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
