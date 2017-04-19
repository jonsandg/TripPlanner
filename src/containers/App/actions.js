import { browserHistory } from 'react-router';
import {provider, database} from 'firebase';
import tree, {resetTree, uploadData} from 'model';

export const logIn = (redirect) => {
  //open a popup where the user can authorize in guthub

  firebase.auth().signInWithPopup(provider)
  .then(result => {

    const user = tree.select('user');
    user.set('id', result.user.uid);
    user.set('email', result.user.email);

  }).catch(err => {
    console.log(err);
  });
};

export const listenOnLogin = () => {
  //listen on user changes (log in/out)
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      //log in
      const userCursor = tree.select('user');
      userCursor.set('id', user.uid);
      userCursor.set('email', user.email);
    } else {
      //log out
      resetTree();
      browserHistory.push('/');
    }
  });

};

export const logOut = () => {
  firebase.auth().signOut();
};

export const addTrip = (destination) => {
  //we find a city's coordinates and image and redirect the user to /search

  const service = new google.maps.places.PlacesService(document.getElementById('map'));
  const request = {
    query: destination
  };

  service.textSearch(request, (res, serviceStatus, pag) => {
    if (serviceStatus === google.maps.places.PlacesServiceStatus.OK) {
      const dest = res[0];
      const tripCursor = tree.select('trip');
      const currentDestination = tripCursor.get('destination');

      if (currentDestination !== '') {
        const trip = tripCursor.get();
        tree
          .select('user', 'savedTrips')
          .push(trip);
      }

      const img = dest.photos ? dest.photos[0].getUrl({maxWidth: 800, maxHeight: 800}) : '';

      const location = dest.geometry.location;
      const now = new Date(Date.now());
      tripCursor.set('destination', dest.name);
      tripCursor.set('coordinates', [location.lat(), location.lng()]);
      tripCursor.set('startDate', now.getTime());
      tripCursor.set('numberOfDays', 1);
      tripCursor.set('img', img);
      tripCursor.set('days', [{
        date: now.getTime(),
        places: []
      }]);

      uploadData();
      browserHistory.push('/search');
    }
  });
};
