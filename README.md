# TripPlanner

Project for [DH2642 Interaction Programming and the Dynamic Web](https://www.kth.se/student/kurser/kurs/DH2642?l=en) at KTH

[Heroku link](https://fast-hamlet-95669.herokuapp.com)

### Instructions
```
git clone https://github.com/jonsandg/TripPlanner.git
cd TripPlanner
npm install
npm run dev
go to http://localhost:8080
```

### Note:
Because of API quotas the pictures might stop loading. We have not noted anything else failing because of it.

### Information:
The app is made with React. The model/state is stored in a [Baobab tree](https://github.com/Yomguithereal/baobab). The architecture basically works so that the react components (views) listen to the state tree. When the views are interacted with they fire actions which might alter the model or do something else, like logging into firebase.
