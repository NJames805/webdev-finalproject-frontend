/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StudentContainer = styled('div')({
  maxWidth: '800px',
  margin: 'auto',
  padding: '20px',
  textAlign: 'center'
});

const StudentImage = styled('img')({
  width: '300px',
  height: 'auto',
  borderRadius: '10px',
  marginBottom: '20px'
});

const StudentInfo = styled('div')({
  marginBottom: '20px'
});

const StudentView = (props) => {
  const { student, onDeleteStudent } = props;

  // Render a single Student view 
  return (
    <StudentContainer>
      <StudentImage src={student.imageUrl} alt={`${student.firstname} ${student.lastname}`} />
      <h1>{student.firstname + " " + student.lastname}</h1>
      
      <StudentInfo>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>GPA:</strong> {student.gpa || 'Not provided'}</p>
        <p><strong>Campus:</strong> {student.campus ? student.campus.name : "Not enrolled in any campus"}</p>
      </StudentInfo>

      <div>
        <Link to={`/editstudent/${student.id}`}>
          <Button variant="contained" color="primary">Edit Student</Button>
        </Link>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => onDeleteStudent(student.id)} 
          style={{ marginLeft: '10px' }}
        >
          Delete Student
        </Button>
      </div>
    </StudentContainer>
  );
};

export default StudentView;