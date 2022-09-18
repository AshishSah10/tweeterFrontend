import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import userservice from "../services/userservice";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { userName: "" };
    this.searchUser = this.searchUser.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  searchUser() {
    localStorage.setItem("searchUserName", this.state.userName);
    this.props.history.push("/searchUser");
    window.location.reload(false);
  }

  searchUserHandler = (event) => {
    this.setState({ userName: event.target.value });
  };

  logOut() {
    userservice.logout().then((res) => {
      console.log(res.data);
      if (res.data === "Success") {
        localStorage.removeItem("login", "");
        localStorage.removeItem("AuthToken", "");
        
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="navbar-brand">
              <a href="/allTweets">Tweet App</a>
            </div>
            <div className="navbar">
              <input
                placeholder="Search By Username"
                name="userName"
                className="form-control"
                onChange={this.searchUserHandler}
              />
            </div>
            <div className="navbar-right">
              <button className="btn btn-info" onClick={this.searchUser}>
                Search
              </button>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div className="navbar-nav mr-auto">
              <button className="btn btn-warning " onClick={this.logOut}>
                Logout
              </button>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div className="navbar-nav mr-auto">
              <h6 style={{ color: "white" }}>
                Hi {localStorage.getItem("loginId")}
              </h6>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default withRouter(HeaderComponent);
