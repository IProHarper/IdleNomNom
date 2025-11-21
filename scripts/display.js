import { gameState, upgrades, gameStages, dotList, mouseNom, roboList, squareList } from "./data.js";
import { unlockSquare } from "./features.js";
import { progressGameStage } from "./main.js";
import { calcNomGain, formatNum, getCanvasCentre } from "./util.js";

export let floatingTexts = [];


export function initDisplay(){
    //Set display to only have upgrades at first
    $("#nomUpgrades").toggleClass("hidden");
    $("#squareUpgrades").toggleClass("hidden");
    $("#customize-container").toggleClass("hidden");

    //Add extra upgrades to page:
    addUpgrade("#baseUpgrades", upgrades.increaseDotSpawnRate);
    addUpgrade("#baseUpgrades", upgrades.increaseDotSpawnCount);
    addUpgrade("#baseUpgrades", upgrades.increaseMaxDotCount);

    $("#nomscendUpgradesBttn").hide(); 
    $("#toggleNomUpgrades").hide();
    $("#nomCoinGainText").text(calcNomGain());
    $("#nomscensionBttn").hide();
    $("#nomCoinDisplay").hide();
    $("#upgradeAutoFeedSpeed").parent().hide();

    //Hide other noms - Not in use yet.
    $("#mrHexContainer").hide();
    $("#mrTriangleContainer").hide();
    $("#mrSquareContainer").hide();
    $("#mrNomNomContainer").hide();
    
     // Shop Upgrades
    $("#upgradeAutoFeedSpeedDesc").text(upgrades.autoFeed.desc);


    //Display nomscention specfics buttons and areas if its unlocked.
    if (gameState.nomscentionUnlocked) {
        $("#nomscendUpgradesBttn").show(); 
        $("#nomscensionBttn").show();
        $("#nomCoinDisplay").show();
        $("#toggleNomUpgrades").show();
    }
    if (upgrades.unlockRoboNom.level > 1){
        addUpgrade("#baseUpgrades", upgrades.addRoboNom);
    }
    if (upgrades.unlockSquares.bought){
        unlockSquare();
    }
    progressGameStage();
}

export function updateStats(){
    $("#score").text(formatNum(gameState.score))
    $("#squares").text(formatNum(gameState.squares));
    $("#activeDots").text(dotList.length+"/"+gameState.dotMaxCount)
    $("#activeSquares").text(squareList.length+"/"+gameState.squareMaxCount)
    
    //Dots
    $("#dotBaseValueText").text(formatNum(gameState.dotValue));
    $("#dotMultiText").text(formatNum(gameState.dotMulti));
    $("#dotSpawnAmountText").text(gameState.dotSpawnCount);
    $("#dotSpawnRateText").text(gameState.dotSpawnInterval+"s");
    $("#dotMaxSpawnText").text(gameState.dotMaxCount);
    
    //Squares Stats:
    $("#squareBaseValueText").text(formatNum(gameState.squareValue));
    $("#squareMultiText").text(formatNum(gameState.squareMulti));
    $("#squareSpawnAmountText").text(gameState.squareSpawnCount);
    $("#squareSpawnRateText").text(gameState.squareSpawnInterval+"s");
    $("#squareMaxSpawnText").text(gameState.squareMaxCount);

    $("#dotsEatenText").text(formatNum(gameState.dotsEaten));
    $("#lifetimeScoreText").text(formatNum(gameState.liftimeScore));
    $("#squaresEatenText").text(formatNum(gameState.squaresEaten));
    $("#lifetimeSquaresText").text(formatNum(gameState.lifetimeSquares));
    $("#nomscensionCountText").text(formatNum(gameState.nomscensionCount));
    $("#LifetimeNomCoinsText").text(formatNum(gameState.lifetimeNomCoins));
    $("#nomCoinStatText").text(formatNum(gameState.nomCoins));
    $("#nomCoinsText").text(formatNum(gameState.nomCoins));
    $("#nomScoreBoostAmountText").text(formatNum(gameState.nomScoreBoostAmount));

    //Update Nomsension coins
    //Stats version
    $("#nomCoinGainText").text(calcNomGain());
    //Modal version
    $("#nomCoinGainsText").text(calcNomGain());
}


    //Upgrade progressBar based on score
export function updateProgressBar() {
    if (gameState.stage > gameStages.length-1){
        return
    }
    let stat = new Decimal
    if (gameStages[gameState.stage].statType == "score"){
        stat = gameState.liftimeScore;
    } else if (gameStages[gameState.stage].statType == "nomscend"){
        stat = gameState.nomscensionCount;
    } else if (gameStages[gameState.stage].statType == "square"){
        stat = gameState.squares
    }else if (gameStages[gameState.stage].statType == "cap"){
        stat = gameState.liftimeScore;
    }
    let progressBar = document.querySelector('.progress-bar');
    let progressBarText = document.getElementById('progress-text');
    let maxScore = gameStages[gameState.stage].requirement;
    let progress = (stat.divideBy(maxScore).toNumber())*100;

    progressBar.style.width = progress + "%";
    progressBarText.innerHTML = `${gameStages[gameState.stage].progressText} - (${progress.toFixed(2)}%)`;
}

