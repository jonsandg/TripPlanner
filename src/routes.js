import App from 'containers/App';
import StartPage from 'components/StartPage';
import TripPlanner from 'containers/TripPlanner';
import SavedTrips from 'containers/SavedTrips';
import Itinerary from 'containers/Itinerary';

import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import tree from 'model';

const AppWrapper = (props) => {
  return (<App tree={tree} {...props} />);
};

const routes = {
  path: '/',
  component: AppWrapper,
  indexRoute: {component: StartPage},
  childRoutes: [
    { path: '/search', component: TripPlanner },
    { path: '/mytrips', component: SavedTrips },
    { path: '/itinerary', component: Itinerary },
  ]
};

export default routes;
