import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import LogHome from '../../components/LogHome/LogHome';
//import './LogHomeRoute.css';

class LogHomeRoute extends Component {

  render() {
    return (
      <LogHome />
    );
  }
}

export default LogHomeRoute;