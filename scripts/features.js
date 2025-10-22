import { gameState, shopUpgrades, upgrades } from './data.js'
import { createDot } from './consumables.js';
import { resetUpgrades } from './gameFiles.js';


//Enable the Auto feed Button
export function enableAutofeed(){
    const autoF = shopUpgrades.unlockAutoFeed;
    //Check if upgrade can be bought
    if (gameState.score.greaterThanOrEqualTo(autoF.cost)){
        //Reduce score based on cost
        gameState.score = gameState.score.minus(autoF.cost);
        upgrades.autoFeed.enabled = true;
        shopUpgrades.unlockAutoFeed.bought = true;
        gameState.dotIntervalID = setInterval(createDot, upgrades.autoFeed.speed*1000); 
        $("#upgradeAutoFeedSpeed").parent().css("display", "");
    }
}

export function unlockNomscend(){
    // $("#nomsecReqText").text(`Lifetime Score Required to Nomscend: ${formatNum(gameState.nomsecScoreReq)}`);
    $("#nomscendBttn").show();
    $("#nomscendUpgradesBttn").show();
    $("#nomscensionBttn").show();
    $("#popUpModal").show();

}

//Nomscend - Reset progress but start with a base 10 multiplier
export function nomscend(){
    //Pop up disclaimer and 
    $("#popUpModal").hide();
    // $("#nomsecReqText").text(formatNum(gameState.nomsecScoreReq));
    const gs = gameState;
    gameState.nomCoins = gameState.nomCoins.plus(gs.nomscendScore.divide(100000)).times(gs.nomCoinMulti);
    if (gameState.nomCoinBestGain.lessThan((gs.nomscendScore.divide(100000)).times(gs.nomCoinMulti))){
        gameState.nomCoinBestGain = gs.nomscendScore.divide(100000).times(gs.nomCoinMulti);
    }
    gameState.lifetimeNomCoins.plus(gs.nomscendScore.divide(100000).times(gs.nomCoinMulti));
    gameState.score = new Decimal(0);
    gameState.nomscensionCount = gs.nomscensionCount.plus(1);
    gameState.nomscendScore = new Decimal(0);
    clearInterval(gameState.dotIntervalID);
    $('.dot').remove();
    gameState.nomsecScoreReq = gs.nomsecScoreReq.times(11);
    if (upgrades.autoFeed.resetTier == 0){
            $("#upgradeAutoFeedSpeed").parent().hide();
    }
    resetUpgrades();
}

export function createKids(){
    const gameContainer = document.querySelector('.nomnom-container');

    //Make BLUE Child
    const blueKid = document.createElement('div');
    blueKid.classList.add('nomnomjr');
    gameContainer.appendChild(blueKid);
    blueKid.innerHTML = `
     <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="blue"/>
            <polygon points="50,50 100,0 100,100" fill="black">
                <animate attributeName="points" dur="0.25s" repeatCount="indefinite"
                    values="50,50 100,0 100,100;
                            50,50 100,45 100,55;
                            50,50 100,0 100,100"/>
            </polygon>
        </svg>
    `;
    blueKid.style.left = gameContainer.clientWidth/2 - (blueKid.clientWidth*2.5) + "px";
    blueKid.style.width = "32px";
    blueKid.style.height = "32px";

    //Make Yellow Child
    const yellowKid = document.createElement('div');
    yellowKid.classList.add('nomnomjr');
    gameContainer.appendChild(yellowKid);
    yellowKid.innerHTML = `
     <svg viewBox="0 0 100 100">
            <circle id=childYellow cx="50" cy="50" r="50" fill="yellow"/>
            <polygon points="50,50 100,0 100,100" fill="black">
                <animate attributeName="points" dur="0.25s" repeatCount="indefinite"
                    values="50,50 100,0 100,100;
                            50,50 100,45 100,55;
                            50,50 100,0 100,100"/>
            </polygon>
        </svg>
    `;
    yellowKid.style.left = gameContainer.clientWidth/2 - (yellowKid.clientWidth*4.25) + "px";
    
    //Make Red Child
    const redKid = document.createElement('div');
    redKid.classList.add('nomnomjr');
    gameContainer.appendChild(redKid);
    redKid.innerHTML = `
     <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="red"/>
            <polygon points="50,50 100,0 100,100" fill="black">
                <animate attributeName="points" dur="0.25s" repeatCount="indefinite"
                    values="50,50 100,0 100,100;
                            50,50 100,45 100,55;
                            50,50 100,0 100,100"/>
            </polygon>
        </svg>
    `;
    redKid.style.left = gameContainer.clientWidth/2 - (redKid.clientWidth*6.25) + "px";
}


