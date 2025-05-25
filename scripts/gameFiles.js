import { gameState } from './data.js'
import { upgrades } from './data.js'

export function saveGame(){
    //Set data into local storage
    localStorage.setItem("gameState", JSON.stringify(gameState));
    localStorage.setItem("Upgrades", JSON.stringify(upgrades));
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
    }
    if (localStorage.getItem("Upgrades")){
        const data = JSON.parse(localStorage.getItem("Upgrades"));
        loadUpgradeData(data);
    }
}

export function loadUpgradeData(data){
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

export function loadGameStateData(data){
    for (let key in data) {
        if (typeof gameState[key] == 'object' && typeof data[key] == 'string'){
            gameState[key] = new Decimal(data[key]);
        } else {
            gameState[key] = data[key];
        }
    }
}