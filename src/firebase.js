import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyARP0zMA0NJ7Asf3ovni-FvnsxcluJkPb8",
  authDomain: "trackq-b9c73.firebaseapp.com",
  databaseURL: "https://trackq-b9c73.firebaseio.com",
  projectId: "trackq-b9c73",
  storageBucket: "trackq-b9c73.appspot.com",
  messagingSenderId: "772913959697",
  appId: "1:772913959697:web:87f7af6f3d4d89144272b0",
  measurementId: "G-R24G12E89M"
};

firebase.initializeApp(config);

export default firebase;