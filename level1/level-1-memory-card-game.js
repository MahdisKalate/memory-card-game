//? Array of Deck of Card Images
const deckCards = [
  "1.jpg",
  "1.jpg",
  "2.jpg",
  "2.jpg",
  "3.jpg",
  "3.jpg",
  "4.jpg",
  "4.jpg"
];

//? Access the <ul> with class of .deck
const deck = document.querySelector(".flash-cards");

let currentPic = "";
let currentPicSrc = "";

//? Create an empty array to store the opened cards
let opened = [];

//? Access the modal
let matched = [];
const winModal = document.getElementById("win-modal");
const loserModal = document.getElementById("loser-modal");
const startGameModal = document.getElementById("start-modal");

//? Access the reset button
const reset = document.querySelector(".reset-btn");

//? Access the play again button
const playAgainWin = document.querySelector(".play-again-win-btn");
const playAgainLose = document.querySelector(".play-again-lose-btn");

//? Select the class moves-counter and change it's HTML
const movesCount = document.querySelector(".moves-counter");

//? Create variable for moves counter, start the count at zero
let moves = 0;
const star = document.getElementById("star-rating").querySelectorAll(".star");
let starCount = 3;
const timeCounter = document.querySelector(".timer-container");

//? Access game sound
const volumeUp = document.querySelector(".volume-up-icon");
const volumeOff = document.querySelector(".volume-off-icon");
volumeOff.style.display = "none";

const hint = document.querySelector(".hint");

let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function startGame() {
  if (timeStart === false) {
    timeStart = true;
    timer();
  }

  //? Invoke shuffle function and store in variable
  const shuffledDeck = shuffle(deckCards);

  //? Iterate over deck of cards arry
  for (let i = 0; i < shuffledDeck.length; i++) {
    //? Create the <li> tags
    const liTag = document.createElement("LI");

    //? Give <li> class of card
    liTag.classList.add("card");

    //?create the <img> tags
    const addImage = document.createElement("IMG");

    //? Append <img> to <li>
    liTag.appendChild(addImage);

    //? set the img src path with the suffled deck
    addImage.setAttribute("src", "../images/level_1/" + shuffledDeck[i]);

    //? Update the new <li> to the deck <ul>
    deck.appendChild(liTag);

    setInterval(function () {
      addImage.style.visibility = "hidden";
    }, 2000);
  }
}

showStartGameModal();

//? Clear the deck
function removeCard() {
  while (deck.hasChildNodes()) {
    deck.removeChild(deck.firstChild);
  }
}

function timer() {
  time = setInterval(function () {
    seconds++;

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    timeCounter.innerHTML =
      "<i class='fa fa-hourglass-start'></i>" +
      " زمان : " +
      minutes +
      " دقیقه " +
      seconds +
      " ثانیه ";
  }, 1000);
}

function stopTime() {
  clearInterval(time);
}

function resetEverything() {
  stopTime();
  timeStart = false;
  seconds = 0;
  minutes = 0;
  timeCounter.innerHTML =
    "<i class='fa fa-hourglass-start'></i>" + " زمان : 00:00";

  //? Reset star count and the class back to show starts again
  star[1].firstElementChild.classList.add("fa-star");
  star[2].firstElementChild.classList.add("fa-star");
  starCount = 3;

  //? Reset moves count and reset its innerHTML
  moves = 0;
  movesCount.innerHTML = 0;

  //? Clear both arrays that hold the opened and matched cards
  matched = [];
  opened = [];

  //? Clear the deck
  removeCard();

  //? Create a new deck
  startGame();
}

function movesCounter() {
  movesCount.innerHTML++;
  moves++;
}

function starRating() {
  if (moves === 6) {
    star[2].firstElementChild.classList.remove("fa-star");
    starCount--;
  } else if (moves === 8) {
    star[1].firstElementChild.classList.remove("fa-star");
    starCount--;
  } else if (moves === 10) {
    star[0].firstElementChild.classList.remove("fa-star");
    starCount--;
    loseGame();
  }
}

//? Compare two cards to see if they match or not
function compareTwo() {
  //? When they are 2 cards in the opened array
  if (opened.length === 2) {
    document.body.style.pointerEvents = "none";
  }
  if (opened.length === 2 && opened[0].src === opened[1].src) {
    match();
  } else if (opened.length === 2 && opened[0].src != opened[1].src) {
    noMatch();
  }
}

