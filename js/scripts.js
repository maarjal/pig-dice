// back-end logic
var playerOneTotalScore = 0;
var playerTwoTotalScore = 0;
var dieRoll = 0;
var turnScore = 0;
var playerTurn = true;

function randomDieRoller() {
  var randomDieRoll = Math.floor((Math.random() * 6) +1);
  return randomDieRoll;
}

function checkIfOne(dieRoll) {
  if (dieRoll === 1) {
    turnScore = 0;
    if (playerTurn === true) {
      playerTurn = false;
    } else {
      playerTurn = true;
    }
  } else {
    turnScore += dieRoll;
  }
  return turnScore;
}

function totalScoreGenerator(turnScore) {
  if (playerTurn === true) {
    playerOneTotalScore = playerOneTotalScore + turnScore;
    return playerOneTotalScore;
  } else {
    playerTwoTotalScore = playerTwoTotalScore + turnScore;
    return playerTwoTotalScore;
  }
}

// front-end logic
$(document).ready(function() {
  $("#roll-button").click(function(event) {
    event.preventDefault();

    var dieRoll = randomDieRoller();
    $("#roll-result").text(dieRoll);

    if (playerTurn === true) {
      checkIfOne(dieRoll);
      $("#p1-turn-total").text(turnScore);
    } else {
      checkIfOne(dieRoll);
      $("#p2-turn-total").text(turnScore);
    }
  });

  $("#hold-button").click(function(event) {
    event.preventDefault();

    if (playerTurn === true) {
      playerOneTotalScore = totalScoreGenerator(turnScore);
      $("#p1-score-total").text(playerOneTotalScore);
      if (playerOneTotalScore >= 100) {
        alert("Congrats, you won!");
        location.reload();
      }
      playerTurn = false;
    } else {
      playerTwoTotalScore = totalScoreGenerator(turnScore);
      $("#p2-score-total").text(playerTwoTotalScore);
      if (playerTwoTotalScore >= 100) {
        alert("Congrats, you won!");
        location.reload();
      }
      playerTurn = true;
    }
    turnScore = 0;
  });
  $("input#p1-turn-total").val("");
});
