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

//Component with list of places and a map showing where the places are
class Itinerary extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      hoverIndex: -1
    }
  }

  render() {

    const locations = this.props.days
      .reduce(
        (acc, cur) => acc.concat(cur.places),
        []
      )
      .map(
        val => val.position
      );

    return (
      <div>
        <TopBar

        />
        <ItineraryDays
          destination={this.props.destination}
          days={this.props.days}
          hoverStart={(i) => this.onHoverStart(i)}
          hoverEnd={() => this.onHoverEnd()}

        />
        <ItineraryMap
          location={this.props.coordinates}
          markers={locations}
          hoverIndex={this.state.hoverIndex}
        />
      </div>
    );
  }

  onHoverStart(index) {
    console.log('hooveriung', index);
    this.setState({
      hoverIndex: index
    });
  }

  onHoverEnd() {
    this.setState({
      hoverIndex: -1
    });
  }
};

export default branch({
  days: ['trip', 'days'],
  destination: ['trip', 'destination'],
  coordinates: ['trip', 'coordinates'],
}, Itinerary);
