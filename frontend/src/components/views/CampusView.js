/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, onDeleteStudent, onDeleteCampus } = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <img src={campus.imageUrl} alt={campus.name} />
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.length === 0 ? (
        <p>No students are enrolled at this campus.</p>
      ) : (
        campus.students.map(student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <Button variant="contained" color="error" onClick={() => onDeleteStudent(student.id)} style={{ marginBottom: '10px' }}>Delete Student</Button>
            </div>
          );
        })
      )}
      <Link to={`/newstudent`}>
        <Button variant="contained" color="primary">Add New Student</Button>
      </Link>
      <Link to={`/editcampus/${campus.id}`}>
        <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>Edit Campus</Button>
      </Link>
      <Button variant="contained" color="error" onClick={() => onDeleteCampus(campus.id)} style={{ marginLeft: '10px' }}>Delete Campus</Button>
    </div>
  );
};

export default CampusView;