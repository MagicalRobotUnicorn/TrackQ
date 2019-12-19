import React, { Component } from 'react';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import md5 from 'md5';

export default class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  }

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty) {
      error = { message: 'Fill in all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    }
    else if (!this.isPasswordValid()) {
      error = { message: 'Password is invalid' };
      this.setState({ errors: errors.concat(error) });
      return false;
    }
    else {
      return true;
    }
  }

  isFormEmpty = () => {
    console.log("Username length: ", this.state.username.length);

    return (this.state.username.length === 0 || this.state.email.length === 0|| this.state.password.length === 0 || this.state.passwordConfirmation.length === 0);
  }

  isPasswordValid = () => {
    if (this.state.password.length < 6 || this.state.passwordConfirmation < 6) {
      return false;
    }
    else if (this.state.password !== this.state.passwordConfirmation) {
      return false;
    }
    else {
      return true;
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({errors: [], loading: true });

    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(createdUser => {
      console.log(createdUser);

      createdUser.user.updateProfile({
        displayName: this.state.username,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
      })
      .then(() => {
        this.saveUser(createdUser).then(() => {
          console.log('user created');
        })
      })
      .catch(err => {
        console.error(err);
        this.setState({error: this.state.errors.concat(err), loading: false })
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  displayError = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleInputError = (errors, inputName) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputName))
      ? "error"
      : ""
  }

  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="lightbulb outline" color="violet" />
            Register for Track-Q
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                className={this.handleInputError(errors, "username")}
                type="text" />
              <Form.Input fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email" />
              <Form.Input fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password" />
              <Form.Input fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
                type="password" />

              <Button disabled={loading} className= {loading ? 'loading' : '' } color="violet" fluid size="large">Submit</Button>
            </Segment>
          </Form>
          {
            this.state.errors.length > 0 && (
              <Message error>
                <h3>Error</h3>
                {this.displayError(errors)}
              </Message>
            )
          }
          <Message>Already a user? <Link to="/login">Login</Link></Message>
        </Grid.Column>
      </Grid>
    )
  }
}
