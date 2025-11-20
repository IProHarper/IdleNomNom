import { squareList } from "./data.js";
import { increaseScore, showFloatingText } from "./score.js";
import { distance, randomDirection } from "./util.js";

export class RoboNom {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;

        const {vx, vy} = randomDirection();
        // Random initial velocity
        this.vx = vx;
        this.vy = vy;

        this.mouthTimer = 0;
        this.mouthSpeed = 0.06;
    }

    update(canvas, dotList) {

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on walls
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.vx *= -1;
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
            this.vy *= -1;
        }

        // Mouth animation timer
        this.mouthTimer += this.mouthSpeed;

        // Check collision with dots
        for (let dot of dotList) {
            const distToDot = distance(this.x, this.y, dot.x, dot.y);
            if (distToDot < this.radius + dot.r) {
                dot.eaten = true;
                showFloatingText(increaseScore(), this.x, this.y, "white");
            }
        }
        //Check for collision with squares
        for (let square of squareList){
            square.checkEaten(this.x, this.y, this.radius);
        }
    }

    draw(ctx) {
        // Angle of movement — Pac-Man faces his direction
        const angle = Math.atan2(this.vy, this.vx);

        // Mouth animation: open/close
        const mouthAmount = Math.abs(Math.sin(this.mouthTimer)) * 0.4;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);

        ctx.arc(0, 0, this.radius, mouthAmount, Math.PI * 2 - mouthAmount);
        ctx.lineTo(0, 0);
        ctx.fillStyle = "#FF2E96";
        ctx.fill();

        ctx.restore();
    }
}
