import { uploadData } from 'model';

export const changeDays = (tree, number) => {
  number = parseInt(number);

  if(number < 1) return;

  const current = parseInt(tree.get(['trip', 'numberOfDays']));

  /*
  only allow +1 and -1 changes to avoid deleting all days when changing to days > 9
  e.g. changing from 5 => 13 would delete all days but one when writing the first 1
  */

  if(number < current-1 || number > current+1) return;
  tree.set(['trip', 'numberOfDays'], number);

  const daysCursor = tree.select('trip', 'days');

  if(number > current) { //added a day
    const date = new Date(tree.get('trip', 'startDate'));
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + parseInt(number)-1);

    daysCursor.push({
      date: newDate.getTime(),
      places: []
    });

    return;
  }

  //removed a day
  const lastDay = daysCursor.get(current-1);
  daysCursor.pop();

  if(lastDay.places.length > 0) {
    const length = daysCursor.get().length;
    daysCursor
      .select(length-1, 'places')
      .concat(lastDay.places);
  }

  uploadData();

};

export const changeDate = (tree, date) => {
  tree.set(['trip', 'startDate'], date.getTime());

  const duration = tree.get('trip', 'numberOfDays');
  const daysCursor = tree.select('trip', 'days');

  for(let i = 0; i < duration; i++) {
    const day = daysCursor.select(i);
    let startDate = new Date(date);
    console.log(date);
    startDate.setDate(startDate.getDate() + i);
    console.log(startDate);
    day.set('date', startDate.getTime());
  }

  uploadData();
};

export const removePlace = (tree, index, day) => {
  tree.unset(['trip', 'days', day, 'places', index]);
  uploadData();
};

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
  uploadData();

};
