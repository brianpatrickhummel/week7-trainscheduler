// Initialize Firebase
var config = {
  apiKey: "AIzaSyDM8wo0QlZTF5UC1_X1bOKbXlJQLutzlE8",
  authDomain: "trainscheduler-1d314.firebaseapp.com",
  databaseURL: "https://trainscheduler-1d314.firebaseio.com",
  projectId: "trainscheduler-1d314",
  storageBucket: "trainscheduler-1d314.appspot.com",
  messagingSenderId: "383844800617"
};
firebase.initializeApp(config);

//=============  Firebase Authentication =============

var uiConfig = {
  signInSuccessUrl: "https://brianpatrickhummel.github.io/trainscheduler/index2.html",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID]
};
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);
