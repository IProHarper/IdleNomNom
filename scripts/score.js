import { gameState } from './data.js';

export function increaseScore(){
    //Score increase formula
    const value =  gameState.dotValue.times(gameState.dotMulti).times(gameState.nomScoreBoostAmount);
    if (gameState.squares.greaterThan(0)) {
        value = value.times(gameState.squares);
    }
    //Add score and update stats
    gameState.score = gameState.score.plus(value);
    gameState.liftimeScore = gameState.liftimeScore.plus(value);
    gameState.dotsEaten = gameState.dotsEaten.plus(1);
    gameState.nomscendScore = gameState.nomscendScore.plus(value);

    return value;
}

export function eatSquare(){
    gameState.squares = gameState.squares.plus(gameState.squareValue);
    gameState.squareCount = gameState.squareCount.plus(1);
    gameState.lifetimeSquares = gameState.lifetimeSquares.plus(1);
}

export function updateNomScoreBoost(){
    gameState.nomScoreBoostAmount = new Decimal(gameState.lifetimeNomCoins / 100);
    if (gameState.nomScoreBoostAmount.lessThan(1)) {
        gameState.nomScoreBoostAmount = gameState.nomScoreBoostAmount.plus(1);
    }
}

