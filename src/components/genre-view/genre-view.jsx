import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./genre-view.scss";

//create GenreView component
export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container className="genre__container">
        <Row>
          <h1>{genre.Name}</h1>
        </Row>
        <Row>
          <p>{genre.Description}</p>
        </Row>
        <Row>
          <Button
            className="genre-view-button"
            variant="dark"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
