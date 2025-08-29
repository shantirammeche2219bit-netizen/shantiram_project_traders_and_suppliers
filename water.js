  document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('waterCanvas');
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 2;
                this.speedX = (Math.random() * 2 - 1) * 0.3;
                this.speedY = (Math.random() * 2 - 3) * 0.3;
                this.life = 3;
                this.buoyancy = 0.03;
                this.color = `rgba(${0 + Math.random() * 30}, ${190 + Math.random() * 30}, ${255}, `;
                this.wobbleSpeed = Math.random() * 0.02;
                this.wobbleAmount = 0.2;
                this.angle = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.speedY -= this.buoyancy;
                this.life -= 0.01;
                
                this.angle += this.wobbleSpeed;
                this.x += Math.sin(this.angle) * this.wobbleAmount;
            }

            draw() {
                if (ctx) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color + this.life + ')';
                    ctx.fill();
                    
                    ctx.beginPath();
                    ctx.arc(this.x - this.size/3, this.y - this.size/3, this.size/4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.life * 0.5})`;
                    ctx.fill();
                }
            }
        }

        let particles = [];
        let mouseX = 0;
        let mouseY = 0;
        let lastParticleTime = 0;
        const particleInterval = 100;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            const currentTime = Date.now();
            if (currentTime - lastParticleTime > particleInterval) {
                particles.push(new Particle(mouseX, mouseY));
                lastParticleTime = currentTime;
            }
        });

        function animate() {
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles = particles.filter(particle => particle.life > 0);
                
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                setTimeout(() => {
                    requestAnimationFrame(animate);
                }, 30);
            }
        }

        animate();
    });