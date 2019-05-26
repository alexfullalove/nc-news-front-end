import React, { Component } from "react";
import { Link } from "@reach/router";
import { IoMdSync } from "react-icons/io";
import { getTopics } from "../api";
import FadeIn from "react-fade-in";
import "../CSS/Topics.css";

class TopicList extends Component {
  state = { topics: [], loading: true };
  render() {
    if (this.state.loading)
      return (
        <div className="loading">
          <IoMdSync />
        </div>
      );
    return (
      <div className="topic-list">
        <h1>Topics</h1>
        <ul>
          <FadeIn>
            {this.state.topics.map(topic => {
              return (
                <li key={topic.slug}>
                  <h2>{topic.slug}</h2>
                  <Link to={`/topics/${topic.slug}`}>
                    <button className="readme">READ</button>
                  </Link>
                </li>
              );
            })}
          </FadeIn>
        </ul>
      </div>
    );
  }

  componentDidMount() {
    getTopics().then(topics => this.setState({ topics, loading: false }));
  }
}

export default TopicList;
