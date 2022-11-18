import React from "react";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

import { setFilter } from "../../actions/actions";

import "./visibility-filter-input.scss";

// create VisibilityFilterInput component
function VisibilityFilterInput(props) {
  return (
    <div className="filter__container">
      <Form.Control
        onChange={(e) => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Search myFlix"
      />
    </div>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
