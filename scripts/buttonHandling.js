import { createDot, createSquare, spawnDot } from './consumables.js';
import { enableAutofeed, createKids, nomscend, unlockSquares } from './features.js';
import { upgradeDotValue, upgradeDotSpeed, upgradeAutoFeedSpeed, upgradeDotMulti, upgradeDotSpawnRate, upgradeDotSpawnCount, upgradeDotMaxCount, addRoboNom} from './upgradeButtons.js';
import { increaseDotMultiMax, increaseDotValMax, increaseNomCoinMulti, increaseNomDotVal, increaseStartDotSpeedLevel, increaseAutoFeedMax, increaseStartDotMultiLevel, increaseDotSpeedBase, keepAutofeed, nomCoinScoreBoost, unlockRoboNoms } from './Upgrades/nomupgrades.js'
import { upgrades, gameState, shopUpgrades, mouseNom, roboList, mousePos } from './data.js';
import { calcBuyMax, formatNum, increaseCost, setDotValue, setSpeed, setAutoFeed, setDotMulti  } from './util.js';

import { saveGame } from './gameFiles.js';

//Spawn Dots with Feed button
$("#feedNomNom").on("click", function () {
    for (let i=0; i < gameState.dotSpawnCount; i++){
        spawnDot();
    }
});

//Highlight active menu
document.querySelectorAll(".menu-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if ($(btn).hasClass('active')){
            btn.classList.remove("active");
        } else {
            document.querySelectorAll(".menu-toggle-btn").forEach(b => b.classList.remove("active"));
            $(btn).addClass('active');
        }
    });
});

//Menu transition handling
$("#toggleUpgrades").on("click", function() {
    switchRMenu("#baseUpgrades");
});
$("#toggleNomUpgrades").on("click", function() {
    switchRMenu("#nomUpgrades");
});
$("#toggleSquareUpgrades").on("click", function() {
    switchRMenu("#squareUpgrades");
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
    mouseNom.color = "white";
});

