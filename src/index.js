"use strict";

// Accept hot module reloading
if (module.hot) {
  module.hot.decline('./routes.js');
  module.hot.accept();
}

import './styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render((
    <Router history={browserHistory} routes={routes} />
), document.getElementById('app'));
