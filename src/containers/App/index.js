import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { root } from 'baobab-react/higher-order';
import tree from 'model';

import * as actions from './actions';

class App extends React.Component {

  render() {
    console.log(this.props.tree.get());

    return (
      <MuiThemeProvider>
        {React.cloneElement(this.props.children, {
          logIn: (redir) => this.logIn(redir),
          addTrip: (destination) => this.addTrip(destination)
        })}
      </MuiThemeProvider>
    );
  }

  logIn(redirect) {
    actions.logIn(redirect);
  }

  logOut(redirect) {

  }

  addTrip(destination) {
    actions.addTrip(destination);
  }
};

export default root(tree, App);
