// Prestige animation system
export function prestigeAnimationPrep() {

    const overlay = document.getElementById('prestigeOverlay');
    const canvas = document.getElementById('prestigeCanvas');
    const ctx = canvas.getContext('2d');
    const counterEl = document.getElementById('prestigeCounter');
    const subtitleEl = document.getElementById('prestigeSubtitle');

    // Particle config
    const PARTICLE_COUNT = 9000;
    const particles = [];

    // Resize canvas
    function resizeCanvas() {
    canvas.width = Math.max(1, Math.floor(window.innerWidth * devicePixelRatio));
    canvas.height = Math.max(1, Math.floor(window.innerHeight * devicePixelRatio));
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class P {
    constructor(cx, cy) {
        const a = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 6;
        this.x = cx;
        this.y = cy;
        this.vx = Math.cos(a) * speed;
        this.vy = Math.sin(a) * speed;
        this.life = 1500 + Math.random() * 3000; // ms
        this.size = 5 + Math.random() * 10;
        this.age = 0;
        this.color = `hsl(${Math.floor(Math.random()*60 + 180)}, 95%, ${50 + Math.random()*10}%)`;
    }
    update(dt) {
        this.age += dt;
        this.x += this.vx * dt/16;
        this.y += this.vy * dt/16;
        // gravity / slowdown
        this.vx *= 0.995;
        this.vy *= 0.995;
    }
    draw(ctx) {
        const t = Math.max(0, 1 - this.age / this.life);
        ctx.globalAlpha = t;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size * t, 0, Math.PI*2);
        ctx.fill();
    }
    }

    // animate particles
    let lastTime = 0;
    let animating = false;
    function tick(now) {
    if (!animating) return;
    if (!lastTime) lastTime = now;
    const dt = Math.min(40, now - lastTime);
    lastTime = now;

    ctx.clearRect(0,0,canvas.width,canvas.height);

   

    // update + draw particles
    for (let i = particles.length-1; i >= 0; i--) {
        const p = particles[i];
        p.update(dt);
        p.draw(ctx);
        if (p.age > p.life) particles.splice(i, 1);
    }

    requestAnimationFrame(tick);
    }

    // Show animation API
    window.showPrestigeAnimation = function ({ gain = 1, subtitle = '', duration = 1700, onComplete = null } = {}) {
    // prepare
    resizeCanvas();
    subtitleEl.textContent = subtitle || 'You reset for glory';
    counterEl.textContent = gain;
    overlay.classList.add('show');

    // create burst of particles from center
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    particles.length = 0;
    for (let i=0;i<PARTICLE_COUNT;i++) particles.push(new P(cx, cy));



    // start animation
    animating = true;
    lastTime = 0;
    requestAnimationFrame(tick);

    // scale/zoom overlay background for drama (CSS via transform)
    overlay.style.transition = 'transform 700ms cubic-bezier(.22,.9,.23,1), opacity 300ms';
    overlay.style.transform = 'scale(1.02)';
    setTimeout(()=> overlay.style.transform = '', 700);

    // animate count up
    // tweenNumber(0, gain, duration, (n) => {
    //     counterEl.textContent = n.toLocaleString();
    // }, () => {
        // small flash + finish
        const flash = document.createElement('div');
        flash.style.position = "fixed";
        flash.style.top = "0";
        flash.style.left = "0";
        flash.style.width = "100vw";
        flash.style.height = "100vh";
        flash.style.background = "white";
        flash.style.opacity = "0";
        flash.style.pointerEvents = "none";
        flash.style.zIndex = "999999";
        flash.style.transition = "opacity 1.5s ease-in-out";

        document.body.appendChild(flash);
        
        setTimeout(() => {
        flash.style.opacity = "1";
        }, 1500);

        // Fade out
        setTimeout(() => {
        flash.style.opacity = "0";
        }, 3400);

        // Cleanup
        setTimeout(() => {
        flash.remove();
        }, 4500);

        // stop anim after particles die
        setTimeout(() => {
        animating = false;
        particles.length = 0;
        overlay.classList.remove('show');
        if (onComplete) onComplete();
        }, 3500);
    // });
    };


    }
