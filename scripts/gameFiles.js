import { gameState } from './data.js'
import { upgrades } from './data.js'

export function saveGame(){
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
        let data = JSON.parse(localStorage.getItem("gameState"));
        gameState.score = new Decimal(data.score);
        gameState.liftimeScore = new Decimal(data.lifetimeScore);
        gameState.dotValue = new Decimal(data.dotValue);
        gameState.dotMulti = new Decimal(data.dotMulti);
        gameState.dotSpeed = new Decimal(data.dotSpeed);
        gameState.gameStage.stage = data.gameStage.stage;
    }
    if (localStorage.getItem("Upgrades")){
        let data = JSON.parse(localStorage.getItem("Upgrades"));
        upgrades.autoFeed.enabled = data.autoFeed.enabled;
        upgrades.autoFeed.increase = new Decimal(data.autoFeed.increase);
        upgrades.autoFeed.speed = new Decimal(data.autoFeed.speed);
        upgrades.autoFeed.cost = new Decimal(data.autoFeed.cost);
        upgrades.autoFeed.level = data.autoFeed.level;
        upgrades.autoFeed.maxlevel = data.autoFeed.maxlevel;

        upgrades.increaseDotValue.increase = new Decimal(data.increaseDotValue.increase);
        upgrades.increaseDotValue.cost = new Decimal(data.increaseDotValue.cost);
        upgrades.increaseDotValue.owned = data.increaseDotValue.owned;
    }
}

export function loadSaveFile(data){
    gameState.score = new Decimal(data.score);
    gameState.liftimeScore = new Decimal(data.lifetimeScore);
    gameState.dotValue = new Decimal(data.dotValue);
    gameState.dotMulti = new Decimal(data.dotMulti);
    gameState.dotSpeed = new Decimal(data.dotSpeed);
    gameState.stage = data.gameStage.stage;
}


// increaseDotSpeed : {
//     id: "upgradeDotSpeed",
//     increase: new Decimal(1),
//     cost: new Decimal(100),
//     upgradeScale: 1.5,
//     maxlevel: 20,
//     owned: 0
// }