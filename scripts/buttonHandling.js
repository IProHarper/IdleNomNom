import { createDot, createSquare, spawnDot } from './consumables.js';
import { enableAutofeed, createKids, nomscend, unlockSquare } from './features.js';
import { upgradeDotValue, upgradeDotMulti, upgradeDotSpawnRate, upgradeDotSpawnCount, addRoboNom, upgradeMaxDotCount} from './upgradeButtons.js';
import { unlockNomCoinScoreBoost, unlockRoboNoms, upgradeDotMultiMax, upgradeDotValMax, upgradeNomCoinMulti, upgradeNomDotVal } from './Upgrades/nomupgrades.js'
import { upgrades, gameState, mouseNom, roboList, mousePos, options } from './data.js';
import { calcBuyMax, formatNum, increaseCost  } from './util.js';

import { saveGame } from './gameFiles.js';
import { keepSquareUpgradesOnNom, setSquareResetTier, upgradeDotValMaxSquare, upgradeMaxRoboNoms, upgradeMaxSquareCount, upgradeSquareDotMulti, upgradeSquareMulti, upgradeSquareSpawnCount, upgradeSquareSpawnRate, upgradeSquareValue } from './Upgrades/squareUpgrades.js';

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
    switchMenu("#baseUpgrades","right");
});
$("#toggleNomUpgrades").on("click", function() {
    switchMenu("#nomUpgrades","right");
});
$("#toggleSquareUpgrades").on("click", function() {
    switchMenu("#squareUpgrades","right");
});
$("#toggleStats").on("click", function() {
    switchMenu("#stats-container","left");
});
$("#toggleCustomize").on("click", function() {
    switchMenu("#customize-container","left");
});


// Modal Handling
$(".closeBttn").on("click", () => {
    $("#popUpModal").hide();
    $("#patchModal").hide();
    $("#optionsModal").hide();
});
export function openModal() {
    $("#popUpModal").show();
}
$(window).on("click", function(event) {
    if (event.target === $("#popUpModal")[0]) {
        $("#popUpModal").hide();
    }
    if (event.target === $("#patchModal")[0]) {
        $("#patchModal").hide();
    }
    if (event.target === $("#optionsModal")[0]) {
        $("#optionsModal").hide();
    }
});

//###############
// Options
$("#toggleDrawDots").on("click", function() {
    if ($("#toggleDrawDots").hasClass('on')){
        options.drawDots = false;
        $("#toggleDrawDots").toggleClass('on');
        $("#toggleDrawDots").toggleClass('off');
    } else if ($("#toggleDrawDots").hasClass('off')){
        options.drawDots = true;
        $("#toggleDrawDots").toggleClass('on');
        $("#toggleDrawDots").toggleClass('off');
    }
});
$("#toggleDrawSquares").on("click", function() {
    if ($("#toggleDrawSquares").hasClass('on')){
        options.drawSquares = false;
        $("#toggleDrawSquares").toggleClass('on');
        $("#toggleDrawSquares").toggleClass('off');
    } else if ($("#toggleDrawSquares").hasClass('off')){
        options.drawSquares = true;
        $("#toggleDrawSquares").toggleClass('on');
        $("#toggleDrawSquares").toggleClass('off');
    }
});
$("#toggleDrawTriangles").on("click", function() {
    if ($("#toggleDrawTriangles").hasClass('on')){
        options.drawTriangles = false;
        $("#toggleDrawTriangles").toggleClass('on');
        $("#toggleDrawTriangles").toggleClass('off');
    } else if ($("#toggleDrawTriangles").hasClass('off')){
        options.drawTriangles = true;
        $("#toggleDrawTriangles").toggleClass('on');
        $("#toggleDrawTriangles").toggleClass('off');
    }
});
$("#toggleDrawDotsText").on("click", function() {
    if ($("#toggleDrawDotsText").hasClass('on')){
        options.drawFloatingDotText = false;
        $("#toggleDrawDotsText").toggleClass('on');
        $("#toggleDrawDotsText").toggleClass('off');
    } else if ($("#toggleDrawDotsText").hasClass('off')){
        options.drawFloatingDotText = true;
        $("#toggleDrawDotsText").toggleClass('on');
        $("#toggleDrawDotsText").toggleClass('off');
    }
});
$("#toggleDrawSquaresText").on("click", function() {
    if ($("#toggleDrawSquaresText").hasClass('on')){
        options.drawFloatingSquareText = false;
        $("#toggleDrawSquaresText").toggleClass('on');
        $("#toggleDrawSquaresText").toggleClass('off');
    } else if ($("#toggleDrawSquaresText").hasClass('off')){
        options.drawFloatingSquareText = true;
        $("#toggleDrawSquaresText").toggleClass('on');
        $("#toggleDrawSquaresText").toggleClass('off');
    }
});
$("#toggleDrawTriangleText").on("click", function() {
    if ($("#toggleDrawTriangleText").hasClass('on')){
        options.drawFloatingTriangleText = false;
        $("#toggleDrawTriangleText").toggleClass('on');
        $("#toggleDrawTriangleText").toggleClass('off');
    } else if ($("#toggleDrawTriangleText").hasClass('off')){
        options.drawFloatingTriangleText = true;
        $("#toggleDrawTriangleText").toggleClass('on');
        $("#toggleDrawTriangleText").toggleClass('off');
    }
});
$("#toggleRoboNoms").on("click", function() {
    if ($("#toggleRoboNoms").hasClass('on')){
        options.drawRoboNoms = false;
        $("#toggleRoboNoms").toggleClass('on');
        $("#toggleRoboNoms").toggleClass('off');
    } else if ($("#toggleRoboNoms").hasClass('off')){
        options.drawRoboNoms = true;
        $("#toggleRoboNoms").toggleClass('on');
        $("#toggleRoboNoms").toggleClass('off');
    }
});

