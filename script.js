// Fireworks Effect with Clouds
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.getElementById('submitName').addEventListener('click', function() {
    // Ambil nama dari input
    const username = document.getElementById('username').value;

    // Tampilkan nama di elemen yang sesuai
    document.getElementById('displayName').textContent = username;

    // Sembunyikan halaman pertama
    document.getElementById('home').classList.add('hidden');

    // Tampilkan halaman pesan
    document.getElementById('message').classList.remove('hidden');
});

// Tambahkan event listener untuk tombol "Lanjut"
document.getElementById('nextButton').addEventListener('click', function() {
    // Sembunyikan halaman pesan
    document.getElementById('message').classList.add('hidden');

    // Tampilkan halaman selamat tinggal
    document.getElementById('goodbye').classList.remove('hidden');
});

// Generate clouds
const clouds = [];
for (let i = 0; i < 5; i++) {
    clouds.push({
        x: Math.random() * canvas.width,
        y: canvas.height / 2 + Math.random() * 50, // Positioned around the center to resemble a "cloudy horizon"
        width: 200 + Math.random() * 100,
        height: 50 + Math.random() * 30,
        color: "rgba(255, 255, 255, 0.5)"
    });
}

// Draw clouds
function drawClouds() {
    clouds.forEach(cloud => {
        ctx.beginPath();
        ctx.ellipse(cloud.x, cloud.y, cloud.width / 2, cloud.height / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = cloud.color;
        ctx.fill();
    });
}

// Firework Particles
let particles = [];

function createParticle(x, y) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 3 + 2;
    const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    return { x, y, angle, speed, color, life: 100 };
}

function updateParticles() {
    particles.forEach((p, index) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
        if (p.life <= 0) particles.splice(index, 1);
    });
}

function drawParticles() {
    particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
}

// Main animation loop
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClouds(); // Draw clouds
    updateParticles();
    drawParticles();
    requestAnimationFrame(loop);
}

// Automatically launch fireworks "above the clouds"
function autoFireworks() {
    const x = Math.random() * canvas.width;
    const y = canvas.height / 2 - 100; // Fireworks appear above the cloud line
    for (let i = 0; i < 40; i++) {
        particles.push(createParticle(x, y));
    }
    setTimeout(autoFireworks, 1000); // Fire every 1 second
}

// Start the animation
loop();
autoFireworks();
