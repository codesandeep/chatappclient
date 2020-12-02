import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      status: "",
      logincheck: false
    };
    const { history } = this.props;
    axios.get("http://localhost:5000/logincheck").then(result => {
      this.setState({ logincheck: true });
      if (result.data === "logged in") {
        history.push({
          pathname: "/error",
          state: { detail: "Already login please redirect back to homepage" }
        });
      }
    });
  }
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    if (!this.state.logincheck) {
      return null;
    }
    return (
      <div className="Login">
        {this.state.status}
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
          <Route
            render={({ history }) => (
              <button
                type="submit"
                disabled={!this.validateForm()}
                onClick={() => {
                  const { username, password } = this.state;
                  var body = { username, password };
                  axios
                    .post("http://localhost:5000/login", body)
                    .then(result => {
                      this.setState({ status: result.data });
                      this.setState({ username: "" });
                      this.setState({ password: "" });
                      if (this.state.status === "success") {
                        history.push("/home");
                      }
                    });
                }}
              >
                Login
              </button>
            )}
          />
          <Route
            render={({ history }) => (
              <button
                type="button"
                onClick={() => {
                  history.push("/register");
                }}
              >
                Register
              </button>
            )}
          />
        </form>
      </div>
    );
  }
}
