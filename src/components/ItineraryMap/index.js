import React from 'react';

import MapMarker from 'components/MapMarker';
import GoogleMap from 'google-map-react';

const style = {
  height: '800px',
  width: '100%'
};

let hoverIndex;
function ItineraryMap(props) {
  hoverIndex = props.hoverIndex;

  return (
    <div className="half_container">
      <div style={style}>
        <GoogleMap
          bootstrapURLKeys={{key: "AIzaSyCBnyTzPsoug4grZ-pAhIFEBmnh32aTdv0"}}
          center={props.location}
          zoom={14}>
          {props.markers.map(renderMarker)}
        </GoogleMap>
      </div>
    </div>
  );
}

function renderMarker(location, index) {
  return (
    <MapMarker
      lat={location[0]}
      lng={location[1]}
      key={index}
      text={index+1}
      hovering={index === hoverIndex}
    />
  );
}

export default ItineraryMap;
