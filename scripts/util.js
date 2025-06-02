import { gameState } from "./data.js";

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



export function calcBuyMax(upgradeData){
    //Calculate how many upgradescan be bought
    if (upgradeData.type == "score"){
        let moneyType = gameState.score;
    } else if (upgradeData.type == "nomCoins"){
        let moneyType = gameState.nomCoins;
    }
    let totalCost = 0;
    let maxUpgrades = 0;

    totalCost = totalCost.plus(upgradeData.cost);
    maxUpgrades++;

    while (totalCost <= moneyType) {
        totalCost = totalCost.plus(increaseCost(upgradeData.baseCost, upgradeData.increase, upgradeData.level));
        maxUpgrades++;
    }
    return (maxUpgrades,totalCost);
}

export function increaseCost(baseCost, increase, level){
    return (new Decimal(baseCost.times(Math.pow(increase, level)).toFixed(2)))
}