import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';

import UpdatesHeader from './UpdatesHeader';
import UpdateForm from './UpdateForm';
import Update from './Update';



export default class Updates extends Component {
  state = {
    updatesRef: firebase.database().ref('updates'),
    privateUpdatesRef: firebase.database().ref('privateMessages'),
    updates: [],
    updatesLoading: true,
    asset: this.props.currentAsset,
    user: this.props.currentUser,
    progressBar: false,
    numUniqueUsers: '',
    searchTerm: '',
    searchLoading: false,
    searchResults: []
  }
  
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

  getUpdatesRef = () => {
    const { updatesRef, privateUpdatesRef, privateAsset } = this.state;
    return privateAsset ? privateUpdatesRef : updatesRef;
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
      if (update.content && (update.content.match(regex) || update.user.name.match(regex))) {
        acc.push(update);
      }
      return acc;
    }, []);

    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
  }

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


  render() {
    const { updatesRef, asset, user, updates, progressBar, numUniqueUsers, searchTerm, searchResults, searchLoading, privateChannel} = this.state;

    return (
      <React.Fragment>
        {/* Pass Current Asset to UpdatesHeader */}
        <UpdatesHeader
          assetName={this.displayAssetName(asset)}
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

        <UpdateForm 
          getUpdatesRef={this.getUpdatesRef}
          currentAsset={asset}
          currentUser={user}
          isProgressBarVisible={this.isProgressBarVisible}
          isPrivateChannel={privateChannel}
          getMessagesRef={this.getMessagesRef}
        />
      </React.Fragment>
    )
  }
}
