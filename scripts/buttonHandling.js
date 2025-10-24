import { createDot } from './consumables.js';
import { enableAutofeed, createKids, nomscend } from './features.js';
import { upgradeDotValue, upgradeDotSpeed, upgradeAutoFeedSpeed, upgradeDotMulti} from './upgradeButtons.js';
import { increaseNomDotMulti, increaseDotMultiMax, increaseDotValMax, increaseNomCoinMulti, increaseNomDotVal, increaseStartDotSpeedLevel, increaseAutoFeedMax, increaseStartDotMultiLevel, increaseDotSpeedBase, keepAutofeed } from './Upgrades/nomupgrades.js'
import { upgrades, gameState, shopUpgrades } from './data.js';
import { calcBuyMax, formatNum, increaseCost, setDotValue, setSpeed, setAutoFeed, setDotMulti  } from './util.js';

import { saveGame } from './gameFiles.js';

let holdInterval;

$("#feedNomNom").on("mousedown touchstart", function () {
    createDot();
    holdInterval = setInterval(createDot, 150);
});

$("#feedNomNom").on("mouseup mouseleave  touchend", function () {
    clearInterval(holdInterval);
});


// Modal Handling
$(".closeBttn").on("click", () => {
    $("#popUpModal").hide();
});
export function openModal() {
    $("#popUpModal").show();
}
$(window).on("click", function(event) {
    if (event.target === $("#popUpModal")[0]) {
        $("#popUpModal").hide();
    }
});

//###############

//SHOP UPGRADES
$("#unlockAutoFeed").on('click',function(){
    enableAutofeed();
});

//################
//Customization buttons (Color)
$("#enableDefaultMode").on('click',function(){
    $("#mrNomNom").css("fill", "white");
    $(".dot").css("background-color", "white");
    if ($(".nomnomjr").children().length>0){
        $(".nomnomjr").children().hide();
    }
});

$("#enableLachlanMode").on('click',function(){
    $("#mrNomNom").css("fill", "purple");
    $(".dot").css("background-color", "purple");
    if ($(".nomnomjr").children().length>0){
        $(".nomnomjr").children().hide();
    }
});
$("#enableCillianMode").on('click',function(){
    $("#mrNomNom").css("fill", "blue");
    $(".dot").css("background-color", "blue");
    if ($(".nomnomjr").children().length>0){
        $(".nomnomjr").children().hide();
    }
});
$("#enableConallMode").on('click',function(){
    $("#mrNomNom").css("fill", "yellow");
    $(".dot").css("background-color", "yellow");
    if ($(".nomnomjr").children().length>0){
        $(".nomnomjr").children().hide();
    }
});
$("#enableAidanMode").on('click',function(){
    $("#mrNomNom").css("fill", "red");
    $(".dot").css("background-color", "red");
    if ($(".nomnomjr").children().length>0){
        $(".nomnomjr").children().hide();
    }
});
$("#enableDADMode").on('click',function(){
    $("#mrNomNom").css("fill", "green");
    if ($(".nomnomjr").children().length == 0){
        createKids()
    } else {
        $(".nomnomjr").children().show();
    }
    
});
//####################





//BASE UPGRADES
$("#upgradeDotValue").on('click',function(){
    upgradeDotValue();
});
$("#upgradeDotSpeed").on('click',function(){
    upgradeDotSpeed();
});
$("#upgradeDotMulti").on('click',function(){
    upgradeDotMulti();
});
$("#upgradeAutoFeedSpeed").on('click',function(){
    upgradeAutoFeedSpeed();
});
//###############
//Nom Upgrades
$("#upgradeNomDotMulti").on('click',function(){
    increaseNomDotMulti();
});
$("#upgradeNomDotVal").on('click',function(){
    increaseNomDotVal();
});
$("#upgradeNomCoinMulti").on('click',function(){
    increaseNomCoinMulti();
});
$("#upgradeDotMultiMax").on('click',function(){
    increaseDotMultiMax();
});
$("#upgradeDotValMax").on('click',function(){
    increaseDotValMax();
});
$("#upgradeStartDotSpeedLevel").on('click',function(){
    increaseStartDotSpeedLevel();
});
$("#upgradeAutoFeedMax").on('click',function(){
    increaseAutoFeedMax();
});
$("#upgradeDotSpeedBase").on('click',function(){
    increaseDotSpeedBase();
});
$("#upgradeStartDotMultiLevel").on('click',function(){
    increaseStartDotMultiLevel();
});
$("#keepAutoFeed").on('click',function(){
    keepAutofeed();
});


