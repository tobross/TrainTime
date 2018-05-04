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
  var rightNow = moment().format("HH:mm"); 
  var timeStore = rightNow.split(":");
  var hours = parseInt(timeStore[0]);
  var minutes = parseInt(timeStore[1]);
  console.log(rightNow);
  //start of application code...
  $("#submit").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#TN").val().trim()
    var destination = $("#dest").val().trim();

    var firstTrainTime = $("#FTT").val().trim();

    // firstConvertedTime = moment(firstTrainTime, timeFormat);
    // console.log(firstConvertedTime);
    var frequency = $("#freq").val().trim();
    frequency = parseInt(frequency);
    console.log(frequency);
    // nextArrival = moment(;
    // minAway = moment(firstTrainTime).fromNow("mm");
    $(".addTrain").find("input:text").val("");

    database.ref().child("Train").push({
      TName: trainName,
      Destination: destination,
      FTT: firstTrainTime,
      Frequency: frequency
    })
  });
  database.ref("Train").on("child_added", function (snapshot) {
    var trainData = snapshot.val();

    var startTimeStore = trainData.FTT.split(":");
    var fttHours = parseInt(startTimeStore[0]);
    var fttMinutes = parseInt(startTimeStore[1]);

    var trainHours = fttHours-hours;
    var trainMinutes = fttMinutes-minutes;
    var nextTrain = trainData.FTT;
    var convertedHours = trainHours*60;
    var convertedMinutes = convertedHours+trainMinutes;
    console.log(convertedMinutes);
    console.log(trainHours+":"+trainMinutes);
    function nextArrival() {
			if (convertedMinutes < 0) {
				trainMinutes += parseInt(trainData.Frequency);
				fttMinutes += parseInt(trainData.Frequency);
				nextArrival();
			}
			else if (convertedMinutes > parseInt(trainDaftteftty)) {
				trainMinutes -= parseInt(trainData.Frequency);
				fttMinutes -= parseInt(trainData.Frequency);
				nextArrival();
			}
			else if (fttMinutes >= 60) {
				fttHours += 1;
				fttMinutes -= 60;
				if (fttHours > 24) {
					fttHours -= 24;
				}
				nextArrival();
			}
			else if (fttMinutes < 0) {
				fttHours -= 1;
				fttMinutes += 60;
				if (fttHours < 0) {
					fttHours += 24;
				}
        nextArrival();
        if (fttMinutes.length === 1) {
          fttMinutes = "0" + fttMinutes;
        }
      
        if (fttHours === 12) {
          nextTrain = String(fttHours) + ":" + fttMinutes + " PM";
        }
        else if (fttHours >= 13) {
          fttHours -= 12;
          nextTrain = String(fttHours) + ":" + fttMinutes + " PM";
        }
        else {
          nextTrain = String(fttHours) + ":" + fttMinutes + " AM";
        }      
			}
		}


    $("#trainSchedule").append("<tr><td>" + trainData.TName + "</td><td>" + trainData.Destination + "</td><td>" + trainData.Frequency + " Minutes" + "</td><td>" + nextTrain + "</td><td>" + convertedMinutes + "</td></tr>");
    // console.log(snapshot.val());
  });