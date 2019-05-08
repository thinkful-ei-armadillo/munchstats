import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';

class NotFoundRoute extends Component {
  render() {
    return (
      <section className="textCenter">
        <h2>Oops, this page doesn't exist. Now we're in a pickle.</h2>
        <Link to='/'>        
          <Button>Get me outta here!</Button>
        </Link>
      </section>
    );
  }
}

export default NotFoundRoute;