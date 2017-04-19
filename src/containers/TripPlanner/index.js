import React, {Component} from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { branch } from 'baobab-react/higher-order';

import Scheduler from 'containers/Scheduler';
import SearchPlaces from 'containers/SearchPlaces';
import TopBar from 'components/TopBar';

class TripPlanner extends Component {

  render () {
    console.log(this.props.user);

    return (
      <div>
        <TopBar
          loggedIn={this.props.user.id ? true : false}
          logIn={() => this.props.logIn(null)}
        />
        <Scheduler />
        <SearchPlaces />
      </div>
    );
  }

};

let branchedTripPlanner = branch({
  user: ['user']
}, TripPlanner);
export default DragDropContext(HTML5Backend)(branchedTripPlanner);
