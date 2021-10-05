const actualResults = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const chosenHand = {
  aiHand: "",
  playerHand: "",
};

const hands = [...document.querySelectorAll(".select img")];

function playerHand() {
  chosenHand.playerHand = this.dataset.option;
  console.log(chosenHand.playerHand);
  hands.forEach((hand) => (hand.style.boxShadow = ""));
  this.style.boxShadow = "0 0 0 4px red";
}

function randomAiHand() {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function whoWin(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "papier" && ai === "kamień") ||
    (player === "kamień" && ai === "nożyczki") ||
    (player === "nożyczki" && ai === "papier")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

function publishResults(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  document.querySelector("p.numbers span").textContent =
    ++actualResults.totalGames;

  if (result === "win") {
    document.querySelector("p.wins span").textContent = ++actualResults.wins;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Wygrałeś!:)";
  } else if (result === "draw") {
    document.querySelector("p.draws span").textContent = ++actualResults.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Remis :/";
  } else if (result === "loss") {
    document.querySelector("p.losses span").textContent =
      ++actualResults.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Przegrałeś z Komputerem :(";
  }
}

function endGame() {
  document.querySelector(
    `[data-option="${chosenHand.playerHand}"]`
  ).style.boxShadow = "";
}

function startGame() {
  if (!chosenHand.playerHand) {
   return alert("Wybierz dłoń!");
  }
  chosenHand.aiHand = randomAiHand();
  const gameResult = whoWin(chosenHand.playerHand, chosenHand.aiHand);
  console.log(gameResult);
  publishResults(chosenHand.playerHand, chosenHand.aiHand, gameResult);
  endGame();
}

hands.forEach((hand) => hand.addEventListener("click", playerHand));
document.querySelector(".start").addEventListener("click", startGame);
