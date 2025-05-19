import { increaseScore } from './score.js'
import { upgrades } from './data.js';
import { gameState } from './data.js';


//Create the nomnom dot. Move to nomnom position with dotspeed transition.
export function createDot() {
    //Create dot on the page far right hand side.
    const gameContainer = document.querySelector('.nomnom-container');
    const dot = document.createElement('div');
    dot.classList.add('dot');
    gameContainer.appendChild(dot);
    let position = gameContainer.clientWidth;
    dot.style.left = position + 'px';

    // Apply dynamic animation duration
    dot.style.transition = `${gameState.dotSpeed}s`;
    dot.style.transitionTimingFunction = `linear`;
    dot.style.translate = `-${position/2-20}px`;
    
    dot.addEventListener("transitionend", (event) => {
        dot.remove();
        if (event.propertyName == 'left'){
            increaseScore();
        } 
    });
}