import React from 'react';

import {
  Card,
  CardHeader,
  CardText,
  Paper
} from 'material-ui';

let placeIndex;

function ItineraryDays(props) {

  placeIndex = 0;
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
  placeIndex++;
  return (
    <Paper zDepth={2}
           style={{margin: 10}}
           key={place.place_id}
    >
      <CardHeader
        title={placeIndex + '. ' + place.name}
        avatar={place.img}
      />
    </Paper>
  );
}

export default ItineraryDays;
