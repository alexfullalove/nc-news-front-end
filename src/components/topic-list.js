import React, { Component } from "react";
import { Link } from "@reach/router";
import { IoMdSync } from "react-icons/io";
import { getTopics } from "../api";

class TopicList extends Component {
  state = { topics: [], loading: true };
  render() {
    if (this.state.loading)
      return (
        <p>
          <IoMdSync />
        </p>
      );
    return (
      <div className="topic-list">
        <h1>Topics</h1>
        <ul>
          {this.state.topics.map(topic => {
            return (
              <li key={topic.slug}>
                <Link to={`/topics/${topic.slug}`}>
                  <h2>{topic.slug}</h2>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    getTopics().then(topics => this.setState({ topics, loading: false }));
  }
}

export default TopicList;
