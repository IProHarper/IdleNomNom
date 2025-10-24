import { updateLevels } from "../display.js";
import { increaseCost, setAutoFeed, setSpeed, setDotMulti } from "../util.js";
import { upgrades, gameState, shopUpgrades } from "../data.js";

//NOM Upgrades

export function increaseNomCoinMulti(){
   let upgradeData = upgrades.increaseNomCoinMulti;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        //Purchase upgrade
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        //Update effect
        gameState.nomCoinMulti = upgradeData.increase*upgradeData.level;
        //Increase level
        upgrades.increaseNomCoinMulti.level = upgradeData.level + 1;
        //Update upgrade cost
        upgrades.increaseNomCoinMulti.cost = increaseCost(upgradeData);
    }
    updateLevels();
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
        upgrades.increaseNomDotVal.cost = increaseCost(upgradeData);
    }
    updateLevels();
}

export function increaseDotMultiMax(){
    const upgradeData = upgrades.increaseDotMultiMax;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        //Effect
        upgrades.increaseDotMulti.maxlevel = (upgradeData.level*upgradeData.increase)+5; //5 = base max level
        upgrades.increaseDotMultiMax.level = upgrades.increaseDotMultiMax.level+1;
        upgrades.increaseDotMultiMax.cost = increaseCost(upgradeData);
    }
    updateLevels();

}
export function increaseDotValMax(){
    const upgradeData = upgrades.increaseDotValMax;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        //Effect
        upgrades.increaseDotValue.maxlevel = ((upgradeData.level)*upgradeData.increase)+100;//100 = base max level
        upgrades.increaseDotValMax.level = upgrades.increaseDotValMax.level+1;
        upgrades.increaseDotValMax.cost = increaseCost(upgradeData);
    }
    updateLevels();
}

export function increaseStartDotSpeedLevel(){
    const upgradeData = upgrades.increaseStartDotSpeedLevel;
    //Purchase upgrade, increase cost and level
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        upgrades.increaseStartDotSpeedLevel.level = upgradeData.level+1;
        upgrades.increaseStartDotSpeedLevel.cost = increaseCost(upgradeData);
        //Upgrade Effect
        upgrades.increaseDotSpeed.minlevel = upgradeData.level;
        if (upgrades.increaseDotSpeed.level < upgrades.increaseDotSpeed.minlevel){
            upgrades.increaseDotSpeed.level = upgrades.increaseDotSpeed.minlevel;
            upgrades.increaseDotSpeed.cost = increaseCost(upgrades.increaseDotSpeed);
        }
        setSpeed();
    }
    updateLevels();
}

export function increaseStartDotMultiLevel(){
    const upgradeData = upgrades.increaseStartDotMultiLevel;
    //Purchase upgrade, increase cost and level
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
        gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
        upgrades.increaseStartDotMultiLevel.level = upgradeData.level+1;
        upgrades.increaseStartDotMultiLevel.cost = increaseCost(upgradeData);
        //Upgrade Effect
        upgrades.increaseDotMulti.minlevel = upgradeData.level;
        if (upgrades.increaseDotMulti.level < upgrades.increaseDotMulti.minlevel){
            upgrades.increaseDotMulti.level = upgrades.increaseDotMulti.minlevel;
            upgrades.increaseDotMulti.cost = increaseCost(upgrades.increaseDotMulti);
        }
        setDotMulti();
    }
    updateLevels();
}



export function increaseAutoFeedMax(){
    const upgradeData = upgrades.increaseAutoFeedMax;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
    gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
    upgrades.increaseAutoFeedMax.level = upgradeData.level+1;
    upgrades.increaseAutoFeedMax.cost = increaseCost(upgradeData);
    //Upgrade Effect
    upgrades.autoFeed.baseSpeed = upgrades.autoFeed.baseSpeed.minus(upgradeData.increase);
    setAutoFeed();
    }
    updateLevels();
}

export function increaseDotSpeedBase(){
    const upgradeData = upgrades.increaseDotSpeedBase;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
    gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
    upgrades.increaseDotSpeedBase.level = upgradeData.level+1;
    upgrades.increaseDotSpeedBase.cost = increaseCost(upgradeData);
    //Upgrade Effect
    upgrades.increaseDotSpeed.baseSpeed = upgrades.increaseDotSpeed.baseSpeed.minus(upgradeData.increase);
    setSpeed();
    }
    updateLevels();
}

export function keepAutofeed(){
    const upgradeData = upgrades.keepAutoFeed;
    if (gameState.nomCoins.greaterThanOrEqualTo(upgradeData.cost)){
    gameState.nomCoins = gameState.nomCoins.minus(upgradeData.cost);
    upgradeData.level = upgradeData.level+1;
    upgradeData.bought = true;
    //Upgrade Effect
    upgrades.autoFeed.resetTier = 1;
    shopUpgrades.unlockAutoFeed.resetTier = 1;
    }
    updateLevels();
}

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