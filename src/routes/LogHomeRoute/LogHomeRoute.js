import React, { Component } from 'react';
import LogHome from '../../components/LogHome/LogHome';

class LogHomeRoute extends Component {

  render() {
    return (
      <LogHome history={this.props.history}/>
    );
  }
}

export default LogHomeRoute;