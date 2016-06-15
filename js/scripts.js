// back-end logic
var totalScore = 0;
var dieRoll = 0;
var turnScore = 0;
function Player(totalScore, turnScore, dieRoll) {
  this.totalScore = totalScore;
  this.turnScore = turnScore;
  this.rollScore = dieRoll;
  this.activePlayer = true;
}
// dice roll generator

function randomDieRoller() {
  var randomDieRoll = Math.floor((Math.random() * 6) +1);
  return randomDieRoll;
}

function turnScoreGenerator(dieRoll) {
  if (dieRoll === 1) {
    turnScore = 0;
  } else {
    turnScore += dieRoll;
  }
  return turnScore;
}

function totalScoreGenerator(turnScore) {
  totalScore = totalScore + turnScore;
  return totalScore;
}

// front-end logic

$(document).ready(function() {
  $("#roll-button").click(function(event) {
    event.preventDefault();

    var dieRoll = randomDieRoller();
    $("#roll-result").text(dieRoll);
    var turnScore = turnScoreGenerator(dieRoll);
    var playerOne = new Player(totalScore, turnScore, dieRoll)

    $("#p1-turn-total").text(turnScore);

  $("#hold-button").click(function(event) {
    event.preventDefault();

    var totalScore = totalScoreGenerator(turnScore);

    $("#p1-score-total").text(totalScore);

  });

  });
});
