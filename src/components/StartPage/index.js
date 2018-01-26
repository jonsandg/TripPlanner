import React from 'react';
import { Link } from 'react-router';
import { branch } from 'baobab-react/higher-order';
import {
  FontIcon,
  RaisedButton,
  FlatButton,
  TextField
 } from 'material-ui';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '300px'
  }
};

class StartPage extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      destination: ''
    };
  }

  render() {

    const button = this.props.user ?
    (
      <Link to="/mytrips">
        <RaisedButton
          label="View my trips"
        />
      </Link>
    ) : (
      <RaisedButton
        label="Login with Github"
        icon={<FontIcon className="fa fa-github-square" />}
        onClick={() => this.props.logIn()}
      />
    );

    return (
      <div style={styles.container}>
        <h1>TripPlanner</h1>
        <h3>Enter a destination</h3>
        <TextField
          hintText="Destination"
          value={this.state.destination}
          onChange={(e, val) => this.destinationChange(val)}
        />
        <RaisedButton
          label="Go!"
          primary={true}
          onClick={() => this.submitDestination()}
        />
        <h3>or</h3>
        {button}
      </div>
    );
  }

  destinationChange(value) {
    this.setState({
      destination: value
    });
  }

  submitDestination() {
    if(!this.state.destination) return;
    this.props.addTrip(this.state.destination);
  }

}

export default branch({
  user: ['user', 'id']
}, StartPage);
