import { gameState, roboList, upgrades } from "./data.js";
import { createDot, spawnDot, spawnSquare } from "./consumables.js";
import "./break_infinity.js";
import { RoboNom } from "./nomnom.js";
import { setDotValueMaxLvl, setRoboNomMaxLevel, setSquareDotMulti, setSquareMaxCount, setSquareMulti, setSquareResetTier, setSquareSpawnCount, setSquareValue } from "./Upgrades/squareUpgrades.js";


//Utils
export function formatNum(num){
        if (num.greaterThan(1000000)) {
            return num.toExponential(2);
        } else {
          return Math.round(num);
        }
}


//Calculate how many upgrades can be bought
//Return Amount of upgrades and total cost
export function calcBuyMax(upgradeData){
    
    //Don't buy if they are already at max level
    if (upgradeData.level >= upgradeData.maxlevel){
      return ({count: 0, cost: 0});
    }

    //Check if the cost is score or nomCoins
    let moneyType;
    switch (upgradeData.type) {
      case "score":
        moneyType = gameState.score;
        break;

      case "nomCoins":
        moneyType = gameState.nomCoins;
        break;

      case "square":
        moneyType = gameState.squares;
        break;

      default:
        console.warn("Unknown handler for moneyType:"+upgradeData.type);
    }


    let totalCost;
    //return 0 if they can't affort anything
    if (moneyType.lessThan(upgradeData.cost)){
      return ({count: 0, cost: 0});
    } else {
      totalCost = new Decimal(upgradeData.cost);
      let maxUpgrades = 1;
      let upgradeLevel = upgradeData.level+1;

      while (true){
        //If score is greater than current cost plus the next upgrade cost && level will not exceed max
        if (moneyType.greaterThanOrEqualTo(totalCost.plus(buyMaxCostCalc(upgradeData, upgradeLevel))) && (upgradeLevel + 1 <= upgradeData.maxlevel)){
            totalCost = totalCost.plus(buyMaxCostCalc(upgradeData,upgradeLevel));
            upgradeLevel++;
            maxUpgrades++;
          // }
        } else {
          break;
        }        
      }
      return ({count: maxUpgrades, cost: totalCost});
    }
    
}

function buyMaxCostCalc(upgrade, newLevel){
  return (new Decimal(upgrade.baseCost.times(Math.pow(upgrade.upgradeScale, newLevel)).round()))
}

export function increaseCost(upgrade){
  return (new Decimal(upgrade.baseCost.times(Math.pow(upgrade.upgradeScale, upgrade.level)).round()))
}

export function setDotValue(){
  const increase = upgrades.increaseDotValue.increase;
  const lvl = upgrades.increaseDotValue.level;
  const squareBoost = gameState.squareScoreBoost;
  let nomBoost = new Decimal(upgrades.increaseNomDotVal.level * upgrades.increaseNomDotVal.increase);
  gameState.dotValue = new Decimal(increase * lvl).plus(nomBoost).pow(squareBoost);
}

export function setDotSpawnRate(){
  gameState.dotSpawnInterval = 5.5 - (upgrades.increaseDotSpawnRate.level * (upgrades.increaseDotSpawnRate.increase));
  clearInterval(gameState.dotIntervalID);
  if (gameState.dotSpawnInterval <= 0){
    gameState.dotSpawnInterval = 0.5;
  }
  gameState.dotIntervalID = setInterval(function(){
          for (let i=0; i < gameState.dotSpawnCount; i++){
              spawnDot();
          }
      }, gameState.dotSpawnInterval*1000);
}


export function setDotsALL(){
  setDotValue();
  setSpeed();
  setDotMulti();
  setDotMaxCount();
  setDotSpawnCount();
  setDotSpawnRate();
  setRoboNoms();
  setDotValueMaxLvl();
}

export function setSquaresALL(){
  if (!upgrades.unlockSquares.bought){return;}
  spawnSquare();
  setSquareSpawnRate();
  setRoboNomMaxLevel();
  setSquareDotMulti();
  setSquareMaxCount();
  setSquareSpawnCount();
  setSquareValue();
  setSquareMulti();
  setSquareResetTier();
  setDotValueMaxLvl();
}

export function setSquareSpawnRate(){
  gameState.squareSpawnInterval = 10.5 - (upgrades.increaseSquareSpawnRate.level * (upgrades.increaseSquareSpawnRate.increase));
  clearInterval(gameState.squareSpawnIntervalID);
  if (gameState.squareSpawnInterval <= 0){
    gameState.squareSpawnInterval = 0.5;
  }
  gameState.squareSpawnIntervalID = setInterval(function(){
          for (let i=0; i < gameState.squareSpawnCount; i++){
              spawnSquare();
          }
      }, gameState.squareSpawnInterval*1000);
}


export function setSpeed(){
    //dotSpeed = baseSpeed - (level * increase)
    gameState.dotSpeed = upgrades.increaseDotSpeed.baseSpeed.minus(upgrades.increaseDotSpeed.level * upgrades.increaseDotSpeed.increase);
    if (gameState.dotSpeed <= 0){
        gameState.dotSpeed = 0.05;
    }
}

export function setDotSpawnCount(){
    //dotSpawnCount = (level * increase)
    gameState.dotSpawnCount = upgrades.increaseDotSpawnCount.level * upgrades.increaseDotSpawnCount.increase;
    if (gameState.dotSpawnCount <= 0){
        gameState.dotSpawnCount = 1;
    }
}
export function setDotMaxCount(){
    //dotMaxCount = (level * increase) + 10(Base amount) - level 1
    gameState.dotMaxCount = upgrades.increaseMaxDotCount.level * upgrades.increaseMaxDotCount.increase + (10 - upgrades.increaseMaxDotCount.increase);
}

export function setDotMulti(){
    //dotMulti = 1 + (level * increase)
    gameState.dotMulti = new Decimal((upgrades.increaseDotMulti.level-1)*(upgrades.increaseDotMulti.increase));
    if (gameState.dotMulti == 0){ gameState.dotMulti = new Decimal(1);}
}

export function setAutoFeed(){
    clearInterval(gameState.dotIntervalID);
    upgrades.autoFeed.speed = upgrades.autoFeed.baseSpeed.minus(upgrades.autoFeed.increase*upgrades.autoFeed.level)
    gameState.dotIntervalID = setInterval(createDot, upgrades.autoFeed.speed*1000);
}
export function setRoboNoms(){
  const {x,y} = getCanvasCentre();
  const numOfRoboNoms = (upgrades.addRoboNom.level) - roboList.length;
  for (let i=0; i<numOfRoboNoms; i++){
    roboList.push(new RoboNom(x, y));
  }
}

export function calcNomGain(){
  return formatNum(gameState.nomscendScore.divide(100000).times(gameState.nomCoinMulti));
}

export function randomDirection(speed) {
  if (!speed) {
    speed = 2;
  }
  const angle = Math.random() * Math.PI * 2;
  return { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed };
}

export function getCanvasCentre(){
  const canvas = document.getElementById("gameCanvas");
  return { x: canvas.width / 2, y: canvas.height / 2 };
}

// Distance between two points
export function distance(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

export function setUpgradeCosts(){
      for (let [value] of Object.entries(upgrades)){
        upgrades[value].cost = increaseCost(upgrades[value]);
    }
}