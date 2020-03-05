import React, { Component } from "react";
import PropTypes from "prop-types";
import CircleComponent from "../../components/circle";
import ExperimentStartPopup from "../../components/popup/experiment-start";
import Toast from "react-bootstrap/Toast";
import "./t1Styles.css";
import "../styles.css";
export default class TrialOne extends Component {
  constructor() {
    super();
    this.state = {
      showUserPopUp: true,
      deviceName: null,
      participantID: 0,
      showInitialCircle: true,
      showToast: false,
      toastText: "",
      time: 0
    };
    this.saveExperimentInfo = this.saveExperimentInfo.bind(this);
    this.toggleInitialCircle = this.toggleInitialCircle.bind(this);
    this.endExperiment = this.endExperiment.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
  }

  toggleToast(show) {
    this.setState({ showToast: show });
  }

  togglePopUp(show) {
    this.setState({ showUserPopUp: show });
  }

  toggleInitialCircle() {
    this.setState({
      showInitialCircle: false,
      showToast: true,
      toastText: "click the red circle to end the experiment"
    });
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1);
  }

  saveExperimentInfo(_deviceName, _selectedID) {
    this.setState({
      showUserPopUp: false,
      deviceName: _deviceName,
      showToast: true,
      toastText: "click on the green circle to begin the experiment",
      participantID: _selectedID
    });
  }

  endExperiment() {
    const timeTaken = this.state.time;
    clearInterval(this.timer);
    this.props.trialEnded(
      this.state.participantID,
      this.props.trialNumber,
      timeTaken,
      this.state.deviceName
    );
  }

  render() {
    return (
      <div className="backgroundDiv">
        <div className="trial1-toastDiv">
          <Toast
            onClose={() => this.toggleToast(false)}
            show={this.state.showToast}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <strong className="mr-auto">Device Input Experiment</strong>
              <small>now</small>
            </Toast.Header>
            <Toast.Body>{this.state.toastText}</Toast.Body>
          </Toast>
        </div>

        <div className="trial1-targetDiv">
          <CircleComponent circleType="target" onPress={this.endExperiment} />
        </div>
        <div className="trial1-initialDiv">
          {this.state.showInitialCircle ? (
            <CircleComponent
              circleType="initial"
              onPress={this.toggleInitialCircle}
            />
          ) : null}
        </div>
        <ExperimentStartPopup
          sendExperimentInfo={this.saveExperimentInfo}
          show={this.state.showUserPopUp}
          title={"Trial: " + this.props.trialsCompleted + " / 3"}
          onHide={() => this.togglePopUp(false)}
        />
      </div>
    );
  }
}

TrialOne.propTypes = {
  trialNumber: PropTypes.number.isRequired,
  trialEnded: PropTypes.func.isRequired,
  trialsCompleted: PropTypes.number
};
