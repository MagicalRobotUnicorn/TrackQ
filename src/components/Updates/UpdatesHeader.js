import React, { Component } from 'react';
import { Header, Segment, Input, Icon, Grid } from 'semantic-ui-react';

var QRCode = require('qrcode-react');

// Use UpdatesHeader as Class based componenet

// Have currentAsset imported to state

// use currentAsset data to populate header

class UpdatesHeader extends Component {

  render() {
    const { assetId, assetName, numUniqueUsers, handleSearchChange, searchLoading, isPrivateAsset } = this.props;

    return (
      <Grid.Row>
        <Grid.Column width={4}>
          {!isPrivateAsset && <QRCode value={assetId} height="150" width="150" />}
        </Grid.Column>
      
      <Segment clearing>
        {/* Asset Title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
          {assetName}
            {!isPrivateAsset && <Icon name={"star outline"} color="black" />}
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
          {/* Insert Number of Updates */}
        </Header>

        {/* Asset Search Input */}
        <Header floated="right">
          <Input
            loading={searchLoading}
            onChange={handleSearchChange}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
            />
        </Header>
      </Segment>
      </Grid.Row>
    )
  }
}

export default UpdatesHeader;
