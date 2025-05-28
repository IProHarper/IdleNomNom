import { saveGame,checkSaveFile } from './gameFiles.js';
import { createDot } from './consumables.js';
import { gameState, upgrades } from './data.js'
import { buttonCheck } from './buttonHandling.js';



$(document).ready(function(){

    //Load the gamestate if it exists in local storage
    checkSaveFile();

    const gameContainer = document.querySelector('.nomnom-container');
    const scoreDisplay = document.getElementById('score');
    const statDisplayValue = document.getElementById('displayValue');

    const stageData = gameState.gameStage.data
    const state = gameState.gameStage.stage

    //Set display to only have upgrades at first
    $("#left-container").children().css('display', 'none');
    $("#upgrades-container").css('display', '');
    $("#feedNomNom").click(createDot);



    function updateDisplay() {
        scoreDisplay.textContent = gameState.score.toFixed(0);
        updateProgressBar();
        buttonCheck();
        //updateStats();
    }

    function updateStats(){
        statDisplayValue.textContent = `Value: ${gameState.dotValue.round()}`;
    }

    //Upgrade progressBar based on score
    function updateProgressBar() {
        let progressBar = document.querySelector('.progress-bar');
        let progressBarText = document.getElementById('progress-text');
        let maxScore = stageData[state].requiredScore;
        let progress = (gameState.liftimeScore / maxScore); // Convert score to percentage
        progressBar.style.width = progress + "%";
        let text = stageData[state].progressText;
        progressBarText.innerHTML = `${text} - ${gameState.liftimeScore}/${maxScore.toLocaleString()} (${(progress).toFixed(2)}%)`;
    }


    setInterval(updateDisplay, 100);
    var saveGameLoop = window.setInterval(function() {
        saveGame();
      }, 30000);


});