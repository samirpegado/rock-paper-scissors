const optionBtn = document.querySelectorAll('div.optionBtn button');
const playerPoints = document.querySelector('#playerScore');
const computerPoints = document.querySelector('#computerScore');
const roundResults = document.querySelector('#roundResults');
const resetBtn = document.querySelector('#reset');

resetBtn.addEventListener('click', () => location.reload());

optionBtn.forEach(button => {button.addEventListener('click', getUserChoice)});

let computerChoices = [{choice: 'Rock', value: 0}, {choice: 'Paper', value: 1}, {choice: 'Scissors', value: 2}];
let userChoice;
let playerScore = 0;
let computerScore = 0;
;

// computer random selection function
function getComputerChoice(){
    let randomNumber = Math.floor(Math.random() * 3);
    let result = computerChoices[randomNumber];

    if (randomNumber == 0){
        imgSrcPC = 'img/0.png';
    } else if (randomNumber == 1){
        imgSrcPC = 'img/1.png';
    }else if (randomNumber == 2){
        imgSrcPC = 'img/2.png';}
    return result;
}


function playRound (userSelection, computerSelection){
    let roundWinCombo = `${userSelection}-${computerSelection.value}`;
    let playerWinCombo = ['1-0', '0-2', '2-1'];
        
    if(Number(userSelection) === computerSelection.value){
        playerPoints.textContent = ++playerScore
        computerPoints.textContent = ++computerScore
        roundResults.textContent = "We have a Tie!"
    }else if (playerWinCombo.includes(roundWinCombo)){
        playerPoints.textContent = ++playerScore
        roundResults.textContent = `You win! ${userChoice} beats ${computerSelection.choice}`;
    }else {
        computerPoints.textContent = ++computerScore
        roundResults.textContent = `You lose! ${computerSelection.choice} beats ${userChoice}`
    }

checkWinner();
imgSelectionPlayer();
imgSelectionPC();

}

function imgSelectionPlayer () {
    if(userChoice == "Rock"){
        imgSrc = 'img/0.png';
    } else if (userChoice == "Paper"){
        imgSrc = 'img/1.png';
    } else if (userChoice == "Scissors"){
        imgSrc = 'img/2.png';
    }

    var weaponImgPlayer = document.createElement("img");
    weaponImgPlayer.setAttribute("src", imgSrc);
    document.querySelector('.weaponPlayer').appendChild(weaponImgPlayer);
    
}
function imgSelectionPC() {

    var weaponImgPC = document.createElement("img");
    weaponImgPC.setAttribute("src", imgSrcPC);
    document.querySelector('.weaponComputer').appendChild(weaponImgPC);
}

const winnerResults = {
    computer: ["You Lost the game to a computer!", 'red'],
    player: ["You win the game!!!", 'green'],
    tie: ["The game is a tie", 'blue']
}

function checkWinner(){
    if (computerScore === 5 || playerScore === 5){
        if (computerScore === playerScore){
            updateWinner('tie')
        }else{
            let win = `${(computerScore > playerScore) ? 'computer' : 'player'}`;
            updateWinner(win);
        }
    }
}

function updateWinner(winner){
    roundResults.textContent = winnerResults[winner][0];
    roundResults.style.color = winnerResults[winner][1];

    optionBtn.forEach(button => {
        button.removeEventListener('click', getUserChoice);

    });
}

function getUserChoice(e){
    let userSelection = (e.target.id);
    userChoice = e.target.textContent;
    playRound(userSelection, getComputerChoice());
    
}