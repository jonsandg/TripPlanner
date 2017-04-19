import React from 'react';

import {Link} from 'react-router';

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
      <ToolbarGroup>
        <Link to="/">
          <RaisedButton
            label="New Trip"
            primary={true}
          />
        </Link>
        <Link to="/mytrips">
          <RaisedButton
            label="My Trips"
          />
        </Link>
        <ToolbarSeparator />
        <RaisedButton
          label="Logout"
          onClick={() => props.logOut()}
        />
      </ToolbarGroup>
    );
  } else {
    toolbarContent = (
      <ToolbarGroup>
        <RaisedButton
          label="Login with Github"
          icon={<FontIcon className="fa fa-github-square" />}
          onClick={() => props.logIn()}
        />
      </ToolbarGroup>
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
        <Link to="/" style={{ textDecoration: 'none', color: 'rgb(45, 45, 45)' }}>
          <ToolbarTitle text="TripPlanner" />
        </Link>
      </ToolbarGroup>
      {toolbarContent}
    </Toolbar>
  );
}

export default TopBar;
