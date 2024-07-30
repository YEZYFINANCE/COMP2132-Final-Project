let playerScore = 0;
let computerScore = 0;
let round = 0;

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function calculateScore(dice1, dice2) {
    if (dice1 === 1 || dice2 === 1) {
        return 0;
    }
    if (dice1 === dice2) {
        return (dice1 + dice2) * 2;
    }
    return dice1 + dice2;
}

function updateScores() {
    document.getElementById('playerTotalScore').textContent = playerScore;
    document.getElementById('computerTotalScore').textContent = computerScore;
}

function showPopup(message) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay', 'show');

    const popup = document.createElement('div');
    popup.classList.add('popup', 'show');
    popup.innerHTML = `
        <h2>${message}</h2>
        <button id="closePopup">Close</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    document.getElementById('closePopup').addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(popup);
    });
}

document.getElementById('rollButton').addEventListener('click', () => {
    if (round < 3) {
        const playerDice1 = rollDice();
        const playerDice2 = rollDice();
        const computerDice1 = rollDice();
        const computerDice2 = rollDice();

        document.getElementById('playerDice1').src = `images/dice${playerDice1}.png`;
        document.getElementById('playerDice2').src = `images/dice${playerDice2}.png`;
        document.getElementById('computerDice1').src = `images/dice${computerDice1}.png`;
        document.getElementById('computerDice2').src = `images/dice${computerDice2}.png`;

        const playerRoundScore = calculateScore(playerDice1, playerDice2);
        const computerRoundScore = calculateScore(computerDice1, computerDice2);

        playerScore += playerRoundScore;
        computerScore += computerRoundScore;

        document.getElementById('playerScore').textContent = playerRoundScore;
        document.getElementById('computerScore').textContent = computerRoundScore;

        updateScores();
        round++;

        if (round === 3) {
            let winnerMessage;
            if (playerScore > computerScore) {
                winnerMessage = 'You win!';
            } else if (computerScore > playerScore) {
                winnerMessage = 'Computer wins!';
            } else {
                winnerMessage = 'It\'s a tie!';
            }
            showPopup(winnerMessage);
        }
    }
});

document.getElementById('resetButton').addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    round = 0;
    updateScores();
    document.getElementById('playerScore').textContent = '0';
    document.getElementById('computerScore').textContent = '0';
    document.getElementById('playerDice1').src = 'images/dice1.png';
    document.getElementById('playerDice2').src = 'images/dice1.png';
    document.getElementById('computerDice1').src = 'images/dice1.png';
    document.getElementById('computerDice2').src = 'images/dice1.png';
});