//##############
//Buy Maxes
$("#dotValueMaxBttn").on('click', function(){
    let results = calcBuyMax(upgrades.increaseDotValue);
    if (results.count > 0){
        upgrades.increaseDotValue.level = upgrades.increaseDotValue.level + results.count;
        gameState.score = gameState.score.minus(results.cost);
        upgrades.increaseDotValue.cost = increaseCost(upgrades.increaseDotValue);
        setDotValue();
    }
});
$("#dotSpeedMaxBttn").on('click', function(){
    let results = calcBuyMax(upgrades.increaseDotSpeed);
    if (results.count > 0){
        upgrades.increaseDotSpeed.level = upgrades.increaseDotSpeed.level + results.count;
        gameState.score = gameState.score.minus(results.cost);
        upgrades.increaseDotSpeed.cost = increaseCost(upgrades.increaseDotSpeed);
        setSpeed();
    }
});
$("#dotMultiMaxBttn").on('click', function(){
    let results = calcBuyMax(upgrades.increaseDotMulti);
    if (results.count > 0){
        upgrades.increaseDotMulti.level = upgrades.increaseDotMulti.level + results.count;
        gameState.score = gameState.score.minus(results.cost);
        upgrades.increaseDotMulti.cost = increaseCost(upgrades.increaseDotMulti);
        setDotMulti();
    }
});
$("#dotAFSpeedMaxBttn").on('click', function(){
    let results = calcBuyMax(upgrades.autoFeed);
    if (results.count > 0){
        upgrades.autoFeed.level = upgrades.autoFeed.level + results.count;
        gameState.score = gameState.score.minus(results.cost);
        upgrades.autoFeed.cost = increaseCost(upgrades.autoFeed);
        setAutoFeed();
    }
});






//Menu Buttons
//Left
$("#upgradesBttn").on('click',function(){
    $("#baseUpgrades").show();
    $("#shop-container").hide();
    $("#nomUpgrades-container").hide();
    $("#customize-container").hide();
    $("#stats-container").hide();
});
$("#shopBttn").on('click',function(){
    $("#baseUpgrades").hide();
    $("#shop-container").show();
    $("#nomUpgrades-container").hide();
    $("#customize-container").hide();
    $("#stats-container").hide();
});

//Right
$("#nomscendUpgradesBttn").on('click',function(){
    $("#baseUpgrades").hide();
    $("#shop-container").hide();
    $("#nomUpgrades-container").show();
    $("#customize-container").hide();
    $("#stats-container").hide();
});
$("#customizeBttn").on('click',function(){
    $("#baseUpgrades").hide();
    $("#shop-container").hide();
    $("#nomUpgrades-container").hide();
    $("#customize-container").show();
    $("#stats-container").hide();

});
$("#statBttn").on('click',function(){
    $("#baseUpgrades").hide();
    $("#shop-container").hide();
    $("#nomUpgrades-container").hide();
    $("#customize-container").hide();
    $("#stats-container").show();
});
//###############

$("#nomscensionBttn").on('click',function(){
    openModal();
});


$("#nomscendBttn").on('click',function(){
    nomscend();
});

$("#debugBttn").on('click',function(){
    gameState.dotValue = gameState.dotValue.plus(100);
    
});

$("#ResetBttn").click(function(){
    if (confirm("Warning! You are about to Reset all progress and start from 0.\nAre you sure you wish to continue?")){
        localStorage.removeItem("gameState");
        localStorage.removeItem("Upgrades");
        localStorage.removeItem("shopUpgrades");
        location.reload();
    }    
});
$("#SaveBttn").click(function(){
    saveGame(); 
});



export function buttonBought(button_id, self){
    //$(self).closest(".upgrade-row").remove();
    $("#"+button_id).css("background", "green");
    disableButton(button_id);
}



//Check all game buttons and update their status
export function buttonCheck(){
    for (let [key, value] of Object.entries(upgrades)){
        if (value.type == "nomCoins"){
            value.cost = increaseCost(value);
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.nomCoins));
            $("#"+value.id+"Text").text(formatNum(value.cost));
        } else if (value.type == "score" ){
            value.cost = increaseCost(value);
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.score));
            $("#"+value.id).html(`Cost: ${formatNum(value.cost)}`);
        }

        if (value.level >= value.maxlevel){
            $("#"+value.id).prop("disabled", true);
            $("#"+value.id).html(`MAX LEVEL`);
            $("#"+value.id).css("background", "green");
            $("#"+value.id).css("color", "black");
        } else {
            $("#"+value.id).css("background", "");
            $("#"+value.id).css("color", "");
        }
    }

    for (let [key, value] of Object.entries(shopUpgrades)){
        if (value.bought == true){
            $("#"+value.id).prop("disabled", true);
            $("#"+value.id).html(`OWNED`);
            $("#"+value.id).css("background", "green");
            $("#"+value.id).css("color", "black");
        } else {
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.score));
            $("#"+value.id).html(`Cost: ${formatNum(value.cost)}`);
            $("#"+value.id).css("background", "");
            $("#"+value.id).css("color", "");
        }
    }
    $("#nomscendBttn").prop("disabled", 200000 > (gameState.nomscendScore))
}