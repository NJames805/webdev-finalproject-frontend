/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

const EditCampusContainer = (props) => {
  const { id } = useParams();
  const initialized = useRef(false);
  const [state, setState] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: "",
    redirect: false,
    redirectId: null
  });

  useEffect(() => {
    // Get campus data from back-end database
    props.fetchCampus(id);
  }, [id, props]);

  useEffect(() => {
    if (props.campus && !initialized.current) {
      initialized.current = true;
      setState(prevState => ({
        ...prevState,
        name: props.campus.name,
        address: props.campus.address,
        description: props.campus.description,
        imageUrl: props.campus.imageUrl
      }));
    }
  }, [props.campus]);

  // Capture input data when it is entered
  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  const handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let campus = {
      id: props.campus.id,
      name: state.name,
      address: state.address,
      description: state.description,
      imageUrl: state.imageUrl
    };
    
    // Edit campus in back-end database
    await props.editCampus(campus);

    // Update state, and trigger redirect to show the edited campus
    setState({
      ...state,
      redirect: true,
      redirectId: campus.id
    });
  }

  // Redirect to edited campus's page after submit
  if (state.redirect) {
    return <Navigate to={`/campus/${state.redirectId}`} replace={true} />
  }

  // Display the input form via the corresponding View component
  return (
    <div>
      <Header />
      <EditCampusView 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        campus={state}      
      />
    </div>          
  );
}

// Map state to props
const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// Map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
  };
};

// Export store-connected container by default
export default connect(mapState, mapDispatch)(EditCampusContainer); 