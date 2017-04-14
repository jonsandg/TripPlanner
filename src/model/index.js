import Baobab from 'baobab';

var now = new Date(Date.now());
console.log(now);
const tree = new Baobab({

  savedTrips: [],
  trip: {
    name: '',
    destination: '',
    coordinates: [],
    startDate: now,
    numberOfDays: 1,
    days: [
      {
        date: now,
        places: []
      }
    ],
    dragAndDrop: { //temporary holding for drag n drop
      dummyPosition: [],
      originalPosition: [],
      place: null
    }
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
});

/*
tree.on('update', () => {
  const days = tree.get('trip', 'days');

  console.log('days');
  for (var day of days) {
    console.log(day.places);
  }
});
*/

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

  var loc = new google.maps.LatLng(52.373975, 4.893982);
  const location = tree.get('trip', 'coordinates');
  let query = tree.get('search', 'query');
  const filter = tree.get('search', 'filter');

  if(filter === 'General') {
    if(!query) query += 'point of interest';
  } else {
    query += filter;
  }

  console.log('q', query);
  console.log('f', filter);

  const request = {
    location: loc,
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
      .filter(val => !addedIDs.includes(val.place_id));

      results.concat(res);

      if(pag.hasNextPage) {
        //pag.nextPage();
      } else {
        tree.set(['search', 'status'], 'done');
      }
    }
  });

});

//change number of days
tree.select('trip', 'numberOfDays')
.on('update', e => {
  const previous = e.data.previousData;
  const current = e.data.currentData;
  const daysCursor = tree.select('trip', 'days');


  if(current > previous) { //added a day

    const date = new Date(tree.get('trip', 'startDate'));
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + parseInt(current)-1);

    daysCursor.push({
      date: newDate,
      places: []
    });

    return;
  }

  //removed a day
  const lastDay = daysCursor.get(previous-1);
  daysCursor.pop();

  if(lastDay.places.length > 0) {
    const length = daysCursor.get().length;
    daysCursor
      .select(length-1, 'places')
      .concat(lastDay.places);
  }

});

//change starting date
tree.select('trip', 'startDate')
.on('update', e => {
  const date = e.data.currentData;
  const duration = tree.get('trip', 'numberOfDays');
  const daysCursor = tree.select('trip', 'days');

  for(let i = 0; i < duration; i++) {
    const day = daysCursor.select(i);
    let startDate = new Date(date);
    startDate.setDate(startDate.getDate() + i);
    console.log(startDate);
    day.set('date', startDate);
  }

});





export default tree;
