import React from 'react';
import { Link } from 'react-router';
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
        <RaisedButton
          label="Login with Github"
          icon={<FontIcon className="fa fa-github-square" />}
          onClick={() => props.logIn()}
        />
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
    this.props.addTrip(this.state.destination)
  }

}

export default StartPage;
