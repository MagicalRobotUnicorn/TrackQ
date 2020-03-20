import React, { Component } from 'react'
import { Grid, Header, Icon, Dropdown, Modal, Form, Input, Button} from 'semantic-ui-react';
// import { connect } from 'react-redux';
import firebase from '../../firebase';

export default class LocationPanel extends Component {
  // State for location
 
  // Grouping in Database for location

  // Pull down menu to select locations that are in the database

  // firebase reference object that links state to collection

  state = {
    activeLocation: '',
    locations: [],
    locationName: '',
    locationDetails: '',
    modal: false,
    locationsRef: firebase.database().ref('locations')
  }

  componentDidMount() {
    this.setState({ location: this.props.locations.currentLocation });
  }


  // see bookmark for map state to props redux example 
  dropdownOptions = () => [
    {
      text: <span>Signed in as <strong>{this.state.currentLocation}</strong></span>,
      disabled: true
    },
    {
      text: <span>Create Asset</span>
    },
    {
      text: <span>View Assets</span>
    },
    { 
      text: <span>Account Settings</span>
    },
    {
      text: <span>Help</span>
    },
    {
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];

  
  render() {
    const { location } = this.state;

    return (
      <React.Fragment>
        <div>
          <Dropdown trigger={
            <span>
              <Icon name="globe" spaced="right" />
              {location}
            </span>
          } options={this.dropdownOptions()} />
        </div>

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Input
                fluid
                label="Name of Asset"
                name="assetName"
                onChange={this.handleChange}
              ></Input>
              <Input
                fluid
                label="About the Asset"
                name="assetDetails"
                onChange={this.handleChange}
              ></Input>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
          </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
          </Button>
          </Modal.Actions>
        </Modal>

      </React.Fragment>
    )
  }
}