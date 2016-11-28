import React, {Component} from 'react';

export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleTitleChange(e) {
    // console.log('in handle title change', e.target.value)
    this.setState({title: e.target.value});
  }

  handleContentChange(e) {
    // console.log('in handle comment change', e.target.value)
    this.setState({content: e.target.value});
  }

  onFormSubmit(e) {
    e.preventDefault();

    console.log("Trying to submit", this.state.title, "and", this.state.content);

    //NOTE_TO_SELF: Do some sort of sanitization here before sending input data to db
    this.props.onAddPost(this.state);
  }

  render() {
    return (
      <div className="addContainer">
        <h2>Add a Post</h2>
        <form onSubmit={this.onFormSubmit} className="form-group">
           <div className="form-group">
              <label htmlFor="postTitle">Title</label>
              <input type="text" value={this.state.title} onChange={this.handleTitleChange} id="postTitle" className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="postContent">Content</label>
            <textarea className="form-control" value={this.state.content} onChange={this.handleContentChange} id="postContent"></textarea>
          </div>
          <button>Submit</button>
        </form>
      </div>
    )
  }

}
