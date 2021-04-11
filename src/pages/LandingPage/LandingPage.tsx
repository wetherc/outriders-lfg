import React, { useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 275
  },
});

const LandingPage = (_: RouteComponentProps) => {
  const classes = useStyles();
  return (
    <Container>
      <Paper elevation={3} className={classes.root} />
    </Container>
  );
};

export default LandingPage;
