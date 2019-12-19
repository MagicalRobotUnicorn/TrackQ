import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header className="headerObject">
        <div className="container">
          <div className="row">
            <div className="col">
              <img src="../images/trackqlogo.png" alt="Logo for Track-Q" className="siteLogo" />
              <br />
              <p className="subheading">
                An Asset Management System
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
            <Link to="/">Home</Link>  | <Link to="/signup">Sign Up</Link> | <Link to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
