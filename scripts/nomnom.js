import { options, squareList, triangleList } from "./data.js";
import { increaseScore, showFloatingText } from "./score.js";
import { distance, getCanvasCentre, randomDirection } from "./util.js";

export class RoboNom {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;

        const {vx, vy} = randomDirection(1.5);
        // Random initial velocity
        this.vx = vx;
        this.vy = vy;

        // How often to change direction (ms)
        this.directionChangeMin = 800;
        this.directionChangeMax = 5000;

        this.scheduleDirectionChange();

        this.mouthTimer = 0;
        this.mouthSpeed = 0.06;
    }

    update(canvas, dotList) {

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls + hanlding for getting stuck in walls
        if (this.x < 0) {
            this.x += 5;
            this.vx *= -1;
        }
        if (this.x > canvas.width){
            this.x -= 5;
            this.vx *= -1;
        }
        if (this.y < 0){
            this.y += 5;
            this.vy *= -1;
        } 
        if (this.y > canvas.height){
            this.y -= 5;
            this.vy *= -1;
        } 

        this.bounceOffCentre();

        // Mouth animation timer
        this.mouthTimer += this.mouthSpeed;

        // Check collision with dots
        for (let dot of dotList) {
            const distToDot = distance(this.x, this.y, dot.x, dot.y);
            if (distToDot < this.radius + dot.r) {
                dot.eaten = true;
                if (options.DrawDotsText){
                        showFloatingText(increaseScore(), this.x, this.y, "white");
                } else {
                increaseScore();
                }
            }
        }
        //Check for collision with squares
        for (let square of squareList){
            square.checkEaten(this.x, this.y, this.radius);
        }
        // for (let triangle of triangleList){
        //     triangle.eaten = triangle.checkCollision(this.x, this.y, this.radius);
        // }
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

    scheduleDirectionChange() {
        // pick a random time between min and max
        const delay = Math.random() * 
            (this.directionChangeMax - this.directionChangeMin) + this.directionChangeMin;

        setTimeout(() => {
            this.randomizeDirection();
            this.scheduleDirectionChange(); // schedule again
        }, delay);
    }

    randomizeDirection() {
        // Slight directional nudge (keeps movement smooth)
        const angle = Math.random() * Math.PI * 2; // anywhere on 360°
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy); // keep original speed

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
    }

    bounceOffCentre(){
        // Bounce off big central dot
        const { x: cx, y: cy } = getCanvasCentre();
        const centreDotR = 25;
        const dist = distance(this.x, this.y, cx, cy);
        if (dist < centreDotR + this.radius) {
            // Compute normal vector and reflect velocity
            const nx = (this.x - cx) / dist;
            const ny = (this.y - cy) / dist;
            const nom = this.vx * nx + this.vy * ny;
            this.vx -= 2 * nom * nx;
            this.vy -= 2 * nom * ny;

            // Push dot just outside the big dot
            const overlap = centreDotR + this.radius - dist;
            this.x += nx * overlap;
            this.y += ny * overlap;
        }
    }
}
