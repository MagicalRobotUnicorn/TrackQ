import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';

export default class UserPanel extends Component {
  dropdownOptions = () => [
    {
      text: <span>Signed in as <strong>User</strong></span>,
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
      text: <span>Sign Out</span>
    }
]
  render() {
    return (
      <Grid style={{ background: '#355a96 '}}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="box"/>
              <Header.Content>Track-Q</Header.Content>
            </Header>
          </Grid.Row>
          <Header style={{ padding: '0.25em'}} as="h4" inverted>
            <Dropdown trigger={
              <span>User</span>
            } options={this.dropdownOptions()}/>
          </Header>
        </Grid.Column>
      </Grid>
    )
  }
}