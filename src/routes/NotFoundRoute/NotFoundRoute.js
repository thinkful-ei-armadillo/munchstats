import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NotFoundRoute extends Component {
  render() {
    return (
      <section className="textCenter">
        <h2>Oops, this page doesn't exist. Now we're in a pickle.</h2>
        <Link to='/'>        
          <button>Get me outa here!</button>
        </Link>
      </section>
    );
  }
}

export default NotFoundRoute;