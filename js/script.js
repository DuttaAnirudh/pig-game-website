'use strict';

// Selecting elements
const pl1 = document.querySelector('.player--0');
const pl2 = document.querySelector('.player--1');
const namePl1 = document.getElementById('name--0');
const namePl2 = document.getElementById('name--1');
const tsP1 = document.getElementById('score--0');
const tsP2 = document.getElementById('score--1');
const csP1 = document.getElementById('current--0');
const csP2 = document.getElementById('current--1');
const diceImg = document.querySelector('.dice');
const containerPopup = document.querySelector('.popup');

// BTNs
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnClosePopup = document.querySelector('.popup__close');
const btnRules = document.querySelector('.btn-rules');

//Pre-set
let gameStatus, scoreTotal, activePlayer, currentSum;

const init = function () {
  activePlayer = 0;
  scoreTotal = [0, 0];
  currentSum = 0;
  gameStatus = true;

  tsP1.textContent = 0;
  tsP2.textContent = 0;
  csP1.textContent = 0;
  csP2.textContent = 0;

  namePl1.textContent = 'PLAYER 1';
  namePl2.textContent = 'PLAYER 2';

  pl1.classList.remove('player--winner');
  pl2.classList.remove('player--winner');
  pl1.classList.add('player--active');
  diceImg.classList.add('hidden');
};
init();

const switchPlayer = function () {
  currentSum = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentSum;
  activePlayer = activePlayer === 0 ? 1 : 0;
  pl1.classList.toggle('player--active');
  pl2.classList.toggle('player--active');
};

///////////////////////////////
// Eventlistener: Roll Dice Btn
btnRoll.addEventListener('click', function () {
  if (gameStatus) {
    // Generate New Number
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // Display Dice for that Number
    diceImg.src = `../assets/dice-${diceNum}.png`;
    diceImg.classList.remove('hidden');

    // If Number is NOT 1
    if (diceNum !== 1) {
      currentSum += diceNum;
      // Add Number to Current Score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentSum;
    }

    // If Number is 1
    else if (diceNum === 1) {
      // Switch Player
      switchPlayer();
    }
  }
});

// Eventlistener: Hold Btn
btnHold.addEventListener('click', function () {
  if (gameStatus) {
    // Add currentSum to Total Score using scoreTotal[activePlayer] = currentSum
    scoreTotal[activePlayer] += currentSum;
    document.getElementById(`score--${activePlayer}`).textContent =
      scoreTotal[activePlayer];

    // Scan Total score of current player
    // if total score >= 100, Declare Winner
    if (scoreTotal[activePlayer] >= 100) {
      // Disable Buttons
      gameStatus = false;

      // Add Winner UI
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Remove active UI
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Change Player Name to Winner
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';

      // Hide Dice
      diceImg.classList.add('hidden');
    } else {
      // else
      // Switch Player
      switchPlayer();
    }
  }
});

// Eventlistener: New Game Btn
btnNew.addEventListener('click', init);

// EventListener: POPUP CLOSE BUTTON
btnClosePopup.addEventListener('click', function () {
  containerPopup.classList.add('hidden');
});

// EventListener: RULES  CLOSE BUTTON
btnRules.addEventListener('click', function (e) {
  e.preventDefault();
  containerPopup.classList.toggle('hidden');
});
