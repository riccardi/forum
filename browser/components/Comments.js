import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.makeIndentation = this.makeIndentation.bind(this);
  }

  makeIndentation(threadId) {
    let splitThreadId = threadId.split('.');
    let count = splitThreadId.length-1;
    let px = count*10;
    return {
      marginLeft: `${px}px`
    };
  }

  render() {

    return (
      <div className="list">
      {
        this.props.comments.map(comment => (
          <div className="comment" key={comment.thread_id} style={this.makeIndentation(comment.thread_id)}>
            <h3>{comment.title}</h3>
            <div className="sub_heading">Posted by at {comment.created_at}</div>
            <div className="content">{comment.content} </div>
            <Link to={`/posts/addComment/${comment.post_id}/${comment.id}`}>Reply</Link>
          </div>
        ))
      }
      </div>
    )
  }
}
