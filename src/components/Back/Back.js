import React, { Component } from 'react';

export default class Back extends Component{
  render(){
    return (
      <section className='goBack'>
        <span onClick={() => this.props.history.push(`${this.props.path}`)} className='back_button'><i className="fas fa-chevron-left"></i></span>
      </section>
    );
  }
}