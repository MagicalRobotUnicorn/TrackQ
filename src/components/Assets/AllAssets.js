import React, { Component } from 'react';
import Asset from './Asset';

export default class AllAssets extends Component {
  render() {
    return (
      <div>
        <Asset renderCode={this.renderCode} />
      </div>
    )
  }
}
