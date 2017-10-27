import React, { Component } from 'react';
import axios from 'axios';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      this.props.lift(result.data)
    })
  }

  render() {
    return (
      <div id='signupBox'>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div id='labels'>
              <p>Name:</p>
              <p>Email:</p>
              <p>Password:</p>
            </div>
            <div id='inputs'>
              <input type='text' value={this.state.name} onChange={this.handleNameChange} /><br />
              <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
              <input type='password' value={this.state.password} onChange={this.handlePasswordChange} /><br />
            </div>
            <input type='submit' value='Sign Up' />
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
