import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
		event.preventDefault();
		// const { message, login, signup } = this.props;
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    }

    console.log("credentials", credentials);

    axios.post('/auth/login', credentials)
    .then(response => {
      console.log("success?", response.data);
    })
    .catch(err => {
      console.error(err);
    });
	}

  render() {
    return (
      <div className="auth">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email:</label>
            <input type="email" name="email" id="loginEmail" className="form-control" required /><br />
          </div>
          <div className="form-group">
              <label htmlFor="loginPassword">Password:</label>
            <input type="password" name="password" id="loginPassword" className="form-control" required />
          </div>
          <button className="btn btn-default">Login</button>
        </form>

      </div>
    );
  }
}
