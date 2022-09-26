import { message } from "antd";
import React, { Component } from "react";
import userservice from "../services/userservice";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      loginId: "",
      contact: "",
      password: "",
      confirmPassword: "",
    };
    this.register = this.register.bind(this);
  }

  firstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  lastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  loginIdHandler = (event) => {
    this.setState({ loginId: event.target.value });
  };

  contactHandler = (event) => {
    this.setState({ contact: event.target.value });
  };

  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  confirmPasswordHandler = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  register() {
    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      contactNo: this.state.contact,
      email: this.state.email,
      loginId: this.state.loginId,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    if (this.state.firstName === "") {
      message.error("First Name cannot be blank !");
    } else if (this.state.lastName === "") {
      message.error("Last Name cannot be blank !");
    } else if (this.state.email === "") {
      message.error("Email cannot be blank !");
    } else if (this.state.loginId === "") {
      message.error("LoginId cannot be blank !");
    } else if (this.state.contact.length !== 10) {
      message.error("Invalid Contact Number !");
    }else if (this.state.password !== "" && this.state.password !== this.state.confirmPassword) {
      message.error("password and confirmPassword should match and shouldn't be empty");
    }  else {
      userservice.register(user).then((res) => {
        console.log(res.data);
        if (res.data === "Success") {
          localStorage.setItem("loginId", this.state.email);
          this.props.history.push("/login");
        } else message.error("Username does not exist ! Please register");
      }).catch(error => {
        message.error("Account already exits with this LoginId or Email  ! Please register again");
        this.props.history.push("/register");
      })
    }
  }

  render() {
    return (
      <div>
        <h2>TweetApp Register</h2>
        <br></br>
        <div
          className="container"
          style={{
            width: "70%",
          }}
        >
          <form>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form2Example1"
                className="form-control"
                placeholder="First Name"
                onChange={this.firstNameHandler}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="form2Example2"
                className="form-control"
                placeholder="Last Name"
                onChange={this.lastNameHandler}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                id="form2Example3"
                className="form-control"
                placeholder="Contact"
                onChange={this.contactHandler}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="form2Example4"
                className="form-control"
                placeholder="Email"
                onChange={this.emailHandler}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="loginId"
                id="form2Example4"
                className="form-control"
                placeholder="LoginId"
                onChange={this.loginIdHandler}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example5"
                className="form-control"
                placeholder="Password"
                onChange={this.passwordHandler}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form2Example6"
                className="form-control"
                placeholder="Confirm Password"
                onChange={this.confirmPasswordHandler}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block mb-4"
              onClick={() => this.register()}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
