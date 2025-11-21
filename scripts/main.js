import { saveGame,checkSaveFile } from './gameFiles.js';
import { gameState, gameStages, mouseNom, mousePos } from './data.js'
import { setDotSpawnRate, setRoboNoms } from './util.js';
import { buttonCheck, handleBuyMax, handleUpgrade } from './buttonHandling.js';
import { unlockNomscend } from './features.js';
import { initDisplay, updateStats, updateProgressBar, updateCanvas } from './display.js';


$(document).ready(function(){

    //Load the gamestate if it exists in local storage
    checkSaveFile();
    initDisplay();

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


    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Match canvas pixel size to display size
    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    updateCanvas();
    setDotSpawnRate();
    setRoboNoms();
    

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


    setInterval(updateDisplay, 100);
    var saveGameLoop = window.setInterval(function() {
        saveGame();
      }, 30000);


});

export function progressGameStage(){
        if (gameState.stage > gameStages.length-1){
        return
    }
        let stat = new Decimal(0);
        if (gameStages[gameState.stage].statType == "score"){
            stat = gameState.liftimeScore;
        } else if (gameStages[gameState.stage].statType == "nomscend"){
            stat = gameState.nomscensionCount;
        } else if (gameStages[gameState.stage].statType == "square"){
            stat = gameState.squares;
        }else if (gameStages[gameState.stage].statType == "cap"){
            stat = gameState.liftimeScore;
        }
        if (stat.greaterThanOrEqualTo(gameStages[gameState.stage].requirement)){
            gameState.stage = gameState.stage+1;
            gameState.nomscentionUnlocked = true;
            unlockNomscend();
        }
        updateProgressBar();
    }