import { createDot, createSquare, spawnDot } from './consumables.js';
import { enableAutofeed, createKids, nomscend, unlockSquare, unlockTriangles } from './features.js';
import { upgradeDotValue, upgradeDotMulti, upgradeDotSpawnRate, upgradeDotSpawnCount, addRoboNom, upgradeMaxDotCount} from './upgradeButtons.js';
import { unlockNomCoinScoreBoost, unlockRoboNoms, upgradeDotMultiMax, upgradeDotValMax, upgradeNomCoinMulti, upgradeNomDotVal } from './Upgrades/nomupgrades.js'
import { upgrades, gameState, mouseNom, roboList, mousePos, options, triangleList } from './data.js';
import { calcBuyMax, calcNomGain, formatNum, getCanvasCentre, increaseCost  } from './util.js';

import { saveGame } from './gameFiles.js';
import { keepSquareUpgradesOnNom, setSquareResetTier, upgradeDotValMaxSquare, upgradeMaxRoboNoms, upgradeMaxSquareCount, upgradeSquareDotMulti, upgradeSquareMulti, upgradeSquareSpawnCount, upgradeSquareSpawnRate, upgradeSquareValue } from './Upgrades/squareUpgrades.js';
import { Triangle } from './triangle.js';
import { upgradeMaxTriangleCount, upgradeTriangleMulti, upgradeTriangleSpawnCount, upgradeTriangleSpawnRate, upgradeTriangleValue } from './Upgrades/triangleUpgrades.js';

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
$("#toggleTriangleUpgrades").on("click", function() {
    switchMenu("#triangleUpgrades","right");
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
document.querySelectorAll('.toggle input').forEach(chk => {
  chk.addEventListener('change', () => {
    const isOn = chk.checked;
    const id = chk.id;

    chk.classList.toggle('on', isOn);
    chk.classList.toggle('off', !isOn);

    console.log(id.replace("toggle", ""), " = ", isOn);
    const optionID = id.replace("toggle", "")
    options[optionID] = isOn;
  });
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
    upgradeDotValMaxSquare,
    upgradeTriangleValue,
    upgradeTriangleMulti,
    upgradeTriangleSpawnCount,
    upgradeTriangleSpawnRate,
    upgradeMaxTriangleCount,
    unlockTriangles
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
export function addDescriptionHover(){
    document.querySelectorAll('.upgrade-card').forEach(card => {
        if (!card.querySelector(".upgradeBttn")){
                return;
            }
        card.addEventListener('mouseenter', function(){
            console.log("Hi")
            
            const upgradeID = (card.querySelector(".upgradeBttn").id);
            
            let descText = "";
            for (const obj in upgrades){
                if (upgrades[obj].id == upgradeID && upgrades[obj].desc){
                    descText = upgrades[obj].desc;
                }
            }
            const pos = card.getBoundingClientRect();
            const cardWidth = 200;
            showTooltip(descText, pos.x-cardWidth, pos.y);
        });
        card.addEventListener('mouseleave', function(){
            hideTooltip();
        });
    });
}


    
//Tool tip
//##############
function showTooltip(htmlContent, x, y) {
    
    $("#tooltip").html(htmlContent);
    $("#tooltip").toggleClass("show");

    // Position with screen-bound protection
    const padding = 18;

    $("#tooltip").css("left", x)
    $("#tooltip").css("top", y);
}

function hideTooltip() {
    $("#tooltip").toggleClass("show");
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
    unlockTriangles();
    const {x,y} = getCanvasCentre();
    const tri = new Triangle(x, y);
    triangleList.push(tri);
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

const triangleIcon = `
<svg class="triangle-svg" viewBox="0 0 32 32" role="img">
    <polygon points="16,3 32,32 3,32" style="fill:green;"/>
</svg>`;
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
        } else if (value.type == "triangle"){
            $("#"+value.id).prop("disabled", value.cost.greaterThan(gameState.triangles));
            $("#"+value.id).html(`<div class="icon-triangle">${triangleIcon}</div>${formatNum(value.cost)}`);
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
    $("#nomscendBttn").prop("disabled", 5 > (calcNomGain()));
}