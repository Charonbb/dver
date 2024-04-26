document.addEventListener("DOMContentLoaded", function() {
  const doorsContainer = document.querySelector(".doors");
  const scorePlayer1 = document.getElementById("score-player1");
  const scorePlayer2 = document.getElementById("score-player2");
  const restartBtn = document.querySelector(".restart-btn");
  const playerTurn = document.querySelector(".player-turn");

  let currentPlayer = 1;
  let scores = [0, 0];
  let numDoors = 3;

  function createDoors() {
    doorsContainer.innerHTML = "";
    for (let i = 0; i < numDoors; i++) {
      const doorImg = document.createElement("img");
      doorImg.src = "images/ffffff.png"; 
      doorImg.alt = "Дверь";
      doorImg.dataset.prize = Math.random() < 0.5 ? "money" : "empty";
      doorImg.classList.add("door");
      doorImg.addEventListener("click", handleDoorClick);
      doorsContainer.appendChild(doorImg);
    }
  }

  function handleDoorClick(event) {
    const selectedDoor = event.target;
    if (!selectedDoor.classList.contains("opened")) {
      const prize = selectedDoor.dataset.prize;
      if (prize === "money") {
        selectedDoor.src = "images/IMG_6088.jpg"; 
        scores[currentPlayer - 1] += 50;
        updateScores();
        alert("Вы выиграли!");
      } else {
        selectedDoor.src = "images/IMG_6082.jpg"; 
        switchPlayer();
      }
      selectedDoor.classList.add("opened");
    }
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerTurn.textContent = `Игрок ${currentPlayer}, ваш ход`;
  }

  function updateScores() {
    scorePlayer1.textContent = scores[0];
    scorePlayer2.textContent = scores[1];
  }

  restartBtn.addEventListener("click", function() {
    numDoors = parseInt(prompt("Сколько дверей должно быть? (от 3 до 8)", 3));
    if (numDoors >= 3 && numDoors <= 8) {
      currentPlayer = 1;
      scores = [0, 0];
      updateScores();
      playerTurn.textContent = `Игрок ${currentPlayer}, ваш ход`;
      createDoors();
    } else {
      alert("Некорректное количество дверей. Игра начнется с 3 дверей.");
      numDoors = 3;
      createDoors();
    }
  });

  createDoors();
});