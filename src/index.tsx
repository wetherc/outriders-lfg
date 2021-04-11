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

ReactDOM.render(
  <Location>{({ location }) => <App pathLocation={location} />}</Location>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
