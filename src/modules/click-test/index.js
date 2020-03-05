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
      secondTrialDat: null,
      firstTrialData: null,
      currentTrial: 0
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
      this.state.secondTrialDat &&
      this.state.thirdTrialData
    ) {
      console.log("am I here?");
      this.setState({ showSuccessScreen: true });
    } else {
      var generated = false;
      while (!generated) {
        const trialNumber = Math.floor(Math.random() * 3) + 1;
        console.log(trialNumber);
        if (trialNumber === 1 && !this.state.firstTrialData) {
          generated = true;
          this.setState({ currentTrial: 1 });
        } else if (trialNumber === 2 && !this.state.secondTrialDat) {
          generated = true;
          this.setState({ currentTrial: 2 });
        } else if (trialNumber === 3 && !this.state.thirdTrialData) {
          generated = true;
          this.setState({ currentTrial: 3 });
        }
      }
    }
  }

  finishTrail(_participantID, _trialID, _timeTaken) {
    const trialData = [_participantID, _trialID, _timeTaken];
    console.log(trialData);
    if (_trialID === 1) {
      console.log("this is trial 1");
      this.setState(
        {
          firstTrialData: trialData
        },
        () => this.experimentContinueCheck()
      );
    } else if (_trialID === 2) {
      console.log("this is trial 2");
      this.setState(
        {
          secondTrialDat: trialData
        },
        () => this.experimentContinueCheck()
      );
    } else if (_trialID === 3) {
      console.log("this is trial 3");
      this.setState(
        {
          thirdTrialData: trialData
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
            <TrialOne trialNumber={1} trialEnded={this.finishTrail} />
          ) : null}
        </div>
        <div>
          {this.state.currentTrial === 2 ? (
            <TrialTwo trialNumber={2} trialEnded={this.finishTrail} />
          ) : null}
        </div>
        <div>
          {this.state.currentTrial === 3 ? (
            <TrialThree trialNumber={3} trialEnded={this.finishTrail} />
          ) : null}
        </div>
        <ExperimentFinishPopup
          save_experiment_info={this.saveExperimentInfo}
          show={this.state.showSuccessScreen}
          title="Input device experiment"
          onHide={() => this.togglePopUp(false)}
        />
      </div>
    );
  }
}
