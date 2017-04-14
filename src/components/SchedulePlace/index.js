import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

import {
  CardHeader,
  Paper,
  RaisedButton,
  FontIcon
} from 'material-ui';

const source = {
  beginDrag(props) {
    props.drag(props.index);
    return {
      day: props.day,
      id: props.place.place_id,
      index: props.index
    };
  },
  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    props.movePlace();
  }
};

const target = {

  //http://rafaelquintanilha.com/sortable-targets-with-react-dnd/
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceDay = monitor.getItem().day;
    const hoverDay = props.day;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex && sourceDay === hoverDay) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY && sourceDay === hoverDay) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY && sourceDay === hoverDay) {
      return;
    }

    if (hoverClientY > hoverMiddleY && sourceDay !== hoverDay) {
      props.placeDummy(hoverIndex+1, hoverDay);
      monitor.getItem().index = hoverIndex+1;
    } else {
      props.placeDummy(hoverIndex, hoverDay);
      monitor.getItem().index = hoverIndex;
    }

    monitor.getItem().day = hoverDay;
  },

  drop(props, monitor, component) {

    //props.movePlace();
    //return {success: true};
  }
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

@DragSource('SchedulePlace', source, collectSource)
@DropTarget('SchedulePlace', target, collectTarget)
export default class SchedulePlace extends React.Component {

  constructor(props, context) {
    super(props, context);

  }

  render() {

    const { connectDragSource, connectDropTarget, isDragging } = this.props;

    if(this.props.dummy) {
      return connectDropTarget(
        <div style={{opacity: 0}}>
          <CardHeader />
        </div>
      );
    }

    if(this.props.emptyDay) {
      return connectDropTarget(
        <div style={{opacity: 0, height: 20, width:'100%'}} />
      );
    }

    const img = this.props.place.photos ? this.props.place.photos[0].getUrl({maxWidth: 200, maxHeight: 200}) : '';
    const style = {
      margin: 10
    };
    const removeButton = (
      <RaisedButton
        label=""
        secondary={true}
        style={{float: 'right'}}
        icon={<FontIcon className="material-icons">delete</FontIcon>}
        onTouchTap={() => this.props.removePlace()}
      />
    );

    return connectDragSource(connectDropTarget(
      <div style={isDragging ? { opacity: 0.5} : {}}>
        <Paper zDepth={2}
               style={style}
        >
          <CardHeader
            title={this.props.place.name}
            avatar={img}
          >
            {removeButton}
          </CardHeader>
        </Paper>
      </div>
    ));
  }


};
