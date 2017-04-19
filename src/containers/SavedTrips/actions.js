import { browserHistory } from 'react-router';
import { uploadData } from 'model';

export const removeTrip = (tree, index) => {
  if(index === -1) {
    tree.set(['trip', 'destination'], '');
  } else {
    tree.unset(['user', 'savedTrips', index]);
  }
  uploadData();
};

export const showTrip = (tree, index) => {
  if(index === -1) {
    browserHistory.push('/itinerary');
    return;
  }

  const currentTrip = tree.get('trip');
  const tripToShow = tree.get('user', 'savedTrips', index);
  tree.unset(['user', 'savedTrips', index]);

  tree.push(['user', 'savedTrips'], currentTrip);
  tree.set('trip', tripToShow);
  browserHistory.push('/itinerary');
  uploadData();
};
