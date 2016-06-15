//business logic
var playerTurn = true;
function Player(playerTurn, dieRoll, turnScore, totalScore) {
  this.playerTurn = playerTurn;
  this.dieRoll = dieRoll;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}

function randomDieRoller() {
    var randomDieRoll = Math.floor((Math.random() * 6) +1);
    return randomDieRoll;
}

$(document).ready(function() {
  $("#roll-button").click(function(event) {
    event.preventDefault();

    var dieRoll = randomDieRoller();
    $("#roll-result").text(dieRoll);
    console.log(dieRoll);

    var playerOne = new Player(dieRoll)
    console.log(playerOne);
  });
});


//ui logic
