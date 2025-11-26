import { upgrades, gameState } from "../data.js";
import { increaseCost, setDotValue, setSquareSpawnRate } from "../util.js";

export function upgradeSquareValue(){
    const upgrade = upgrades.increaseSquareValue;
    if (upgrade.level >= upgrade.maxlevel){ return;}
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
    if (upgrade.level >= upgrade.maxlevel){ return;}
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
    if (upgrade.level >= upgrade.maxlevel){ return;}
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
    if (upgrade.level >= upgrade.maxlevel){ return;}
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
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update level
        upgrades.increaseSquareSpawnCount.level = upgrade.level+1;
        //Update cost
        upgrades.increaseSquareSpawnCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.squareSpawnCount = gameState.squareSpawnCount + (upgrade.increase);
        setSquareSpawnCount();
    }
}

export function upgradeMaxSquareCount(){
    const upgrade = upgrades.increaseMaxSquareCount;
    if (upgrade.level >= upgrade.maxlevel){ return;}
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

export function upgradeMaxRoboNoms(){
    const upgrade = upgrades.increaseMaxRoboNoms;
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update level
        upgrades.increaseMaxRoboNoms.level = upgrade.level+1;
        //Update cost
        upgrades.increaseMaxRoboNoms.cost = increaseCost(upgrade);
        //Upgrade effect
        setRoboNomMaxLevel();
    }
}

export function upgradeSquareDotMulti(){
    const upgrade = upgrades.increaseSquareDotMulti;
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update level
        upgrades.increaseSquareDotMulti.level++;
        //Update cost
        upgrades.increaseSquareDotMulti.cost = increaseCost(upgrade);
        //Upgrade effect
    }
    setSquareDotMulti();
    setDotValue();
}

export function upgradeDotValMaxSquare(){
    const upgrade = upgrades.increaseDotValMaxSquare;
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.squares.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.squares = gameState.squares.minus(upgrade.cost);
        //Update level
        upgrades.increaseDotValMaxSquare.level = upgrade.level+1;
        //Update cost
        upgrades.increaseDotValMaxSquare.cost = increaseCost(upgrade);
        //Upgrade effect
        setDotValueMaxLvl();
    }
}

export function keepSquareUpgradesOnNom(){
    const upgrade = upgrades.keepSquareUpgrades;
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.nomCoins.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.nomCoins = gameState.nomCoins.minus(upgrade.cost);
        //Update level
        upgrades.keepSquareUpgrades.level = upgrade.level+1;
        upgrades.keepSquareUpgrades.bought = true;
        //Upgrade effect
        setSquareResetTier();
    }
}

export function setDotValueMaxLvl(){
    const nomUpgrade = upgrades.increaseDotValMax;
    const squareUpgrade = upgrades.increaseDotValMaxSquare;
    upgrades.increaseDotValue.maxlevel = 100+(nomUpgrade.level * nomUpgrade.increase)+(squareUpgrade.level*squareUpgrade.increase);
}

export function setSquareDotMulti(){
    const upgrade = upgrades.increaseSquareDotMulti
    const boost = new Decimal(upgrade.level).times(upgrade.increase);
    gameState.squareScoreBoost = new Decimal(boost);
    if (gameState.squareScoreBoost.lessThanOrEqualTo(1)){
        gameState.squareScoreBoost = new Decimal(1);
    }
}



export function setSquareResetTier(){
    if (upgrades.keepSquareUpgrades.bought){
        upgrades.increaseSquareValue.resetTier = 1;
        upgrades.increaseMaxSquareCount.resetTier = 1;
        upgrades.increaseSquareSpawnCount.resetTier = 1;
        upgrades.increaseSquareSpawnRate.resetTier = 1;
        upgrades.increaseSquareMulti.resetTier = 1;
        upgrades.increaseMaxRoboNoms.resetTier = 1;
        upgrades.increaseSquareDotMulti.resetTier = 1;
        upgrades.increaseDotValMaxSquare.resetTier = 1;
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

export function setRoboNomMaxLevel(){
    //RoboNom Base max level (3) + upgrade level * increase
    upgrades.addRoboNom.maxlevel = 3 + (upgrades.increaseMaxRoboNoms.level * upgrades.increaseMaxRoboNoms.increase);
}