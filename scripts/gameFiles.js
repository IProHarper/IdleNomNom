import { gameState, upgrades, shopUpgrades } from './data.js'
// import { freshGameState, freshUpgrades, freshShopUpgrades } from './data.js';
import { createDot } from './consumables.js';

export function saveGame(){
    //Set data into local storage
    localStorage.setItem("gameState", JSON.stringify(gameState));
    localStorage.setItem("Upgrades", JSON.stringify(upgrades));
    localStorage.setItem("shopUpgrades", JSON.stringify(shopUpgrades));
    //Display Save in top right
    var savePopup = document.getElementById('savePopup');
            savePopup.classList.add('show');
            // Auto disappear after 1 second
            setTimeout(() => {
                savePopup.classList.remove('show');
            }, 2000);

}


export function checkSaveFile(){
    if (localStorage.getItem("gameState")){
        const data = JSON.parse(localStorage.getItem("gameState"));
        loadGameStateData(data);
    } else { localStorage.setItem("gameState", JSON.stringify(gameState)); }

    if (localStorage.getItem("Upgrades")){
        const data = JSON.parse(localStorage.getItem("Upgrades"));
        loadUpgradeData(data, "upgrades");
    } else { localStorage.setItem("Upgrades", JSON.stringify(upgrades));}

    if (localStorage.getItem("shopUpgrades")){
        const data = JSON.parse(localStorage.getItem("shopUpgrades"));
        loadUpgradeData(data, "shopUpgrades");
    } else { localStorage.setItem("shopUpgrades", JSON.stringify(shopUpgrades));}

    //Start autofeed if previously active
    if (upgrades.autoFeed.enabled){
        $("#upgradeAutoFeedSpeed").parent().css("display", "");
        gameState.dotIntervalID = setInterval(createDot, upgrades.autoFeed.speed*1000);
    } else { 
        $("#upgradeAutoFeedSpeed").parent().css("display", "none");
    }
}

export function loadUpgradeData(data, name){
    if (name == "upgrades"){
        for (let item in data){
            for (let key in data[item]) {
                if (typeof upgrades[item][key] == 'object' && typeof data[item][key] == 'string'){
                    upgrades[item][key] = new Decimal(data[item][key]);
                } else {
                    upgrades[item][key] = data[item][key];
                }
            }
        }
    }
    else if (name == "shopUpgrades"){
        for (let item in data){
            for (let key in data[item]) {
                if (typeof shopUpgrades[item][key] == 'object' && typeof data[item][key] == 'string'){
                    shopUpgrades[item][key] = new Decimal(data[item][key]);
                } else {
                    shopUpgrades[item][key] = data[item][key];
                }
            }
        }
    }
}

export function loadGameStateData(data){
    for (let key in data) {
        if (typeof gameState[key] == 'object' && typeof data[key] == 'string'){
            gameState[key] = new Decimal(data[key]);
        } else {
            gameState[key] = data[key];
        }
    }
}


export function resetUpgrades(){
    for (let item in upgrades){
        if (upgrades[item].resetTier <= 0){
            upgrades[item].cost = upgrades[item].baseCost;
            upgrades[item].level = 0;
        }
    }
    for (let item in shopUpgrades){
        if (shopUpgrades[item].resetTier <= 0){
            shopUpgrades[item].bought = false;
        }
    }
    upgrades.autoFeed.speed = new Decimal(10);
}