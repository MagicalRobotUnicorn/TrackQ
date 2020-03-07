import React, { Component } from 'react';
import { Segment, Comment, Grid, Modal } from 'semantic-ui-react';
import firebase from '../../firebase';

import UpdatesHeader from './UpdatesHeader';
import UpdateForm from './UpdateForm';
import Update from './Update';



// this.props for the display code function

export default class Updates extends Component {
  state = {
    updatesRef: firebase.database().ref('updates'),
    privateUpdatesRef: firebase.database().ref('privateMessages'),
    locationsRef: firebase.database().ref('locations'),
    updates: [],
    currentLocation: null,
    locations: [],
    locationsModal: false,
    updatesLoading: true,
    locationsLoading: true,
    asset: this.props.currentAsset,
    user: this.props.currentUser,
    progressBar: false,
    numUniqueUsers: '',
    searchTerm: '',
    searchLoading: false,
    searchResults: []
  }

  //Location Modal Functions
  openLocationsModal = () => {
    this.setState(
      {
        locationsModal: true
      }
    )
  }

  closeLocationsModal = () => {
    this.setState(
      {
        locationsModal: false
      }
    )
  }

  // Write Locations Loading function



  componentDidMount(){ 
    const { asset, user } = this.state;

    if (asset && user){
      this.addListeners(asset.id);
    }
  }

  addListeners = assetId => {
    this.addUpdateListener(assetId);
  }

  addUpdateListener = assetId => {
    let loadedUpdates = [];
    this.state.updatesRef.child(assetId).on('child_added', snap => {
      loadedUpdates.push(snap.val());
      // console.log("Loaded updates: " + loadedUpdates.length);
      this.setState({
        updates: loadedUpdates,
        updatesLoading: false
      });
      this.countUniqueUsers(loadedUpdates);
    });
  };

  // Add Location Listener
  addLocationListener = locationId => {
    let loadedLocations = [];
    this.state.locationsRef.child(locationId).on('child_added', snap => {
      loadedLocations.push(snap.val());
      // console.log("Loaded updates: " + loadedUpdates.length);
      this.setState({
        locations: loadedLocations,
        locationsLoading: false
      });

      // Count Unique Locations Function
      // this.countUniqueUsers(loadedLocations);
    });
  };

  // displayCode = (idInformation) => {
  //   let thisCode = new QRCode("thisCode", {
  //     text: idInformation,
  //     width: 150,
  //     height: 150,
  //     colorDark: "#000000",
  //     colorLight: '#ffffff'
  //     // correctLevel: QRCode.CorrectLevel.H
  //   });

  //   return thisCode;
  // }
  // return canvas object for the 150px square
  // rendered by browser



  getUpdatesRef = () => {
    const { updatesRef, privateUpdatesRef, privateAsset } = this.state;
    return privateAsset ? privateUpdatesRef : updatesRef;
  }

  getLocationsRef = () => {
    const { locationsRef } = this.state;
    return locationsRef;
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value,
      searchLoading: true
    }, () => {
      this.handleSearchMessages();
    });
  }

  handleSearchMessages = () => {
    const channelUpdates = [...this.state.updates];
    const regex = new RegExp(this.state.searchTerm, 'gi');
    const searchResults = channelUpdates.reduce((acc, update) => {
      // OR Update.Location.match(regex)
      if (update.content && (update.content.match(regex) || update.user.name.match(regex))) {
        acc.push(update);
      }
      return acc;
    }, []);

    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
  }


  // TODO: write countUniqueLocations for the next section
  countUniqueUsers = updates => {
    const uniqueUsers = updates.reduce((acc, update) => {
      if (!acc.includes(update.user.name)){
        acc.push(update.user.name);
      }
      return acc;
    }, []);

    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;

    const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`;
    this.setState({numUniqueUsers})
  }

  // TODO: add different form for private 'assset' and no display of test script
  // Celled Grid Update
  displayUpdates = updates => (
    updates.length > 0 && updates.map(update => (
      <Update 
        key={update.timestamp}
        update={update}
        user={this.state.user}
      />
    ))
  );

  isProgressBarVisible = percent => {
    if (percent > 0 ) {
      this.setState({ progressBar: true});
    }
  }

  displayAssetName = asset => asset ? `${this.state.privateAsset ? '@' : '> '}${asset.name}` : '';

  // displayAssetId function
  displayAssetId = asset => asset ? asset.id : '';


  render() {
    const {updatesRef, asset, user, updates, locations, progressBar, numUniqueUsers, searchTerm, searchResults, searchLoading, privateChannel} = this.state;

    return (
      <React.Fragment>
        <Grid celled>
        {/* Pass Current Asset to UpdatesHeader */}

        {/* UpdateHeader to Cell Row */}
        <UpdatesHeader
          assetName={this.displayAssetName(asset)}
          assetId={this.displayAssetId(asset)}
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
          searchLoading={searchLoading}
          isPrivateAsset={privateChannel}
        />

        <Segment>
        <Comment.Group className={progressBar ? 'updates__progress' : "updates"}>
            {searchTerm ? this.displayUpdates(searchResults): this.displayUpdates(updates)}
          </Comment.Group>
        </Segment>
        </Grid>

        <UpdateForm 
          getUpdatesRef={this.getUpdatesRef}
          currentAsset={asset}
          currentUser={user}
          locations={locations}
          isProgressBarVisible={this.isProgressBarVisible}
          isPrivateChannel={privateChannel}
          getMessagesRef={this.getMessagesRef}
        />

      </React.Fragment>
    )
  }
}
