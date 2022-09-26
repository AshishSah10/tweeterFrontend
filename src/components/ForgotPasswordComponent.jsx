import React, { Component } from "react";
import userservice from "../services/userservice";
import { Button, Input, message } from "antd";
import "antd/dist/antd.css";

class ForgotPasswordComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
    this.reset = this.reset.bind(this);
  }

  reset() {
    let user = { email: this.state.email, newPassword: this.state.password };

    userservice.reset(user).then((res) => {
      console.log(res.data);
      if (res.data === "Success") {
        this.props.history.push("/login");
      } else message.error("Username does not exist ! Please register");
    }).catch(error => {
      message.error("Username does not exist ! Please register");
      this.props.history.push("/403ErrorPage");
    })
  }

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div
        className="container"
        style={{
          width: "70%",
        }}
      >
        <h2>TweetApp Reset Password</h2>

        <form>
          <div className="form-outline mb-4">
            <input
              type="loginId"
              id="form2Example1"
              className="form-control"
              placeholder="Email address"
              onChange={this.emailHandler}
            />
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              placeholder="Password"
              onChange={this.passwordHandler}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block mb-4"
            onClick={this.reset}
          >
            Reset
          </button>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordComponent;
