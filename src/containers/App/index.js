import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { root } from 'baobab-react/higher-order';
import tree from 'model';

class App extends React.Component {
  
  render() {
    console.log(this.props.tree.get());

    return (
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
};

export default root(tree, App);
