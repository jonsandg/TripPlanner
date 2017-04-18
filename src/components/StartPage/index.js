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

function StartPage() {
  return (
    <div style={styles.container}>
      <h1>TripPlanner</h1>
      <h3>Enter a destination</h3>
      <TextField
        hintText="Destination"
      />
      <Link to="/search">
        <RaisedButton
          label="Go!"
          primary={true} />
      </Link>

      <h3>or</h3>
      <RaisedButton
        label="Login with Github"
        icon={<FontIcon className="fa fa-github-square" />}
      />
    </div>
  );
}

export default StartPage;
