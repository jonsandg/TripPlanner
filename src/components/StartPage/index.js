import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';

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
        <FlatButton 
          label="Go!"
          primary={true} />
      </Link>
    
      <h3>Or login to start</h3>
      <RaisedButton label="Login" />
    </div>
  );
}

export default StartPage;