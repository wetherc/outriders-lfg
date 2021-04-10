import React, { useLayoutEffect } from 'react';
import {
  Router,
  RouteComponentProps,
  Redirect,
  useLocation,
  globalHistory
} from '@reach/router';


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

interface AppProps {
  pathLocation: {
    pathname: string;
  };
}

const App = ({ pathLocation }: AppProps) => {
  return;
};

export default App;
