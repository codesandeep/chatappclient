import React, { Component } from "react";
import Input from "./Input";
import Message from "./Messages";
import io from "socket.io-client";
var socket = io("http://localhost:5000");
class Chat extends Component {
  state = { message: [] };

  scrollToBottom() {
    let messageId = this.state.message.length - 1;
    const element = document.getElementById(messageId);
    element.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    socket.emit("event_joinChat", id);
    socket.emit("event_getMessage", id);
    socket.on("event_messageSent", msg => {
      this.setState({
        message: msg
      });
    });
    socket.on("event_chatMessageToClient", msg => {
      msg.concat("\n");
      this.setState({
        message: msg
      });
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleMessageInput = message_sent => {
    message_sent.concat("\n");
    let message = this.state.message.concat(message_sent);
    let id = this.props.match.params.id;
    socket.emit("event_chatMessageToServer", message, id);
  };

  render() {
    return (
      <div>
        <Message
          chatname={this.props.match.params.chatname}
          message={this.state.message}
        />
        <Input getMessage={this.handleMessageInput} />
      </div>
    );
  }
}

export default Chat;
