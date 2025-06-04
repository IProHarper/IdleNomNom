import { gameState } from "./data.js";
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
    
    let moneyType;
    if (upgradeData.type == "score"){
        moneyType = gameState.score;
    } else if (upgradeData.type == "nomCoins"){
        moneyType = gameState.nomCoins;
    }

    //Don't buy if they are already at max level
    if (upgradeData.level+1 > upgradeData.maxlevel){
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
        if (moneyType.greaterThanOrEqualTo(totalCost.plus(increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeLevel))) && (upgradeLevel + 1 < upgradeData.maxlevel)){
            totalCost = totalCost.plus(increaseCost(upgradeData.baseCost, upgradeData.upgradeScale, upgradeLevel));
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

export function increaseCost(baseCost, increase, level){
    return (new Decimal(baseCost.times(Math.pow(increase, level)).toFixed(2)))
}