/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const AllCampusesView = (props) => {
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
      <div>  
        <h1>There are no campuses.</h1>
        <Link to={`/newcampus`}>
        <Button variant="contained" color="primary">
          Add New Campus
        </Button>
      </Link>
    </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          {/* Image display */}
          {campus.imageUrl && (
            <img 
              src={campus.imageUrl} 
              alt={`${campus.name}`} 
              style={{ width: "300px", height: "auto", borderRadius: "10px" }}
            />
          )}
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>campus id: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <Button variant="contained" color="primary" onClick={() => props.deleteCampus(campus.id)}>Delete Campus</Button>
          <hr/>
        </div>
      ))}
      <br/>
      <Link to="/newcampus">
        <Button variant="contained" color="primary">
          Add New Campus
        </Button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;