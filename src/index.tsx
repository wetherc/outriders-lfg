import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import Amplify, { Auth } from 'aws-amplify';  // eslint-disable
import { AuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloLink } from 'apollo-link';
import { Location } from '@reach/router';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';

import AppSyncConfig from './aws-exports'


Amplify.configure(AppSyncConfig)

const graphqlEndpoint = AppSyncConfig.aws_appsync_graphqlEndpoint;
const appsyncRegion = AppSyncConfig.aws_appsync_region;
const auth = {
  type: AppSyncConfig.aws_appsync_authenticationType,
  jwtToken: () =>
    Auth.currentSession()
      .then(session => session.getIdToken().getJwtToken())
      .catch(err => {
        console.error('error', err);
      })
} as AuthOptions;

const appSyncLinkConfig = { url: graphqlEndpoint, region: appsyncRegion, auth: auth };
const client = new ApolloClient({
  link: ApolloLink.from([
    (new AuthLink(appSyncLinkConfig) as unknown) as ApolloLink,
    (createSubscriptionHandshakeLink(appSyncLinkConfig) as unknown) as ApolloLink,
    // This becomes the terminating-link
    new HttpLink({ uri: graphqlEndpoint })
  ]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Location>{({ location }) => <App pathLocation={location} />}</Location>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
