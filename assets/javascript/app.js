


 currentTime=moment();
 $("#current_time").text("Current time: "+moment(currentTime).format("hh:mm"));
 var entries=0;

   // Initialize Firebase
var config = {
	apiKey: "AIzaSyA3QAtPhhPRXP1ronwaRm1FRSC-149fs0Y",
	authDomain: "train-scheduler-5a400.firebaseapp.com",
	databaseURL: "https://train-scheduler-5a400.firebaseio.com",
	projectId: "train-scheduler-5a400",
	storageBucket: "train-scheduler-5a400.appspot.com",
	messagingSenderId: "822090697228"
};
firebase.initializeApp(config);
var database=firebase.database();

$("#submitButton").on("click",function (event) {
	event.preventDefault();
	var trainName= $("#train-name-input").val().trim();
	var trainDestination= $("#destination-input").val().trim();
	var firstTrainTime= $("#first-train-input").val().trim();
	var frequency= $("#frequency-input").val().trim();

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val("");

	//console.log(trainName);

	var train={
		name: trainName,
		destination: trainDestination,
		first_time: firstTrainTime,
		frequency: frequency
	};
	//console.log(train);

	database.ref().push(train);
	alert("good!");

});

database.ref().on("child_added", function(childSnapshot) {
		entries++;
		console.log(childSnapshot.val());
		var entry= "<tr>"+"<td>"+childSnapshot.val().name+"</td>"+"<td>"+childSnapshot.val().destination+"</td>"
		+"<td>"+childSnapshot.val().frequency+"</td>"+"<td id=\"next_arrival"+entries+"\""+"></td>"+
		"<td id=\"minutes_away"+entries+ "\""+"></td>"+"</tr>";
		console.log(entry);
		$("#display").append(entry);
		//console.log("heeeeyyy "+childSnapshot.val().first_time);
		var firstTime=childSnapshot.val().first_time;
		var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
		var diff=moment().diff(moment(firstTimeConverted), "minutes");
		console.log("diff is "+diff);
		var frqn=childSnapshot.val().frequency;
		var remainder=diff%frqn;
		var minAway=frqn-remainder;
		$("#minutes_away"+entries).text(minAway);
		var nextTrainArrival=moment().add(minAway,"minutes").format("hh:mm");
		$("#next_arrival"+entries).text(nextTrainArrival);

	});
