//business logic
function Player(activePlayer) {
  this.activePlayer = activePlayer;
  this.dieRoll = 0;
  this.turnScore = 0;
  this.totalScore = 0;
}

//initialize new player
var playerOne = new Player(true);
var playerTwo = new Player(false);

//roll prototype
Player.prototype.randomDieRoller = function() {
  this.dieRoll = Math.floor((Math.random() * 6) +1);
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
}
// hold prototype
Player.prototype.totalScoreGenerator = function() {
    this.totalScore += this.turnScore;
    this.turnScore = 0;
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

function resetFields() {
  $("span#p1-dieRoll").empty();
  $("span#p2-dieRoll").empty();
  $("span#p1-turn-score").empty();
  $("span#p2-turn-score").empty();
  $("span#p1-total-score").empty();
  $("span#p2-total-score").empty();
  $("h4#p1-winner").hide();
  $("h4#p2-winner").hide();
  $("h4#p1-looser").hide();
  $("h4#p2-looser").hide();
}

// ui functions
var showImg = function(dieRoll) {
  $("#dice-img").empty();
  var dice = {
    one: "img/1.png",
    two: "img/2.png",
    three: "img/3.png",
    four: "img/4.png",
    five: "img/5.png",
    six: "img/6.png"
  }
  if (dieRoll === 1) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.one + ">");
  } else if (dieRoll === 2) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.two + ">");
  } else if (dieRoll === 3) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.three + ">");
  } else if (dieRoll === 4) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.four + ">");
  } else if (dieRoll === 5) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.five + ">");
  } else if (dieRoll === 6) {
    $("#dice-img").append("<img class='dice-img' src=" + dice.six + ">");
  }
}

var showWinner1 = function() {
  $("#p1-winner").show();
  $("#p2-looser").show();
  $("#play-button").show();
}

var showWinner2 = function() {
  $("#p2-winner").show();
  $("#p1-looser").show();
  $("#play-button").show();
}

//ui logic
$(document).ready(function() {
  $("#play-button").click(function(event) {
    event.preventDefault();
    resetFields();
    playerOne.playerStart();
    $("#p1-dieRoll").text(playerOne.dieRoll);
    $("#p2-dieRoll").text(playerTwo.dieRoll);
    if (playerOne.activePlayer === true) {
      $("#p1-header").addClass("header-color");
      showImg(playerOne.dieRoll);
      $("#gameStarterOne").show();
    } else {
      $("#p2-header").addClass("header-color");
      showImg(playerTwo.dieRoll);
      $("#gameStarterTwo").show();
    }
    $("#play-button").hide();
  });

  $("#roll-button").click(function(event) {
    event.preventDefault();
    if (playerOne.activePlayer === true) {
      $("#gameStarterOne").hide();
      playerOne.randomDieRoller();
      showImg(playerOne.dieRoll);
      playerOne.turnScoreGenerator();
      $("#p1-dieRoll").text(playerOne.dieRoll);
      $("#p1-turn-score").text(playerOne.turnScore);
    } else if (playerTwo.activePlayer === true) {
      $("#gameStarterTwo").hide();
      playerTwo.randomDieRoller();
      showImg(playerTwo.dieRoll);
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
        showWinner1();
      }
      playerOne.playerSwitch();
    } else if (playerTwo.activePlayer === true) {
      $(".header-color").removeClass();
      $("#p1-header").addClass("header-color");
      playerTwo.totalScoreGenerator();
      $("#p2-total-score").text(playerTwo.totalScore);
      if (playerTwo.totalScore >= 100) {
        showWinner2();
      }
      playerTwo.playerSwitch();
    }
  });
});
