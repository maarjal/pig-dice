// back-end logic

//set global variables
var playerOneTotalScore = 0;
var playerTwoTotalScore = 0;

var dieRoll = 0;
var turnScore = 0;
var playerOne = true;
var playerTwo = false;

//create player objects
// function Player(totalScore, turnScore, dieRoll) {
//   this.totalScore = totalScore;
//   this.turnScore = turnScore;
//   this.dieRoll = dieRoll;
//   this.activePlayer = true;
// }
// set functions

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
  if (playerOne = true) {
    playerOneTotalScore = playerOneTotalScore + turnScore;
    return playerOneTotalScore;
  } else if (playerTwo = true) {
    playerTwoTotalScore = playerTwoTotalScore + turnScore;
    return playerTwoTotalScore;
  } else {
    alert("totalScoreGenerator is broken");
  }
}

// front-end logic

$(document).ready(function() {
  $("#roll-button").click(function(event) {
    event.preventDefault();

    var dieRoll = randomDieRoller();
    $("#roll-result").text(dieRoll);
    var turnScore = turnScoreGenerator(dieRoll);

    // var playerOne = new Player(totalScore, turnScore, dieRoll);
    // var playerTwo = new Player(totalScore, turnScore, dieRoll);
    if (playerOne = true) {
      $("#p1-turn-total").text(turnScore);
    } else if (playerTwo = false) {
      $("#p2-turn-total").text(turnScore);
    } else alert("Broken boolean turn total");


  });

  $("#hold-button").click(function(event) {
    event.preventDefault();

    if (playerOne = true) {
      var totalScore = totalScoreGenerator(turnScore);
      $("#p1-score-total").text(totalScore);
      playerOne = false;
    }
    else if (playerTwo = true) {
      var totalScore = totalScoreGenerator(turnScore);
      $("#p2-score-total").text(totalScore);
      playerTwo = false;
    }

    turnScore = 0;
  });
  $("input#p1-turn-total").val("");
});
