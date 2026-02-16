import { spawnTriangle } from "../consumables.js";
import { upgrades, gameState } from "../data.js";
import { increaseCost } from "../util.js";



export function upgradeTriangleValue(){
    const upgrade = upgrades.increaseTriangleValue;
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.triangles.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.triangles = gameState.triangles.minus(upgrade.cost);
        //Update Triangle Value
        gameState.triangleValue = gameState.triangleValue.plus(upgrade.increase);
        //Update level
        upgrades.increaseTriangleValue.level = upgrades.increaseTriangleValue.level +1;
        //Update cost
        upgrades.increaseTriangleValue.cost = increaseCost(upgrade);
        }
    setTriangleValue();
}

export function upgradeTriangleMulti(){    
    const upgrade = upgrades.increaseTriangleMulti;
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.triangles.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.triangles = gameState.triangles.minus(upgrade.cost);
        //Update level
        upgrades.increaseTriangleMulti.level = upgrades.increaseTriangleMulti.level+1;
        //Update cost
        upgrade.cost = increaseCost(upgrade);
        setTriangleMulti();
    }
}

export function upgradeTriangleSpawnRate(){
    const upgrade = upgrades.increaseTriangleSpawnRate;
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.triangles.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.triangles = gameState.triangles.minus(upgrade.cost);
        //Update level
        upgrades.increaseTriangleSpawnRate.level = upgrade.level+1;
        //Update cost
        upgrades.increaseTriangleSpawnRate.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.triangleSpawnInterval = gameState.triangleSpawnInterval + (upgrade.increase*-1);
        setTriangleSpawnRate();
    }
}

export function upgradeTriangleSpawnCount(){
    const upgrade = upgrades.increaseTriangleSpawnCount;
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.triangles.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.triangles = gameState.triangles.minus(upgrade.cost);
        //Update level
        upgrades.increaseTriangleSpawnCount.level = upgrade.level+1;
        //Update cost
        upgrades.increaseTriangleSpawnCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.triangleSpawnCount = gameState.triangleSpawnCount + (upgrade.increase);
        setTriangleSpawnCount();
    }
}

export function upgradeMaxTriangleCount(){
    const upgrade = upgrades.increaseMaxTriangleCount;
    if (upgrade.level >= upgrade.maxlevel){ return;}
    if (gameState.triangles.greaterThanOrEqualTo(upgrade.cost)){
        //Reduce score
        gameState.triangles = gameState.triangles.minus(upgrade.cost);
        //Update level
        upgrades.increaseMaxTriangleCount.level = upgrade.level+1;
        //Update cost
        upgrades.increaseMaxTriangleCount.cost = increaseCost(upgrade);
        //Upgrade effect
        gameState.triangleMaxCount = gameState.triangleMaxCount + upgrade.increase;
        setTriangleMaxCount();
    }
}



export function setTriangleValue(){
    gameState.triangleValue = upgrades.increaseTriangleValue.increase.times(upgrades.increaseTriangleValue.level);
}  

export function setTriangleMulti(){
    //triangleMulti = 1 + (level * increase)
    gameState.triangleMulti = new Decimal((upgrades.increaseTriangleMulti.level-1)*(upgrades.increaseTriangleMulti.increase));
    if (gameState.triangleMulti == 0){ gameState.triangleMulti = new Decimal(1);}
}
export function setTriangleSpawnRate(){
  gameState.triangleSpawnInterval = 15.5 - (upgrades.increaseTriangleSpawnRate.level * (upgrades.increaseTriangleSpawnRate.increase));
  clearInterval(gameState.triangleSpawnIntervalID);
  if (gameState.triangleSpawnInterval <= 0){
    gameState.triangleSpawnInterval = 0.5;
  }
  gameState.triangleSpawnIntervalID = setInterval(function(){
          for (let i=0; i < gameState.triangleSpawnCount; i++){
              spawnTriangle();
          }
      }, gameState.triangleSpawnInterval*1000);
}

export function setTriangleSpawnCount(){
    //triangleSpawnCount = (level * increase)
    gameState.triangleSpawnCount = upgrades.increaseTriangleSpawnCount.level * upgrades.increaseTriangleSpawnCount.increase;
    if (gameState.triangleSpawnCount <= 0){
        gameState.triangleSpawnCount = 1;
    }
}

export function setTriangleMaxCount(){
    //triangleMaxCount = (level * increase) + 5(Base amount) - level 1
    gameState.triangleMaxCount = upgrades.increaseMaxTriangleCount.level * upgrades.increaseMaxTriangleCount.increase + (5 - upgrades.increaseMaxTriangleCount.increase);
}

