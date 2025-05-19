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
        setInterval(createDot, autoF.speed*1000);
        const feedText = document.getElementById("autoFeedText");
        feedText.innerText = "+ Auto Feed/s"
        autoF.enabled = true;
        $("#feedSpeed").css("display", "block")
        } else {
            clearInterval(createDot);
            autoF.speed = autoF.speed - autoF.increase;
            setInterval(createDot, autoF.speed*1000);
        }
        autoF.cost = autoF.cost.times(autoF.upgradeScale);
        autoF.level++;
        
    }
}