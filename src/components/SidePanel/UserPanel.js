import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../../firebase';

class UserPanel extends Component {
  state = {
    user: this.props.currentUser
  }

  componentDidMount() {
    this.setState({user: this.props.currentUser});
  }

  dropdownOptions = () => [
    {
      text: <span>Signed in as <strong>{this.state.user.displayName}</strong></span>,
      disabled: true
    },
    {
      text: <span>Create Asset</span>
    },
    {
      text: <span>View Assets</span>
    },
    {
      text: <span>View Stations</span>
    },
    {
      text: <span>Create Stations</span>
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

handleSignout = () => {
  firebase
  .auth()
  .signOut()
  .then(() => console.log("signed out!"));
}

  render() {
    const { user } = this.state;

    return (
      <Grid style={{ background: '#355a96 '}}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="box"/>
              <Header.Content>Track-Q</Header.Content>
            </Header>
          {/* User Dropdown Panel */}
          <Header style={{ padding: '0.25em'}} as="h4" inverted>
            <Dropdown trigger={
              <span>
                <Image src={user.photoURL} spaced="right" avatar />
                {this.state.user.displayName}
              </span>
            } options={this.dropdownOptions()}/>
          </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});


export default connect(mapStateToProps)(UserPanel);
