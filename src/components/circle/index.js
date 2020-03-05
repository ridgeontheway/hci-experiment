import React, { Component } from "react";
import "./styles.css";
import logo from "./red-circle.png";
export default class CircleComponent extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt="Logo" />
      </div>
    );
  }
}
