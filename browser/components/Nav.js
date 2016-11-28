import React from 'react';
import {Link} from 'react-router';

export default function Nav(props) {
    return (
      <div id="nav">
          <ul>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
      </div>
    );
}
