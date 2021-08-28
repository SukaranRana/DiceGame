'use strict';

//Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Extra Variables
let current = 0;
let activePlayer = 0;
const playerScores = [0, 0];
let playing = true;

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Switch Player Function
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  current = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//roll die functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random number
    const randomNumber = Math.trunc(Math.random() * 6 + 1);
    //2. Display a die
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomNumber}.png`;
    //3. Check for rolled 1 -> if True, change player
    if (randomNumber != 1) {
      current += randomNumber;
      //adding to active player's current score
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    } else {
      // current = 0;
      // //before changing current player -> nullify the current score
      // document.querySelector(`#current--${activePlayer}`).textContent = 0;
      // //changing css of active player
      // /*    document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active');
      //   */
      // //deciding active player
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // //adding css to new active player
      // /*    document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.add('player--active');
      //   */
      // //Instead of using above method of changing css property, we can use toggle method
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});
//Implementing hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    playerScores[activePlayer] += current;
    document.querySelector(`#score--${activePlayer}`).textContent =
      playerScores[activePlayer];
    current = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    if (document.querySelector(`#score--${activePlayer}`).textContent >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // document.querySelector('.btn--roll').disabled = true;
      // document.querySelector('.btn--roll').style.backgroundColor = 'grey';
      // document.querySelector('.btn--hold').disabled = true;
      // document.querySelector('.btn--hold').style.backgroundColor = 'grey';
      diceEl.classList.remove;
    }
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});
//Implementing new game button
btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  score1El.textContent = 0;
  score0El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
  playing = true;
  playerScores[0] = 0;
  playerScores[1] = 0;
  current = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  activePlayer = 0;
});
