import { gameState, upgrades, gameStages } from "./data.js";
import { createDot } from "./consumables.js";
import { formatNum } from "./util.js";

const scoreDisplay = document.getElementById('score');


export function initDisplay(){
    //Set display to only have upgrades at first
    $("#left-container").children().hide();
    $("#upgrades-container").show();
    $("#right-container").children().hide();
    $("#stats-container").show();
    $("#nomscendUpgradesBttn").hide(); 
    $("#nomCoinGainText").text(formatNum(gameState.nomscendScore.divide(100000).times(gameState.nomCoinMulti)));
    $("#nomscensionBttn").hide();
    $("#nomCoinDisplay").hide();
    $("#upgradeAutoFeedSpeed").parent().hide();

    //Set Upgrade Levels
    $("#upgradeDotValueLvl").text(`Level: ${upgrades.increaseDotValue.level}`);
    $("#upgradeDotSpeedLvl").text(`Level: ${upgrades.increaseDotSpeed.level}`);
    $("#upgradeDotMultiLvl").text(`Level: ${upgrades.increaseDotMulti.level}`);
    $("#upgradeAutoFeedSpeedLvl").text(`Level: ${upgrades.autoFeed.level}`);


    if (gameState.nomscentionUnlocked) {
        $("#nomscendUpgradesBttn").show(); 
        $("#nomscensionBttn").show();
        $("#nomCoinDisplay").show();
    }
    if (upgrades.autoFeed.enabled){
        $("#upgradeAutoFeedSpeed").parent().show();
        gameState.dotIntervalID = setInterval(createDot, upgrades.autoFeed.speed*1000);
    }
}

export function updateStats(){
    scoreDisplay.textContent = formatNum(gameState.score);
    $("#lifetimeScoreText").text(formatNum(gameState.liftimeScore));
    $("#dotBaseValueText").text(formatNum(gameState.dotValue));
    $("#dotSpeedText").text(gameState.dotSpeed.toFixed(2));
    $("#dotsEatenText").text(formatNum(gameState.dotsEaten));
    $("#dotMultiText").text(formatNum(gameState.dotMulti));
    $("#autofeedSpeedText").text(upgrades.autoFeed.speed);
    $("#nomscensionCountText").text(formatNum(gameState.nomscensionCount));
    $("#nomCoinsText").text(formatNum(gameState.nomCoins));
    $("#nomCoinStatText").text(formatNum(gameState.nomCoins));

    //Update Nomsension coins
    //Stats version
    $("#nomCoinGainText").text(formatNum(gameState.nomscendScore.divide(100000).times(gameState.nomCoinMulti)));
    //Modal version
    $("#nomCoinGainsText").text(formatNum(gameState.nomscendScore.divide(100000).times(gameState.nomCoinMulti)));
}


    //Upgrade progressBar based on score
export function updateProgressBar() {
    if (gameStages[gameState.stage].statType == "score"){
        var stat = gameState.liftimeScore;
    } else if (gameStages[gameState.stage].statType == "nomscend"){
        var stat = gameState.nomscensionCount;
    } else if (gameStages[gameState.stage].statType == "cap"){
        var stat = gameState.liftimeScore;
    }
    let progressBar = document.querySelector('.progress-bar');
    let progressBarText = document.getElementById('progress-text');
    let maxScore = gameStages[gameState.stage].requirement;
    let progress = (stat.divideBy(maxScore).toNumber())*100;

    progressBar.style.width = progress + "%";
    progressBarText.innerHTML = `${gameStages[gameState.stage].progressText} - (${progress.toFixed(2)}%)`;
}