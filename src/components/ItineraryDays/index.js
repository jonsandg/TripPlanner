import React from 'react';
import { Link } from 'react-router';

import {
  Card,
  CardHeader,
  CardText,
  Paper,
  RaisedButton
} from 'material-ui';

let placeIndex;
let hoverStart;
let hoverEnd;

//the left side of the Itinerary, the list of days and places
function ItineraryDays(props) {

  placeIndex = 0;
  hoverStart = props.hoverStart;
  hoverEnd = props.hoverEnd;

  console.log('dayys in itin');
  console.log(props.days);

  return (
    <div className="half_container">
      <div style={{height: 100}}>
        <div style={{float: 'left'}}>
          <h1>{props.destination + ' trip'}</h1>
          <h3>{new Date(props.days[0].date).toLocaleDateString() + ' - ' + new Date(props.days[props.days.length-1].date).toLocaleDateString()}</h3>
        </div>
        <div style={{float: 'right', margin: 35}}>
          <Link to="/search">
            <RaisedButton
              label="Go back"
              primary={true}
            />
          </Link>
        </div>
      </div>
      {props.days.map(renderDay)}
    </div>
  );
}

function renderDay(day, index) {
  return (
    <Card
      key={index}
      style={{paddingBottom: 10}}
      initiallyExpanded={true}
    >
      <CardHeader
        title={'Day ' + (index + 1)}
        subtitle={new Date(day.date).toLocaleDateString()}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText
        expandable={true}
      >
        {day.places.map(renderPlace)}
      </CardText>
    </Card>
  );
}

function renderPlace(place) {
  const index = placeIndex;
  placeIndex++;
  return (
    <Paper zDepth={2}
           style={{margin: 10}}
           key={place.place_id}
           onMouseEnter={() => hoverStart(index)}
           onMouseLeave={() => hoverEnd()}
    >
      <CardHeader
        title={index + 1 + '. ' + place.name}
        avatar={place.img}
      />
    </Paper>
  );
}

export default ItineraryDays;
