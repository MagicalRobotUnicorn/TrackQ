import React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';

import UpdatesHeader from './UpdatesHeader';
import UpdateForm from './UpdateForm';
import Update from './Update';


export default class Updates extends Component {
  state = {
    updatesRef: firebase.database().ref('updates'),
    updates: [],
    updatesLoading: true,
    asset: this.props.currentAsset,
    user: this.props.currentUser
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
      console.log("Loaded updates: " + loadedUpdates.length);
      this.setState({
        updates: loadedUpdates,
        updatesLoading: false
      });
    });
  };

  displayUpdates = updates => (
    updates.length > 0 && updates.map(update => (
      <Update 
        key={update.timestamp}
        update={update}
        user={this.state.user}
      />
    ))
  )

  render() {
    const { updatesRef, asset, user, updates } = this.state;

    return (
      <React.Fragment>
        {/* Pass Current Asset to UpdatesHeader */}
        <UpdatesHeader />

        <Segment>
          <Comment.Group className="updates">
            {this.displayUpdates(updates)}
          </Comment.Group>
        </Segment>

        <UpdateForm 
          updatesRef={updatesRef}
          currentAsset={asset}
          currentUser={user}
        />
      </React.Fragment>
    )
  }
}
