import React, { Component } from 'react';
import LogSnack from '../../components/LogSnack/LogSnack';

class LogSnackRoute extends Component {
  render() {
    return (
      <section>
        <LogSnack history = {this.props.history}/>
      </section>
    );
  }
}

export default LogSnackRoute;