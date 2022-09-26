import axios from "axios";

const BASE_URL = "http://localhost:8081/api/v1.0/tweets/";

//const BASE_URL = "http://tweeter.us-east-1.elasticbeanstalk.com/api/v1.0/tweets/";
const headers = {
  "Content-Type": "application/json",
  "Accept": "*/*",
  "Access-Control-Allow-Origin": "*",
  "Authorization": localStorage.getItem('AuthToken') != null ? `Bearer ' + ${localStorage.getItem('AuthToken')}` : "",
};

class UserService {
  login(userCredential) {
    

    //response = async() => await axios.post(BASE_URL + "login", userCredential, {headers}).then(response => response);
    //console.log(res);
    return axios.post(BASE_URL + "login", userCredential, {headers});
  }

  logout() {
    return axios.post(BASE_URL + "logout/" + localStorage.getItem('loginId'), null, {headers});
  }

  register(userBuilder) {
    return axios.post(BASE_URL + "register", userBuilder, {headers});
  }

  reset(user) {
    let password = {newPassword : user.newPassword};
    return axios.put(BASE_URL + user.email +"/forgot", password, {headers});
  }

  
}

export default new UserService();
