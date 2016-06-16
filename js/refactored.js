//business logic

function Player(activePlayer, dieRoll, turnScore, totalScore) {
  this.activePlayer = activePlayer;
  this.dieRoll = dieRoll;
  this.turnScore = turnScore;
  this.totalScore = totalScore;
}
//initialize new player
var playerOne = new Player(true, 0, 0, 0);
var playerTwo = new Player(false, 0, 0, 0);

//roll prototype
Player.prototype.randomDieRoller = function() {
  this.dieRoll = Math.floor((Math.random() * 6) +1);
  return this.dieRoll;
}

Player.prototype.turnScoreGenerator = function() {
  if (this.dieRoll === 1) {
    this.turnScore = 0;
    this.playerSwitch();
  }
  else {
    this.turnScore += this.dieRoll;
  }
  return this.turnScore;
}
// hold prototype
Player.prototype.totalScoreGenerator = function() {
    this.totalScore += this.turnScore;
    this.turnScore = 0;
  return this.totalScore;
}
// switch prototype
Player.prototype.playerSwitch = function() {
  if (playerOne.activePlayer === true) {
    playerOne.activePlayer = false;
    playerTwo.activePlayer = true;
  } else {
    playerOne.activePlayer = true;
    playerTwo.activePlayer = false;
  }
}

$(document).ready(function() {
  $("#roll-button").click(function(event) {
    event.preventDefault();

    if (playerOne.activePlayer === true) {
      playerOne.randomDieRoller();
      playerOne.turnScoreGenerator();
      $("#roll-result").text(playerOne.dieRoll);
      $("#p1-turn-total").text(playerOne.turnScore);
    } else if (playerTwo.activePlayer === true) {
      playerTwo.randomDieRoller();
      playerTwo.turnScoreGenerator();
      $("#roll-result").text(playerTwo.dieRoll);
      $("#p2-turn-total").text(playerTwo.turnScore);
    }
    console.log(playerOne);
    console.log(playerTwo);

  });

  $("#hold-button").click(function(event) {
    event.preventDefault();

    if (playerOne.activePlayer === true) {
      playerOne.totalScoreGenerator();
    }


  });

});


//ui logic
