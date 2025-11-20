import { upgrades, gameState } from "../data.js";
import { increaseCost, setSquareSpawnRate } from "../util.js";

export function upgradeSquareValue(){
    const upgrade = upgrades.increaseSquareValue;
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update Square Value
        gameState.squareValue = gameState.squareValue.plus(upgrade.increase);
        //Update level
        upgrades.increaseSquareValue.level = upgrades.increaseSquareValue.level +1;
        //Update cost
        upgrades.increaseSquareValue.cost = increaseCost(upgrade);
        }
    setSquareValue();
}


export function upgradeSquareSpeed(){
    const upgrade = upgrades.increaseSquareSpeed;
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update Square Value
        gameState.squareValue = gameState.squareValue.plus(upgrade.increase);
        //Update level
        upgrades.increaseSquareSpeed.level = upgrades.increaseSquareSpeed.level+1;
        //Update cost
        upgrades.increaseSquareSpeed.cost = increaseCost(upgrade);
        }
}

export function upgradeSquareMulti(){    
    const upgrade = upgrades.increaseSquareMulti;
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update level
        upgrades.increaseSquareMulti.level = upgrades.increaseSquareMulti.level+1;
        //Update cost
        upgrade.cost = increaseCost(upgrade);
        setSquareMulti();
    }
}

export function upgradeSquareSpawnRate(){
    const upgrade = upgrades.increaseSquareSpawnRate;
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update level
        upgrades.increaseSquareSpawnRate.level = upgrade.level+1;
        //Update cost
        upgrades.increaseSquareSpawnRate.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.squareSpawnInterval = gameState.squareSpawnInterval + (upgrade.increase*-1);
        setSquareSpawnRate();
    }
}

export function upgradeSquareSpawnCount(){
    const upgrade = upgrades.increaseSquareSpawnCount;
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update level
        upgrades.increaseSquareSpawnCount.level = upgrade.level+1;
        //Update cost
        upgrades.increaseSquareSpawnCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.SquareSpawnCount = gameState.SquareSpawnCount + (upgrade.increase);
        setSquareSpawnCount();
    }
}

export function upgradeMaxSquareCount(){
    const upgrade = upgrades.increaseMaxSquareCount;
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update level
        upgrades.increaseMaxSquareCount.level = upgrade.level+1;
        //Update cost
        upgrades.increaseMaxSquareCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.squareMaxCount = gameState.squareMaxCount + upgrade.increase;
        setSquareMaxCount();
    }
}


export function setSquareValue(){
    gameState.squareValue = upgrades.increaseSquareValue.increase.times(upgrades.increaseSquareValue.level);
}  

export function setSquareMulti(){
    //squareMulti = 1 + (level * increase)
    gameState.squareMulti = new Decimal((upgrades.increaseSquareMulti.level-1)*(upgrades.increaseSquareMulti.increase));
    if (gameState.squareMulti == 0){ gameState.squareMulti = new Decimal(1);}
}

export function setSquareSpawnCount(){
    //squareSpawnCount = (level * increase)
    gameState.squareSpawnCount = upgrades.increaseSquareSpawnCount.level * upgrades.increaseSquareSpawnCount.increase;
    if (gameState.squareSpawnCount <= 0){
        gameState.squareSpawnCount = 1;
    }
}

export function setSquareMaxCount(){
    //squareMaxCount = (level * increase) + 5(Base amount) - level 1
    gameState.squareMaxCount = upgrades.increaseMaxSquareCount.level * upgrades.increaseMaxSquareCount.increase + (5 - upgrades.increaseMaxSquareCount.increase);
}