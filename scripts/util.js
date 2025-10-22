import { gameState, upgrades } from "./data.js";
import { createDot } from "./consumables.js";
import "./break_infinity.js";

// const map = ["", "k", "m", "b", "t", "Qa", "Qi", "Sx", "Sp", "Oct", "No", "Dc"];

// const formatNumber = (number) => {
//   if (number < 1000) return number.toString();

//   let log = Math.log10(number);
//   let div = log - log % 3;
//   let index = div / 3;
//   while (index >= map.length) {
//     // ran out of map elements
//     index -= 1;
//     div -= 3;
//   }
  
//   return (number / Math.pow(10, div)).toPrecision(6) + " " + map[index];
// };
//Utils

export function formatNum(num){
        if (num.greaterThan(1000000)) {
            return num.toExponential(2);
        } else {
            return num.toFixed();
        }
}


//Calculate how many upgrades can be bought
export function calcBuyMax(upgradeData){
    
    //Check if the cost is score or nomCoins
    let moneyType;
    if (upgradeData.type == "score"){
        moneyType = gameState.score;
    } else if (upgradeData.type == "nomCoins"){
        moneyType = gameState.nomCoins;
    }

    //Don't buy if they are already at max level
    if (upgradeData.level >= upgradeData.maxlevel){
      return ({count: 0, cost: 0});
    }

    let totalCost;

    if (moneyType.lessThan(upgradeData.cost)){
      return ({count: 0, cost: 0});
    } else {
      totalCost = new Decimal(upgradeData.cost);
      let maxUpgrades = 1;
      let upgradeLevel = upgradeData.level

      while (true){
        //If score is greater than current cost plus the next upgrade cost && level will not exceed max
        if (moneyType.greaterThanOrEqualTo(totalCost.plus(increaseCost(upgradeData))) && (upgradeLevel + 1 < upgradeData.maxlevel)){
            totalCost = totalCost.plus(increaseCost(upgradeData));
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

export function increaseCost(upgrade){
  return (new Decimal(upgrade.baseCost.times(Math.pow(upgrade.upgradeScale, upgrade.level)).toFixed(2)))
}

export function setDotValue(){
    gameState.dotValue = gameState.nomscendDotVal.plus(upgrades.increaseDotValue.increase.times(upgrades.increaseDotValue.level));
    $("#upgradeDotValueLvl").text(`Level: ${upgrades.increaseDotValue.level}/${upgrades.increaseDotValue.maxlevel}`);
}

export function setSpeed(){
    //dotSpeed = baseSpeed - (level * increase)
    gameState.dotSpeed = upgrades.increaseDotSpeed.baseSpeed.minus(upgrades.increaseDotSpeed.level * upgrades.increaseDotSpeed.increase);
    $("#upgradeDotSpeedLvl").text(`Level: ${upgrades.increaseDotSpeed.level}/${upgrades.increaseDotSpeed.maxlevel}`);
    if (gameState.dotSpeed <= 0){
        gameState.dotSpeed = 0.05;
    }

}

export function setDotMulti(){
    //dotMulti = 1 + (level * increase)
    gameState.dotMulti = new Decimal(upgrades.increaseDotMulti.level*(upgrades.increaseDotMulti.increase));
    $("#upgradeDotMultiLvl").text(`Level: ${upgrades.increaseDotMulti.level}/${upgrades.increaseDotMulti.maxlevel}`);
}

export function setAutoFeed(){
    clearInterval(gameState.dotIntervalID);
    upgrades.autoFeed.speed = upgrades.autoFeed.baseSpeed.minus(upgrades.autoFeed.increase*upgrades.autoFeed.level)
    gameState.dotIntervalID = setInterval(createDot, upgrades.autoFeed.speed*1000);
    $("#upgradeAutoFeedSpeedLvl").text(`Level: ${upgrades.autoFeed.level}/${upgrades.autoFeed.maxlevel}`);
}