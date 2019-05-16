import "./App.css";
import React, { Component } from "react";
import Header from "./components/header";
import Nav from "./components/nav";
import ArticleList from "./components/article-list";
import ArticleCard from "./components/article-card";
import { Router } from "@reach/router";
import TopicList from "./components/topic-list";
import { logIn } from "./api";

class App extends Component {
  state = { isLoggedIn: false, currentUser: "" };
  render() {
    return (
      <div className="App">
        <Nav
          handleSubmit={this.handleSubmit}
          currentUser={this.state.currentUser}
          isLoggedIn={this.state.isLoggedIn}
          handleSignOut={this.handleSignOut}
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
        </Router>
      </div>
    );
  }
  handleSubmit = username => {
    logIn(username).then(({ username }) => {
      if (username) {
        this.setState({ isLoggedIn: true, currentUser: username });
      }
    });
  };
  handleSignOut = () => {
    this.setState({ isLoggedIn: false, currentUser: "" });
  };
}

export default App;
