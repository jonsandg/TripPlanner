import React from 'react';
import update from 'react/lib/update';

import {
  Card,
  CardHeader,
  Paper,
  RaisedButton,
  FontIcon
} from 'material-ui';

import SchedulePlace from 'components/SchedulePlace';

export default class ScheduleDay extends React.Component {

  constructor(props, context) {
    super(props, context);

    //internal state to handle drag n drop
    this.state = {
      places: props.places
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.places === nextProps.places) return;

    this.setState({
      places: nextProps.places
    });
  }

  render() {
    const styles = {
      map : {
        height: '400px',
        width: "100%"
      }
    };

    const places = this.props.places.length > 0 ?
                   this.props.places.map((place, idx) => this.renderPlace(place, idx)) :
                   (<SchedulePlace
                      emptyDay={true}
                      index={0}
                      movePlace={(...args) => this.props.movePlace(...args)}
                      day={this.props.day}
                      placeDummy={(...args) => this.props.placeDummy(...args)}
                    />);

    return (
      <Card style={{paddingBottom: 10}}>
        <CardHeader
          title={'Day ' + (this.props.day + 1)}
          subtitle={this.props.date ? new Date(this.props.date).toLocaleDateString() : ''}
        />
        {places}
      </Card>
    );
  }

  renderPlace(place, key) {

    if(place === 'dummy') {
      return (
        <SchedulePlace
          dummy={true}
          key={-1}
          index={key}
          movePlace={(...args) => this.props.movePlace(...args)}
          day={this.props.day}
          placeDummy={(...args) => this.props.placeDummy(...args)} />
      );
    }

    return (
      <SchedulePlace
        key={place.place_id}
        day={this.props.day}
        place={place}
        index={key}
        removePlace={() => this.props.removePlace(key)}
        movePlace={(...args) => this.props.movePlace(...args)}
        drag={(i) => this.props.drag(i)}
        placeDummy={(...args) => this.props.placeDummy(...args)}
      />
    );
  }


};
