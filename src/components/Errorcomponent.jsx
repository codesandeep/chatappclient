import React, { Component } from "react";
import { Route } from "react-router-dom";
class Errorcomponent extends Component {
  render() {
    if (this.props.location.state === undefined) {
      console.log(this.props.location);
      return (
        <div>
          <p>Error</p>
          <p>Please login or redirect to homepage if you have logged in</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Error</p>
          <p>{this.props.location.state.detail}</p>
        </div>
      );
    }
  }
}

export default Errorcomponent;
