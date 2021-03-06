import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './update-view.scss';
import axios from 'axios';

import { Link } from "react-router-dom";

import { setUser } from "../../actions/actions";

import { connect } from 'react-redux';

// create UpdateView component 
export function UpdateView(props) {
  let user = localStorage.getItem("user");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let url = 'https://cf-myflix-app.herokuapp.com/users/' + localStorage.getItem('user');

    const isValidated = formValidation();

    axios.put(url, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(response => {
        const data = response.data;
        console.log(data);
        props.setUser(response.data);
        localStorage.setItem('user', response.data.Username);
        props.onBackClick();
      })
      .catch(e => {
        console.log('error updating user', e);
      });
  };

  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let isValidated = true;


    if (username === '') {
      usernameError.usernameEmpty = 'Username is required'
      isValidated = false;
    }

    if (password === '') {
      passwordError.passwordEmpty = 'Password is required'
      isValidated = false;
    }

    if (!(email && email.includes(".") && email.includes("@"))) {
      emailError.emailNotValid = 'Email address is not valid';
      isValidated = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValidated;

  }

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" placeholder={localStorage.getItem('user')} onChange={e => setUsername(e.target.value)} />
        {Object.keys(usernameError).map((key) => {
          return (
            <div key={key}>
              {usernameError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" placeholder={localStorage.getItem('password')} onChange={e => setPassword(e.target.value)} />
        {Object.keys(passwordError).map((key) => {
          return (
            <div key={key}>
              {passwordError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control type="email" placeholder={localStorage.getItem('email')} onChange={e => setEmail(e.target.value)} />
        {Object.keys(emailError).map((key) => {
          return (
            <div key={key}>
              {emailError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday: </Form.Label>
        <Form.Control type="date" placeholder={localStorage.getItem('birthday')} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button className="update-button" variant="dark" onClick={e => handleUpdate(e)}>
        Submit
      </Button>
      <Link to={`/users/${user}`}>
        <Button className="update-button" variant="dark">
          Cancel
        </Button>
      </Link>
    </Form>
  )
}

export default connect(null, { setUser })(UpdateView);

UpdateView.PropTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }).isRequired
};