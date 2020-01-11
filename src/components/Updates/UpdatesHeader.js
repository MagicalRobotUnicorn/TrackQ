import React, { Component } from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';


// Use UpdatesHeader as Class based componenet

// Have currentAsset imported to state

// use currentAsset data to populate header


class UpdatesHeader extends Component {
  render() {
    return (
      <Segment clearing>
        {/* Asset Title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            Asset
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>2 Users</Header.Subheader>
          {/* Insert Number of Updates */}
        </Header>

        {/* Asset Search Input */}
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
            />
        </Header>
      </Segment>
    )
  }
}

export default UpdatesHeader;
