import { createDot } from './consumables.js';
import { enableAutofeed } from './features.js';
import { upgradeDotValue, upgradeDotSpeed, upgradeAutoFeedSpeed,upgradeDotMulti } from './upgradeButtons.js';
import { upgrades, gameState } from './data.js';

import { freshGameState, freshUpgrades } from './freshState.js';
import { loadUpgradeData, loadGameStateData, saveGame } from './gameFiles.js';

$("#feedNomNom").on('click',createDot());

$("#unlockAutoFeed").on('click',function(){
    enableAutofeed(this);
    disableButton("unlockAutoFeed");
});
$("#upgradeAutoFeedSpeed").on('click',function(){
    upgradeAutoFeedSpeed();
});

$("#upgradeDotValue").on('click',function(){
    upgradeDotValue();
});
$("#upgradeDotSpeed").on('click',function(){
    upgradeDotSpeed();
});
$("#upgradeDotMulti").on('click',function(){
    upgradeDotMulti();
});

$("#upgradesBttn").on('click',function(){
    $("#left-container").children().css('display', 'none');
    $("#upgrades-container").css('display', '');
});
$("#shopBttn").on('click',function(){
    $("#left-container").children().css('display', 'none');
    $("#shop-container").css('display', '');
});

$("#ResetBttn").click(function(){
    if (confirm("Warning! You are about to Reset all progress and start from 0.\nAre you sure you wish to continue?")){
        loadGameStateData(freshGameState);
        loadUpgradeData(freshUpgrades);
        saveGame();
    }    
});


//Menu Items

//Function to handle all top row menu buttons. 
// const menuButtons = $("#menu-container").children();
// for (let i = 0; i < menuButtons.length; i++){
//     $(`#${menuButtons[i].id}`).on('click',function(){
//         const menuToDisplay = menuButtons[i].attributes.cont.value;
//         // HIDE ALL
//         $("#left-container").children().css('display', 'none');
//         console.log(menuToDisplay);
//         $("#"+menuToDisplay).css('display', '');
//         console.log($('#'+menuToDisplay));
//         // DISPLAY menuButtons[i].attributes.cont.value
//     });
//     console.log(menuButtons[i].attributes.cont.value);
// }


export function hideButton(button_id){
    $("#"+button_id).css("display", "none");
}

export function buttonBought(button_id, self){
    //$(self).closest(".upgrade-row").remove();
    $("#"+button_id).css("background", "green");
    disableButton(button_id);
}


function disableButton(button_id){
    $("#"+button_id).prop("disabled", true);
}



//Check all game buttons and update their status
export function buttonCheck(){
    for (let [key, value] of Object.entries(upgrades)){
        if (value.level >= value.maxlevel){
            $("#"+value.id).prop("disabled", true);
            $("#"+value.id).html(`MAX LEVEL`);
            $("#"+value.id).css("background", "green");
            $("#"+value.id).css("color", "black");
        } else {
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.score));
            $("#"+value.id).html(`Cost: ${value.cost.round(1)}`);
        }
    }
}