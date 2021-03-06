import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

// extract visibilityFilter state from store
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

// create MoviesList component 
function MoviesList(props) {

  const { movies, visibilityFilter, handleFavorite } = props;
  let filteredMovies = movies;

  // filter movies based on user input
  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <>
    <Col md={12} style={{ margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} handleFavorite={id => handleFavorite(id)} />
      </Col>
    ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
}