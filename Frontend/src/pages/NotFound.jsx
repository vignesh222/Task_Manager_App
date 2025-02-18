/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
      <Typography variant="h4" color="error" align="center"  justifyContent= 'center' sx={{ margin: "20px 0" }}>
        404 - Page Not Found
      </Typography>
    </Container>
  );
};

export default NotFound;
