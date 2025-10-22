import { gameState } from './data.js';
import { upgrades } from './data.js';
import { createDot } from './consumables.js';
import { increaseCost } from './util.js';
import { setAutoFeed,setDotMulti,setDotValue,setSpeed } from './util.js';
import { updateLevels } from './display.js';


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
    updateLevels();
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
    updateLevels();
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
    updateLevels();
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
        // $("#upgradeAutoFeedSpeedLvl").text(`Level: ${incAFSpeed.level}/${incAFSpeed.maxlevel}`);
    }
    updateLevels();
}



