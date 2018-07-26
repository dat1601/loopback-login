import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class FloatingButton extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="home-floating-button">
        <div className="fixed-action-btn">
          <Link to="#" className="btn-floating btn-large red">
            <i className="fa fa-plus" />
          </Link>
        </div>
      </div>
    );
  }
}
