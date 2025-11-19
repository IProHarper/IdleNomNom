import { gameState } from './data.js';
import { floatingTexts } from './display.js';
import { formatNum } from './util.js';

export function increaseScore(){
    //Score increase formula
    const value =  gameState.dotValue.times(gameState.dotMulti).times(gameState.nomScoreBoostAmount);
    //Add score and update stats
    gameState.score = gameState.score.plus(value);
    gameState.liftimeScore = gameState.liftimeScore.plus(value);
    gameState.dotsEaten = gameState.dotsEaten.plus(1);
    gameState.nomscendScore = gameState.nomscendScore.plus(value);

    return value;
}

export function eatSquare(){
    const value = gameState.squareValue.times(gameState.squareMulti)
    gameState.squares = gameState.squares.plus(value);
    gameState.squaresEaten = gameState.squaresEaten.plus(1);
    gameState.lifetimeSquares = gameState.lifetimeSquares.plus(1);
    
    return value
}

export function updateNomScoreBoost(){
    gameState.nomScoreBoostAmount = new Decimal(gameState.lifetimeNomCoins / 100);
    if (gameState.nomScoreBoostAmount.lessThan(1)) {
        gameState.nomScoreBoostAmount = gameState.nomScoreBoostAmount.plus(1);
    }
}

export function showFloatingText(text, x, y, colour) {
    const transR = Math.random() * 720 - 360; // random rotation
    floatingTexts.push({
        text: "+" + formatNum(text),
        x,
        y,
        colour,
        rotation: transR * Math.PI / 180,
        opacity: 1,
        lifetime: 1000, // milliseconds
        createdAt: performance.now()
    });
}
