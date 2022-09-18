import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TweetsComponent from "./components/TweetsComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import UserTweetsComponent from "./components/UserTweetsComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ForgotPasswordComponent from "./components/ForgotPasswordComponent";

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={LoginComponent}></Route>
            <Route path="/allTweets" exact component={TweetsComponent}></Route>
            <Route
              path="/searchUser"
              exact
              component={UserTweetsComponent}
            ></Route>
            <Route path="/login" exact component={LoginComponent}></Route>
            <Route path="/register" exact component={RegisterComponent}></Route>
            <Route
              path="/forgotPassword"
              exact
              component={ForgotPasswordComponent}
            ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
