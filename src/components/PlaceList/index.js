import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

import FontIcon from 'material-ui/FontIcon';
import { yellow600, cyan600 } from 'material-ui/styles/colors';

const styles = {
  gridList: {
    width: 200,
    height: 450,
    overflowY: 'auto',
  },
};

//the gridlist of places in search
function PlaceList({places, placeClick, addPlace}) {
  return (
    <div>
      <GridList
        cellHeight={150}
        cols={4}>
        {places.map((place) => renderPlace(place, placeClick, addPlace))}
      </GridList>

    </div>
  );
}

function renderPlace(place, click, add) {

  const iconStyles = {
    marginRight: 5,
    top: 5,
    fontSize: 20
  };
  const subtitle = (<span>
                      <FontIcon className="material-icons" style={iconStyles} color={yellow600}>star</FontIcon>
                      <b>{place.rating ? place.rating : "-"}</b>
                    </span>);
  const addButton = (<IconButton onTouchTap={() => add(place.place_id)}>
                      <FontIcon className="material-icons" color="white">add_box</FontIcon>
                    </IconButton>);

  return (
    <GridTile
      key={place.place_id}
      title={place.name}
      subtitle={subtitle}
      actionIcon={addButton}
      onClick={(e) => click(e, place.place_id)}
    >
      <img src={place.img} />
    </GridTile>
  );

}

export default PlaceList;
