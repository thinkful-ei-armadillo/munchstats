import './Loading.css';
import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

export default class Loading extends Component{
  static contextType = UserContext;

  render(){
    // if loading, then return loading image, otherwise return nothing
    if(this.context.loading){
      return (
        <div className="lds-facebook"><div></div><div></div><div></div></div>
      );
    }
    else return (
      <>
      </>
    );
  }
}