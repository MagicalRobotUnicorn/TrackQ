import React, { Component } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';

// Update current gizmo to eventually call API from local express 
class UpdateForm extends Component {
  state = {
    update: '',
    gizmo: false,
    asset: this.props.currentAsset,
    user: this.props.currentUser,
    loading: false,
    errors: []
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value });
  }

  createUpdate = () => {
    const update = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      },
      content: this.state.update
    }
    return update;
  }

  postUpdate = () => {
    const { updatesRef } = this.props;
    const { update, asset } = this.state;

    if (update) {
      this.setState({ loading: true });
      updatesRef
        .child(asset.id)
        .push()
        .set(this.createUpdate())
        .then(() => {
          this.setState({ loading: false, update: '', errors: []})
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          })
        })
    } else {
      this.setState({
        errors: this.state.errors.concat({
          message: 'Add an update'
        })
      })
    }
  }

  render() {
    const {errors, update, loading} = this.state;

    return (
      <Segment className="update__form">
        <Input
          fluid
          name="update"
          onChange={this.handleChange}
          value={update}
          style={{ marginBottom: '0.7em' }}
          label={<Button icon={'add'} />}
          labelPosition="left"
          className={
            errors.some(error => error.message.includes('update')) ? 'error' : ''
          }
          placeholder="Write your update"
          />
          <Button.Group icon widths="2">
            <Button
              onClick={this.postUpdate}
              disabled={loading}
              color="orange"
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              />
            <Button
              disabled={this.state.gizmo}
              color="teal"
              content="Link to Gizmo"
              labelPosition="right"
              icon="cloud upload"
              />
          </Button.Group>
      </Segment>
    )
  }
}

export default UpdateForm;