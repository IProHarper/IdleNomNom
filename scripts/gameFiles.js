import { gameState, upgrades, shopUpgrades } from './data.js'
// import { freshGameState, freshUpgrades, freshShopUpgrades } from './data.js';
import { createDot } from './consumables.js';
import { increaseCost, setAutoFeed, setDotMulti, setDotValue, setSpeed } from './util.js';
import { updateLevels } from './display.js';

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
        //Iterate through keys in site version 
        for (const [key, value] of Object.entries(gameState)){
            //If players verions does not exist. Assign site version to that.
            if (!data[key]){
                data[key] = gameState[key];
            }
        }
    loadGameStateData(data);   
    }

    if (name == "Upgrades"){
                //Look through keys in site version
                for (let item in upgrades){
                    //If players verions has an upgrade variable. Use it. Otherwise take it from site version
                    if (data[item]){
                        for (const [key, value] of Object.entries(upgrades[item])){
                            //If the user version doesn't have a variable. Assign site version
                            if (!data[item][key]){
                                data[item][key] = upgrades[item][key];
                            }
                            //Assign site version for upgrageScale and baseCost regardless (For balance patches)
                            //Will probably need to update this if going to update increase later
                            if (key == "upgradeScale" || key == "baseCost" || key == "increase" || key == "maxlevel"){
                                data[item][key] = upgrades[item][key];
                            }
                        }
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
        localStorage.setItem("Upgrades", JSON.stringify(upgrades));
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
            //Update cost of upgrades
            upgrades[item].cost = increaseCost(upgrades[item]);
        }
        //Load max levels
        //increaseDotMultiMax
        upgrades.increaseDotMulti.maxlevel = ((upgrades.increaseDotMultiMax.level-1)*upgrades.increaseDotMulti.increase)+5; //5 = base max level
        //increaseDotValMax
        upgrades.increaseDotValue.maxlevel = ((upgrades.increaseDotValMax.level-1)*upgrades.increaseDotValMax.increase)+100;//100 = base max level
        updateLevels();
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

//Load the save into site data. If type of data is string in player version but object in site. It should be a break infinity Decimal.
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
            upgrades[item].cost = increaseCost(upgrades[item]);
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
    if (upgrades.autoFeed.resetTier == 0){
        upgrades.autoFeed.speed = upgrades.autoFeed.baseSpeed;
        upgrades.autoFeed.enabled = false;
        clearInterval(gameState.dotIntervalID);
    } else {
            setAutoFeed();
    }
}