$("#enableLachlanMode").on('click',function(){
    mouseNom.color = "purple";
});
$("#enableCillianMode").on('click',function(){
    mouseNom.color = "blue";
});
$("#enableConallMode").on('click',function(){
    mouseNom.color = "yellow";
});
$("#enableAidanMode").on('click',function(){
    mouseNom.color = "red";
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

//Toggle Right Menu
function switchRMenu(activeMenu){
    if (!$(activeMenu).hasClass('hidden')){
        $(activeMenu).toggleClass('hidden');
    } else {
        $(".upgrades-container").each(function() {
            if(!$(this).hasClass('hidden')){
                $(this).toggleClass('hidden');
            }
    });
    $(activeMenu).toggleClass('hidden');
    }   
}

export function handleUpgrade(id) {
    let nomOfupgrades = 0;
    switch (id) {
        //Dot Value
        case "upgradeDotValue":
            upgradeDotValue();
            break;
        case "upgradeDotValueMaxBttn":
            dotValueBuyMax();
            break;
        //Dot Multi
        case "upgradeDotMulti":
            upgradeDotMulti();
            break;
        case "upgradeDotMultiMaxBttn":
            dotMultiBuyMax();
            break;
        //Dot Spawn Rate
        case "upgradeDotSpawnRate":
            upgradeDotSpawnRate();
            break;
        case "upgradeDotSpawnRateMaxBttn":
            dotSpawnRateBuyMax();
            break;
        //Dot Spawn Count
        case "upgradeDotSpawnCount":
            upgradeDotSpawnCount();
            break;
        case "upgradeDotSpawnCountMaxBttn":
            dotSpawnCountBuyMax();
            break;
        //Dot Max Count
        case "upgradeMaxDotCount":
            upgradeDotMaxCount();
            break;
        case "upgradeMaxDotCountMaxBttn":
            dotMaxCountBuyMax();
            break;
        
        case "upgradeDotSpeed":
            upgradeDotSpeed();
            break;

        case "unlockAutoFeed":
            unlockAutoFeed();
            break;

        case "upgradeAutoFeedSpeed":
            upgradeAutoFeedSpeed();
            break;

        //Robo Nom
        case "unlockRoboNom":
            unlockRoboNoms();
            break;
            
        case "addRoboNom":
            addRoboNom();
            break;
        case "addRoboNomMaxBttn":
            addRoboNomBuyMax();
            break;
        case "unlockSquare":
            unlockSquares();

        default:
            console.warn(`Unhandled upgrade ID: ${id}`);
            break;
    }
}

function dotValueBuyMax(){
    const numOfupgrades = calcBuyMax(upgrades.increaseDotValue).count;
    for (let i=1; i<numOfupgrades+1; i++){
        upgradeDotValue();
    }
}
function dotMultiBuyMax(){
    //Do nothing if you can't afford an upgrade
    const numOfupgrades = calcBuyMax(upgrades.increaseDotMulti).count;
    for (let i=1; i<numOfupgrades+1; i++){
        upgradeDotMulti();
    }
}
function dotSpawnRateBuyMax(){
    const numOfupgrades = calcBuyMax(upgrades.increaseDotSpawnRate).count;
    for (let i=1; i<numOfupgrades+1; i++){
        upgradeDotSpawnRate();
    }
}
function dotSpawnCountBuyMax(){
    const numOfupgrades = calcBuyMax(upgrades.increaseDotSpawnCount).count;
    for (let i=1; i<numOfupgrades+1; i++){
        upgradeDotSpawnCount();
    }
}
function dotMaxCountBuyMax(){
    const numOfupgrades = calcBuyMax(upgrades.increaseMaxDotCount).count;
    for (let i=1; i<numOfupgrades+1; i++){
        upgradeDotMaxCount();
    }
}
function addRoboNomBuyMax(){
    const numOfupgrades = calcBuyMax(upgrades.addRoboNom).count;
    for (let i=1; i<numOfupgrades+1; i++){
        addRoboNom();
    }
}



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
$("#unlocknomCoinScoreBoost").on('click',function(){
    nomCoinScoreBoost();
});


//##############

// $("#upgradeDotValue-i").on("mouseenter", function(){
//     showTooltip(upgrades.increaseDotValue.desc, mousePos.x, mousePos.y);
//     });
// $("#upgradeDotValue-i").on("mouseleave", function(){
//     hideTooltip();
//     });


    
//Tool tip
//##############
function showTooltip(htmlContent, x, y) {
    let tooltip = document.createElement("div");
    tooltip.className = "upgrade-tooltip";
    document.body.appendChild(tooltip);
    
    tooltip.innerHTML = htmlContent;
    tooltip.classList.add("show");

    // Position with screen-bound protection
    const padding = 18;
    let left = x + 20;
    let top = y + 20;

    if (left + tooltip.offsetWidth > window.innerWidth - padding) {
        left = x - tooltip.offsetWidth - 20;
    }
    if (top + tooltip.offsetHeight > window.innerHeight - padding) {
        top = y - tooltip.offsetHeight - 20;
    }

    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
}

function hideTooltip() {
    tooltip.classList.remove("show");
}


//###############

$("#nomscensionBttn").on('click',function(){
    openModal();
});


$("#nomscendBttn").on('click',function(){
    nomscend();
});

$("#debugBttn").on('click',function(){
    // gameState.score = gameState.score.plus(1000);
    unlockSquares();
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
    $("#"+button_id).css("background", "green");
    disableButton(button_id);
}


const nomCoinImgSrc = "./assets/images/NomCoin.png";
//Check all game buttons and update their status
export function buttonCheck(){
    for (let [key, value] of Object.entries(upgrades)){
        value.cost = increaseCost(value);
        if (value.type == "nomCoins"){
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.nomCoins));
            $("#"+value.id).html(`<img src="${nomCoinImgSrc}"class="icon-nomCoin">${formatNum(value.cost)}`);
        } else if (value.type == "score" ){
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.score));
            $("#"+value.id).html(`<div class="icon-dot"></div>${formatNum(value.cost)}`);
        } else if (value.type == "square"){
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.squares));
            $("#"+value.id).html(`<div class="icon-square"></div>${formatNum(value.cost)}`);
        }

        if (value.level >= value.maxlevel){
            $("#"+value.id).prop("disabled", true);
            $("#"+value.id).html(`MAXED`);
            $("#"+value.id).css("background", "green");
            $("#"+value.id).css("color", "black");
        } else {
            $("#"+value.id).css("background", "");
            $("#"+value.id).css("color", "");
        }
        //Update Descriptions
        $("#"+value.id+"Desc").text(value.desc);
        //Update Levels
        if ($("#"+value.id+"Lvl")){
            $("#"+value.id+"Lvl").text(`${value.level}/${value.maxlevel}`);
        }
    }
    $("#nomscendBttn").prop("disabled", 200000 > (gameState.nomscendScore))
}