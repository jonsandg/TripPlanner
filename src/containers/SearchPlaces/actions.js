import { uploadData } from 'model';

export const openDialog = (tree, placeID) => {
  //we set the place id and then the model gets the place data
  tree.set(['search', 'dialog', 'placeID'], placeID);
};

export const closeDialog = (tree) => {
  tree.set(['search', 'dialog', 'placeID'], null);
};

export const filterChange = (tree, value) => {
  tree.set(['search', 'filter'], value);
  tree.set(['search', 'status'], 'search');
};

export const queryChange = (tree, value) => {
  tree.set(['search', 'query'], value);
};

export const searchPlaces = (tree) => {
  tree.set(['search', 'status'], 'search');
};

export const addPlace = (tree, id) => {

  //if no id => add place being shown in dialog
  id = id ? id : tree.get('search', 'dialog', 'placeID');
  const places = tree.get('search', 'results');

  let placeIndex;

  //find place corresponding to id
  const place = places.find((element, index) => {
    if (element.place_id === id) {
      placeIndex = index;
      return true;
    }
    return false;
  });

  if(!place) return;

  tree.push(['trip', 'days', 0, 'places'], place);
  tree.unset(['search', 'results', placeIndex]);
  uploadData();
};
