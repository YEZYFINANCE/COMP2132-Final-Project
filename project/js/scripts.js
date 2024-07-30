document.addEventListener('DOMContentLoaded', () => {
    const playerDice1 = document.getElementById('playerDice1');
    const playerDice2 = document.getElementById('playerDice2');
    const playerScore = document.getElementById('playerScore');
    const playerTotalScore = document.getElementById('playerTotalScore');
    
    const computerDice1 = document.getElementById('computerDice1');
    const computerDice2 = document.getElementById('computerDice2');
    const computerScore = document.getElementById('computerScore');
    const computerTotalScore = document.getElementById('computerTotalScore');
    
    const rollDiceButton = document.getElementById('rollDiceButton');
    const newGameButton = document.getElementById('newGameButton');
  
    const toggleHowToPlay = document.getElementById('toggleHowToPlay');
    const howToPlayContent = document.getElementById('howToPlayContent');
    const toggleRules = document.getElementById('toggleRules');
    const rulesContent = document.getElementById('rulesContent');
    
    let playerTotal = 0;
    let computerTotal = 0;
    let round = 0;
    
    function rollDice() {
      return Math.floor(Math.random() * 6) + 1;
    }
    
    function calculateScore(dice1, dice2) {
      if (dice1 === 1 || dice2 === 1) return 0;
      if (dice1 === dice2) return (dice1 + dice2) * 2;
      return dice1 + dice2;
    }
  
    function updateDiceImages(diceElement, diceValue) {
      diceElement.src = `images/dice${diceValue}.png`;
      diceElement.alt = `Dice ${diceValue}`;
    }
    
    function updateScores() {
      const playerDice1Val = rollDice();
      const playerDice2Val = rollDice();
      const computerDice1Val = rollDice();
      const computerDice2Val = rollDice();
      
      const playerRoundScore = calculateScore(playerDice1Val, playerDice2Val);
      const computerRoundScore = calculateScore(computerDice1Val, computerDice2Val);
      
      updateDiceImages(playerDice1, playerDice1Val);
      updateDiceImages(playerDice2, playerDice2Val);
      updateDiceImages(computerDice1, computerDice1Val);
      updateDiceImages(computerDice2, computerDice2Val);
      
      playerScore.textContent = `Score this Round: ${playerRoundScore}`;
      computerScore.textContent = `Score this Round: ${computerRoundScore}`;
      
      playerTotal += playerRoundScore;
      computerTotal += computerRoundScore;
      
      playerTotalScore.textContent = `Total Score: ${playerTotal}`;
      computerTotalScore.textContent = `Total Score: ${computerTotal}`;
      
      round++;
      
      if (round === 3) {
        rollDiceButton.disabled = true;
        setTimeout(() => {
            if (playerTotal > computerTotal) {
                alert('You win!');
            } else if (playerTotal < computerTotal) {
                alert('Computer wins!');
            } else {
                alert('It\'s a tie!');
            }
        }, 500); // Delay to ensure the scores are updated
      }
    }
    
    function resetGame() {
      playerTotal = 0;
      computerTotal = 0;
      round = 0;
      
      playerDice1.src = 'images/dice1.png';
      playerDice1.alt = 'Dice 1';
      playerDice2.src = 'images/dice1.png';
      playerDice2.alt = 'Dice 1';
      computerDice1.src = 'images/dice1.png';
      computerDice1.alt = 'Dice 1';
      computerDice2.src = 'images/dice1.png';
      computerDice2.alt = 'Dice 1';
      
      playerScore.textContent = 'Score this Round: 0';
      playerTotalScore.textContent = 'Total Score: 0';
      computerScore.textContent = 'Score this Round: 0';
      computerTotalScore.textContent = 'Total Score: 0';
      
      rollDiceButton.disabled = false;
    }
  
    function fadeIn(element) {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
      setTimeout(() => {
        element.classList.remove('hidden');
      }, 500);
    }
  
    function fadeOut(element) {
      element.classList.remove('fade-in');
      element.classList.add('fade-out');
      setTimeout(() => {
        element.classList.add('hidden');
      }, 500);
    }
    
    rollDiceButton.addEventListener('click', updateScores);
    newGameButton.addEventListener('click', resetGame);

    $("#toggle-instructions-btn").click(function() {
        $("#instructions-content").slideToggle();
    });

    $("#toggle-rules-btn").click(function() {
        $("#rules-content").slideToggle();
    });
    
  });
  