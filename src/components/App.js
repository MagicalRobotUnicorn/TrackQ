import React from "react";
import { Grid } from 'semantic-ui-react';
import "./App.css";
import { connect } from 'react-redux';

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Updates from './Updates/Updates';
import MetaPanel from './MetaPanel/MetaPanel';

const App = ({ currentUser, currentAsset }) => (
  <Grid columns="equal" className="app" style={{background: '#eee'}}>
    <ColorPanel />
    <SidePanel
      key={currentUser && currentUser.uid}
      currentUser={currentUser}
    />
    <Grid.Column style={{ marginLeft: 320 }}>
      <Updates
        key={currentAsset && currentAsset.id}
        currentAsset={currentAsset}
        currentUser={currentUser}
      />
    </Grid.Column>
    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentAsset: state.asset.currentAsset
});

export default connect(mapStateToProps)(App);