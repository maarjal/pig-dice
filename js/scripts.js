// back-end logic

//set global variables
var playerOneTotalScore = 0;
var playerTwoTotalScore = 0;

var dieRoll = 0;
var turnScore = 0;
var playerOne = true;

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
  if (playerOne === true) {
    playerOneTotalScore = playerOneTotalScore + turnScore;
    return playerOneTotalScore;
  } else {
    playerTwoTotalScore = playerTwoTotalScore + turnScore;
    return playerTwoTotalScore;
  }    return playerTwoTotalScore;
  console.log(playerTwoTotalScore);

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
    if (playerOne === true) {
      $("#p1-turn-total").text(turnScore);
    } else {
      $("#p2-turn-total").text(turnScore);
    }

  });

  $("#hold-button").click(function(event) {
    event.preventDefault();

    if (playerOne === true) {
      playerOneTotalScore = totalScoreGenerator(turnScore);
      $("#p1-score-total").text(playerOneTotalScore);
      playerOne = false;
      console.log(playerOne)
    }
    else {
      playerTwoTotalScore = totalScoreGenerator(turnScore);
      $("#p2-score-total").text(playerTwoTotalScore);
      playerOne = true;
    }

    turnScore = 0;
  });
  $("input#p1-turn-total").val("");
});
