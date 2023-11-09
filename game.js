let flippedCard, lockBoard = false;
let firstCard, secondCard = null;
let numFlips = 0;
let flips = document.getElementById("moves");
let cards = document.querySelectorAll(".card");

function flipCards() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flip");
  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    numFlips++;
    flips.innerHTML = numFlips;
  } else {
    flippedCard = false;
    secondCard = this;
    numFlips++;
    flips.innerHTML = numFlips;

    if (firstCard.dataset.hero === secondCard.dataset.hero) {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        [flippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
      }, 500);
    }
  }
}

function shuffleCards() {
  cards.forEach(card => {
    let randIndex = Math.floor(Math.random() * 12);
    card.style.order = randIndex;
  });
}
shuffleCards();

function reset() {
  if (lockBoard) return;
  cards.forEach(card => {
    card.classList.remove("flip");
    card.addEventListener('click', flipCard);
  });
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  numFlips = 0;
  flips.innerHTML = numFlips;
  setTimeout(() => {
    shuffleCards();
    checkWin(); //check for win after shuffling cards
  }, 550);
}

function checkWin() {
  if (document.querySelectorAll('.card.flip').length === cards.length) {
    alert("You Win!");
    reset
  }
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', flipCards);
});
