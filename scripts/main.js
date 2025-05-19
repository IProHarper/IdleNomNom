import { saveGame } from './gameFiles.js';
import { createDot } from './consumables.js';
import { gameState } from './data.js'
import { buttonCheck } from './buttonHandling.js';

$(document).ready(function(){

const gameContainer = document.querySelector('.nomnom-container');
const scoreDisplay = document.getElementById('score');
const statDisplayValue = document.getElementById('displayValue');

const stageData = gameState.gameStage.data
const state = gameState.gameStage.stage

$("#feedNomNom").click(createDot);

function updateDisplay() {
    scoreDisplay.textContent = gameState.score.round();
    updateProgressBar();
    buttonCheck();
    updateStats();
}

function updateStats(){
    statDisplayValue.textContent = `Value: ${gameState.dotValue.round()}`;
}

//Upgrade progressBar based on score
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const progressBarText = document.getElementById('progress-text');
    const maxScore = stageData[state].requiredScore;
    let progress = (gameState.liftimeScore / maxScore); // Convert score to percentage
    progressBar.style.width = progress + "%";
    const text = stageData[state].progressText;
    progressBarText.innerHTML = `${text} - ${gameState.liftimeScore}/${maxScore.toLocaleString()} (${(progress*100).toFixed(2)}%)`;
}


setInterval(updateDisplay, 100)


});