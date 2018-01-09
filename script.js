var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

$('.btn-roll').click(function() {
  if (gamePlaying) {
    // Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // Display the result
    $('#dice-1').css({
      "display": "block"
    });
    $('#dice-2').css({
      "display": "block"
    });
    $('#dice-1').attr("src", "img/dice-" + dice1 + ".png");
    $('#dice-2').attr("src", "img/dice-" + dice2 + ".png");


    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      $('#current-' + activePlayer).text(roundScore);
    } else {

      nextPlayer();
    }
  }
});


$('.btn-hold').click(function() {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    $('#score-' + activePlayer).text(scores[activePlayer]);

    var input = $('.final-score').value;
    var winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      $('#name-' + activePlayer).text('Winner!');
      $('#dice-1').css({
        "display": "none"
      });
      $('#dice-2').css({
        "display": "none"
      });
      $('.player-' + activePlayer + '-panel').addClass('winner');
      $('.player-' + activePlayer + '-panel').removeClass('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});


function nextPlayer() {

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  $('#current-0').text('0');
  $('#current-1').text('0');

  $('.player-0-panel').toggleClass("active");
  $('.player-1-panel').toggleClass("active");

  $('#dice-1').css({
    "display": "none"
  });
  $('#dice-2').css({
    "display": "none"
  });
}

$('.btn-new').click(init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  $('#dice-1').css({
    "display": "none"
  });
  $('#dice-2').css({
    "display": "none"
  });
  $('#score-0').text('0');
  $('#score-1').text('0');
  $('#current-0').text('0');
  $('#current-1').text('0');
  $('#name-0').text('Player 1');
  $('#name-1').text('Player 2');

  $('.player-0-panel').removeClass('winner');
  $('.player-1-panel').removeClass('winner');
  $('.player-0-panel').removeClass('active');
  $('.player-1-panel').removeClass('active');
  $('.player-0-panel').addClass('active');
}
