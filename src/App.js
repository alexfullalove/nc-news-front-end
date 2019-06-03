import "./CSS/App.css";
import React, { Component } from "react";
import Header from "./components/header.js";
import Nav from "./components/nav.js";
import ArticleList from "./components/article-list.js";
import ArticleCard from "./components/article-card.js";
import { Router } from "@reach/router";
import TopicList from "./components/topic-list.js";
import { logIn } from "./api";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  state = { isLoggedIn: false, currentUser: "", invalidUser: false };
  render() {
    return (
      <div className="App">
        <Nav
          handleSubmit={this.handleSubmit}
          currentUser={this.state.currentUser}
          isLoggedIn={this.state.isLoggedIn}
          handleSignOut={this.handleSignOut}
          invalidUser={this.state.invalidUser}
        />
        <Header />
        <Router>
          <ArticleList path="/" />
          <ArticleCard
            path="/articles/:article_id"
            currentUser={this.state.currentUser}
            isLoggedIn={this.state.isLoggedIn}
          />
          <TopicList path="/topics" />
          <ArticleList path="/topics/:topic" />
          <ErrorPage
            default
            error={{ message: "page can not be found", status: 404 }}
          />
        </Router>
      </div>
    );
  }
  componentDidMount() {
    const user = localStorage.getItem("currentUser");
    if (user) {
      this.setState({ isLoggedIn: true, currentUser: user });
    }
  }

  handleSubmit = username => {
    logIn(username).then(({ username }) => {
      if (username) {
        localStorage.setItem("currentUser", username);
        this.setState({ isLoggedIn: true, currentUser: username });
      } else this.setState({ invalidUser: true });
    });
  };
  handleSignOut = () => {
    localStorage.removeItem("currentUser");
    this.setState({ isLoggedIn: false, currentUser: "", invalidUser: false });
  };
}

export default App;
