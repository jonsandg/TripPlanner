import React from 'react';

import {
  Toolbar,
  ToolbarTitle,
  ToolbarGroup,
  ToolbarSeparator,
  RaisedButton,
  FlatButton,
  FontIcon
} from 'material-ui';

function TopBar(props) {

  let toolbarContent;

  if(props.loggedIn) {
    toolbarContent = (
      <div>
        <RaisedButton
          label="New Trip"
          primary={true}
        />
        <RaisedButton
          label="My Trips"
        />
        <ToolbarSeparator />
        <RaisedButton
          label="Logout"
        />
      </div>
    );
  } else {
    toolbarContent = (
      <RaisedButton
        label="Login with Github"
        icon={<FontIcon className="fa fa-github-square" />}
      />
    );
  }

  return (
    <Toolbar
      style={{backgroundColor: '#7ABFD6'}}
    >
      <ToolbarGroup
        firstChild={true}
        style={{backgroudColor: '#7ABFD6'}}
      >
        <ToolbarTitle text="TripPlanner" />
      </ToolbarGroup>
      <ToolbarGroup>
        {toolbarContent}
      </ToolbarGroup>
    </Toolbar>
  );
}

export default TopBar;
