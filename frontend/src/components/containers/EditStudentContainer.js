/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import React, { useState, useEffect, useRef } from "react";
import Header from './Header';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';

const EditStudentContainer = (props) => {
  const { id } = useParams();
  const initialized = useRef(false);
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    campusId: null,
    redirect: false,
    redirectId: null
  });

  useEffect(() => {
    // Get student data from back-end database
    props.fetchStudent(id);
  }, [id, props]);

  useEffect(() => {
    if (props.student && !initialized.current) {
      initialized.current = true;
      setState(prevState => ({
        ...prevState,
        firstname: props.student.firstname,
        lastname: props.student.lastname,
        campusId: props.student.campusId
      }));
    }
  }, [props.student]);

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

    let student = {
      id: props.student.id,
      firstname: state.firstname,
      lastname: state.lastname,
      campusId: state.campusId
    };
    
    // Edit student in back-end database
    await props.editStudent(student);

    // Update state, and trigger redirect to show the edited student
    setState({
      ...state,
      redirect: true,
      redirectId: student.id
    });
  }

  // Redirect to edited student's page after submit
  if (state.redirect) {
    return <Navigate to={`/student/${state.redirectId}`} replace={true} />
  }

  // Display the input form via the corresponding View component
  return (
    <div>
      <Header />
      <EditStudentView 
        handleChange={handleChange} 
        handleSubmit={handleSubmit}
        student={state}      
      />
    </div>          
  );
}

// Map state to props
const mapState = (state) => {
  return {
    student: state.student,
  };
};

// Map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    editStudent: (student) => dispatch(editStudentThunk(student)),
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  };
};

// Export store-connected container by default
export default connect(mapState, mapDispatch)(EditStudentContainer); 