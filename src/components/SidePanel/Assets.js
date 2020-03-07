import React, { Component } from 'react';
import firebase from '../../firebase';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import { setCurrentAsset, setPrivateAsset } from '../../actions';
import { connect } from 'react-redux';
import '../../scripts/qrcode';


// Import QR Code library

// Render 150px QR Code of the assetId in the database

class Assets extends Component {
  state = {
    activeAsset: '',
    user: this.props.currentUser,
    assets: [],
    assetName: '',
    assetDetails: '',
    assetsRef: firebase.database().ref('assets'),
    modal: false,
    firstLoad: true
  }

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedAssets = [];
    this.state.assetsRef.on('child_added', snap => {
      loadedAssets.push(snap.val());
      this.setState({
        assets: loadedAssets
      },
      () => this.setFirstAsset());
    });
  }

  removeListeners = () => {
    this.state.assetsRef.off();
  }

  setFirstAsset = () => {
    const firstAsset = this.state.assets[0];
    if (this.state.firstLoad && this.state.assets.length > 0) {
      this.props.setCurrentAsset(firstAsset);
      this.setActiveAsset(firstAsset);
    }
    this.setState({ firstLoad: false});
  }


  // Todo: Bomb database and add new data structure

  addAsset = () => {
    const { assetsRef, assetName, assetDetails, assetLocation, assetDestinationLocation, user } = this.state;

    const key = assetsRef.push().key;

    // Items to include on new asset
    // 1. Checked in (ASSET NAME)
    // 2. At (TIMESTAMP)
    // 3. Destination (LOCATION ID....)
    // 4. Notes:
    // 5. Attention Level
    // 6. Widget link (META PANEL)

    const updatedAsset = {
      id: key,
      name: assetName,
      location: assetLocation,
      destination: assetDestinationLocation,
      details: assetDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    }
    

    const newAsset = {
      id: key,
      name: assetName,
      details: assetDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL
      }
    }

    // TODO: Set Asset to new data structure
    
    assetsRef
    .child(key)
    .update(newAsset)
    .then(() => {
      this.setState({ assetName: '', assetDetails: ''});
      this.closeModal();
      console.log('Asset added!');
    })
    .catch(err => {
      console.error(err);
    })
  }

  closeModal = () => {
    this.setState(
      {
        modal: false
      }
    )
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)){
      this.addAsset();
    }
  }

  isFormValid = ({ assetName, assetDetails }) => assetName && assetDetails;

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  changeAsset = asset => {
    this.setActiveAsset(asset);
    this.props.setCurrentAsset(asset);
  }

  setActiveAsset = asset => {
    this.setState({ activeAsset: asset.id });
  }

  displayAssets = assets =>
    assets.length > 0 &&
    assets.map(asset => (
      <Menu.Item
        key={asset.id}
        onClick={() => this.changeAsset(asset)}
        name={asset.name}
        style={{ opacity: 0.7 }}
        active={asset.id === this.state.activeAsset}
        >
          # { asset.name }
        </Menu.Item>
    ));
  

  openModal = () => {
    this.setState(
      {
        modal: true
      }
    );
  }

  closeModal = () => this.setState({ modal: false });

  render() {
    const {assets, modal} = this.state;

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em', color: 'grey' }}>
          <span>
            {/* QRCode Div */}
            <Icon name="exchange" /> Assets
        </span>{" "}
          ({ assets.length })
          <br />
          <br />
        <span>
          <Button color="yellow" inverted onClick={ this.openModal }> Add Asset
          </Button>
          {this.displayAssets(assets)}
        </span>
        </Menu.Menu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>

              {/* TODO: Update Asset form to reflect new data structure */}
              
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

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});


export default connect(mapStateToProps, {setCurrentAsset, setPrivateAsset})(Assets);