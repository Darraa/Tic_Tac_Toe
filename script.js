let titleText = document.querySelector(".title-text");
let playerTurn = document.querySelector(".player-turn");
const restartBtn = document.querySelector(".restart-btn");
const notification = document.querySelector(".notification");
const btnConfirm = document.querySelector(".restart-yes");
const btnCancel = document.querySelector(".restart-no");
const boxes = Array.from(document.querySelectorAll(".box"));

const winnerIndicator = getComputedStyle(document.body).getPropertyValue(
    "--winning-area"
);

const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;
let gamesPlace = Array(9).fill(null);

playerTurn.textContent = `Player ${currentPlayer}'s turn`;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    boxes.forEach((item) => {
        item.addEventListener("click", boxClicked);
    });
};

function restartGame() {
    gamesPlace.fill(null);

    boxes.forEach((item) => {
        item.innerText = "";
        item.classList.remove("playerX", "playerO");
        item.style.backgroundColor = "";
    });

    titleText.textContent = "Tic Tac Toe 🎮";
}

function showPopup() {
    restartBtn.addEventListener("click", () => {
        notification.classList.add("show");
    });
}

function confirmPopup() {
    btnConfirm.addEventListener("click", () => {
        restartGame();
        notification.classList.remove("show");
    });
}

function cancelPopup() {
    btnCancel.addEventListener("click", () => {
        notification.classList.remove("show");
    });
}

function playerWon() {
    for (const key of winningConditions) {
        let [a, b, c] = key;

        if (
            gamesPlace[a] &&
            gamesPlace[a] == gamesPlace[b] &&
            gamesPlace[a] == gamesPlace[c]
        ) {
            return [a, b, c];
        }
    }

    return false;
}

function boxClicked(el) {
    const id = el.target.id;

    if (!gamesPlace[id]) {
        gamesPlace[id] = currentPlayer;
        el.target.innerText = currentPlayer;

        if (currentPlayer === playerX) {
            el.target.classList.remove("playerO");
            el.target.classList.add("playerX");
        } else {
            el.target.classList.remove("playerX");
            el.target.classList.add("playerO");
        }

        if (playerWon() !== false) {
            titleText.textContent = `Player ${currentPlayer} has won!🎉`;
            let winningArea = playerWon();

            winningArea.map((item) => {
                boxes[item].style.backgroundColor = winnerIndicator;
            });
        } else if (gamesPlace.every((item) => item !== null)) {
            titleText.textContent = `It's a draw!😐`;
        }
        currentPlayer = currentPlayer == playerX ? playerO : playerX;
        playerTurn.textContent = `Player ${currentPlayer}'s turn`;
    }
}

startGame();
restartGame();
showPopup();
confirmPopup();
cancelPopup();
