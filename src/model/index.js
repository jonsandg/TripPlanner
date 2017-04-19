import Baobab from 'baobab';
import {database} from 'firebase';

var now = new Date(Date.now());
console.log(now);

const initialTree = {
  user: {
    id: null,
    email: null,
    savedTrips: [],

  },
  trip: {
    destination: '',
    coordinates: [],
    img: '',
    startDate: now.getTime(),
    numberOfDays: 1,
    days: [
      {
        date: now.getTime(),
        places: []
      }
    ]
  },
  dragAndDrop: { //temporary holding for drag n drop
    dummyPosition: [],
    originalPosition: [],
    place: null
  },
  search: {
    status: '',
    query: '',
    filter: 'General',
    id: 0, //used to stop earlier searches
    results: [],
    dialog: {
      open: false,
      loading: true,
      placeID: null,
      name: null,
      address: '',
      rating: '-',
      photos: [],
      openingHours: [],
      position: []
    }
  }
}

//the application state is stored in a Baobab tree
const tree = new Baobab(initialTree);

tree
.on('update', () => {
  console.log('tree update', tree.get());
});

tree
.select('user', 'id')
.on('update', e => {
  //fired when a user logs in/out
  //if they logged in we grab their data from firebase
  const userID = e.data.currentData;
  if(userID) {

    const savedTripsCursor = tree.select('user', 'savedTrips');
    const currentTripCursor = tree.select('trip');

    database
      .ref('users/' + userID)
      .once('value')
      .then(data => {
        let currentTrip = data.val().currentTrip;
        let savedTrips = data.val().savedTrips;

        console.log('current', currentTrip);
        console.log('saved', savedTrips);

        //firebase doesnt store empty arrays, so we add them when missing
        currentTrip.days = currentTrip.days.map(
          day => Object.assign({}, {places: []}, day)
        );

        if(savedTrips) {
          for (var i = 0; i < savedTrips.length; i++) {
            savedTrips[i].days = savedTrips[i].days.map(
              day => Object.assign({}, {places: []}, day)
            );
          }
        }

        if(savedTrips) {
          savedTripsCursor.set(savedTrips);
        }

        if(currentTripCursor.get('destination') !== '' && currentTrip) {
          savedTrips.push(currentTrip);
        } else if (currentTrip) {
          currentTripCursor.set(currentTrip);
        }

      })
      .catch(err => console.log(err));
  }
});

const resetTree = () => {
  //function that resets the tree to the initial state
  //used when the user logs out
  tree.set(initialTree);
};

const uploadData = () => {
  //function that uploads the current trips to firebase
  //used by actions when the trips are updated

  const user = firebase.auth().currentUser;

  if(!user) return; //don't upload if not logged in

  const userID = user.uid;

  let savedTrips = tree.clone('user', 'savedTrips');
  let currentTrip = tree.clone('trip');
  console.log('uploading', currentTrip);

  if(currentTrip.destination === '') {
    currentTrip = null;
  }

  database
    .ref('users/' + userID)
    .set({
      savedTrips: savedTrips,
      currentTrip: currentTrip
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
};

export {uploadData, resetTree};

const service = new google.maps.places.PlacesService(document.getElementById('map'));

//place dialog open/close
const dialog = tree.select(['search', 'dialog']);
dialog.select('placeID')
.on('update', e => {
  const id = e.data.currentData;
  console.log(id);
  if(id) {

    dialog.set('open', true);
    dialog.set('loading', true);

    service.getDetails({placeId: id}, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {

        const hours = place.opening_hours ? place.opening_hours.weekday_text : [];
        const location = place.geometry.location;

        dialog.set('name', place.name);
        dialog.set('address', place.formatted_address);
        dialog.set('rating', place.rating);
        dialog.set('openingHours', hours);
        dialog.set('photos', place.photos);
        dialog.set('loading', false);
        dialog.set('position', [location.lat(), location.lng()]);

      }
    });
    return;
  }
  dialog.set('open', false);

});

//search places
//used when the user enters a query or changes the filter
tree.select('search', 'status')
.on('update', (e) => {

  const status = e.data.currentData;
  console.log('new search');

  if(status !== 'search') return;

  tree.set(['search', 'status'], 'loading');
  const idCursor = tree.select('search', 'id');
  idCursor.apply(val => (val+1));
  const searchID = idCursor.get();

  const results = tree.select(['search', 'results']);
  results.set([]);

  let location = tree.get('trip', 'coordinates');
  location = new google.maps.LatLng(location[0], location[1]);

  let query = tree.get('search', 'query');
  const filter = tree.get('search', 'filter');

  if(filter === 'General') {
    if(!query) query += 'point of interest';
  } else {
    query += filter;
  }

  const request = {
    location: location,
    query: query
  };

  service.textSearch(request, (res, serviceStatus, pag) => {
    if(idCursor.get() !== searchID) return; //new search in place, stop this one
    if (serviceStatus === google.maps.places.PlacesServiceStatus.OK) {

      const days = tree.get('trip', 'days');
      const addedIDs = days
      .reduce(
        (acc, val) => acc.concat(val.places),
        []
      )
      .map(val => val.place_id);

      res = res
      .filter(val => !addedIDs.includes(val.place_id))
      .map(val => {
        const img = val.photos ? val.photos[0].getUrl({maxWidth: 800, maxHeight: 800}) : '';
        const location = val.geometry.location;

        return {
          name: val.name,
          place_id: val.place_id,
          rating: val.rating ? val.rating : null,
          img: img,
          position: [location.lat(), location.lng()]
        };
      });

      results.concat(res);

      if(pag.hasNextPage) {
        pag.nextPage();
      } else {
        tree.set(['search', 'status'], 'done');
      }
    }
  });

});

export default tree;
