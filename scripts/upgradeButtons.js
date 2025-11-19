import { gameState, roboList } from './data.js';
import { upgrades } from './data.js';
import { createDot } from './consumables.js';
import { getCanvasCentre, increaseCost, setDotMaxCount, setDotSpawnCount, setDotSpawnRate, setRoboNoms } from './util.js';
import { setAutoFeed,setDotMulti,setDotValue,setSpeed } from './util.js';
import { RoboNom } from './nomnom.js';




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
        incDotVal.cost = increaseCost(incDotVal);
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
        incDotSpeed.cost = increaseCost(incDotSpeed);
    }
}

export function upgradeDotMulti(){    
    let incDotMulti = upgrades.increaseDotMulti;
    if (gameState.score.greaterThanOrEqualTo(incDotMulti.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incDotMulti.cost);
        //Update level
        upgrades.increaseDotMulti.level = upgrades.increaseDotMulti.level+1;
        //Update dot cost
        incDotMulti.cost = increaseCost(incDotMulti);
        setDotMulti();
    }
}

export function upgradeDotSpawnRate(){
    const upgrade = upgrades.increaseDotSpawnRate;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseDotSpawnRate.level = upgrade.level+1;
        //Update cost
        upgrades.increaseDotSpawnRate.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.dotSpawnInterval = gameState.dotSpawnInterval + (upgrade.increase*-1);
        setDotSpawnRate();
    }
}

export function upgradeDotSpawnCount(){
    const upgrade = upgrades.increaseDotSpawnCount;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseDotSpawnCount.level = upgrade.level+1;
        //Update cost
        upgrades.increaseDotSpawnCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.dotSpawnCount = gameState.dotSpawnCount + (upgrade.increase);
        setDotSpawnCount();
    }
}

export function upgradeDotMaxCount(){
    const upgrade = upgrades.increaseMaxDotCount;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseMaxDotCount.level = upgrade.level+1;
        //Update cost
        upgrades.increaseMaxDotCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.dotMaxCount = gameState.dotMaxCount + upgrade.increase;
        setDotMaxCount();
    }
}
export function addRoboNom(){
   const upgrade = upgrades.addRoboNom;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost) && (upgrade.level < upgrade.maxlevel)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.addRoboNom.level = upgrade.level+1;
        //Update cost
        upgrades.addRoboNom.cost = increaseCost(upgrade);
        //Upgrade effect
        setRoboNoms();
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
        upgrades.autoFeed.cost = increaseCost(incAFSpeed);
    }
}





