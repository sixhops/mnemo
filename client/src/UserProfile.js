import React, { Component } from 'react';
import Logout from './Logout';
import './UserProfile.css';

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    };
  }

  render() {
    return (
      <div id='userProfileBox'>
        <p>Hello, {this.props.user.name}!</p>
        <a onClick={this.props.logout}>Logout</a>
      </div>
    );
  }
}

export default UserProfile;
