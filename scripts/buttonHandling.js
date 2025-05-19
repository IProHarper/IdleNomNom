import { createDot } from './consumables.js';
import { enableAutofeed } from './features.js';
import { upgradeDotValue } from './upgradeButtons.js';
import { upgrades } from './data.js';
import { gameState } from './data.js';

$("#feedNomNom").on('click',createDot());

$("#unlockAutoFeed").on('click',function(){
    enableAutofeed(this);
});
$("#upgradeDotValue").on('click',function(){
    upgradeDotValue();
});


export function hideButton(button_id){
    $("#"+button_id).css("display", "none");
}

export function buttonBought(button_id, self){
    $(self).closest(".upgrade-row").remove();
    $("#"+button_id).css("background-color", "green");
    
}

function disableButton(button_id){
    $("#"+button_id).prop("disabled", true);
}



//Check all game buttons and update their status
export function buttonCheck(){
    for (let [key, value] of Object.entries(upgrades)){
        $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.score));
        $("#"+value.id).html(`Cost: ${value.cost.round(1)}`);
    }
}