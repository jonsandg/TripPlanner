import React from 'react';
import {Link} from 'react-router';
import { branch } from 'baobab-react/higher-order';

import ItineraryDays from 'components/ItineraryDays';
import ItineraryMap from 'components/ItineraryMap';
import TopBar from 'components/TopBar';

import * as actions from './actions';

import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  TextField,
  FlatButton,
  FontIcon,
  DropDownMenu,
  MenuItem
} from 'material-ui';

class SearchPlaces extends React.Component {

  constructor(props, context) {
    super(props, context);

  }

  render() {

    return (
      <div>
        <TopBar

        />
        <ItineraryDays
          destination={this.props.destination}
          days={this.props.days}
        />
        <ItineraryMap

        />
      </div>
    );
  }
};

export default branch({
  days: ['trip', 'days'],
  destination: ['trip', 'destination'],
  coordinates: ['trip', 'coordinates'],
}, SearchPlaces);
