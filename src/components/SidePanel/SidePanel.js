import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Assets from './Assets';
import DirectMessages from './DirectMessages';

export default class SidePanel extends Component {
  render() {
    const { currentUser } = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: '#355a96', fontSize: '1.2rem' }}
      >
        <UserPanel currentUser={currentUser} />
        <Assets currentUser={currentUser} />
        <DirectMessages
          currentUser={currentUser}
        />
      </Menu>
    )
  }
}