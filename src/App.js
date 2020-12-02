import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import io from "socket.io-client";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import Homescreen from "./components/Homescreen";
import Errorcomponent from "./components/Errorcomponent";
import "./App.css";
// let socket = io("192.168.1.107:5000");
class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/home"
            render={props => <Homescreen {...props} />}
          />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route
            path="/chat/:id/:chatname"
            render={props => <Chat {...props} />}
          />{" "}
          <Route path="/error" component={Errorcomponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
