import React, { useEffect, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { Auth } from 'aws-amplify';  // eslint-disable
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 275
  },
});

const LoginPage = (_: RouteComponentProps) => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(['']);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = Auth.currentUserInfo();
      const info = await response;
      setUserInfo(info);
    };
    fetchUserInfo();
  }, []);

  if ('username' in userInfo) {
    navigate('/');
  };

  return (
    <AmplifyAuthenticator>
      <AmplifySignUp
        headerText="Create an Outriders LFG account"
        formFields={[
          { type: 'username' },
          { type: 'email' },
          { type: 'password' },
        ]}
        slot="sign-up">
      </AmplifySignUp>
    </AmplifyAuthenticator>
  );
};

export default LoginPage;


