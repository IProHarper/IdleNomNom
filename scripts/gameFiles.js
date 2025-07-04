import { gameState, upgrades, shopUpgrades } from './data.js'
// import { freshGameState, freshUpgrades, freshShopUpgrades } from './data.js';
import { createDot } from './consumables.js';
import { setDotMulti, setDotValue, setSpeed } from './upgradeButtons.js';
import { increaseCost } from './util.js';

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

export function compareSaveData(data,name){
    //Compare gameState Data
    if (name == "gameState"){
        //Look through keys in site version
        for (let key in Object.keys(gameState)){
            //If players verions does not exist. Assign site version to that.
            if (!data[key]){
                data[key] = gameState[key];
            }
        }
        // if (Object.keys(gameState).length > Object.keys(JSON.parse(testData)).length){
    loadGameStateData(data);   
    }

    if (name == "Upgrades"){
                //Look through keys in site version
                for (let item in upgrades){
                    //If players verions has an upgrade variable. Use it. Otherwise take it from site version
                    if (data[item]){
                        for (let key in upgrades[item]){
                            //If the user version doesn't have a variable. Assign site version
                            if (!data[item][key]){
                                data[item][key] = upgrades[item][key];
                            }
                            //Assign site version for upgrageScale and baseCost regardless
                            //Will probably need to update this if going to update increase later
                            if (key == "upgradeScale" || key == "baseCost"){
                                data[item][key] = upgrades[item][key];
                            }
                        }
                            // if (key == "minlevel" && data[key]){

                            // }
                    } else {
                        data[item] = upgrades[item]
                    }
                }
            loadUpgradeData(data, "upgrades");   
    }
    if (name == "shopUpgrades"){
        //Look through keys in site version
            for (let item in Object.keys(shopUpgrades)){
                //If players verions has an upgrade variable. Use it. Otherwise take it from site version
                if (data[item]){
                    for (let key in shopUpgrades[item]){
                        if (!data[item][key]){
                            data[item][key] = shopUpgrades[item][key];
                        }
                    }
                } else {
                    data[item] = shopUpgrades[item]
                }
            }
        loadUpgradeData(data, "shopUpgrades"); 
    }
}

//Check Game files for existing save
export function checkSaveFile(){

    if (localStorage.getItem("gameState")){
        const data = JSON.parse(localStorage.getItem("gameState"));
        compareSaveData(data, "gameState")
    } else { localStorage.setItem("gameState", JSON.stringify(gameState));}

    if (localStorage.getItem("Upgrades")){
        let data = JSON.parse(localStorage.getItem("Upgrades"));
        compareSaveData(data, "Upgrades")
    } else { 
        console.log(upgrades);
        localStorage.setItem("Upgrades", JSON.stringify(upgrades));
        console.log(localStorage.getItem("Upgrades"));
        console.log(JSON.parse(localStorage.getItem("gameState")));
    }

    if (localStorage.getItem("shopUpgrades")){
        const data = JSON.parse(localStorage.getItem("shopUpgrades"));
        compareSaveData(data, "shopUpgrades")
    } else { localStorage.setItem("shopUpgrades", JSON.stringify(shopUpgrades));}

    //Start autofeed if previously active
    if (upgrades.autoFeed.enabled){
        $("#upgradeAutoFeedSpeed").parent().css("display", "");
        gameState.dotIntervalID = setInterval(createDot, upgrades.autoFeed.speed*1000);
    } else { 
        $("#upgradeAutoFeedSpeed").parent().css("display", "none");
    }
}

//Load save file to site. Make any decimals decimals again since they are stored in save as string.
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
            upgrades[item].level = upgrades[item].minlevel;
            upgrades[item].cost = increaseCost(upgrades[item].baseCost, upgrades[item].upgradeScale, upgrades[item].level);
        }
    }
    setDotValue();
    setSpeed();
    setDotMulti();
    for (let item in shopUpgrades){
        if (shopUpgrades[item].resetTier <= 0){
            shopUpgrades[item].bought = false;
        }
    }
    upgrades.autoFeed.speed = upgrades.autoFeed.baseSpeed;
    upgrades.autoFeed.enabled = false;
}