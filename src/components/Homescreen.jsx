import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
// import Userprofile from "./Userprofile";
import axios from "axios";

class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_list: [],
      chatname_now: "",
      user_name: "",
      logincheck: false
    };
    const { history } = this.props;
    axios.get("http://localhost:5000/logincheck").then(result => {
      this.setState({ logincheck: true });
      if (result.data === "logged out") {
        history.push({
          pathname: "/error",
          state: { detail: "Please login and try again" }
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  handleChatNameChange(e) {
    this.setState({ chatname_now: e.target.value });
  }
  componentDidMount() {
    axios.get("http://localhost:5000/home/chats").then(result => {
      this.setState({ chat_list: result.data });
    });
    axios.get("http://localhost:5000/home/user").then(result => {
      this.setState({ user_name: result.data.username });
    });
  }

  componentWillUnmount() {
    this.setState({ chat_list: [] });
    this.setState({ user_name: "" });
    this.setState({ chatname_now: "" });
  }
  removeFromChatList(id) {
    let body={};
    body.id=id;
    axios.post("http://localhost:5000/removechat", body).then(result => {
    this.setState({ chat_list: result.data });
    });
  }

  addToChatList() {
    let body = {};
    body.id =
      this.state.chatname_now.slice(0, 5) +
      Math.random()
        .toString(36)
        .substr(2, 9);
    body.name = this.state.chatname_now;

    axios.post("http://localhost:5000/adduser", body).then(result => {});
    // this.props.socket.emit("event_addNewChat", newchat.name, newchat.id);
  }
  render() {
    let { user_name } = this.state;
    if (!this.state.logincheck) {
      return null;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Welcome {user_name}
          <input
            style={{
              position: "fixed",
              width: "250px",
              top: "15%",
              left: "35%",
              height: "45px"
            }}
            value={this.state.chatname_now}
            type="text"
            placeholder="Enter a new discussion"
            onChange={e => {
              this.handleChatNameChange(e);
            }}
          />
          <button
            style={{
              position: "fixed",
              top: "15%",
              right: "42%",
              height: "45px"
            }}
            type="submit"
            className="btn btn-primary"
            onClick={e => this.addToChatList()}
          >
            Add
          </button>
        </form>
        <Route>
          {({ history }) => (
            <button
              style={{
                position: "fixed",
                top: "5%",
                right: "5%",
                height: "45px"
              }}
              type="submit"
              className="btn btn-warning"
              onClick={() => {
                axios.get("http://localhost:5000/logout").then(result => {
                  this.setState({ user_name: "" });
                  history.push("/login");
                });
              }}
            >
              Logout
            </button>
          )}
        </Route>
        <div
          style={{
            position: "fixed",
            top: "35%",
            left: "35%",
            height: "45px"
          }}
        >
          <table>
            {this.state.chat_list.map(c => (
              <tbody key={c.id}>
                <tr>
                  <td>
                    <Link to={`/chat/${c.id}/${c.chatname}`}>{c.chatname}</Link>
                  </td>
                  <td>
                    <button
                      style={{
                        height: "5%"
                      }}
                      className="btn btn-danger"
                      onClick={e => this.removeFromChatList(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default Homescreen;
