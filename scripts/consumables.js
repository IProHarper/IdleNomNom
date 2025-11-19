import { increaseScore } from './score.js'
import { gameState, dotList, squareList } from './data.js';
// import { playEatDotSound } from './soundHandler.js';
import { getCanvasCentre } from './util.js';
import Dot from './dots.js';
import Square from './squares.js';


export function spawnDot(){
        if (dotList.length < gameState.dotMaxCount){
            const { x, y } = getCanvasCentre();
            dotList.push(new Dot(x, y));
        }
    }

export function spawnSquare(){
        if (squareList.length < gameState.squareMaxCount){
            const { x, y } = getCanvasCentre();
            squareList.push(new Square(x, y));
        }
    }



//Create the nomnom dot. Move to nomnom position with dotspeed transition.
export function createDot() {
    //Create dot on the page far right hand side.
    const gameContainer = document.querySelector('.nomnom-container');
    const dot = document.createElement('div');
    dot.classList.add('dot');
    gameContainer.appendChild(dot);
    dot.style.backgroundColor = $("#mrNomNom").css('fill');

    let position = gameContainer.clientWidth;
    dot.style.left = position + 'px';

    // Apply dynamic animation duration
    dot.style.transition = `${gameState.dotSpeed}s`;
    dot.style.transitionTimingFunction = `linear`;
    dot.style.translate = `-${position/2}px`;
    
    dot.addEventListener("transitionend", (event) => {
        dot.remove();
        if (event.propertyName == 'left'){
            showFloatingText(increaseScore(),position/2+20, gameContainer.clientHeight/2-22);
            // showFloatingText(gameState.dotValue.times(gameState.dotMulti), position/2+20, gameContainer.clientHeight/2-22);
            //playEatDotSound();
        } 
    });
}

export function createSquare() {
    //Create dot on the page far right hand side.
    let mrSquare = $("#mrSquareContainer");
    console.log($("#mrSquareContainer"));
    const square = document.createElement('div');
    square.classList.add('square');    
    $("#mrSquareContainer").append(square);
    square.style.backgroundColor = $("#mrNomNom").css('fill');
    let position = $("#mrSquareContainer").width()
    square.style.left = position + 'px';

    // Apply dynamic animation duration
    square.style.transition = `1s`;
    square.style.transitionTimingFunction = `linear`;
    square.style.translate = `-${position/2}px`;
    
    square.addEventListener("transitionend", (event) => {
        square.remove();
        if (event.propertyName == 'left'){
            showFloatingText(gameState.squareValue, position/2+20, $("#mrSquareContainer").height);
        } 
    });
}

function returnRandNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// $('<div class="dot rounded"></div>')