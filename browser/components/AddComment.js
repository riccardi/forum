import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyTo: {
        "id": 2,
        "title": "In Reply to Post 1",
        "content": "Here is what I think about lorem ipsum",
        "thread_id": "1.1",
        "created_at": "2016-11-27T18:09:16.479Z",
        "updated_at": "2016-11-27T18:09:16.535Z",
        "user_id": null,
        "post_id": 1
      },
      title: '',
      content: '',
      status: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleContentChange(e) {
    this.setState({content: e.target.value});
  }

  onFormSubmit(e) {
    e.preventDefault();

    //NOTE_TO_SELF: Do some sort of sanitization here before sending input data to db
    // this.props.onAddPost(this.state);

    let newComment = {};
    newComment.title = this.state.title;
    newComment.content = this.state.content;
    newComment.user_id = 1;
    newComment.parent_id = this.state.replyTo.id
    newComment.post_id = this.state.replyTo.post_id

    axios.get(`/api/comments/getNextThreadId/${this.state.replyTo.id}/${this.state.replyTo.thread_id}/${this.state.replyTo.post_id}`)
    .then(response => {
      newComment.thread_id = response.data;
      return axios.post('/api/comments', newComment);
    })
    .then(response => {
      let newPost = response.data;
      this.setState({status: 'Your comment was submitted!'})
    })
    .catch(err => {
      console.error(err)
    });

  }

  componentDidMount() {
    console.log('commentId', this.props.params.commentId)
    console.log('postId', this.props.params.postId)
    if (this.props.params.commentId > 0) {
      axios.get(`/api/comments/${this.props.params.commentId}`)
      .then(response => {
        console.log('comment', response.data);
        this.setState({replyTo: response.data})
      })
      .catch(err => {
        console.error(err);
      });
    } else {
      axios.get(`/api/posts/${this.props.params.postId}`)
      .then(response => {
        console.log('post', response.data);
        //changing the data around to look more like a comment that the getNextThreadId route is exepecting
        response.data.post_id = response.data.id;
        response.data.thread_id = response.data.id;
        response.data.id = null;
        this.setState({replyTo: response.data})
      })
      .catch(err => {
        console.error(err);
      });
    }
  }

  render() {
    return (
      <div>

      <div id="replyToContainer">
      <h2>Reply To:</h2>
      <h3>{this.state.replyTo.title}</h3>
      <p>{this.state.replyTo.content}</p>
      </div>

      <div className="addContainer">
        <form onSubmit={this.onFormSubmit}>
          <input type="text" value={this.state.title} onChange={this.handleTitleChange} placeholder="Enter comment title" /><br />
          <textarea value={this.state.content} onChange={this.handleContentChange} placeholder="Enter comment"></textarea><br />
          <button>Submit</button>
        </form>
        <div className="status">{this.state.status}</div>
        <Link to={`/posts/${this.props.params.postId}`}>Back to Post</Link>
      </div>

      </div>
    )
  }

}
