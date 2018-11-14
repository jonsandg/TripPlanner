# TripPlanner

Project for [DH2642 Interaction Programming and the Dynamic Web](https://www.kth.se/student/kurser/kurs/DH2642?l=en) at KTH

[Live Demo Link](https://fast-hamlet-95669.herokuapp.com)

### Instructions
```
git clone https://github.com/jonsandg/TripPlanner.git
cd TripPlanner
npm install
npm run dev
go to http://localhost:8080
```

### Information:
The app is made with React. The model/state is stored in a [Baobab tree](https://github.com/Yomguithereal/baobab).

The Google Maps API is used to fetch tourist attractions and displaying their positions on a map.

The backend is powered by Firebase. It's very minimal and is only in use if the user logs in with their github account to be able to save their planned trips.

### Note:
Because of API quotas (probably) the pictures might stop loading. We have not noted anything else failing because of it.
