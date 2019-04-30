import React, { Component } from 'react';
import config from '../../config'
import AddIngredient from '../AddIngredient/AddIngredient';

export default class LogSnack extends Component {

  render() {
    return (
      <div>
        <AddIngredient />
      </div>
    );
  }
}