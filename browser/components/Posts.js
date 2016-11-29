import React, {Component} from 'react';
import {Link} from 'react-router';
import AddPost from './AddPost';
import axios from 'axios';


export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          "id": 1,
          "title": "Post 1",
          "content": "Lorem Ipsum Dolorem",
          "created_at": "2016-11-27T18:09:16.464Z",
          "updated_at": "2016-11-27T18:09:16.521Z",
          "user_id": 1,
          "user": {
            "id": 1,
            "email": "ashley@gmail.com",
            "password": "37ec19dab684bea28920ce5b3873e0f1724dbd5a",
            "salt": "t8ALUVQxdSVIEZKxWV7Nvw==",
            "twitter_id": null,
            "facebook_id": null,
            "google_id": null,
            "created_at": "2016-11-28T02:07:55.644Z",
            "updated_at": "2016-11-28T02:07:55.644Z"
          }
        }
      ]
    }


    this.handleNewPost = this.handleNewPost.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }



  componentDidMount() {
    const toJSON = response => response.json();
    const log = console.log.bind(console);
    const logError = console.error.bind(console);

    console.log("in component did mount");

    fetch('api/posts')
    .then(toJSON)
    .then(data => {
      log(data);
      this.setState({posts: data});
    })
    .catch(logError);
  }

  handleNewPost(data) {
    //Hard coded user for now...
    data.user_id = 1;

    axios.post('/api/posts', data)
    .then(response => {
      let newPost = response.data;
      this.setState((prevState, props) => ({ posts: [...prevState.posts, newPost] }));
    })
    .catch(err => {
      console.error(err);
    });

  }


  render() {
    return (
      <div>

        <div className="list">
          {
            this.state.posts.map(post => (
              <div className="post" key={post.id}>
                <Link to={`/posts/${post.id}`}><h3>Post Title: {post.title}</h3></Link>
                <div className="sub_heading">Posted by at {post.created_at}</div>

                <div className="content">{post.content} </div>
              </div>
            ))
          }
        </div>
        <br /><br />
        <AddPost onAddPost={this.handleNewPost} />

      </div>
    );
  }

}
