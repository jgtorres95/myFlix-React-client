import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import axios from "axios";

import { Link } from "react-router-dom";

import "./login-view.scss";

// create LoginView component
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios
      .post("https://cf-myflix-app.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <div className="login__container">
      <h1>Login to myFlix!</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label className="login__label">Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label className="login__label">Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          className="login__button"
          variant="light"
          type="submit"
          onClick={handleSubmit}
        >
          Log In
        </Button>
        <Link to="/register">
          <Button className="login__button" variant="secondary" type="link">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
