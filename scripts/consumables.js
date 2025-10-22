import { increaseScore } from './score.js'
import { upgrades } from './data.js';
import { gameState } from './data.js';
import { playEatDotSound } from './soundHandler.js';


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
            increaseScore();
            showFloatingText(gameState.dotValue.times(gameState.dotMulti), position/2+20, gameContainer.clientHeight/2-22);
            //playEatDotSound();
        } 
    });
}

function showFloatingText(text, x, y) {
    const gameContainer = document.querySelector('.nomnom-container');
    const floatingText = document.createElement('div');
    floatingText.classList.add('floating-text');
    gameContainer.appendChild(floatingText);

    floatingText.textContent = "+" + text.toFixed(0);
    floatingText.style.left = `${x-20}px`;
    floatingText.style.top = `${y}px`;
    const transR = Math.floor(Math.random() * (360 - -360 + 1)) + 360;

    floatingText.style.rotate = `${transR}deg`;
    // Remove after animation
    floatingText.addEventListener("animationend", () => {
        floatingText.remove();
    });
}