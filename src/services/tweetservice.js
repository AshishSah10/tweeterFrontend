import axios from "axios";

const GET_ALL_USERS_TWEET_API_URL =
     "http://localhost:8081/api/v1.0/tweets/all";
const BASE_URL = "http://localhost:8081/api/v1.0/tweets/";

const headers = { 
  "Authorization": 'Bearer ' + localStorage.getItem('AuthToken'),
  "Access-Control-Allow-Origin": "*",
};

class TweetService {
  getAllTweets() {
    //authToken = localStorage.getItem("AuthToken");
    
    return axios.post(GET_ALL_USERS_TWEET_API_URL, localStorage.getItem('loginId'), {headers});
  }

  postTweet(tweet) {
    return axios.post(BASE_URL + localStorage.getItem('loginId') + "/add", tweet, {headers});
    // return axios.post(BASE_URL + localStorage.getItem("email") + "/add", tweet, {
    //   "Access-Control-Allow-Origin": "*",
    // });
  }

  deleteTweet(tweetId) {
    return axios.delete(BASE_URL + localStorage.getItem('loginId') + "/delete/" + tweetId, {headers});
    // return axios.delete(
    //   BASE_URL + localStorage.getItem("email") + "/delete" + "/" + id,
    //   {
    //     "Access-Control-Allow-Origin": "*",
    //   }
    // );
  }

  updateTweet(tweetId, tweet) {
    return axios.put(BASE_URL + localStorage.getItem('loginId') + "/update" + "/" + tweetId, tweet, {headers});
    // return axios.put(
    //   BASE_URL + localStorage.getItem("email") + "/update" + "/" + id,
    //   tweet,
    //   {
    //     "Access-Control-Allow-Origin": "*",
    //   }
    // );
  }

  likeTweet(tweetId) {
    return axios.put(BASE_URL + localStorage.getItem('loginId') +"/like" + "/" + tweetId, null, {headers});
    // return axios.put(
    //   BASE_URL + localStorage.getItem("email") + "/like" + "/" + id,
    //   {
    //     "Access-Control-Allow-Origin": "*",
    //   }
    // );
  }

  replyTweet(tweetId, tweet) {
    return axios.post(
      BASE_URL + localStorage.getItem("loginId") + "/reply/" + tweetId,
      tweet,
      {headers}
    );
  }

  updateTweet(tweetId, tweet) {
    return axios.put(
      BASE_URL + localStorage.getItem("loginId") + "/update/" + tweetId,
      tweet,
      {headers}
    );
  }

  searchUserTweets(userName) {
    return axios.get(BASE_URL + userName);
  }

  getAllRepliesOfTweet(tweetId){
    return axios.post(BASE_URL + "tweetReplies/"+tweetId, null, {headers});
  }
}

export default new TweetService();
