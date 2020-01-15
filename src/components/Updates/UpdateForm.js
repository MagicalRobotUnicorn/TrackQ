import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';

import FileModal from './FileModal';
import ProgressBar from './ProgressBar';

// Update current gizmo to eventually call API from local express 
class UpdateForm extends Component {
  state = {
    uploadState: '',
    uploadTask: null,
    storageRef: firebase.storage().ref(),
    percentUploaded: 0,
    update: '',
    asset: this.props.currentAsset,
    user: this.props.currentUser,
    loading: false,
    errors: [],
    modal: false
  }

  openModal = () => {
    this.setState({modal: true});
  }

  closeModal = () => {
    this.setState({modal: false});
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value });
  }

  createUpdate = (fileUrl = null ) => {
    const update = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL
      },
      content: this.state.update
    }
    if (fileUrl !== null ) {
      update['image'] = fileUrl;
    } else {
      update['content'] = this.state.update;
    }
    return update;
  }

  postUpdate = () => {
    const { getUpdateRef } = this.props;
    const { update, asset } = this.state;

    if (update) {
      this.setState({ loading: true });
      getUpdateRef()
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

  getPath = () => {
    if (this.props.isPrivateAsset) {
      return `audit/private-${this.state.asset.id}`;
    }
    else {
      return 'audit/public';
    }
  }

  uploadFile = (file, metadata) => {
    console.log("Upload file function: ", file, metadata);
    // First create the pathToUpload (references the channel id)
    const pathToUpload = this.state.asset.id;

    // ref variable references our messagesRef from props
    const ref = this.props.getUpdatesRef();

    // Uses template literals, and uuidv4
    const filePath = `${this.getPath()}/${uuidv4()}.jpg`;

    this.setState({
      uploadState: 'uploading',
      uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
    },
    () => {
      this.state.uploadTask.on('state_changed', snap => {
        const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        this.props.isProgressBarVisible(percentUploaded);
        this.setState({ percentUploaded });
      },
      err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          uploadState: 'error',
          uploadTask: null
        })
      },
        () => {
          this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
            this.sendFileMessage(downloadUrl, ref, pathToUpload);
          })
          .catch(err => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: 'error',
              uploadTask: null
            })
          })
        }
      )
    })
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref.child(pathToUpload)
    .push()
    .set(this.createUpdate(fileUrl))
    .then(() => {
      this.setState({ uploadState: 'done'})
    })
    .catch(err => {
      console.error(err);
      this.setState({
        errors: this.state.errors.concat(err)
      })
    })
  }

  render() {
    const {errors, update, loading, modal, uploadState, percentUploaded} = this.state;

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
              color="teal"
              disabled={uploadState === "uploading"}
              onClick={this.openModal}
              content="Upload Media"
              labelPosition="right"
              icon="cloud upload"
              />
            <FileModal
              modal={modal}
              closeModal={this.closeModal}
              uploadFile={this.uploadFile}
            />
            <br />
            <ProgressBar 
              uploadState={uploadState}
              percentUploaded={percentUploaded}
            />
          </Button.Group>
      </Segment>
    )
  }
}

export default UpdateForm;