import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      this.props.lift(result.data)
    })
  }

  render() {
    return (
      <div id='loginBox'>
        <form onSubmit={this.handleSubmit}>
          <p id='loginHint'>Already have an account?</p>
          <div>
            <div id='labels'>
              <p>Email:</p>
              <p>Password:</p>
            </div>
            <div id='inputs'>
              <input type='text' value={this.state.email} onChange={this.handleEmailChange} /><br />
              <input type='password' value={this.state.password} onChange={this.handlePasswordChange} /><br />
            </div>
          </div>
          <input type='submit' value='Log in' />
        </form>
      </div>
    );
  }
}

export default Login;
