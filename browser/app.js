'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, Route, IndexRoute, IndexRedirect } from 'react-router';
import Main from './components/Main';
import Post from './components/Post';
import Posts from './components/Posts';
import AddComment from './components/AddComment';
import Login from './components/Login';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="/posts" component={Posts} />
      <Route path="/posts/:postId" component={Post} />
      <Route path="/posts/addComment/:postId/:commentId" component={AddComment} />
      <Route path="/login" component={Login} />
      <IndexRoute component={Posts} />
    </Route>
  </Router>,
  document.getElementById('app')
);
