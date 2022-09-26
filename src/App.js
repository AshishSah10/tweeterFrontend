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
               <Route exact path="/403ErrorPage" render={() => {window.location.href="/403html.html"}} />
               <Route exact path="/404ErrorPage" render={() => {window.location.href="/404html.html"}} />
              
               <Route path="/" render={() => {window.location.href="/404html.html"}} />
          </Switch>
      
        </div>
      </Router>
    </div>
  );
}

export default App;
