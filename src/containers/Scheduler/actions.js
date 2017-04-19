export const changeDays = (tree, number) => {

  if(number < 1) return;

  const current = parseInt(tree.get(['trip', 'numberOfDays']));

  /*
  only allow +1 and -1 changes to avoid deleting all days when changing to days > 9
  e.g. changing from 5 => 13 would delete all days but one when writing the first 1
  */

  if(number < current-1 || number > current+1) return;
  tree.set(['trip', 'numberOfDays'], number);
};

export const changeDate = (tree, date) => {
  tree.set(['trip', 'startDate'], date);
  console.log(date);
};

export const removePlace = (tree, index, day) => {
  tree.unset(['trip', 'days', day, 'places', index]);
};

//place the "dummy place" which is there make space when dragging
export const placeDummy = (tree, index, day) => {
  const dnd = tree.select('dragAndDrop');
  const days = tree.select('trip', 'days');

  //remove current dummy
  const dummyPostion = dnd.get('dummyPosition');
  console.log('dummy', dummyPostion);
  if(dummyPostion.length > 0)
    days.unset([dummyPostion[0], 'places', dummyPostion[1]]);

  //place new
  const dayCursor = days.select(day, 'places');
  dayCursor.splice([index, 0, 'dummy']);
  dnd.set('dummyPosition', [day, index]);
  //tree.commit();
};

export const beginDrag = (tree, index, day) => {

  const daysCursor = tree.select('trip', 'days');
  const place = daysCursor.get(day, 'places', index);

  daysCursor.unset([day, 'places', index]);
  placeDummy(tree, index, day);

  tree.set(['dragAndDrop', 'originalPosition'], [day, index]);
  tree.set(['dragAndDrop', 'place'], place);
  //tree.commit();
};

export const movePlace = (tree) => {
  console.log('moveplace');

  const dnd = tree.select('dragAndDrop');
  const days = tree.select('trip', 'days');
  const place = dnd.get('place');
  console.log(place);

  const dummyPostion = dnd.get('dummyPosition');
  days.set([dummyPostion[0], 'places', dummyPostion[1]], place);
  dnd.set('dummyPosition', []);

};
