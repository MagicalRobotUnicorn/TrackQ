import React, { Component } from 'react'
import { Modal, Input, Button, Icon} from 'semantic-ui-react'

export default class LocationModal extends Component {
  state = {
    location: null
  }

  addLocation = event => {
    const location = event.target.locations[0];
    if (location) {
      this.setState({location});
    }
  }

  submitLocation = event => {
    const { location } = this.state;
    const { addLocation, closeModal } = this.props;

    if (location != null) {
      addLocation(location);
      closeModal();
      this.clearLocation();
    }
  }

  clearLocation = () => this.setState({ location: null });

  render() {
    return (
      <Modal basic open={this.props.modal} onClose={this.closeModal}>
        <Modal.Header>Enter New Location:</Modal.Header>
        <Modal.Content>
          <Input placeholder="Human Resources, Area 51, etc..."/>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onChange={this.addLocation}
            onClick={this.submitLocation} 
          >
            <Icon name="checkmark" /> Add Location
          </Button>
          <Button
            color="red"
            inverted
            onClick={this.props.closeModal}
          >
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
