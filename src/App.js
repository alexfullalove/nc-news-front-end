import "./App.css";
import React, { Component } from "react";
import Header from "./components/header";
import Nav from "./components/nav";
import ArticleList from "./components/article-list";
import ArticleCard from "./components/article-card";
import { Router } from "@reach/router";
import TopicList from "./components/topic-list";
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
  handleSubmit = username => {
    logIn(username).then(({ username }) => {
      if (username) {
        this.setState({ isLoggedIn: true, currentUser: username });
      } else this.setState({ invalidUser: true });
    });
  };
  handleSignOut = () => {
    this.setState({ isLoggedIn: false, currentUser: "", invalidUser: false });
  };
}

export default App;
