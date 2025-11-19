import { mouseNom } from "./data.js";
import { eatSquare, showFloatingText } from "./score.js";
import { getCanvasCentre, randomDirection } from "./util.js";

export default class Square {
    constructor(x, y) {
        const { vx, vy } = randomDirection();
        this.x = x;
        this.y = y;
        this.size = 10;

        this.vx = vx;
        this.vy = vy;

        this.eaten = false;
    }

    update(canvas) {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on walls
        if (this.x < 0 || this.x > canvas.width - this.size) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height - this.size) {
            this.vy *= -1;
        }

        const { x: cx, y: cy } = getCanvasCentre();
        // Bounce off big central dot
        const dx = this.x - cx;
        const dy = this.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const minDist = 25 + this.size / 2;

        if (dist < minDist) {
            // Normalize normal vector
            const nx = dx / dist;
            const ny = dy / dist;

            // Dot product of velocity onto the normal
            const dot = this.vx * nx + this.vy * ny;

            // Reflect velocity
            this.vx = this.vx - 2 * dot * nx;
            this.vy = this.vy - 2 * dot * ny;

            // Push square out of circle slightly
            const overlap = 30 - dist;
            this.x += nx * overlap;
            this.y += ny * overlap;
        }


            
            
        this.checkEaten(mouseNom.x, mouseNom.y, mouseNom.radius);
        
    }

    draw(ctx) {
        ctx.fillStyle = "rgb(227, 0, 227)";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    

    // Collision test with a Nom
    checkEaten(eaterX, eaterY, eaterRadius) {
        // Find closest point on the square to the circle
        const closestX = Math.max(this.x, Math.min(eaterX, this.x + this.size));
        const closestY = Math.max(this.y, Math.min(eaterY, this.y + this.size));

        const dx = eaterX - closestX;
        const dy = eaterY - closestY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < eaterRadius) {
            this.eaten = true;
            showFloatingText(eatSquare(), this.x, this.y, "rgb(227, 0, 227)");
        }
    }
}
