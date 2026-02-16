import { gameState, mouseNom } from "./data.js";
import { eatTriangle, showFloatingText } from "./score.js";
import { distance } from "./util.js";

export class Triangle {
    constructor(centerX, centerY) {
        this.color = "green";
        this.dashColor = "lime";


        this.size = 10;

        // Spawn around center
        const angle = Math.random() * Math.PI * 2;
        const spawnRadius = 25 + this.size + 6;

        this.x = centerX + Math.cos(angle) * spawnRadius;
        this.y = centerY + Math.sin(angle) * spawnRadius;

        // Base velocity
        this.speed = 5.0;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;

        // Rotation
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.6) - 0.4;

        this.eaten = false;

        this.centerX = centerX;
        this.centerY = centerY;

        // DASHING SYSTEM
        this.isDashing = false;
        this.dashSpeed = 12;       // how fast during dash
        this.dashDuration = 400;  // ms
        this.nextDashTime = performance.now() + this.randomDashDelay();
    }

    // Random delay between dashes
    randomDashDelay() {
        return 500 + Math.random() * 1000; // seconds
    }

    // Begin dash
    startDash() {
        this.isDashing = true;
        
         // Slight directional nudge (keeps movement smooth)
        const angle = Math.random() * Math.PI * 2; // anywhere on 360°

       

        // Normalize movement direction
        const len = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const nx = this.vx / len;
        const ny = this.vy / len;


        this.vx = Math.cos(angle) * this.dashSpeed;
        this.vy = Math.sin(angle) * this.dashSpeed;

        // Increase speed
        // this.vx = nx * this.dashSpeed;
        // this.vy = ny * this.dashSpeed;

        this.dashEndTime = performance.now() + this.dashDuration;
    }

    // End dash
    stopDash() {
        this.isDashing = false;

        // Return to normal speed in same direction
        const len = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const nx = this.vx / len;
        const ny = this.vy / len;

        this.vx = nx * this.speed;
        this.vy = ny * this.speed;

        this.nextDashTime = performance.now() + this.randomDashDelay();
    }

    // ----------- COLLISION WITH NomNom / ROBO NOM ----------------
    checkCollision(px, py, radius) {
        const dx = this.x - px;
        const dy = this.y - py;
        // const dist = Math.sqrt(dx * dy + dy * dy);
        const dist = distance(this.x, this.y, px, py);

        const minDist = radius + this.size;

        return (dist < minDist);
        
    }

    // ----------- BOUNCE OFF CENTER -------------------------------
    bounceOffCenter() {
        const dx = this.x - this.centerX;
        const dy = this.y - this.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const minDist = 25 + this.size;

        if (dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;

            const dot = this.vx * nx + this.vy * ny;

            this.vx -= 2 * dot * nx;
            this.vy -= 2 * dot * ny;

            this.x = this.centerX + nx * minDist;
            this.y = this.centerY + ny * minDist;
        }
    }

    // ----------- BOUNCE OFF WALLS --------------------------------
    bounceOffWalls(canvas) {
        if (this.x < this.size*3 + this.dashSpeed || this.x > canvas.width - this.size*3) {
            this.vx *= -1;
        }
        
        if (this.y < this.size*3  + this.dashSpeed || this.y > canvas.height - this.size*3) {
            this.vy *= -1;
        }
    }

    // ----------- UPDATE ------------------------------------------
    update(canvas) {
        this.eaten = this.checkCollision(mouseNom.x, mouseNom.y, mouseNom.radius);
        if (this.eaten){
            showFloatingText(eatTriangle(), this.x, this.y, this.color);
        }

        const now = performance.now();

        // Check if we should dash
        if (!this.isDashing && now >= this.nextDashTime) {
            this.startDash();
        }

        // Dash ending?
        if (this.isDashing && now >= this.dashEndTime) {
            this.stopDash();
        }

        // Movement
        this.x += this.vx;
        this.y += this.vy;

        // Rotation
        this.rotation += this.rotationSpeed;

        this.bounceOffWalls(canvas);
        this.bounceOffCenter();
    }

    // ----------- DRAW --------------------------------------------
    draw(ctx) {

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size, this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.closePath();

        ctx.fillStyle = this.isDashing ? this.dashColor : this.color; 
        ctx.fill();

        ctx.restore();
    }
}