export function addUpgrade(upgradePosition, upgradeData){

    let newUpgrade = document.createElement('div');
    newUpgrade.classList.add("upgrade-card");

    newUpgrade.innerHTML +=
    `<div class="upgrade-header">
        <span class="upgrade-icon"></span>
        <div class="upgrade-info">
            <h3 class="upgrade-name">${upgradeData.name}</h3>            
            <p class="upgrade-description" id="${upgradeData.id}Desc">Increases Dot Value</p>
            <span id="${upgradeData.id}Lvl" class="upgrade-level">0</span>
        </div>
    </div>
    <div class="upgrade-actions">
        <button id="${upgradeData.id}" class="upgradeBttn">Cost: 100</button>
        <button class="maxBttn" id="${upgradeData.id}MaxBttn">Max</button>
    </div`;

    $(upgradePosition).find(".upgrades-grid").append(newUpgrade);
}

export function addNomUpgrade(upgradePosition, upgradeData){

    let newUpgrade = document.createElement('div');
    newUpgrade.classList.add("upgrade-card");

    newUpgrade.innerHTML +=
    `<div class="upgrade-card">
        <div class="upgrade-header">
            <span class="upgrade-icon"></span>
            <div class="upgrade-info">
                <h3 class="upgrade-name">${upgradeData.name}</h3>
                <p class="upgrade-description" id="${upgradeData.id}Desc">Desc</p>
            </div>
        </div>
        <button id="${upgradeData.id}" class="nomBttn"><span id="${upgradeData.id}Text">0</span>
            <img class="buttonImg" src="./assets/images/NomCoin.png" alt="Nom coins">
        </button>
                </div>`;

    $(upgradePosition).find(".upgrades-grid").append(newUpgrade);
}



export function updateCanvas(){
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCentreDot(ctx);


    //Draw Dots
    for (const dot of dotList) {
        dot.update();
        dot.draw(ctx);
    }
    // Remove eaten dots
    dotList.splice(0, dotList.length, ...dotList.filter(dot => !dot.eaten));

    //Draw Squares
    for (const square of squareList) {
        square.update(canvas);
        square.draw(ctx);
    }
    //Remove eaten squares
    squareList.splice(0, squareList.length, ...squareList.filter(square => !square.eaten));

    //Draw RoboNoms
    for (const robo of roboList) {
        robo.update(canvas, dotList);
        robo.draw(ctx);
    }

    drawFloatingTexts(ctx);
    drawMouseNom(ctx);
    requestAnimationFrame(updateCanvas);
}

function drawMouseNom(ctx) {
    const time = performance.now();
    //Mouth animation settings
    const maxMouthAngle = Math.PI / 5; // how wide he opens
    // Smooth open/close animation
    const mouthAngle = Math.abs(Math.sin(time / mouseNom.chompSpeed)) * maxMouthAngle;
    // Determine facing direction from movement
    // (Assumes you store previous frame position in mouseNom.prevX / prevY)
    const dx = mouseNom.x - (mouseNom.prevX ?? mouseNom.x);
    const dy = mouseNom.y - (mouseNom.prevY ?? mouseNom.y);
    const angle = Math.atan2(dy, dx); // direction Pac-Man should face

    // Store for next frame
    mouseNom.prevX = mouseNom.x;
    mouseNom.prevY = mouseNom.y;

    // 🟡 Draw Pac-Man
    ctx.save();
    ctx.translate(mouseNom.x, mouseNom.y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, mouseNom.radius, mouthAngle, Math.PI * 2 - mouthAngle);
    ctx.closePath();

    ctx.fillStyle = mouseNom.color;
    ctx.fill();
    ctx.restore();
}

function drawCentreDot(ctx){
    const centre = getCanvasCentre();
    // Draw big central dot
    ctx.beginPath();
    ctx.arc(centre.x, centre.y, 25, 0, Math.PI * 2);
    ctx.fillStyle = "#33ecff";
    ctx.fill();
}

function drawFloatingTexts(ctx) {
    const now = performance.now();

    // Keep only active texts
    floatingTexts = floatingTexts.filter(ft => now - ft.createdAt < ft.lifetime);

    floatingTexts.forEach(ft => {
        const progress = (now - ft.createdAt) / ft.lifetime;
        const rise = progress * 40; // how far the text rises up
        const alpha = 1 - progress; // fade out over time

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(ft.x, ft.y - rise);
        ctx.rotate(ft.rotation);
        ctx.fillStyle = ft.colour;
        ctx.font = "bold 15px pixleFont";
        ctx.textAlign = "center";
        ctx.fillText(ft.text, 0, 0);
        ctx.restore();
    });
}
