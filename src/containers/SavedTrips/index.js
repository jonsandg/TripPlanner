import React, {Component} from 'react';

import { branch } from 'baobab-react/higher-order';

import TopBar from 'components/TopBar';
import * as actions from './actions';

import { Link } from 'react-router';
import {
  RaisedButton,
  FlatButton,
  Card,
  CardHeader,
  Paper,
  FontIcon
} from 'material-ui';

class SavedTrips extends Component {
//component that shows all of the users trips
//from here the user can delete or show them

  constructor(...args) {
    super(...args);
    this.renderTrip = this.renderTrip.bind(this);
  }

  render () {

    const styles = {
      notLoggedIn: {
        textAlign: 'center',
        paddingTop: '300px'
      }
    };

    const content = !this.props.user.id ?
      (
        <div style={styles.notLoggedIn}>
          <h1>You are not logged in</h1>
          <h3>Log in to see your saved trips</h3>
          <RaisedButton
            label="Login with Github"
            icon={<FontIcon className="fa fa-github-square" />}
            onClick={() => this.props.logIn()}
          />
        </div>
      ) : (
        <div>
          <h1>Your trips</h1>
          <Link to="/">
            <RaisedButton
              label="New trip"
              primary={true}
            />
          </Link>
          {this.props.trip.destination === '' ? '' : this.renderTrip(this.props.trip, -1)}
          {this.props.savedTrips.map(this.renderTrip)}
        </div>
      );

    return (
      <div>
        <TopBar
          loggedIn={this.props.user.id ? true : false}
          logIn={() => this.props.logIn(null)}
          logOut={() => this.props.logOut()}
        />
        {content}
      </div>
    );
  }

  renderTrip(trip, index) {
    return (
      <Paper
        key={index}
        zDepth={2}
        style={{margin: 10}} >
        <CardHeader
          title={trip.destination}
          avatar={trip.img}
          subtitle={new Date(trip.days[0].date).toLocaleDateString() + ' - ' + new Date(trip.days[trip.days.length-1].date).toLocaleDateString()}
        >
        <FlatButton
          label=""
          style={{float: 'right', color: '#d1d1d1'}}
          icon={<FontIcon className="material-icons">delete</FontIcon>}
          onTouchTap={() => this.removeTrip(index)}
        />
        <RaisedButton
          label="Show"
          primary={true}
          style={{float: 'right'}}
          onTouchTap={() => this.showTrip(index)}
        />
        </CardHeader>
      </Paper>
    );
  }

  removeTrip(index) {
    this.props.dispatch(
      actions.removeTrip,
      index
    );
  }

  showTrip(index) {
    this.props.dispatch(
      actions.showTrip,
      index
    );
  }

};

export default branch({
  user: ['user'],
  trip: ['trip'],
  savedTrips: ['user', 'savedTrips']
}, SavedTrips);
