import React from 'react';

import {Link} from 'react-router';

import { branch } from 'baobab-react/higher-order';

import * as actions from './actions';

import ScheduleDay from 'components/ScheduleDay';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  TextField,
  FlatButton,
  FontIcon,
  DatePicker,
  RaisedButton
} from 'material-ui';

class Scheduler extends React.Component {

  constructor(props, context) {
    super(props, context);

  }

  render() {

    console.log('days');
    for (var day of this.props.days) {
      console.log(day.places);
    }


    return (
      <div className="half_container">
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="Schedule" />
          </ToolbarGroup>
          <ToolbarGroup>
            <DatePicker
              hintText="Trip date"
              value={new Date(this.props.date)}
              onChange={(e, date) => this.onDateChange(date)}
            />
            <TextField
              type="number"
              floatingLabelText="Days"
              style={{bottom: '12px', width: 40}}
              value={this.props.duration}
              onChange={(e, val) => this.onDaysChange(val)}
            />
            <Link to="/itinerary">
              <RaisedButton
                label="Itinerary"
              />
            </Link>
          </ToolbarGroup>
        </Toolbar>
        <div>
          {this.props.days.map((day, idx) => this.renderScheduleDay(day, idx))}
        </div>
      </div>
    );
  }

  onDaysChange(value) {
    this.props.dispatch(
      actions.changeDays,
      value
    );
  }

  onDateChange(date) {
    this.props.dispatch(
      actions.changeDate,
      date
    );
  }

  renderScheduleDay(day, index) {
    return (
      <ScheduleDay
        key={index}
        day={index}
        date={day.date}
        places={day.places}
        removePlace={(i) => this.removePlace(i, index)}
        movePlace={(...args) => this.movePlace(...args)}
        drag={(i) => this.beginDrag(i, index)}
        placeDummy={(...args) => this.placeDummy(...args)}
      />
    );
  }

  removePlace(index, day) {
    this.props.dispatch(
      actions.removePlace,
      index,
      day
    );
  }

  movePlace() {
    this.props.dispatch(
      actions.movePlace
    );
  }

  placeDummy(index, day) {
    this.props.dispatch(
      actions.placeDummy,
      index,
      day
    );
  }

  beginDrag(index, day) {
    this.props.dispatch(
      actions.beginDrag,
      index,
      day
    );
  }


};

export default branch({
  days: ['trip', 'days'],
  duration: ['trip', 'numberOfDays'],
  date: ['trip', 'startDate'],
}, Scheduler);
