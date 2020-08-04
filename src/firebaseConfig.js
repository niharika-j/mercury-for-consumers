import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAPiHhJ3PlRrzH9wkO48sGWyftBp5J1vH0",
    authDomain: "mercury-1f9d2.firebaseapp.com",
    databaseURL: "https://mercury-1f9d2.firebaseio.com",
    projectId: "mercury-1f9d2",
    storageBucket: "mercury-1f9d2.appspot.com",
    messagingSenderId: "757744866964",
    appId: "1:757744866964:web:ee3b051c0ed9694a9f4681"
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;