
export const openDialog = (tree, placeID) => {
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

  //if no id => add place in dialog
  id = id ? id : tree.get('search', 'dialog', 'placeID');
  const places = tree.get('search', 'results');

  let placeIndex;

  const place = places.find((element, index) => {
    if (element.place_id === id) {
      placeIndex = index;
      return true;
    }
    return false;
  });

  tree.push(['trip', 'days', 0, 'places'], place);
  tree.unset(['search', 'results', placeIndex]);
};
