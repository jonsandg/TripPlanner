import React, {Component} from 'react';

import { branch } from 'baobab-react/higher-order';

import TopBar from 'components/TopBar';

import {
  RaisedButton,
  FontIcon
} from 'material-ui';

class SavedTrips extends Component {

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
        <h1>your tripz</h1>
      );

    return (
      <div>
        <TopBar
          loggedIn={this.props.user.id ? true : false}
          logIn={() => this.props.logIn(null)}
        />
        {content}
      </div>
    );
  }

};

export default branch({
  user: ['user']
}, SavedTrips);
