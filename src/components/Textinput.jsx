import React, { Component } from "react";

class Input extends Component {
  state = { text_now: "" };

  handleTextChange(e) {
    this.setState({ text_now: e.target.value });
  }

  sendMessage(e) {
    let message;
    let time_now =
      " [" +
      new Date().toDateString() +
      " " +
      new Date().toTimeString().slice(0, 8) +
      "]";
    e.preventDefault();
    message = this.state.name_now + " : " + this.state.message_now + time_now;
    this.props.getMessage(message);
    this.setState({ message_now: "" });
  }
  render() {
    return (
      <div>
        <input
          style={{
            position: "fixed",
            width: "250px",
            top: "85%",
            left: "2%",
            height: "45px"
          }}
          value={this.state.text}
          type="text"
          placeholder="Your name"
          onChange={e => {
            this.handleNameChange(e);
          }}
        />
      </div>
    );
  }
}

export default Input;
