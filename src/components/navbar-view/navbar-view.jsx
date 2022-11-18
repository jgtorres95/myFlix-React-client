import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./navbar-view.scss";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

// create NavBarView component
export class NavBarView extends React.Component {
  // sign out user by clearing local storage
  handleSignOut() {
    localStorage.clear();
    window.open("/", "_self");
  }

  render() {
    const { loggedIn } = this.props;
    console.log(loggedIn);
    const username = localStorage.getItem("user");
    const home = "/";
    const profile = `/users/${username}`;

    return (
      <Navbar bg="danger" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/" className="nav__brand">
            myFlix
          </Navbar.Brand>
          <Nav.Item className={loggedIn === false ? "hidden" : ""}>
            <Nav.Link className="nav__link" as={Link} to={home}>
              <AiOutlineHome />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className={loggedIn === false ? "hidden" : ""}>
            <Nav.Link className="nav__link" as={Link} to={profile}>
              <BsPerson />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className={loggedIn === false ? "hidden" : ""}>
            <Button
              variant="light"
              onClick={() => {
                this.handleSignOut();
              }}
            >
              Sign Out
            </Button>
          </Nav.Item>
        </Container>
      </Navbar>
    );
  }
}
