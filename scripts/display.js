import { gameState, upgrades, gameStages } from "./data.js";
import { createDot } from "./consumables.js";
import { formatNum, increaseCost } from "./util.js";

const scoreDisplay = document.getElementById('score');

export function updateLevels(){

    //Set Upgrade Levels
    $("#upgradeDotValueLvl").text(`Level: ${upgrades.increaseDotValue.level}/${upgrades.increaseDotValue.maxlevel}`);
    $("#upgradeDotSpeedLvl").text(`Level: ${upgrades.increaseDotSpeed.level}/${upgrades.increaseDotSpeed.maxlevel}`);
    $("#upgradeDotMultiLvl").text(`Level: ${upgrades.increaseDotMulti.level}/${upgrades.increaseDotMulti.maxlevel}`);
    $("#upgradeAutoFeedSpeedLvl").text(`Level: ${upgrades.autoFeed.level}/${upgrades.autoFeed.maxlevel}`);
}

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

    updateLevels();

    //Display nomscention specfics buttons and areas if its unlocked.
    if (gameState.nomscentionUnlocked) {
        $("#nomscendUpgradesBttn").show(); 
        $("#nomscensionBttn").show();
        $("#nomCoinDisplay").show();
    }

    //Enable autofeed interval if the upgrade is already purchased.
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
    $("#autofeedSpeedText").text(upgrades.autoFeed.speed.toFixed(2));
    $("#nomscensionCountText").text(formatNum(gameState.nomscensionCount));
    $("#LifetimeNomCoinsText").text(formatNum(gameState.nomCoins));
    $("#nomCoinStatText").text(formatNum(gameState.nomCoins));

    $("#nomCoinsText").text(formatNum(gameState.nomCoins));

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