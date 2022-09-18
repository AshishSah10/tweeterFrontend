import React, { Component } from "react";
import tweetservice from "../services/tweetservice";
import HeaderComponent from "./HeaderComponent";

class UserTweetsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { tweets: [] };
  }

  componentDidMount() {
    tweetservice
      .searchUserTweets(localStorage.getItem("searchUserName"))
      .then((res) => {
        this.setState({ tweets: res.data });
      });
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="container" style={{ width: "70%", float: "left" }}>
          <h2>ALL TWEETS</h2>
          {this.state.tweets.map((tweet) => (
            <div className="list-group" style={{ width: "20 px" }}>
              <a
                href="#"
                className="list-group-item list-group-item-info"
                aria-current="true"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{tweet.email}</h5>
                  <small>Posted On: {tweet.date.substring(0, 10)}</small>
                </div>
                <div className="container">
                  <div style={{ width: "50%", float: "left" }}>
                    <h5>{tweet.description}</h5>
                    <h5>Likes: {tweet.likes}</h5>
                  </div>
                </div>
              </a>

              <div className="list-group-item">
                <h3>Replies:</h3>
                {tweet.replies.map((reply) => (
                  <div className="container">
                    <a
                      href="#"
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{reply.email}</h5>
                        <small>Posted On: {reply.date.substring(0, 10)}</small>
                      </div>
                      <small>{reply.description}</small>
                      {<br />}
                      <small>Likes : {reply.likes}</small>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <br></br>
        </div>
      </div>
    );
  }
}

export default UserTweetsComponent;
