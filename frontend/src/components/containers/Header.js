/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
// Import "material" library for building UI with React components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import React from "react";
// Define styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  flexGrow: 1,
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

const StyledButton = styled(Button)({
  color: 'white',
  textDecoration: 'none',
});

// Header component, displayed on every page
// Links to every other page
const Header = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledTypography variant="h6">
          Campus Management System
        </StyledTypography>

        <StyledButton component={Link} to="/">
          Home
        </StyledButton>

        <StyledButton component={Link} to="/campuses">
          All Campuses
        </StyledButton>

        <StyledButton component={Link} to="/students">
          All Students
        </StyledButton>
      </StyledToolbar>
    </StyledAppBar>
  );    
}

export default Header;
