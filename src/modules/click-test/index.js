import React, { Component } from "react";
import TrialOne from "./trial1";
import TrialTwo from "./trial2";
import TrialThree from "./trial3";
import ExperimentFinishPopup from "../../components/popup/finish-experiments";
import "../styles.css";
export default class ClickTestScreen extends Component {
  constructor() {
    super();
    this.state = {
      showSuccessScreen: false,
      deviceName: null,
      thirdTrialData: null,
      secondTrialData: null,
      firstTrialData: null,
      currentTrial: 0,
      numTrialsCompleted: 1
    };
    this.finishTrail = this.finishTrail.bind(this);
    this.experimentContinueCheck = this.experimentContinueCheck.bind(this);
    this.saveExperimentInfo = this.saveExperimentInfo.bind(this);
  }

  togglePopUp(show) {
    this.setState({ showUserPopUp: show });
  }

  componentDidMount() {
    this.experimentContinueCheck();
  }

  experimentContinueCheck() {
    if (
      this.state.firstTrialData &&
      this.state.secondTrialData &&
      this.state.thirdTrialData
    ) {
      this.setState({ showSuccessScreen: true });
    } else {
      var generated = false;
      while (!generated) {
        const trialNumber = Math.floor(Math.random() * 3) + 1;
        console.log(trialNumber);
        if (trialNumber === 1 && !this.state.firstTrialData) {
          generated = true;
          this.setState({ currentTrial: 1 });
        } else if (trialNumber === 2 && !this.state.secondTrialData) {
          generated = true;
          this.setState({ currentTrial: 2 });
        } else if (trialNumber === 3 && !this.state.thirdTrialData) {
          generated = true;
          this.setState({ currentTrial: 3 });
        }
      }
    }
  }

  finishTrail(_participantID, _trialID, _timeTaken, _deviceName) {
    if (!this.state.deviceName) {
      this.setState({ deviceName: _deviceName });
    }
    const trialData = [_participantID, _trialID, _timeTaken];
    console.log(this.state.collectedExperimentData);
    console.log(trialData);
    if (_trialID === 1) {
      console.log("this is trial 1");
      this.setState(
        {
          firstTrialData: trialData,
          numTrialsCompleted: this.state.numTrialsCompleted + 1
        },
        () => this.experimentContinueCheck()
      );
    } else if (_trialID === 2) {
      console.log("this is trial 2");
      this.setState(
        {
          secondTrialData: trialData,
          numTrialsCompleted: this.state.numTrialsCompleted + 1
        },
        () => this.experimentContinueCheck()
      );
    } else if (_trialID === 3) {
      console.log("this is trial 3");
      this.setState(
        {
          thirdTrialData: trialData,
          numTrialsCompleted: this.state.numTrialsCompleted + 1
        },
        () => this.experimentContinueCheck()
      );
    }
  }

  saveExperimentInfo() {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <div>
          {this.state.currentTrial === 1 ? (
            <TrialOne
              trialNumber={1}
              trialsCompleted={this.state.numTrialsCompleted}
              trialEnded={this.finishTrail}
            />
          ) : null}
        </div>
        <div>
          {this.state.currentTrial === 2 ? (
            <TrialTwo
              trialNumber={2}
              trialsCompleted={this.state.numTrialsCompleted}
              trialEnded={this.finishTrail}
            />
          ) : null}
        </div>
        <div>
          {this.state.currentTrial === 3 ? (
            <TrialThree
              trialNumber={3}
              trialsCompleted={this.state.numTrialsCompleted}
              trialEnded={this.finishTrail}
            />
          ) : null}
        </div>
        <ExperimentFinishPopup
          resetExperiment={this.saveExperimentInfo}
          show={this.state.showSuccessScreen}
          trialData={[
            this.state.firstTrialData,
            this.state.secondTrialData,
            this.state.thirdTrialData
          ]}
          title="Download Results"
          onHide={() => this.togglePopUp(false)}
          deviceName={this.state.deviceName}
        />
      </div>
    );
  }
}
