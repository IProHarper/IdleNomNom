import { gameState } from './data.js';
import { upgrades } from './data.js';
import { buttonBought } from './buttonHandling.js';
import { createDot } from './consumables.js';
import { increaseCost } from './util.js';




export function upgradeDotValue(){
    let incDotVal = upgrades.increaseDotValue;
    if (gameState.score.greaterThanOrEqualTo(incDotVal.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incDotVal.cost);
        //Update dot Value
        gameState.dotValue = gameState.dotValue.plus(incDotVal.increase);
        //Update dot cost
        incDotVal.cost = incDotVal.cost.times(incDotVal.upgradeScale);
        upgrades.increaseDotValue.level = upgrades.increaseDotValue.level +1;
        $("#upgradeDotValueLvl").text(`Level: ${incDotVal.level}`);
    }
}


export function upgradeDotSpeed(){
    let incDotSpeed = upgrades.increaseDotSpeed;
    if (gameState.score.greaterThanOrEqualTo(incDotSpeed.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incDotSpeed.cost);
        //Update dot Value
        gameState.dotSpeed = gameState.dotSpeed.minus(incDotSpeed.increase);
        //Update dot cost
        incDotSpeed.cost = incDotSpeed.cost.times(incDotSpeed.upgradeScale);
        upgrades.increaseDotSpeed.level = upgrades.increaseDotSpeed.level + 1;
        $("#upgradeDotSpeedLvl").text(`Level: ${incDotSpeed.level}`);
    }
}

export function upgradeDotMulti(){    
    let incDotMulti = upgrades.increaseDotMulti;
    if (gameState.score.greaterThanOrEqualTo(incDotMulti.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incDotMulti.cost);
        //Update dot Value
        gameState.dotMulti = gameState.dotMulti.times(incDotMulti.increase);
        //Update dot cost
        incDotMulti.cost = incDotMulti.cost.times(incDotMulti.upgradeScale);
        //Increase level
        upgrades.increaseDotMulti.level = upgrades.increaseDotMulti.level+1;
        $("#upgradeDotMultiLvl").text(`Level: ${incDotMulti.level}`);
    }
}


//Feature Upgrades
export function upgradeAutoFeedSpeed(){
   let incAFSpeed = upgrades.autoFeed;
    if (gameState.score.greaterThanOrEqualTo(incAFSpeed.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incAFSpeed.cost);
        //Update dot Value
        upgrades.autoFeed.speed = incAFSpeed.speed.minus(incAFSpeed.increase);
        //Update dot cost
        upgrades.autoFeed.cost = incAFSpeed.cost.times(incAFSpeed.upgradeScale);
        //Increase level
        upgrades.autoFeed.level = upgrades.autoFeed.level + 1;
        clearInterval(gameState.dotIntervalID);
        gameState.dotIntervalID = setInterval(createDot, incAFSpeed.speed*1000);
        $("#upgradeAutoFeedSpeedLvl").text(`Level: ${incAFSpeed.level}`);
    }
}


//Misc Upgrades
export function increaseNomCoinMulti(){
   let upgradeData = upgrades.increaseNomCoinMulti;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        //Purchase upgrade
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        //Update effect
        gameState.nomCoinMulti = gameState.nomCoinMulti.plus(upgradeData.increase);
        //Update upgrade cost
        upgrades.increaseNomCoinMulti.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
        //Increase level
        upgrades.increaseNomCoinMulti.level = upgradeData.level + 1;
    }
}


//NOM Upgrades


export function increaseNomDotMulti(){
    const upgradeData = upgrades.increaseNomDotMulti;
    // if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
    //     //Purchase upgrade
    //     gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
    //     //Upgrade effect
    //         gameState.dotMulti = gameState.dotMulti.plus(gameState.nomscendDotVal);
    //     gameState.nomscendDotVal = gameState.nomscendDotVal.plus(upgradeData.increase);
    //     gameState.dotMulti = gameState.dotMulti.plus(gameState.nomscendDotVal);
    //     //Increase cost
    //     upgrades.increaseNomDotMulti.cost = new Decimal(upgradeData.baseCost.times(Math.pow(upgradeData.upgradeScale, upgradeData.level)).toFixed(2));
    //     //Increase upgrade level
    //     upgrades.increaseNomDotMulti.level = upgradeData.level+1;
    // }
}
export function increaseNomDotVal(){
    const upgradeData = upgrades.increaseNomDotVal;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        //Purchase upgrade
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        //Upgrade effect
        gameState.dotValue = gameState.dotValue.minus(gameState.nomscendDotVal);
        gameState.nomscendDotVal = gameState.nomscendDotVal.plus(upgradeData.increase);
        gameState.dotValue = gameState.dotValue.plus(gameState.nomscendDotVal);
        //Increase cost
        upgrades.increaseNomDotVal.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
        //Increase upgrade level
        upgrades.increaseNomDotVal.level = upgradeData.level+1;
    }
}

export function increaseDotMultiMax(){
    const upgradeData = upgrades.increaseDotMultiMax;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        upgrades.increaseDotMultiMax.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
        upgrades.increaseDotMultiMax.level = upgrades.increaseDotMultiMax.level+1;
        upgrades.increaseDotMulti.maxlevel = upgrades.increaseDotMulti.maxlevel+1;
    }
}
export function increaseDotValMax(){
    const upgradeData = upgrades.increaseDotValMax;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        upgrades.increaseDotValMax.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
        upgrades.increaseDotValMax.level = upgrades.increaseDotValMax.level+1;
        upgrades.increaseDotValue.maxlevel = upgrades.increaseDotValue.maxlevel+upgradeData.increase.toNumber();
    }
}

export function increaseStartDotSpeedLevel(){
    const upgradeData = upgrades.increaseStartDotSpeedLevel;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        upgrades.increaseStartDotSpeedLevel.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
        upgrades.increaseStartDotSpeedLevel.level = upgradeData.level+1;
        //Upgrade Effect
        upgrades.increaseStartDotSpeedLevel.level = upgrades.increaseStartDotSpeedLevel.level+upgradeData.increase;
        upgrade
    }
}