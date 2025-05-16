/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Create styled components
const FormContainer = styled('div')({
  width: '500px',
  backgroundColor: '#f0f0f5',
  borderRadius: '5px',
  margin: 'auto',
});

const FormTitle = styled('div')({
  backgroundColor: '#c5c8d6',
  marginBottom: '15px',
  textAlign: 'center',
  borderRadius: '5px 5px 0px 0px',
  padding: '3px'
});

const NewStudentView = (props) => {
  const {handleChange, handleSubmit } = props;

  // Render a New Student view with an input form
  return (
    <div>
      <h1>New Student</h1>

      <div>
        <FormContainer>
          <FormTitle>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Add a Student
            </Typography>
          </FormTitle>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <label style={{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
            <input type="text" name="firstname" onChange={(e) => handleChange(e)} required />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
            <input type="text" name="lastname" onChange={(e) => handleChange(e)} required />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
            <input type="email" name="email" onChange={(e) => handleChange(e)} required />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
            <input 
              type="number" 
              name="gpa" 
              min="0.0" 
              max="4.0" 
              step="0.1" 
              onChange={(e) => handleChange(e)} 
            />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
            <input type="url" name="imageUrl" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id: </label>
            <input type="text" name="campusId" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br/>
            <br/>
          </form>
        </FormContainer>
      </div>
    </div>    
  )
}

export default NewStudentView;