import React, {Component} from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Scheduler from 'containers/Scheduler';
import SearchPlaces from 'containers/SearchPlaces';
import TopBar from 'components/TopBar';

class TripPlanner extends Component {

  render () {
    return (
      <div>
        <TopBar />
        <Scheduler />
        <SearchPlaces />
      </div>
    );
  }

};

export default DragDropContext(HTML5Backend)(TripPlanner);
