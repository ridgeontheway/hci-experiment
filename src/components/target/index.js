import React, { Component } from "react";
import "./styles.css";
import logo from "./target.png";
export default class TargetComponent extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt="Logo" />
      </div>
    );
  }
}