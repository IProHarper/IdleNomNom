import { gameState } from './data.js';
import { upgrades } from './data.js';

export function upgradeDotValue(){
    let incDotVal = upgrades.increaseDotValue;
    if (gameState.score.greaterThanOrEqualTo(incDotVal.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(incDotVal.cost);
        //Update dot Value
        gameState.dotValue = gameState.dotValue.plus(incDotVal.increase);
        //Update dot cost
        incDotVal.cost = incDotVal.cost.times(incDotVal.upgradeScale);
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
    }
}