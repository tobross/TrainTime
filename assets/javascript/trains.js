  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyClS3yNQ4UjxyupLWxMvScsEX2Y6eiuBR0",
    authDomain: "traintime-cfb61.firebaseapp.com",
    databaseURL: "https://traintime-cfb61.firebaseio.com",
    projectId: "traintime-cfb61",
    storageBucket: "traintime-cfb61.appspot.com",
    messagingSenderId: "1010123822472"
  };
firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

database.ref().on("child_added", function(childSnap) {

    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var firstTrain = childSnap.val().firstTrain;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;
//appends compiled information from the database to the DOM table.
    $("#trainSchedule > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

database.ref().on("value", function(snapshot) {
   

});

//pulls information from the user and declares it as variables.
$("#submit").on("click", function(event) {
event.preventDefault();
    var trainName = $("#TN").val().trim();
    var destination = $("#dest").val().trim();
    var firstTrain = $("#FTT").val().trim();
    var frequency = $("#freq").val().trim();
    $(".addTrain").find("input:text").val("");
    //every input must contain a value!
    if (trainName == "") {
        alert('Enter a train name.');
        return false;
    }
    if (destination == "") {
        alert('Enter a destination.');
        return false;
    }
    if (firstTrain == "") {
        alert('Enter a first train time.');
        return false;
    }
    if (frequency == "") {
        alert('Enter a frequency');
        return false;
    }

    // THE MATH!
    //subtracts the first train time back a year to ensure it's before current time.
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequency;
    var minUntilTrain = frequency - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");
//compiles newTrain object and appends it to the database.
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        min: minUntilTrain,
        next: nextTrain
    }
    database.ref().push(newTrain);
});

