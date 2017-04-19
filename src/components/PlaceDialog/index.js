import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

import GoogleMap from 'google-map-react';

import { Grid, Row, Col } from 'react-bootstrap';

import Spinner from 'components/Spinner';
import MapMarker from 'components/MapMarker';

export default class PlaceDialog extends React.Component {
//The dialog that appears when you click a place in search
  constructor(props, context) {
    super(props, context);

  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.close}
      />,
      <FlatButton
        label="Add to trip"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.props.addPlace();
          this.props.close();
        }}
      />,
    ];

    const styles = {
      map : {
        height: '400px',
        width: "100%"
      },
      leftBox: {
        width: '50%',
        float: 'left'
      },
      rightBox: {
        width: '50%',
        float: 'left'
      },
      dialog: {
        float: 'left'
      },
      gridList: {
        width: '100%',
        height: this.props.openingHours.length > 0 ? 200 : 400,
        overflowY: 'auto',
      },
    };


    let dialogContent = <Spinner />;

    if (!this.props.loading) {
      let photos = '';
      if(this.props.photos) {

        photos = (
          <div>
            <GridList
              cellHeight={90}
              style={styles.gridList}
              cols={4}
            >
              <Subheader>Photos</Subheader>
              {this.props.photos.map(this.renderPhoto)}
            </GridList>
          </div>
        );
      }

      dialogContent = (
        <div>
           <p>{this.props.address}</p>
           <p>{this.props.rating}</p>
           {this.props.openingHours.map(day => (<span key={day}>{day}<br /></span>) )}
           {photos}
         </div>
      );
    }

    return (
      <Dialog
        title={this.props.name ? this.props.name : ''}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.close}
        style={styles.dialog}
      >
        <div style={styles.leftBox}>
          {dialogContent}
        </div>
        <div style={styles.rightBox}>
          <div id="dialog_map" style={styles.map}>
          <GoogleMap
            bootstrapURLKeys={{key: "AIzaSyCBnyTzPsoug4grZ-pAhIFEBmnh32aTdv0"}}
            center={this.props.location}
            zoom={14}>
            <MapMarker
              lat={this.props.location[0]}
              lng={this.props.location[1]}
            />
          </GoogleMap>
          </div>
        </div>

      </Dialog>
    );
  }

  renderPhoto(photo) {
    const url = photo.getUrl({maxWidth: 800, maxHeight: 800});

    return (
      <GridTile
        key={url}
      >
        <img src={url} />
      </GridTile>
    );
  }

};
