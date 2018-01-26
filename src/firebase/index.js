const config = {
  apiKey: "AIzaSyAPGbcTMYrzGv09fV2rfAtazh_QE4rveqU",
  authDomain: "tripplannerfirebase.firebaseapp.com",
  databaseURL: "https://tripplannerfirebase.firebaseio.com",
  projectId: "tripplannerfirebase",
  storageBucket: "tripplannerfirebase.appspot.com",
  messagingSenderId: "1006153024013"
};

firebase.initializeApp(config);

const provider = new firebase.auth.GithubAuthProvider();

const database = firebase.database();

export {provider, database}
