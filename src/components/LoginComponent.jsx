import React, { Component } from "react";
import userservice from "../services/userservice";
import { Button, Input, message } from "antd";
import "antd/dist/antd.css";
import Cookies from 'js-cookie';


class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { loginId: "", rawPassword: "" };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  register() {
    this.props.history.push("/register");
  }

  login() {
    let user = { loginId: this.state.loginId, rawPassword: this.state.rawPassword };
    console.log(user);
    let response = "";
    userservice.login(user).then((res) => {
      //document.cookie = "authToken="+res.headers['cookie'];
      console.log(res.headers['cookie']);
      console.log(res.headers['authtoken']);
      if (res.data === "Success") {
        localStorage.setItem("loginId", this.state.loginId);
        localStorage.setItem("AuthToken", res.headers['authtoken']);
        this.props.history.push("/allTweets");
      } else{
        message.error("invalid username or password ! Please Retry.");
        this.props.history.push("/403ErrorPage");
      } 
    })
    .catch(error => {
      message.error("invalid username or password ! Please Retry.");
      
      this.props.history.push("/403ErrorPage");
    })
  }

  loginIdHandler = (event) => {
    this.setState({ loginId: event.target.value });
  };

  passwordHandler = (event) => {
    this.setState({ rawPassword: event.target.value });
  };

  render() {
    return (
      <div
        className="container"
        style={{
          width: "70%",
        }}
      >
        <h2>TweetApp Login</h2>

        <form>
          <div class="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              class="form-control"
              onChange={this.loginIdHandler}
            />
            <label class="form-label" for="form2Example1">
              Email address
            </label>
          </div>
          <div class="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              class="form-control"
              onChange={this.passwordHandler}
            />
            <label class="form-label" for="form2Example2">
              Password
            </label>
          </div>
          <div class="row mb-4">
            <div class="col">
              <a href="/forgotPassword">Forgot password?</a>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary btn-block mb-4"
            onClick={this.login}
          >
            Log-In
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            type="button"
            class="btn btn-primary btn-block mb-4"
            onClick={this.register}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default LoginComponent;
