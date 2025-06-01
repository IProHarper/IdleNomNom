import { gameState } from './data.js';

export function increaseScore(){
    const value =  gameState.dotValue.times(gameState.dotMulti.plus(gameState.nomscendMultiValue));
    gameState.score = gameState.score.plus(value);
    gameState.liftimeScore = gameState.liftimeScore.plus(value);
    gameState.dotsEaten = gameState.dotsEaten.plus(1);
    gameState.nomscendScore = gameState.nomscendScore.plus(value)
}

