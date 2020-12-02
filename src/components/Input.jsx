import React, { Component } from "react";

class Input extends Component {
  state = { message_now: "", name_now: "" };

  handleMessageChange(e) {
    this.setState({ message_now: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ name_now: e.target.value });
  }
  sendMessage(e) {
    e.preventDefault();
    let message;
    let time_now =
      " [" +
      new Date().toDateString() +
      " " +
      new Date().toTimeString().slice(0, 8) +
      "]";
    message = this.state.name_now + " : " + this.state.message_now + time_now;
    this.props.getMessage(message);
    this.setState({ message_now: "" });
  }
  render() {
    return (
      <form onSubmit={this.sendMessage}>
        <input
          style={{
            position: "fixed",
            width: "250px",
            top: "85%",
            left: "2%",
            height: "45px"
          }}
          value={this.state.name_now}
          type="text"
          placeholder="Your name"
          onChange={e => {
            this.handleNameChange(e);
          }}
        />
        <input
          style={{
            position: "fixed",
            top: "85%",
            left: "20%",
            width: "1000px",
            height: "45px"
          }}
          value={this.state.message_now}
          type="text"
          placeholder="Type your message here:"
          onChange={e => {
            this.handleMessageChange(e);
          }}
        />
        <button
          style={{
            position: "fixed",
            top: "85%",
            right: "14%",
            height: "45px"
          }}
          type="submit"
          className="btn btn-primary"
          onClick={e => this.sendMessage(e)}
        >
          Send
        </button>
      </form>
    );
  }
}

export default Input;