function match() {
  setTimeout(function () {
    opened[0].parentElement.classList.add("match");
    opened[1].parentElement.classList.add("match");
    matched.push(...opened);
    document.body.style.pointerEvents = "auto";
    winGame();
    opened = [];
  }, 600);
  movesCounter();
  starRating();
}

function noMatch() {
  setTimeout(function () {
    opened[0].parentElement.classList.remove("flip");
    opened[1].parentElement.classList.remove("flip");
    document.body.style.pointerEvents = "auto";
    opened = [];
  }, 700);
  movesCounter();
  starRating();
}

function addStatsWin() {
  const stats = document.querySelector(".win-content");
  for (let i = 1; i <= 3; i++) {
    const statsElement = document.createElement("p");
    statsElement.classList.add("stats");
    stats.appendChild(statsElement);
  }
  let p = stats.querySelectorAll("p.stats");

  p[0].innerHTML = "زمان بازی : " + minutes + " دقیقه و " + seconds + " ثانیه";

  p[1].innerHTML = "تعداد حرکات : " + moves;

  p[2].innerHTML = "ستاره های شما : " + starCount + " از 3 ";
}

function addStatsLose() {
  const stats = document.querySelector(".loser-content");
  for (let i = 1; i <= 3; i++) {
    const statsElement = document.createElement("p");
    statsElement.classList.add("stats");
    stats.appendChild(statsElement);
  }
  let p = stats.querySelectorAll("p.stats");

  p[0].innerHTML = "زمان بازی : " + minutes + " دقیقه و " + seconds + " ثانیه";

  p[1].innerHTML = "تعداد حرکات : " + moves;

  p[2].innerHTML = "ستاره های شما : " + starCount + " از 3 ";
}

//? when the user wins
function displayWinModal() {
  document.getElementById("player").pause();
  document.getElementById("winSound").play();
  winModal.style.display = "block";
}

//? when the user loses
function displayLoseModal() {
  document.getElementById("player").pause();
  document.getElementById("loseSound").play();
  loserModal.style.display = "block";
}

//? when since game not started
function showStartGameModal() {
  startGameModal.style.display = "block";
}

function winGame() {
  if (matched.length === 8) {
    stopTime();
    addStatsWin();
    displayWinModal();
  }
}

function loseGame() {
  if (starCount == 0) {
    stopTime();
    addStatsLose();
    displayLoseModal();
  }
}

deck.addEventListener("click", function (evt) {
  if (evt.target.nodeName === "LI") {
    flipCard();
  }

  function flipCard() {
    evt.target.classList.add("flip");
    addToOpend();
  }

  function addToOpend() {
    if (opened.length === 0 || opened.length === 1) {
      opened.push(evt.target.firstElementChild);
    }
    compareTwo();
  }
});

reset.addEventListener("click", resetEverything);

playAgainWin.addEventListener("click", function () {
  winModal.style.display = "none";
  resetEverything();
  document.getElementById("winSound").pause();
  document.getElementById("player").play();
});

playAgainLose.addEventListener("click", function () {
  loserModal.style.display = "none";
  resetEverything();
  document.getElementById("loseSound").pause();
  document.getElementById("player").play();
});

function playGame() {
  startGameModal.style.display = "none";
  startGame();
  if (timeStart === false) {
    timeStart = true;
    timer();
  }
  document.getElementById("player").play();
  volumeUp.innerHTML = "<i class='fa fa-volume-up'></i>";
}

function playSound() {
  document.getElementById("player").play();
  volumeOff.style.display = "none";
  volumeUp.innerHTML = "<i class='fa fa-volume-up'></i>";
  volumeUp.style.display = "flex";
}

function pauseSound() {
  document.getElementById("player").pause();
  volumeUp.style.display = "none";
  volumeOff.innerHTML = "<i class='fa fa-volume-off'></i>";
  volumeOff.style.display = "flex";
}

function selectCard(event) {
  currentPic = event.target.firstChild.src;
  currentPicSrc = currentPic.slice(-5);
}

sameCards = [];
function hintFunc() {
  if (opened.length === 1) {
    this.sameCards = [];
    deckCards.forEach((card, index) => {
      if (card === currentPicSrc) {
        this.sameCards.push(index);
      }
    });
    this.sameCards.forEach((cardIndex) => {
      document.getElementById("cards").getElementsByTagName("li")[
        cardIndex
      ].classList.add("blink");
    });
  }
}

function nextLevel() {
  window.location.pathname = "C:/Users/m-kalateh/Desktop/project - Copy/level2/level-2-memory-card-game.html";
}