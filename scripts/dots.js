import {  gameState, mouseNom, options } from "./data.js";
import { increaseScore, showFloatingText } from "./score.js";
import { distance, getCanvasCentre, randomDirection } from "./util.js";

const canvas = document.getElementById("gameCanvas");

export default class Dot {
    constructor(x, y) {
        const { vx, vy } = randomDirection();
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = 5;
        this.color = gameState.dotColor;
    }

    updateColor(newColor) {
        this.color = newColor;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x - this.r < 0 || this.x + this.r > canvas.width) {
        this.vx *= -1;
        this.x = Math.max(this.r, Math.min(canvas.width - this.r, this.x));
        }
        if (this.y - this.r < 0 || this.y + this.r > canvas.height) {
        this.vy *= -1;
        this.y = Math.max(this.r, Math.min(canvas.height - this.r, this.y));
        }

        // Bounce off big central dot
        const { x: cx, y: cy } = getCanvasCentre();
        const dist = distance(this.x, this.y, cx, cy);
        if (dist < 25 + this.r) {
            // Compute normal vector and reflect velocity
            const nx = (this.x - cx) / dist;
            const ny = (this.y - cy) / dist;
            const dot = this.vx * nx + this.vy * ny;
            this.vx -= 2 * dot * nx;
            this.vy -= 2 * dot * ny;

            // Push dot just outside the big dot
            const overlap = 25 + this.r - dist;
            this.x += nx * overlap;
            this.y += ny * overlap;
        }
    // Check collision with Pacman
    const distToNom = distance(this.x, this.y, mouseNom.x, mouseNom.y);
    if (distToNom < this.r + mouseNom.radius) {
      this.eaten = true;
      if (options.drawFloatingDotText){
              showFloatingText(increaseScore(), this.x, this.y, "white");
      } else {
        increaseScore();
      }
    }
}

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}