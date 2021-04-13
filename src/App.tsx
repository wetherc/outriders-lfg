import React, { useLayoutEffect } from 'react';
import {
  Router,
  RouteComponentProps,
  Redirect,
  useLocation,
  globalHistory
} from '@reach/router';
import {
  HeaderBar
} from './components';
import {
  LoginPage,
  LandingPage
} from './pages';

import Amplify, { Auth } from 'aws-amplify';  // eslint-disable
import awsconfig from './aws-exports';

import styled from 'styled-components';
import Default, { breakpoints } from './themes/default.theme';
import { Box } from '@material-ui/core';


Amplify.configure(awsconfig);

// https://stackoverflow.com/questions/53058110/stop-reach-router-scrolling-down-the-page-after-navigating-to-new-page
const ScrollToTop = ({
  children
}: RouteComponentProps<{ children: React.ReactNode | React.ReactNode[] }>) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};

const xlargeBreakpoint = `${Default?.global?.breakpoints?.xlarge?.value}px`;
const StyledContentWrapper = styled.div`
  padding: 0 3.75rem 3.75rem;
  margin: 2.5rem auto 0;
  max-width: ${breakpoints.xlarge + 1}px;
  @media (min-width: ${xlargeBreakpoint}) {
    width: 90%;
  }
`;


interface AppProps {
  pathLocation: {
    pathname: string;
  };
}

const App = ({ pathLocation }: AppProps) => {
  return (
    <Box gridArea="main">
      <HeaderBar />
      <StyledContentWrapper>
        <Router>
          <LoginPage path="/login" />
          <LandingPage path="/" />
        </Router>
      </StyledContentWrapper>
    </Box>
  );
};

export default App;
