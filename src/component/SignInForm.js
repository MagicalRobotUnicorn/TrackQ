import React, { Component } from 'react';
import Modal from 'react-modal';

export default class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      username: '',
      password: ''
    }
  }

  // On Change for Username and Password

  // On Submit for Form

  // Modal with 
  render() {
    
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        aria={{
          labeledby: "login_form",
          describedby: "full_description"
        }}>
        <div id="signup_form">
          <h4>Sign up</h4>
          <p id="full_description">Complete the form to sign in to Track-q</p>
          <form id="signup-form">
            <div className="input-field">
              <input type="email" id="signup-email" required />
              <label for="signup-email">Email address</label>
            </div>
            <div className="input-field">
              <input type="password" id="signup-password" required />
              <label for="signup-email">Choose password</label>
            </div>
            <button className="submit">Submit</button> 
          </form>
        </div>
        </Modal>
    )
  }
}
