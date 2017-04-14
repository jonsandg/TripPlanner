import React, {Component} from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Scheduler from 'containers/Scheduler';
import SearchPlaces from 'containers/SearchPlaces';

class TripPlanner extends Component {
  
  render () {
    return (
      <div>
        <SearchPlaces />
        <Scheduler />
      </div>
    );
  }
  
};

export default DragDropContext(HTML5Backend)(TripPlanner);