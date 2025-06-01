import { saveGame,checkSaveFile } from './gameFiles.js';
import { gameState, upgrades, shopUpgrades, gameStages } from './data.js'
import { formatNum } from './data.js';
import { buttonCheck } from './buttonHandling.js';
import { unlockNomscend } from './features.js';

function initDisplay(){
    //Set display to only have upgrades at first
    $("#left-container").children().css('display', 'none');
    $("#upgrades-container").css('display', '');
    $("#right-container").children().css('display', 'none');
    $("#stats-container").css('display', '');
    $("#nomscendUpgradesBttn").hide(); 
    $("#nomsecReqText").text(`Lifetime Score Required to Nomscend: ${formatNum(gameState.nomsecScoreReq)}`);
    $("#nomscensionBttn").hide();
    $("#nomCoinDisplay").hide();


    if (gameState.nomscentionUnlocked) {
        $("#nomscendUpgradesBttn").show(); 
        $("#nomscensionBttn").show();
        $("#nomCoinDisplay").show();
        
    }
    $("#upgradeAutoFeedSpeed").parent().css('display', 'none');
}

$(document).ready(function(){
    
    const scoreDisplay = document.getElementById('score');

       

    //Load the gamestate if it exists in local storage
    checkSaveFile();
    initDisplay();



    function updateDisplay() {
        scoreDisplay.textContent = formatNum(gameState.score);
        updateProgressBar();
        buttonCheck();
        updateStats();
        progressGameStage();
    }

    function updateStats(){
        $("#lifetimeScoreText").text(formatNum(gameState.liftimeScore));
        $("#dotBaseValueText").text(formatNum(gameState.dotValue));
        $("#dotSpeedText").text(gameState.dotSpeed);
        $("#dotsEatenText").text(formatNum(gameState.dotsEaten));
        $("#dotMultiText").text(formatNum(gameState.dotMulti));
        $("#autofeedSpeedText").text(upgrades.autoFeed.speed);
        $("#nomscensionCountText").text(formatNum(gameState.nomscensionCount));
        $("#nomCoinsText").text(formatNum(gameState.nomCoins));
        $("#nomCoinStatText").text(formatNum(gameState.nomCoins));

        //Update Nomsension coins
        $("#nomCoinGainsText").text(formatNum(gameState.nomscendScore.divide(100000)));
    }

    function progressGameStage(){
        if (gameStages[gameState.stage].statType == "score"){
            var stat = gameState.liftimeScore;
        } else if (gameStages[gameState.stage].statType == "nomscend"){
            var stat = gameState.nomscensionCount;
        }
        if (stat.greaterThanOrEqualTo(gameStages[gameState.stage].requirement)){
            gameState.stage = gameState.stage+1;
            gameState.nomscentionUnlocked = true;
            unlockNomscend();
        }
    }

    //Upgrade progressBar based on score
    function updateProgressBar() {
        if (gameStages[gameState.stage].statType == "score"){
            var stat = gameState.liftimeScore;
        } else if (gameStages[gameState.stage].statType == "nomscend"){
            var stat = gameState.nomscensionCount;
        }
        let progressBar = document.querySelector('.progress-bar');
        let progressBarText = document.getElementById('progress-text');
        let maxScore = gameStages[gameState.stage].requirement;
        let progress = (stat.divideBy(maxScore).toNumber())*100;

        progressBar.style.width = progress + "%";
        progressBarText.innerHTML = `${gameStages[gameState.stage].progressText} - (${progress.toFixed(2)}%)`;
    }


    setInterval(updateDisplay, 100);
    var saveGameLoop = window.setInterval(function() {
        saveGame();
      }, 30000);


});