import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import './Profile.css';

class Profile extends Component {
  static contextType = UserContext;

  state = {

  };

  handleModeToggle(){
    const checkbox = document.getElementById("modeToggle");
    if(checkbox.checked === true){
      // require dark mode
    }
    else{
      // require light mode
    }
  }

  render() { 
    return (
      <>
        <h2>Hello, {this.context.user.name}!</h2>
        Dark Mode
        <label className="switch">
          <input type="checkbox" id="modeToggle" onClick={this.handleModeToggle} />
          <span className="slider round"></span>
        </label>
      </>
      );
  }
}
 
export default Profile;