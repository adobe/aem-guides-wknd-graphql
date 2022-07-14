/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { Component } from "react";

class Error extends Component {
  render() {
    return (
      <div className="error">
        <span className="error__message">{`Error: ${this.props.errorMessage}`}</span>
      </div>
    );
  }
}

export default Error;
