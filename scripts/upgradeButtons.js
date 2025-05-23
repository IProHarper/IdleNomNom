import { gameState } from './data.js';
import { upgrades } from './data.js';
import { buttonBought } from './buttonHandling.js';
import { createDot } from './consumables.js';

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
    }
}


export function upgradeDotSpeed(){
    let incDotSpeed = upgrades.increaseDotSpeed;
    if (incDotSpeed.level >= incDotSpeed.maxlevel){
        buttonBought("upgradeDotSpeed");
    }
    if (gameState.score.greaterThanOrEqualTo(incDotSpeed.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incDotSpeed.cost);
        //Update dot Value
        gameState.dotSpeed = gameState.dotSpeed.minus(incDotSpeed.increase);
        //Update dot cost
        incDotSpeed.cost = incDotSpeed.cost.times(incDotSpeed.upgradeScale);
        upgrades.increaseDotSpeed.level = upgrades.increaseDotSpeed.level + 1;
    }
}

export function upgradeAutoFeedSpeed(){
   //To ADD
   let incAFSpeed = upgrades.autoFeed;
    if (incAFSpeed.level >= incAFSpeed.maxlevel){
        //Change the handling here later
        buttonBought("upgradeAutoFeedSpeed");
        
    }
    if (gameState.score.greaterThanOrEqualTo(incAFSpeed.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incAFSpeed.cost);
        //Update dot Value
        upgrades.autoFeed.speed = incAFSpeed.speed.minus(incAFSpeed.increase);
        //Update dot cost
        upgrades.autoFeed.cost = incAFSpeed.cost.times(incAFSpeed.upgradeScale);
        //Increase level
        upgrades.autoFeed.level = upgrades.autoFeed.level + 1;
    }
    clearInterval(gameState.dotIntervalID);
    gameState.dotIntervalID = setInterval(createDot, incAFSpeed.speed*1000);
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
        upgrades.increaseDotMulti.level = upgrades.increaseDotMulti.level+1 ;
    }
}