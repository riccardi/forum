import React, {Component} from 'react';
import Posts from './Posts';
import Nav from './Nav';
import axios from 'axios';


export default class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Main">
        <div id="nav_container">
          <h1>Welcome to the Forum</h1>
          <Nav />
        </div>
        <div id="main_container">
          {this.props.children}
        </div>
      </div>
    );
  }

}
