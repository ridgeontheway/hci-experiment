import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles.css";
export default class ExperimentFinishPopup extends Component {
  handleOnClick(event) {
    event.preventDefault();
    const selectedDevice = event.target.device.value;
    const selectedID = event.target.id.value;
    this.props.send_experiment_info(selectedDevice, selectedID);
  }
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
            <Form
              onSubmit={e => {
                this.handleOnClick(e);
              }}
            >
              <p>
                Please fill the relevant information before starting the trial
              </p>
              <Form.Group controlId="id">
                <Form.Label>Assigned ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your assigned ID"
                />
              </Form.Group>

              <Form.Group controlId="device">
                <Form.Label>Input Device</Form.Label>
                <Form.Control as="select" ref={this.genderInput}>
                  <option>Trackpoint</option>
                  <option>Mouse</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Trial Information
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

ExperimentFinishPopup.propTypes = {
  save_experiment_info: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};
