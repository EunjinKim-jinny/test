const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];
const numDrops = 100;

class Raindrop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 3 + 2;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.length;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = 'pink';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

for (let i = 0; i < numDrops; i++) {
    raindrops.push(new Raindrop(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let drop of raindrops) {
        drop.update();
        drop.draw();
    }

    requestAnimationFrame(animate);
}

animate();

canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    for (let drop of raindrops) {
        const distance = Math.sqrt(Math.pow(drop.x - mouseX, 2) + Math.pow(drop.y - mouseY, 2));
        if (distance < 50) {
            drop.x += (Math.random() - 0.5) * 10;
            drop.y += (Math.random() - 0.5) * 10;
        }
    }
});
