import React, { Component } from 'react';
import mime from 'mime-types';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';

export default class FileModal extends Component {
  state = {
    file: null,
    authorized: ['image/jpeg', 'image/png']
  }

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({file});
    }
    // console.log(file);
  }

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;

    if (file !== null) {
      if (this.isAuthorized(file.name)){
        const metadata = { contentType: mime.lookup(file.name)};
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  }

  clearFile = () => this.setState({ file: null });

  isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));

  render() {
    return (
      <Modal basic open={this.props.modal} onClose={this.closeModal}>
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            label="File types: jpg, png"
            name="file"
            type="file"
            onChange={this.addFile}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={this.sendFile}
            color="green"
            inverted
          >
            <Icon name="checkmark" /> Send
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
