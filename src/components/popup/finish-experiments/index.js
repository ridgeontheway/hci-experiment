import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { CSVLink } from "react-csv";
import "../styles.css";
export default class ExperimentFinishPopup extends Component {
  constructor(props) {
    super(props);
    this.saveExperimentData = this.saveExperimentData.bind(this);
  }

  saveExperimentData() {}
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content__wrapper">
            <p>
              You have successfully finished all the trials with the{" "}
              {this.props.deviceName} input device
            </p>
            <p>Press the button below to save the results</p>
            <CSVLink
              data={this.props.trialData}
              filename={this.props.deviceName + ".csv"}
              className="btn btn-primary"
              target="_blank"
              onClick={this.props.resetExperiment}
            >
              Download
            </CSVLink>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

ExperimentFinishPopup.propTypes = {
  resetExperiment: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  deviceName: PropTypes.string,
  trialData: PropTypes.array
};
