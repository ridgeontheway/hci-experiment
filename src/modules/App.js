import React, { Component } from "react";
import ClickTestScreen from "./click-test/index";
export default class App extends Component {
  componentDidMount() {
    document.title = "HCI Experiment";
  }
  render() {
    return (
      <div>
        <ClickTestScreen />
      </div>
    );
  }
}
