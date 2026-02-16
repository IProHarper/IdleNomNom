import { saveGame,checkSaveFile } from './gameFiles.js';
import { gameState, gameStages, upgrades, mouseNom, mousePos } from './data.js'
import { setDotsALL, setDotSpawnRate, setOptions, setRoboNoms, setSquaresALL, setUpgradeCosts } from './util.js';
import { addDescriptionHover, buttonCheck, handleBuyMax, handleUpgrade } from './buttonHandling.js';
import { unlockNomscend, unlockSquare, unlockTriangles } from './features.js';
import { initDisplay, updateStats, updateProgressBar, updateCanvas } from './display.js';
import { prestigeAnimationPrep } from './prestigeAnimation.js';


$(document).ready(function(){

    //Load the gamestate if it exists in local storage
    checkSaveFile();
    setUpgradeCosts();
    initDisplay();
    addDescriptionHover();
    setOptions();
    setDotsALL();
    if (upgrades.unlockSquares.bought){
        unlockSquare();
    }
    if (upgrades.unlockTriangles.bought){
        unlockTriangles();
    }
    

    


    const canvas = document.getElementById("gameCanvas");

    // Match canvas pixel size to display size
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    updateCanvas();
    setDotSpawnRate();
    setRoboNoms();

    //Add event handler to all upgrade buttons
    $(document).on("click", ".upgradeBttn", function() {
        const id = $(this).attr("id");
        // console.log(`Upgrade clicked: ${id}`);
        handleUpgrade(id);
    });
    $(document).on("click", ".maxBttn", function() {
        const id = $(this).attr("id");
        handleBuyMax(id);
    });

    canvas.addEventListener('touchstart', handleTouchStart, false);
    canvas.addEventListener('touchmove', handleTouchMove, false);
    canvas.addEventListener('touchend', handleTouchEnd, false);


    setInterval(updateDisplay, 100);
    var saveGameLoop = window.setInterval(function() {
        saveGame();
      }, 30000);

    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    
    function drawTouchNom (touchEvent) {

        mousePos.x = touchEvent.clientX ;
        mousePos.y = touchEvent.clientY;

        const rect = canvas.getBoundingClientRect();
        const newX = touchEvent.clientX - rect.left;
        const newY = touchEvent.clientY - rect.top;

        // calculate direction angle (facing the cursor movement)
        const dx = newX - lastMousePos.x;
        const dy = newY - lastMousePos.y;
        if (Math.abs(dx) + Math.abs(dy) > 1) { // only update if moved
            mouseNom.mouthAngle = Math.atan2(dy, dx);
            lastMousePos = { x: newX, y: newY };
        }

        mouseNom.x = newX;
        mouseNom.y = newY;
        
    }
    
    function handleTouchStart(e) {
        e.preventDefault(); // Prevent default browser behavior like scrolling
        const touch = e.changedTouches[0]; // Get the first touch point
        drawTouchNom(touch);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.changedTouches[0];
        drawTouchNom(touch);
    }

    function handleTouchEnd(e) {
        e.preventDefault();
    }

    //Mouse Movement
    let lastMousePos = { x: canvas.width / 2, y: canvas.height / 2 };
    canvas.addEventListener("mousemove", (e) => {

        mousePos.x = e.clientX;
        mousePos.y = e.clientY;

        const rect = canvas.getBoundingClientRect();
        const newX = e.clientX - rect.left;
        const newY = e.clientY - rect.top;

        // calculate direction angle (facing the cursor movement)
        const dx = newX - lastMousePos.x;
        const dy = newY - lastMousePos.y;
        if (Math.abs(dx) + Math.abs(dy) > 1) { // only update if moved
            mouseNom.mouthAngle = Math.atan2(dy, dx);
            lastMousePos = { x: newX, y: newY };
        }

        mouseNom.x = newX;
        mouseNom.y = newY;
    });

    function updateDisplay(){
        buttonCheck();
        updateStats();
    }

    prestigeAnimationPrep();

});

export function progressGameStage(){
        if (gameState.stage > gameStages.length-1){
            gameState.stage = gameStages.length-1;
        }
        let stat = new Decimal(0);
        if (gameStages[gameState.stage].statType == "score"){
            stat = gameState.liftimeScore;
        } else if (gameStages[gameState.stage].statType == "nomscend"){
            stat = gameState.nomscensionCount;
        } else if (gameStages[gameState.stage].statType == "square"){
            stat = gameState.lifetimeSquares;
        }else if (gameStages[gameState.stage].statType == "cap"){
            stat = new Decimal(0);
        }
        if (stat.greaterThanOrEqualTo(gameStages[gameState.stage].requirement)){
            gameState.stage = gameState.stage+1;
            switch(gameState.stage) {
                case 1:
                    gameState.nomscentionUnlocked = true;
                    unlockNomscend();
                    break;
                case 2:
                    console.log("Stage 2")
                    break;
                case 3:
                    console.log("Stage 3")
                    break;
                default:
                    console.log("Stage ?")
            }
                
            
        }
        updateProgressBar();
    }