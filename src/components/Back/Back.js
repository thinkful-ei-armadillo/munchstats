import React, { Component } from 'react';

export default class Back extends Component{

  redirect = () => {
    if(this.props.history.location.pathname === '/profile'){
      this.props.history.goBack();
    } else{
      this.props.history.push(`${this.props.path}`);
    }
  }

  render(){
    return (
      <section className='goBack'>
        <span onClick={() => this.redirect()} className='back_button'><i className="fas fa-chevron-left"></i></span>
      </section>
    );
  }
}