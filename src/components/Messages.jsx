import React, { Component } from "react";
class Messages extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>{this.props.chatname}</h1>
        <div
          className="messageContainer"
          style={{ height: "650px", overflow: "scroll" }}
        >
          {this.props.message.map((m, i) => (
            <p id={i} key={i}>
              {m}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default Messages;
