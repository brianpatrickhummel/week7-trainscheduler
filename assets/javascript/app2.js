

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

var database = firebase.database();

// Gather information from Form when Track Train button clicked
$(".submit-button").on("click", function (event) {
  event.preventDefault();
  var trainName = $("#trainName")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var firstTrain = moment($("#firstTrain").val(), "HH:mm").format("X");
  var frequency = parseInt(
    $("#frequency")
    .val()
    .trim()
  );
  // Send Form data to Firebase Database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });
  // Clear Form values
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");
});

// When a new entry is added to Firebase DB, gather DB data and render in DOM
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  var trainName = childSnapshot.val().trainName.toUpperCase();
  var destination = childSnapshot.val().destination.toUpperCase();
  var firstTrain = moment.unix(childSnapshot.val().firstTrain).format("HH:mm");
  var frequency = childSnapshot.val().frequency;

  var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;

  // Minute Until Train
  var minutesAway = frequency - tRemainder;

  // Next Train
  var b = moment().add(minutesAway, "minutes");
  var nextArrival = moment(b).format("HH:mm");

  $(".trainSchedule").prepend(
    "<tr><td>" +
    trainName +
    "</td><td>" +
    destination +
    "</td><td>" +
    frequency +
    "</td><td>" +
    nextArrival +
    "</td><td>" +
    minutesAway +
    "</td></tr>"
  );
});

