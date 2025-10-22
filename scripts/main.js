import { saveGame,checkSaveFile } from './gameFiles.js';
import { gameState, upgrades, shopUpgrades, gameStages } from './data.js'
import { formatNum } from './util.js';
import { buttonCheck } from './buttonHandling.js';
import { unlockNomscend } from './features.js';
import { initDisplay, updateStats, updateProgressBar } from './display.js';


$(document).ready(function(){
    
    

    //Load the gamestate if it exists in local storage
    checkSaveFile();
    initDisplay();
    

    function updateDisplay(){
        updateProgressBar();
        buttonCheck();
        updateStats();
        progressGameStage();
    }

    function progressGameStage(){
        if (gameStages[gameState.stage].statType == "score"){
            var stat = gameState.liftimeScore;
        } else if (gameStages[gameState.stage].statType == "nomscend"){
            var stat = gameState.nomscensionCount;
        } else if (gameStages[gameState.stage].statType == "cap"){
            var stat = gameState.liftimeScore;
        }
        if (stat.greaterThanOrEqualTo(gameStages[gameState.stage].requirement)){
            gameState.stage = gameState.stage+1;
            gameState.nomscentionUnlocked = true;
            unlockNomscend();
        }
    }

    setInterval(updateDisplay, 100);
    var saveGameLoop = window.setInterval(function() {
        saveGame();
      }, 30000);


});