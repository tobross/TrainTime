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

  //start of application code...
  $("#submit").on("click", function(event){
      event.preventDefault();

  var database = firebase.database();
  var trainName = $("#TN").val().trim()
  var destination = $("#dest").val().trim();
  var firstTrainTime = $("#FTT").val().trim();
  var timeFormat = "X";
  firstConvertedTime = moment(firstTrainTime, timeFormat);
  console.log(firstConvertedTime);
  var frequency = $("#freq").val().trim();

    $(".addTrain").find("input:text").val("");

  $("#trainSchedule").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + firstTrainTime + "</td><td>" + frequency + "</td></tr>");

  database.ref().push({
    TName: trainName,
    Destination: destination,
    // FTT: ,
    Frequency: frequency  
})
});