import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      status: "",
      logincheck: false
    };
    const { history } = this.props;
    axios.get("http://localhost:5000/logincheck").then(result => {
      this.setState({ logincheck: true });
      if (result.data === "logged in") {
        history.push({
          pathname: "/error",
          state: {
            detail: "Already login please logout for registering a user"
          }
        });
      }
    });
  }

  validateForm() {
    return (
      this.state.username.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  handleChange = event => {
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };
  showStatus = () => {
    if (this.state.status.slice(5, 9) === "user") {
      return "Username already registered";
    } else if (this.state.status.slice(5, 10) === "email") {
      return "Email already registered";
    } else if (this.state.status === "success") {
      return "User Succesfully registered";
    }
  };
  handleSubmit = event => {
    const { username, email, password } = this.state;
    var body = { username, email, password };
    console.log(body);
    console.log(username, email, password);
    axios.post("http://localhost:5000/register", body).then(result => {
      console.log('reached here',result.data);
      this.setState({ status: result.data });
    });
    console.log("now ?");
    this.setState({ username: "" });
    this.setState({ email: "" });
    this.setState({ password: "" });
    event.preventDefault();
  };

  render() {
    if (!this.state.logincheck) {
      return null;
    }
    return (
      <div className="Register">
        {this.showStatus()}
        <form onSubmit={this.handleSubmit}>
          <div
            className="form-group"
            style={{
              width: "500px"
            }}
          >
            <label htmlFor="username">Username:</label>
            <input
              className="form-control"
              id="username"
              name="username"
              value={this.state.username}
              type="text"
              placeholder="Type your name"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </div>
          <div
            className="form-group"
            style={{
              width: "500px"
            }}
          >
            <label htmlFor="email">Email:</label>
            <input
              className="form-control"
              id="email"
              name="email"
              value={this.state.email}
              type="email"
              placeholder="Enter email"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </div>
          <div
            className="form-group"
            style={{
              width: "500px"
            }}
          >
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              id="password"
              name="password"
              value={this.state.password}
              type="password"
              placeholder="Enter password"
              onChange={e => {
                this.handleChange(e);
              }}
            />
          </div>
          <button disabled={!this.validateForm()} type="submit">
            Register
          </button>
          <Route
            render={({ history }) => (
              <button
                type="button"
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </button>
            )}
          />
        </form>
      </div>
    );
  }
}