//################
//Customization buttons (Color)
$("#enableDefaultMode").on('click',function(){
    mouseNom.color = "white";
    gameState.dotColor = "white";
});

$("#enableLachlanMode").on('click',function(){
    mouseNom.color = "purple";
    gameState.dotColor = "white";
});
$("#enableCillianMode").on('click',function(){
    mouseNom.color = "blue";
    gameState.dotColor = "white";
});
$("#enableConallMode").on('click',function(){
    mouseNom.color = "yellow";
    gameState.dotColor = "white";
});
$("#enableAidanMode").on('click',function(){
    mouseNom.color = "red";
    gameState.dotColor = "white";
});
$("#enableRinoMode").on('click',function(){
    mouseNom.color = "rgb(255, 75, 165)";
    gameState.dotColor = "rgb(255, 75, 165)";
});
$("#enableMichanMode").on('click',function(){
    mouseNom.color = "orange";
    gameState.dotColor = "white";
});
$("#enableKinsanMode").on('click',function(){
    mouseNom.color = "grey";
    gameState.dotColor = "white";
});


$("#enableDADMode").on('click',function(){
     mouseNom.color = "green";
    // $("#mrNomNom").css("fill", "green");
    // if ($(".nomnomjr").children().length == 0){
    //     createKids()
    // } else {
    //     $(".nomnomjr").children().show();
    // }
    
});
//####################

//Toggle Right Menu
function switchMenu(activeMenu,side){
    if (!$(activeMenu).hasClass('hidden')){
        $(activeMenu).toggleClass('hidden');
    } else {
        $(".upgrades-container-"+side).each(function() {
            if(!$(this).hasClass('hidden')){
                $(this).toggleClass('hidden');
            }
    });
    $(activeMenu).toggleClass('hidden');
    }   
}

const upgradeActions = {
    upgradeDotValue,
    upgradeDotMulti,
    upgradeDotSpawnRate,
    upgradeDotSpawnCount,
    upgradeMaxDotCount,
    unlockRoboNoms,
    unlockSquare,
    upgradeNomDotVal,
    upgradeDotValMax,
    upgradeDotMultiMax,
    addRoboNom,
    upgradeNomCoinMulti,
    unlockNomCoinScoreBoost,
    upgradeSquareValue,
    upgradeSquareMulti,
    upgradeSquareSpawnRate,
    upgradeSquareSpawnCount,
    upgradeMaxSquareCount,
    upgradeMaxRoboNoms,
    upgradeSquareDotMulti,
    keepSquareUpgradesOnNom,
    upgradeDotValMaxSquare
};

export function handleUpgrade(id) {
    const action = upgradeActions[id];
    if (action) {
        action();
    } else {
        console.warn(`Unknown upgrade ID: ${id}`);
    }
}


export function handleBuyMax(ButtonID){
    for(let item in upgrades){
        if (String(ButtonID) == String(upgrades[item].id)+"MaxBttn"){
            const numOfupgrades = calcBuyMax(upgrades[item]).count;
            const action = upgradeActions[upgrades[item].id];
            for (let i=1; i<numOfupgrades+1; i++){
                action();
            }
        }
    }

}




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
    $("#popUpModal").hide();
    
});

$("#debugBttn").on('click',function(){
    // gameState.score = gameState.score.plus(10000);
    // gameState.nomCoins = gameState.nomCoins.plus(1000);
});

$("#OptionsBttn").on('click', function(){
    $("#optionsModal").show();
});


$("#ResetBttn").click(function(){
    if (confirm("Warning! You are about to Reset all progress and start from 0.\nAre you sure you wish to continue?")){
        localStorage.removeItem("gameState");
        localStorage.removeItem("Upgrades");
        localStorage.removeItem("shopUpgrades");
        location.reload();
    }    
});
$("#resetProgressModal").click(function() {
    if (confirm("Confirming this will Reset your progress. Hope it wasn't too much. Sorry...")){
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
        if (value.type == "nomCoins"){
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.nomCoins));
            $("#"+value.id+" .cost-text").html(formatNum(value.cost));
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