const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Constants
const COLORS = ['#869395', '#778285', '#687274', '#596264', '#4b5253', '#3c4142', '#2d3132', '#1e2121'];
const MAX_SPEED = 2;
const MAX_DISTANCE = 75;
const MAX_PARTICLES = 1500;
const PARTICLES_PER_FRAME = 5;
const FADE_IN_DURATION = 1000;

// Particle array
const particles = [];

// Mouse position
let mouseX = undefined;
let mouseY = undefined;

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3;
        this.speedX = Math.random() * 0.5 - 0.01;
        this.speedY = Math.random() * 0.5 - 0.01;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life = Math.random() * 5000 + 10000;
        this.age = 0;
        this.opacity = 0;
    }

    update(deltaTime) {
        // Apply mouse interaction
        if (mouseX !== undefined && mouseY !== undefined) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MAX_DISTANCE) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = 1;

                this.speedX -= forceDirectionX * force;
                this.speedY -= forceDirectionY * force;
            }
        }

        // Limit speed
        const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (speed > MAX_SPEED) {
            this.speedX = (this.speedX / speed) * MAX_SPEED;
            this.speedY = (this.speedY / speed) * MAX_SPEED;
        }

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Update age and opacity
        this.age += deltaTime;
        if (this.age < FADE_IN_DURATION) {
            this.opacity = this.age / FADE_IN_DURATION;
        }

        // Remove particle if it exceeds its lifespan
        return this.age > this.life;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(this.color.slice(3, 5), 16)}, ${parseInt(this.color.slice(5, 7), 16)}, ${this.opacity})`;
        ctx.fill();
    }
}

// Generate new particles
function generateParticles() {
    if (particles.length < MAX_PARTICLES) {
        for (let i = 0; i < PARTICLES_PER_FRAME; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }
}

// Animation loop
function animateParticles(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].update(deltaTime)) {
            particles.splice(i, 1);
            i--;
        } else {
            particles[i].draw();
        }
    }

    generateParticles();
    requestAnimationFrame(animateParticles);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Throttle mousemove event
let mouseMoveTimeout;
window.addEventListener('mousemove', (event) => {
    if (!mouseMoveTimeout) {
        mouseMoveTimeout = setTimeout(() => {
            mouseX = event.x;
            mouseY = event.y;
            mouseMoveTimeout = null;
        }, 16); // ~60 FPS
    }
});

// Start animation
let lastTimestamp = 0;
animateParticles();
