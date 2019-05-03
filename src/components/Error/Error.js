import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import './Error.css';

export default class Error extends Component {
  static contextType = UserContext;

  render(){
    return(
      <>
        {this.context.error && (
          <div className='center errorText'>
            <p>{this.context.error}</p>
          </div>
        )}
      </>
    );
  }
}