import { gameState } from './data.js'
import { upgrades } from './data.js'
import { createDot } from './consumables.js';

import { buttonBought } from './buttonHandling.js';
import { hideButton } from './buttonHandling.js';

//Enable the Auto feed Button
export function enableAutofeed(self){
    const autoF = upgrades.autoFeed;
    //Check if upgrade can be bought
    if (gameState.score.greaterThanOrEqualTo(autoF.cost)){
        //Reduce score based on cost
        gameState.score = gameState.score.minus(autoF.cost);
        
        if (!autoF.enabled){
        //Create initial dot and start autofeed
        createDot();
        const feedText = document.getElementById("autoFeedText");
        feedText.innerText = "Decrease Auto Feed interval"
        autoF.enabled = true;
        $("#feedSpeed").css("display", "block")
        } else {
            autoF.speed = autoF.speed - autoF.increase;
        }
        const autoFeedSpeedText = document.getElementById("feedSpeed")
        autoFeedSpeedText.innerText = `Auto Feed 1 every ${autoF.speed.toFixed(2)}s`
        //Clear dot interval and create a new one with the new speed
        clearInterval(gameState.dotIntervalID);
        gameState.dotIntervalID = setInterval(createDot, autoF.speed*1000);
        //Update autofeed cost and level
        autoF.cost = autoF.cost.times(autoF.upgradeScale);
        autoF.level++;
        if (autoF.level == 18){
            autoF.enabled = false;
        } 
        
    }
}