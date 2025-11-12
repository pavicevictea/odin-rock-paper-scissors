let humanScore = 0;
let computerScore = 0;

const roundResult = document.getElementById("round-result");
const finalResult = document.getElementById("final-result");
const choicesDisplay = document.getElementById("choices-display");
const playAgainBtn = document.getElementById("play-again");
const choiceButtons = document.querySelectorAll(".choice");

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function getHumanChoice(choice){
    return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice){
    if (humanChoice === computerChoice){
        return { message: "It's a tie!", result: "tie" };
    }

    const win = (humanChoice === "rock" && computerChoice === "scissors") ||
                (humanChoice === "paper" && computerChoice === "rock") ||
                (humanChoice === "scissors" && computerChoice === "paper");

    if(win){
        humanScore++;
        return { message: `You win! ${humanChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}.`, result: "win" };
    } else{
        computerScore++;
        return {message: `You lose! ${computerChoice.toUpperCase()} beats ${humanChoice.toUpperCase()}.`, result: "lose" };
    }
}

function updateScore(){
    document.getElementById("human-score").textContent = humanScore;
    document.getElementById("computer-score").textContent = computerScore;
}

function disableButtons() {
  choiceButtons.forEach(btn => btn.disabled = true);
}

function enableButtons() {
  choiceButtons.forEach(btn => btn.disabled = false);
}

function playGame(humanChoice){
    const playerChoice = getHumanChoice(humanChoice);
    const computerChoice = getComputerChoice();

    choicesDisplay.textContent = `🧍 You chose ${playerChoice.toUpperCase()} | 💻 Computer chose ${computerChoice.toUpperCase()}`;

    const { message, result } = playRound(playerChoice, computerChoice);
    roundResult.textContent = message;
    roundResult.className = result;

    updateScore();
    checkWinner();
}

function checkWinner(){
    if(humanScore === 5 || computerScore === 5){
        finalResult.textContent = humanScore === 5 ? "🎉 You won the game!" : "💻 Computer wins the game!";
        disableButtons();
        playAgainBtn.style.display = "inline-block";
    }
}

choiceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const choice = button.getAttribute("data-choice");
    playGame(choice);
  });
});


playAgainBtn.addEventListener("click", () => {
  humanScore = 0;
  computerScore = 0;
  updateScore();

  choicesDisplay.textContent = "Make your move!";
  roundResult.textContent = "";
  roundResult.className = "";
  finalResult.textContent = "";

  playAgainBtn.style.display = "none";
  enableButtons();
});