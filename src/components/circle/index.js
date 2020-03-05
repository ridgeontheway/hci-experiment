import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";
import target from "./red-circle.png";
import initial from "./green-circle.png";
export default class CircleComponent extends Component {
  renderComponentsBasedOnProps() {
    if (this.props.circleType === "target") {
      return <img src={target} alt="Logo" />;
    } else {
      return <img src={initial} alt="Logo" />;
    }
  }

  render() {
    return (
      <div onClick={this.props.onPress}>
        {this.renderComponentsBasedOnProps()}
      </div>
    );
  }
}

CircleComponent.propTypes = {
  circleType: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};
