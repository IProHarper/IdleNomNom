import { gameState } from './data.js';
import { upgrades } from './data.js';
import { createDot } from './consumables.js';
import { increaseCost } from './util.js';


export function setDotValue(){
    gameState.dotValue = gameState.nomscendDotVal.plus(upgrades.increaseDotValue.increase.times(upgrades.increaseDotValue.level));
    $("#upgradeDotValueLvl").text(`Level: ${upgrades.increaseDotValue.level}`);

}

export function setSpeed(){
    //dotSpeed = baseSpeed - (level * increase)
    gameState.dotSpeed = upgrades.increaseDotSpeed.baseSpeed.minus(upgrades.increaseDotSpeed.level * upgrades.increaseDotSpeed.increase);
    $("#upgradeDotSpeedLvl").text(`Level: ${upgrades.increaseDotSpeed.level}`);
}

export function setDotMulti(){
    //dotMulti = 1 + (level * increase)
    gameState.dotMulti = new Decimal(1).plus(upgrades.increaseDotMulti.level*(upgrades.increaseDotMulti.increase));
    $("#upgradeDotMultiLvl").text(`Level: ${upgrades.increaseDotMulti.level}`);
}

export function setAutoFeed(){
    clearInterval(gameState.dotIntervalID);
    upgrades.autoFeed.speed = upgrades.autoFeed.baseSpeed.minus(upgrades.autoFeed.increase*upgrades.autoFeed.level)
    gameState.dotIntervalID = setInterval(createDot, upgrades.autoFeed.speed*1000);
    $("#upgradeAutoFeedSpeedLvl").text(`Level: ${upgrades.autoFeed.level}`);
}





export function upgradeDotValue(){
    let incDotVal = upgrades.increaseDotValue;
    if (gameState.score.greaterThanOrEqualTo(incDotVal.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incDotVal.cost);
        //Update dot Value
        gameState.dotValue = gameState.dotValue.plus(incDotVal.increase);
        //Update level
        upgrades.increaseDotValue.level = upgrades.increaseDotValue.level +1;
        //Update dot cost
        incDotVal.cost = increaseCost(incDotVal.baseCost, incDotVal.upgradeScale, incDotVal.level);
        
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
        //Update level
        upgrades.increaseDotSpeed.level = upgrades.increaseDotSpeed.level + 1;
        //Update dot cost
        incDotSpeed.cost = increaseCost(incDotSpeed.baseCost, incDotSpeed.upgradeScale, incDotSpeed.level);
        
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
        //Update level
        upgrades.increaseDotMulti.level = upgrades.increaseDotMulti.level+1;
        //Update dot cost
        incDotMulti.cost = increaseCost(incDotMulti.baseCost, incDotMulti.upgradeScale, incDotMulti.level);
        $("#upgradeDotMultiLvl").text(`Level: ${incDotMulti.level}`);
    }
}


//Feature Upgrades
export function upgradeAutoFeedSpeed(){
   let incAFSpeed = upgrades.autoFeed;
    if (gameState.score.greaterThanOrEqualTo(incAFSpeed.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incAFSpeed.cost);
        //Increase level
        upgrades.autoFeed.level = upgrades.autoFeed.level + 1;
        setAutoFeed();
        //Update dot cost
        upgrades.autoFeed.cost = increaseCost(incAFSpeed.baseCost, incAFSpeed.upgradeScale, incAFSpeed.level);
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
        //Increase level
        upgrades.increaseNomCoinMulti.level = upgradeData.level + 1;
        //Update upgrade cost
        upgrades.increaseNomCoinMulti.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
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
        //Increase upgrade level
        upgrades.increaseNomDotVal.level = upgradeData.level+1;
        //Increase cost
        upgrades.increaseNomDotVal.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
    }
}

export function increaseDotMultiMax(){
    const upgradeData = upgrades.increaseDotMultiMax;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        upgrades.increaseDotMultiMax.level = upgrades.increaseDotMultiMax.level+1;
        upgrades.increaseDotMultiMax.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
        upgrades.increaseDotMulti.maxlevel = upgrades.increaseDotMulti.maxlevel+1;
    }
}
export function increaseDotValMax(){
    const upgradeData = upgrades.increaseDotValMax;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        upgrades.increaseDotValMax.level = upgrades.increaseDotValMax.level+1;
        upgrades.increaseDotValMax.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
        upgrades.increaseDotValue.maxlevel = upgrades.increaseDotValue.maxlevel+upgradeData.increase.toNumber();
    }
}

export function increaseStartDotSpeedLevel(){
    const upgradeData = upgrades.increaseStartDotSpeedLevel;
    //Purchase upgrade, increase cost and level
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        upgrades.increaseStartDotSpeedLevel.level = upgradeData.level+1;
        upgrades.increaseStartDotSpeedLevel.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
        //Upgrade Effect
        upgrades.increaseDotSpeed.level = upgrades.increaseDotSpeed.level+upgradeData.increase;
        upgrades.increaseDotSpeed.minlevel = upgradeData.level;
        upgrades.increaseDotSpeed.cost = increaseCost(upgrades.increaseDotSpeed.baseCost, upgrades.increaseDotSpeed.upgradeScale, upgrades.increaseDotSpeed.level);
        setSpeed();
    }
}

export function increaseAutoFeedMax(){
    const upgradeData = upgrades.increaseAutoFeedMax;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
    gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
    upgrades.increaseAutoFeedMax.level = upgradeData.level+1;
    upgrades.increaseAutoFeedMax.cost = increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeData.level);
    //Upgrade Effect
    upgrades.autoFeed.baseSpeed = upgrades.autoFeed.baseSpeed.minus(upgradeData.increase);
    setAutoFeed();
    }
}