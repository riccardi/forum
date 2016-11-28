import React, {Component} from 'react';
import Comments from './Comments';
import axios from 'axios';
import {Link} from 'react-router';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        "id": 1,
        "title": "Post 1",
        "content": "Lorem Ipsum Dolorem",
        "created_at": "2016-11-27T18:09:16.464Z",
        "updated_at": "2016-11-27T18:09:16.521Z",
        "user_id": 1,
        "comments": [
          {
            "id": 2,
            "title": "In Reply to Post 1",
            "content": "Here is what I think about lorem ipsum",
            "thread_id": "1.1",
            "created_at": "2016-11-27T18:09:16.479Z",
            "updated_at": "2016-11-27T18:09:16.535Z",
            "user_id": null,
            "post_id": 1
          },
          {
            "id": 1,
            "title": "In Reply to In Reply to Post 1",
            "content": "I can see what you are saying but I slightly disagree",
            "thread_id": "1.1.1",
            "created_at": "2016-11-27T18:09:16.479Z",
            "updated_at": "2016-11-27T18:09:16.535Z",
            "user_id": null,
            "post_id": 1
          },
          {
            "id": 3,
            "title": "3rd Reply",
            "content": "I am the third reply in this thread",
            "thread_id": "1.1.1.1",
            "created_at": "2016-11-27T18:09:16.479Z",
            "updated_at": "2016-11-27T18:09:16.535Z",
            "user_id": null,
            "post_id": 1
          },
          {
            "id": 5,
            "title": "Reply to 3rd Reply",
            "content": "I am the 1st reply to the third reply in this thread",
            "thread_id": "1.1.1.2",
            "created_at": "2016-11-27T18:09:16.480Z",
            "updated_at": "2016-11-27T18:09:16.535Z",
            "user_id": null,
            "post_id": 1
          }
        ]
      }
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log('this.props.params.postId');
    axios.get(`/api/posts/${this.props.params.postId}`)
    .then(response => {
      console.log("fetched post", response.data)
      this.setState({post: response.data});
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return (
      <div id="post">
        <h2>{this.state.post.title}</h2>
        <div className="sub_heading">Posted by at {this.state.post.created_at}</div>
        <div className="content">{this.state.post.content}</div>
        <Link to={`/posts/addComment/${this.state.post.id}/0`}>Reply</Link>
        <br />
        <Comments comments={this.state.post.comments}/>
      </div>
    );
  }
}
