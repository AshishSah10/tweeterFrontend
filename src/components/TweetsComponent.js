import { message } from "antd";
import React, { Component } from "react";
import tweetservice from "../services/tweetservice";
import HeaderComponent from "./HeaderComponent";

class TweetsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTweets: [],
      replies: [],
      tweetMessage: "",
      tweetReply: "",
      tweetUpdate: "",
    };
    // this.addTweet = this.addTweet.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.replyTweet = this.replyTweet.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.likeTweet = this.likeTweet.bind(this);
    this.updateTweet = this.updateTweet.bind(this);
  }

  // addTweet() {
  //   this.props.history.push("/add");
  // }

  postTweet() {
    let tweet = {
      tweetMessage: this.state.tweetMessage,
      };
    console.log("tweet ->" + JSON.stringify(tweet));
    tweetservice.postTweet(tweet).then(() => {
      this.props.history.push("/allTweets");
    });
    window.location.reload(false);
  }

  postTweetHandler = (event) => {
    this.setState({ tweetMessage: event.target.value });
  };

  replyTweet(tweetId) {
    let tweet = {
      tweetMessage: this.state.tweetReply,
    };
    console.log("tweet ->" + JSON.stringify(tweet));
    tweetservice.replyTweet(tweetId, tweet).then((res) => {
      console.log(res);
      this.props.history.push("/allTweets");
    });
    window.location.reload(false);
  }

  replyTweetHandler = (event) => {
    this.setState({ tweetReply: event.target.value });
  };

  deleteTweet(tweetId) {
    console.log(tweetId);
    tweetservice.deleteTweet(tweetId).then((res) => {
      //console.log(res.data);
      this.props.history.push("/allTweets");
    });
    window.location.reload(false);
  }

  likeTweet(tweetId) {
    tweetservice.likeTweet(tweetId).then((res) => {
      //console.log(res.data);
      this.props.history.push("/allTweets");
    });
    window.location.reload(false);
  }

  updateTweet(tweetId) {
    let tweet = {
      tweetMessage: this.state.tweetUpdate,
    };
    console.log("tweet ->" + JSON.stringify(tweet));
    tweetservice.updateTweet(tweetId, tweet).then((res) => {
      //console.log(res);
      this.props.history.push("/allTweets");
    });
     window.location.reload(false);
  }

  updateTweetHandler = (event) => {
    this.setState({ tweetUpdate: event.target.value });
  };

  componentDidMount() {
    tweetservice.getAllTweets().then((res) => {
      //console.log(res.data.userTweetList);
      //console.log(typeof res.data.userTweetList);
      //console.log(res.data.userTweetList[0]);
      
      this.setState({ userTweets: res.data.userTweetList });
      let allTweetsReplies = [];
      for(let item in this.state.userTweets){
          let tweet = this.state.userTweets[item].tweet;
          allTweetsReplies[tweet.id] = [];
          tweetservice.getAllRepliesOfTweet(tweet.id).then((res) => {
            //console.log(res);
            for(let replyKey in res.data){
              if(res.data[replyKey] !== ""){
                allTweetsReplies[`${tweet.id}`].push(res.data[replyKey]);
              }
            }
          })
      }
      this.setState({ replies: allTweetsReplies });
    }).catch(error => {
      message.error("Please login to your accout");
      this.props.history.push("/403ErrorPage")
    })
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="container" style={{ width: "70%", float: "left" }}>
          <h2>ALL TWEETS</h2>
          {this.state.userTweets.map((userTweet) => (
            <div className="list-group" style={{ width: "20 px" }} key={userTweet.tweet.id}>
              <a
                href="#"
                className="list-group-item list-group-item-info"
                aria-current="true"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{userTweet.user.loginId}</h5>
                  <small>Posted On: {userTweet.tweet.tweetCreatedDateTime.substring(0, 10)+" | "+userTweet.tweet.tweetCreatedDateTime.substring(12, 19)}</small>
                </div>

                <div className="container">
                  <div style={{ width: "50%", float: "left" }}>
                    <h5>{userTweet.tweet.tweetMessage}</h5>
                  </div>
                  <div style={{ width: "50%", float: "right" }} hidden={
                        localStorage.getItem("loginId") === userTweet.user.loginId
                          ? false
                          : true
                      }
                      disabled={
                        localStorage.getItem("loginId") === userTweet.user.loginId
                          ? false
                          : true
                      } >
                    <textarea
                      rows="1"
                      cols="1"
                      placeholder="Type your tweet here ..."
                      name="tweetUpdate"
                      className="form-control"
                      onChange={this.updateTweetHandler}
                    />
                    <button
                      className="btn btn-info"
                      disabled={
                        localStorage.getItem("loginId") === userTweet.user.loginId
                          ? false
                          : true
                      }
                      onClick={() => this.updateTweet(userTweet.tweet.id)}
                    >
                      Update Tweet
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div style={{ width: "50%", float: "left" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.likeTweet(userTweet.tweet.id)}
                    >
                      Like {userTweet.tweet.likeCount}
                    </button>
                  </div>

                  <div style={{ width: "50%", float: "right" }}>
                    <button
                      className="btn btn-danger"
                      hidden={
                        localStorage.getItem("loginId") === userTweet.user.loginId
                          ? false
                          : true
                      }
                      disabled={
                        localStorage.getItem("loginId") === userTweet.user.loginId
                          ? false
                          : true
                      }
                      onClick={() => this.deleteTweet(userTweet.tweet.id)}
                    >
                      Delete Tweet
                    </button>
                  </div>
                </div>
              </a>

              <div className="list-group-item">
                <div className="container">
                  <h3>Reply </h3>
                  <form>
                    <div className="form-group">
                      <textarea
                        rows="1"
                        cols="20"
                        placeholder="Type your tweet here ..."
                        name="tweetReply"
                        className="form-control"
                        onChange={this.replyTweetHandler}
                      />
                    </div>
                  </form>
                  <br></br>
                  <button
                    className="btn btn-success"
                    onClick={() => this.replyTweet(userTweet.tweet.id)}
                  >
                    Reply
                  </button>
                </div>
                <h3>Replies:</h3>
                {this.state.replies[`${userTweet.tweet.id}`] != null &&
                this.state.replies[`${userTweet.tweet.id}`].map((reply) => (
                  <div className="container" key={reply.id}>
                    <a
                      href="#"
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{console.log(reply)}{reply.user.loginId}</h5>
                        <small>Replied On: {reply.repliedDateTime.substring(0, 10)+" | "+reply.repliedDateTime.substring(12, 19)}</small>
                      </div>
                      <h6>{reply.repliedMessage}</h6>
                      {<br />}
                    </a>
                    
                  </div>
                ))}


              </div>
            </div>
          ))}
          <br></br>
        </div>
        <div className="container" style={{ width: "30%", float: "right" }}>
          <h2>Post tweet</h2>
          <form>
            <div className="form-group">
              <textarea
                rows="10"
                cols="20"
                placeholder="Type your tweet here ..."
                name="tweetMessage"
                className="form-control"
                onChange={this.postTweetHandler}
              />
            </div>
          </form>
          <br></br>
          <button className="btn btn-success" onClick={this.postTweet}>
            Post Tweet
          </button>
        </div>
      </div>
    );
  }
}

export default TweetsComponent;
