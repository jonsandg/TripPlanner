import React, {Component} from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { branch } from 'baobab-react/higher-order';

import Scheduler from 'containers/Scheduler';
import SearchPlaces from 'containers/SearchPlaces';
import TopBar from 'components/TopBar';

class TripPlanner extends Component {

/*
  constructor(props, context) {
    super(props, context);
  }
*/
  render () {
    console.log(this.props.user);

    if(this.props.destination === '') {
      this.props.router.push('/');
      return null;
    }

    return (
      <div>
        <TopBar
          loggedIn={this.props.user.id ? true : false}
          logIn={() => this.props.logIn(null)}
          logOut={() => this.props.logOut()}
        />
        <Scheduler />
        <SearchPlaces />
      </div>
    );
  }

};

let branchedTripPlanner = branch({
  user: ['user'],
  destination: ['trip', 'destination']
}, TripPlanner);
export default DragDropContext(HTML5Backend)(branchedTripPlanner);
