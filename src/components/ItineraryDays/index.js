import React from 'react';

import {
  Card,
  CardHeader,
  CardText,
  Paper
} from 'material-ui';

let placeIndex;
let hoverStart;
let hoverEnd;

function ItineraryDays(props) {

  placeIndex = 0;
  hoverStart = props.hoverStart;
  hoverEnd = props.hoverEnd;

  return (
    <div className="half_container">
      <h1>{props.destination + ' trip'}</h1>
      <h3>{props.days[0].date.toLocaleDateString() + ' - ' + props.days[props.days.length-1].date.toLocaleDateString()}</h3>
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
        subtitle={day.date.toLocaleDateString()}
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
