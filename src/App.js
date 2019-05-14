import "./App.css";
import React, { Component } from "react";
import Header from "./components/header";
import Nav from "./components/nav";
import ArticleList from "./components/article-list";
import ArticleCard from "./components/article-card";
import { Router, Link } from "@reach/router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Header />
        <Router>
          <ArticleList path="/" />
          <ArticleCard path="/articles/:article_id" />
        </Router>
      </div>
    );
  }
}

export default App;
