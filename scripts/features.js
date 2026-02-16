import { dotList, gameState, roboList, shopUpgrades, squareList, upgrades } from './data.js'
import { createDot, spawnSquare, spawnTriangle } from './consumables.js';
import { resetUpgrades } from './gameFiles.js';
import { calcNomGain, setSquareSpawnRate, formatNum, setSquaresALL, setTrianglesALL } from './util.js';
import { updateNomScoreBoost } from './score.js';
import { addNomUpgrade, addUpgrade } from './display.js';
import { progressGameStage } from './main.js';


export function unlockSquare(){
    const upgrade = upgrades.unlockSquares;
    if (!upgrade.bought && gameState.nomCoins.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce coins
        gameState.nomCoins = gameState.nomCoins.minus(upgrade.cost);
        //Update level
        upgrades.unlockSquares.level++;
        upgrades.unlockSquares.bought = true;
    }
    $("#toggleSquareUpgrades").show();
    $("#squareDisplay").show();
    $("#squareStats").show();
    $("#activeSquareDisplay").show();
    //Set all upgrades
    spawnSquare();
    setSquaresALL();

    //Add upgrades to html
    addUpgrade("#squareUpgrades", upgrades.increaseSquareValue);
    addUpgrade("#squareUpgrades", upgrades.increaseSquareMulti);
    addUpgrade("#squareUpgrades", upgrades.increaseSquareSpawnRate);
    addUpgrade("#squareUpgrades", upgrades.increaseSquareSpawnCount);
    addUpgrade("#squareUpgrades", upgrades.increaseMaxSquareCount);
    $("#squareUpgrades").find(".upgrades-grid").append(`<h2>Other</h2>`);
    addUpgrade("#squareUpgrades", upgrades.increaseMaxRoboNoms);
    addUpgrade("#squareUpgrades", upgrades.increaseSquareDotMulti);
    addUpgrade("#squareUpgrades", upgrades.increaseDotValMaxSquare);
    addNomUpgrade("#nomUpgrades", upgrades.keepSquareUpgrades);
    addNomUpgrade("#nomUpgrades", upgrades.unlockTriangles);
}

export function unlockTriangles(){
    const upgrade = upgrades.unlockTriangles;
    if (!upgrade.bought && gameState.nomCoins.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce coins
        gameState.nomCoins = gameState.nomCoins.minus(upgrade.cost);
        //Update level
        upgrades.unlockTriangles.level++;
        upgrades.unlockTriangles.bought = true;
    }
    $("#triangles").show();
    $("#activeTriangleDisplay").show();
    $("#triangleDisplay").show();
    $("#toggleTriangleUpgrades").show();
    $("#triangleStats").show();
    $("#triangleUpgrades").show();
    //Add upgrades to html
    addUpgrade("#triangleUpgrades", upgrades.increaseTriangleValue);
    addUpgrade("#triangleUpgrades", upgrades.increaseTriangleMulti);
    addUpgrade("#triangleUpgrades", upgrades.increaseTriangleSpawnRate);
    addUpgrade("#triangleUpgrades", upgrades.increaseTriangleSpawnCount);
    addUpgrade("#triangleUpgrades", upgrades.increaseMaxTriangleCount);
    $("#triangleUpgrades").find(".upgrades-grid").append(`<h2>Other</h2>`);
    spawnTriangle();
    setTrianglesALL();
}

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
    $("#nomscendBttn").show();
    $("#nomscendUpgradesBttn").show();
    $("#nomscensionBttn").show();
    $("#popUpModal").show();
     $("#toggleNomUpgrades").show();
}

//Nomscend - Reset progress but start with a base 10 multiplier
export function nomscend(){
    $("#popUpModal").hide();
    const gs = gameState;
    const gainedCoins = calcNomGain();
    showPrestigeAnimation({ gain: gainedCoins, subtitle: "Prestige Reward", duration: 2000});
    gameState.nomCoins = gameState.nomCoins.plus(gainedCoins);
    if (gameState.nomCoinBestGain.lessThan(gainedCoins)){
        gameState.nomCoinBestGain = new Decimal(gainedCoins);
    }
    gameState.lifetimeNomCoins = gameState.lifetimeNomCoins.plus(gainedCoins);
    gameState.score = new Decimal(0);
    gameState.nomscensionCount = gs.nomscensionCount.plus(1);
    gameState.nomscendScore = new Decimal(0);
    clearInterval(gameState.dotIntervalID);
    dotList.length = 0;
    squareList.length = 0;
    roboList.length = 0;
    gameState.nomsecScoreReq = gs.nomsecScoreReq.times(11);
    resetUpgrades();
    updateNomScoreBoost();
    progressGameStage();
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


