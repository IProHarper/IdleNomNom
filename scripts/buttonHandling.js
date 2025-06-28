import { createDot } from './consumables.js';
import { enableAutofeed, createKids, nomscend } from './features.js';
import { upgradeDotValue, upgradeDotSpeed, upgradeAutoFeedSpeed, upgradeDotMulti, increaseNomDotMulti, increaseDotMultiMax, increaseDotValMax, increaseNomCoinMulti, increaseNomDotVal, increaseStartDotSpeedLevel, increaseAutoFeedMax, setDotMulti, setAutoFeed, increaseStartDotMultiLevel } from './upgradeButtons.js';
import { setDotValue, setSpeed } from './upgradeButtons.js';
import { upgrades, gameState, shopUpgrades } from './data.js';
import { calcBuyMax, formatNum, increaseCost } from './util.js';

import { saveGame } from './gameFiles.js';

let holdInterval;

$("#feedNomNom").on("mousedown touchstart", function () {
    createDot();
    holdInterval = setInterval(createDot, 150);
});

$("#feedNomNom").on("mouseup mouseleave  touchend", function () {
    clearInterval(holdInterval);
});


// $("#feedNomNom").click(createDot);

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
//###############





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
$("#upgradeStartDotMultiLevel").on('click',function(){
    increaseStartDotMultiLevel();
});


//##############
//Buy Maxes
$("#dotValueMaxBttn").on('click', function(){
    let results = calcBuyMax(upgrades.increaseDotValue);
    if (results.count > 0){
        upgrades.increaseDotValue.level = upgrades.increaseDotValue.level + results.count;
        gameState.score = gameState.score.minus(results.cost);
        upgrades.increaseDotValue.cost = increaseCost(upgrades.increaseDotValue.baseCost, upgrades.increaseDotValue.upgradeScale, upgrades.increaseDotValue.level);
        setDotValue();
    }
});
$("#dotSpeedMaxBttn").on('click', function(){
    let results = calcBuyMax(upgrades.increaseDotSpeed);
    if (results.count > 0){
        upgrades.increaseDotSpeed.level = upgrades.increaseDotSpeed.level + results.count;
        gameState.score = gameState.score.minus(results.cost);
        upgrades.increaseDotSpeed.cost = increaseCost(upgrades.increaseDotSpeed.baseCost, upgrades.increaseDotSpeed.upgradeScale, upgrades.increaseDotSpeed.level);
        setSpeed();
    }
});
$("#dotMultiMaxBttn").on('click', function(){
    let results = calcBuyMax(upgrades.increaseDotMulti);
    if (results.count > 0){
        upgrades.increaseDotMulti.level = upgrades.increaseDotMulti.level + results.count;
        gameState.score = gameState.score.minus(results.cost);
        upgrades.increaseDotMulti.cost = increaseCost(upgrades.increaseDotMulti.baseCost, upgrades.increaseDotMulti.upgradeScale, upgrades.increaseDotMulti.level);
        setDotMulti();
    }
});
$("#dotAFSpeedMaxBttn").on('click', function(){
    let results = calcBuyMax(upgrades.autoFeed);
    if (results.count > 0){
        upgrades.autoFeed.level = upgrades.autoFeed.level + results.count;
        gameState.score = gameState.score.minus(results.cost);
        upgrades.autoFeed.cost = increaseCost(upgrades.autoFeed.baseCost, upgrades.autoFeed.upgradeScale, upgrades.autoFeed.level);
        setAutoFeed();
    }
});






//Menu Buttons
//Left
$("#upgradesBttn").on('click',function(){
    $("#left-container").children().css('display', 'none');
    $("#upgrades-container").css('display', '');
});
$("#shopBttn").on('click',function(){
    $("#left-container").children().css('display', 'none');
    $("#shop-container").css('display', '');
});

//Right
$("#nomscendUpgradesBttn").on('click',function(){
    $("#right-container").children().css('display', 'none');
    $("#nomUpgrades-container").css('display', '');
});
$("#customizeBttn").on('click',function(){
    $("#right-container").children().css('display', 'none');
    $("#customize-container").css('display', '');
});
$("#statBttn").on('click',function(){
    $("#right-container").children().css('display', 'none');
    $("#stats-container").css('display', '');
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
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.nomCoins));
            $("#"+value.id+"Text").text(formatNum(value.cost));
        } else if (value.type == "score" ){
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