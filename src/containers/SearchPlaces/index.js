import React from 'react';

import {Link} from 'react-router';

import { branch } from 'baobab-react/higher-order';

import * as actions from './actions';

import PlaceList from 'components/PlaceList';
import PlaceDialog from 'components/PlaceDialog';

import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  TextField,
  FlatButton,
  FontIcon,
  DropDownMenu,
  MenuItem
} from 'material-ui';

class SearchPlaces extends React.Component {
  //Component that lets the user search and filter for places in the given city

  constructor(props, context) {
    super(props, context);

    this.props.dispatch(
      actions.searchPlaces
    );

  }

  render() {

    return (
      <div className="half_container">
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="Places" />
          </ToolbarGroup>
          <ToolbarGroup>
            <form onSubmit={(e) => this.search(e)}>
              <TextField
                floatingLabelText="Search"
                onChange={(e, val) => this.onQueryChange(val)}
                style={{bottom: '12px'}}
              />
              <FlatButton
                backgroundColor="white"
                hoverColor="#00BCD4"
                icon={<FontIcon className="material-icons">search</FontIcon>}
                onClick={(e) => this.search(e)}
                style={{marginTop: 15}}
              />
            </form>
          </ToolbarGroup>
          <ToolbarGroup>
            <DropDownMenu value={this.props.filter} onChange={(e, index, val) => this.onFilterChange(val)}>
              <MenuItem value="General" primaryText="General" />
              <MenuItem value="Museum" primaryText="Museum" />
              <MenuItem value="Restaurants" primaryText="Restaurants" />
              <MenuItem value="Nightlife" primaryText="Nightlife" />
              <MenuItem value="Shopping" primaryText="Shopping" />
              <MenuItem value="Galleries" primaryText="Galleries" />
              <MenuItem value="Cafes" primaryText="Cafes" />
              <MenuItem value="Religious buildings" primaryText="Religious buildings" />
            </DropDownMenu>
          </ToolbarGroup>

        </Toolbar>
        <PlaceList
          places={this.props.places}
          placeClick={(e, id) => this.onPlaceClick(e, id) }
          addPlace={(id) => this.onPlaceAdd(id)}
        />
        <PlaceDialog
          open={this.props.dialog.open}
          close={() => this.onDialogClose()}
          location={this.props.dialog.position}
          loading={this.props.dialog.loading}
          name={this.props.dialog.name}
          address={this.props.dialog.address}
          rating={this.props.dialog.rating}
          openingHours={this.props.dialog.openingHours}
          photos={this.props.dialog.photos}
          addPlace={() => this.onPlaceAdd()}
        />
      </div>
    );
  }

  onPlaceClick(event, id) {
    if (event.target.innerHTML === 'add_box') return; //don't open dialog when adding
    this.props.dispatch(
      actions.openDialog,
      id
    );
  }

  onPlaceAdd(id) {
    this.props.dispatch(
      actions.addPlace,
      id
    );
  }

  onDialogClose() {
    this.props.dispatch(
      actions.closeDialog
    );
  }

  onFilterChange(value) {
    this.props.dispatch(
      actions.filterChange,
      value
    );
  }

  onQueryChange(value) {
    this.props.dispatch(
      actions.queryChange,
      value
    );
  }

  search(e) {
    e.preventDefault();
    this.props.dispatch(
      actions.searchPlaces
    );
  }

};

export default branch({
  dialog: ['search', 'dialog'],
  filter: ['search', 'filter'],
  places: ['search', 'results'],
}, SearchPlaces);
