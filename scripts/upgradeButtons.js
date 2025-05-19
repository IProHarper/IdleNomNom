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