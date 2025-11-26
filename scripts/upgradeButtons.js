import { gameState, roboList } from './data.js';
import { upgrades } from './data.js';
import { increaseCost, setDotMaxCount, setDotSpawnCount, setDotSpawnRate, setRoboNoms } from './util.js';
import { setAutoFeed,setDotMulti,setDotValue } from './util.js';




export function upgradeDotValue(){
    let upgrade = upgrades.increaseDotValue;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost) && (upgrade.level < upgrade.maxlevel)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseDotValue.level++;
        //Update dot cost
        upgrades.increaseDotValue.cost = increaseCost(upgrade);
        }
    setDotValue();
}


export function upgradeDotMulti(){    
    let upgrade = upgrades.increaseDotMulti;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost) && (upgrade.level < upgrade.maxlevel)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseDotMulti.level++;
        //Update dot cost
        upgrades.increaseDotMulti.cost = increaseCost(upgrade);
        setDotMulti();
    }
}

export function upgradeDotSpawnRate(){
    const upgrade = upgrades.increaseDotSpawnRate;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseDotSpawnRate.level++;
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
        upgrades.increaseDotSpawnCount.level++;
        //Update cost
        upgrades.increaseDotSpawnCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.dotSpawnCount = gameState.dotSpawnCount + (upgrade.increase);
        setDotSpawnCount();
    }
}

export function upgradeMaxDotCount(){
    const upgrade = upgrades.increaseMaxDotCount;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseMaxDotCount.level++;
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
        upgrades.addRoboNom.level++;
        //Update cost
        upgrades.addRoboNom.cost = increaseCost(upgrade);
        //Upgrade effect
        setRoboNoms();
    }
}


//OLD Upgrades

export function upgradeDotSpeed(){
    let upgrade = upgrades.increaseDotSpeed;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost) && (upgrade.level < upgrade.maxlevel)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update dot Value
        gameState.dotSpeed = gameState.dotSpeed.minus(upgrade.increase);
        //Update level
        upgrades.increaseDotSpeed.level++;
        //Update dot cost
        upgrades.increaseDotSpeed.cost = increaseCost(upgrade);
    }
}
export function upgradeAutoFeedSpeed(){
   let incAFSpeed = upgrades.autoFeed;
    if (gameState.score.greaterThanOrEqualTo(incAFSpeed.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incAFSpeed.cost);
        //Increase level
        upgrades.autoFeed.level++;
        setAutoFeed();
        //Update dot cost
        upgrades.autoFeed.cost = increaseCost(incAFSpeed);
    }
}







