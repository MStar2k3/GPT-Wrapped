/* ============================================
   AI CHATBOT WRAPPED - SHOOTING STARS & PARTICLES
   Dynamic interactive background effects
   ============================================ */

export class ShootingStars {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.stars = [];
        this.shootingStars = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'shooting-stars-canvas';
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.createStars();
        this.animate();

        // Create shooting stars periodically
        this.shootingStarInterval = setInterval(() => {
            if (Math.random() > 0.3) { // 70% chance
                this.createShootingStar();
            }
        }, 2000);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        const numStars = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        for (let i = 0; i < numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }

    createShootingStar() {
        const startX = Math.random() * this.canvas.width;
        const startY = Math.random() * (this.canvas.height / 3);

        this.shootingStars.push({
            x: startX,
            y: startY,
            length: Math.random() * 80 + 50,
            speed: Math.random() * 15 + 10,
            angle: Math.PI / 4 + (Math.random() * 0.3 - 0.15), // Diagonal down-right
            opacity: 1,
            trail: []
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const time = Date.now() * 0.001;

        // Draw static stars with twinkle
        this.stars.forEach(star => {
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
            this.ctx.fill();
        });

        // Draw and update shooting stars
        this.shootingStars = this.shootingStars.filter(star => {
            // Update position
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;

            // Add to trail
            star.trail.push({ x: star.x, y: star.y });
            if (star.trail.length > star.length / 3) {
                star.trail.shift();
            }

            // Draw trail
            if (star.trail.length > 1) {
                const gradient = this.ctx.createLinearGradient(
                    star.trail[0].x, star.trail[0].y,
                    star.x, star.y
                );
                gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
                gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.5)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');

                this.ctx.beginPath();
                this.ctx.moveTo(star.trail[0].x, star.trail[0].y);
                star.trail.forEach(point => {
                    this.ctx.lineTo(point.x, point.y);
                });
                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = 2;
                this.ctx.lineCap = 'round';
                this.ctx.stroke();

                // Draw head glow
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
                this.ctx.fillStyle = '#fff';
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#00f0ff';
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }

            // Remove if off screen
            return star.x < this.canvas.width + 100 &&
                star.y < this.canvas.height + 100 &&
                star.x > -100;
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.shootingStarInterval) {
            clearInterval(this.shootingStarInterval);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Floating particles that respond to mouse
export class InteractiveParticles {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particles-canvas';
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        const numParticles = Math.floor((this.canvas.width * this.canvas.height) / 30000);

        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: ['#00f0ff', '#8b00ff', '#ff00a8'][Math.floor(Math.random() * 3)],
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.vx -= (dx / distance) * force * 0.1;
                particle.vy -= (dy / distance) * force * 0.1;
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Wrap around
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

export default ShootingStars;
