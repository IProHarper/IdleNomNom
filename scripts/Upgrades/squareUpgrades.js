
export function upgradeSquareValue(){
    const upgrade = upgrades.increaseSquareValue;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update Square Value
        gameState.SquareValue = gameState.SquareValue.plus(upgrade.increase);
        //Update level
        upgrades.increaseSquareValue.level = upgrades.increaseSquareValue.level +1;
        //Update cost
        upgrades.increaseSquareValue.cost = increaseCost(upgrade);
        }
}


export function upgradeSquareSpeed(){
    const upgrade = upgrades.increaseSquareSpeed;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update Square Value
        gameState.SquareValue = gameState.SquareValue.plus(upgrade.increase);
        //Update level
        upgrades.increaseSquareSpeed.level = upgrades.increaseSquareSpeed.level+1;
        //Update cost
        upgrades.increaseSquareSpeed.cost = increaseCost(upgrade);
        }
}

export function upgradeSquareMulti(){    
    const upgrade = upgrades.increaseSquareMulti;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseSquareMulti.level = upgrades.increaseSquareMulti.level+1;
        //Update cost
        upgrade.cost = increaseCost(upgrade);
        setSquareMulti();
    }
}

export function upgradeSquareSpawnRate(){
    const upgrade = upgrades.increaseSquareSpawnRate;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseSquareSpawnRate.level = upgrade.level+1;
        //Update cost
        upgrades.increaseSquareSpawnRate.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.SquareSpawnInterval = gameState.SquareSpawnInterval + (upgrade.increase*-1);
        setSquareSpawnRate();
    }
}

export function upgradeSquareSpawnCount(){
    const upgrade = upgrades.increaseSquareSpawnCount;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseSquareSpawnCount.level = upgrade.level+1;
        //Update cost
        upgrades.increaseSquareSpawnCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.SquareSpawnCount = gameState.SquareSpawnCount + (upgrade.increase);
        setSquareSpawnCount();
    }
}

export function upgradeSquareMaxCount(){
    const upgrade = upgrades.increaseMaxSquareCount;
    if (gameState.score.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.score = gameState.score.minus(upgrade.cost);
        //Update level
        upgrades.increaseMaxSquareCount.level = upgrade.level+1;
        //Update cost
        upgrades.increaseMaxSquareCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.SquareMaxCount = gameState.SquareMaxCount + upgrade.increase;
        setSquareMaxCount();
    }
}