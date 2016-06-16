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
  // return this.dieRoll;
}

Player.prototype.showImg = function() {
  $("#dice-img").empty();
  if (this.dieRoll === 1) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.one + ">");
  } else if (this.dieRoll === 2) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.two + ">");
  } else if (this.dieRoll === 3) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.three + ">");
  } else if (this.dieRoll === 4) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.four + ">");
  } else if (this.dieRoll === 5) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.five + ">");
  } else if (this.dieRoll === 6) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.six + ">");
  }
}

var dice = {
  one: "img/1.png",
  two: "img/2.png",
  three: "img/3.png",
  four: "img/4.png",
  five: "img/5.png",
  six: "img/6.png"
}

Player.prototype.turnScoreGenerator = function() {
  if (this.dieRoll === 1) {
    this.turnScore = 0;
    $(".header-color").removeClass();
    this.playerSwitch();
  }
  else {
    this.turnScore += this.dieRoll;
  }
  // return this.turnScore;
}
// hold prototype
Player.prototype.totalScoreGenerator = function() {
    this.totalScore += this.turnScore;
    this.turnScore = 0;
  // return this.totalScore;
}
// switch prototype
Player.prototype.playerSwitch = function() {
  if (playerOne.activePlayer === true) {
    $(".header-color").removeClass();
    $("#p2-header").addClass("header-color");
    playerOne.activePlayer = false;
    playerTwo.activePlayer = true;
  } else {
    playerOne.activePlayer = true;
    playerTwo.activePlayer = false;
    $(".header-color").removeClass();
    $("#p1-header").addClass("header-color");
  }
}

Player.prototype.playerStart = function() {
  playerOne.randomDieRoller();
  playerTwo.randomDieRoller();

  if (playerOne.dieRoll > playerTwo.dieRoll) {
    playerOne.activePlayer = true;
    playerTwo.activePlayer = false;
  }
  else if (playerOne.dieRoll < playerTwo.dieRoll) {
      playerOne.activePlayer = false;
      playerTwo.activePlayer = true;
  } else {
    playerOne.playerStart();
  }
}

//ui logic
$(document).ready(function() {
  $("#play-button").click(function(event) {
    event.preventDefault();
    playerOne.playerStart();



    $("#p1-dieRoll").text(playerOne.dieRoll);
    $("#p2-dieRoll").text(playerTwo.dieRoll);
    if (playerOne.activePlayer === true) {
      $("#p1-header").addClass("header-color");
    } else {
      $("#p2-header").addClass("header-color");
    }
    $("#play-button").hide();
    $("form#pig-dice").each(function() {
      this.reset();
    });
  });

  $("#roll-button").click(function(event) {
    event.preventDefault();
    if (playerOne.activePlayer === true) {
      // $("#p1-header").addClass("header-color");
      playerOne.randomDieRoller();
      playerOne.showImg();
      playerOne.turnScoreGenerator();
      $("#p1-dieRoll").text(playerOne.dieRoll);
      $("#p1-turn-score").text(playerOne.turnScore);
    } else if (playerTwo.activePlayer === true) {
      // $("#p2-header").addClass("header-color");
      playerTwo.randomDieRoller();
      playerTwo.showImg();
      playerTwo.turnScoreGenerator();
      $("#p2-dieRoll").text(playerTwo.dieRoll);
      $("#p2-turn-score").text(playerTwo.turnScore);
    }
  });

  $("#hold-button").click(function(event) {
    event.preventDefault();

    if (playerOne.activePlayer === true) {
      $(".header-color").removeClass();
      $("#p2-header").addClass("header-color");
      playerOne.totalScoreGenerator();
      $("#p1-total-score").text(playerOne.totalScore);
      if (playerOne.totalScore >= 100) {
        $("#p1-winner").show();
        $("#p2-looser").show();
        $("#play-button").show();
      }
      playerOne.playerSwitch();
    } else if (playerTwo.activePlayer === true) {
      $(".header-color").removeClass();
      $("#p1-header").addClass("header-color");
      playerTwo.totalScoreGenerator();
      $("#p2-total-score").text(playerTwo.totalScore);
      if (playerTwo.totalScore >= 100) {
        $("#p2-winner").show();
        $("#p1-looser").show();
        $("#play-button").show();
      }
      playerTwo.playerSwitch();
    } else alert("totalScoreGenerator Broken!");
  });
});
