import { browserHistory } from 'react-router';
import {provider} from 'firebase';
import tree from 'model';

export const logIn = (redirect) => {

  firebase.auth().signInWithPopup(provider)
  .then(result => {

    console.log(result);

    const user = tree.select('user');
    user.set('id', result.user.uid)
    user.set('email', result.user.email);

  }).catch(err => {
    console.log('login error');
    console.log(err);
  });
};

export const addTrip = (destination) => {

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

      const location = dest.geometry.location;
      const now = new Date(Date.now());
      tripCursor.set('destination', dest.name);
      tripCursor.set('coordinates', [location.lat(), location.lng()]);
      tripCursor.set('startDate', now);
      tripCursor.set('numberOfDays', 1);
      tripCursor.set('days', [{
        date: now,
        places: []
      }]);

      browserHistory.push('/search');
    }
  });
};
