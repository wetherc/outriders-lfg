import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/features/array/includes';
import 'core-js/features/object/assign';
import 'srcdoc-polyfill';
import { Location } from '@reach/router';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import { AuthLink, AuthOptions } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { Cache, ApolloCache, Transaction } from 'apollo-cache';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import getConfig, { Env } from './config';


const config = getConfig(process.env.REACT_APP_ENV as Env);

const graphqlEndpoint = config.aws_appsync_graphqlEndpoint;
const appsyncRegion = config.aws_appsync_region;
const appSyncLinkConfig = { url: graphqlEndpoint, region: appsyncRegion };

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    new AuthLink(appSyncLinkConfig),
    createSubscriptionHandshakeLink(
      appSyncLinkConfig,
      new HttpLink({ uri: graphqlEndpoint})
    )
  ])
})

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
