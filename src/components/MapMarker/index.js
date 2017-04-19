import React from 'react';

//the marker the shows a location on a map
function MapMarker({text, hovering}) {

  const K_WIDTH = hovering ? 25 : 20;
  const K_HEIGHT = hovering ? 25 : 20;
  const borderColor = hovering ? '#0370ad' : '#4b9bc8';

  const style = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid ' + borderColor,
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
  };

  return (
    <div style={style}>
      {text}
    </div>
  );
};

export default MapMarker;
