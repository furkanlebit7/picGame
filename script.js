'use strict';

//Btns
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//playerPanels
const panel0 = document.querySelector('.player--0');
const panel1 = document.querySelector('.player--1');

const dice = document.querySelector('.dice');

const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

let playing, currentNumber, activePlayer, playerScores;
// let playing = true;
// let currentNumber = 0;
// let activePlayer = 0;
// const playerScores = [0, 0];

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentNumber = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  panel0.classList.toggle('player--active');
  panel1.classList.toggle('player--active');
};

function init() {
  playing = true;
  currentNumber = 0;
  activePlayer = 0;
  playerScores = [0, 0];

  score1.textContent = 0;
  score0.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');
  panel0.classList.remove('player--winner');
  panel1.classList.remove('player--winner');
  panel0.classList.add('player--active');
  panel1.classList.remove('player--acitve');
}
init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomNumber}.png`;
    dice.classList.remove('hidden');
    if (randomNumber != 1) {
      currentNumber += randomNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentNumber;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    if (playing) playerScores[activePlayer] += currentNumber;

    document.querySelector(`#score--${activePlayer}`).textContent =
      playerScores[activePlayer];

    if (playerScores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
