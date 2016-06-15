//business logic
var playerTurn = true;
function Player(playerTurn, dieRoll, turnScore, totalScore) {
  this.playerTurn = playerTurn;
  this.dieRoll = dieRoll;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

//roll prototype
function randomDieRoller() {
    var randomDieRoll = Math.floor((Math.random() * 6) +1);
    return randomDieRoll;
}

// hold prototype


// switch prototype


$(document).ready(function() {
  $("#roll-button").click(function(event) {
    event.preventDefault();

    var dieRoll = randomDieRoller();
    $("#roll-result").text(dieRoll);
    console.log(dieRoll);

    var playerOne = new Player(0, dieRoll, 0 , 0)
    console.log(playerOne);
  });

  $("#hold-button").click(function(event) {
    event.preventDefault();

    
  });

});


//ui logic
