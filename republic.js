(function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'republicCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '240px';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = 240;
    }
    window.addEventListener('resize', resize);
    resize();

    let planeX = -150;
    let smoke = [];

    function drawJet(x, y) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(28, 0);
        ctx.lineTo(-18, -9);
        ctx.lineTo(-12, 0);
        ctx.lineTo(-18, 9);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(-10, -24);
        ctx.lineTo(-16, -24);
        ctx.lineTo(-6, 0);
        ctx.lineTo(-16, 24);
        ctx.lineTo(-10, 24);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.ellipse(10, 0, 7, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const formation = [
            { dx: 0, dy: 65, color: 'rgba(255, 103, 31, 0.7)' },   // Saffron (केसरिया)
            { dx: 35, dy: 95, color: 'rgba(255, 255, 255, 0.85)' }, // White (सफेद)
            { dx: 0, dy: 125, color: 'rgba(4, 106, 56, 0.75)' }    // Green (हरा)
        ];

        formation.forEach(jet => {
            const jx = planeX + jet.dx;
            const jy = jet.dy;
            for (let i = 0; i < 2; i++) {
                smoke.push({
                    x: jx - 16,
                    y: jy + (Math.random() - 0.5) * 4,
                    r: Math.random() * 5 + 4,
                    alpha: 0.9,
                    color: jet.color,
                    vx: -0.6 - Math.random() * 0.5,
                    vy: (Math.random() - 0.5) * 0.3
                });
            }
        });

        for (let i = smoke.length - 1; i >= 0; i--) {
            let s = smoke[i];
            s.x += s.vx;
            s.y += s.vy;
            s.r += 0.14;
            s.alpha -= 0.008;
            if (s.alpha <= 0) {
                smoke.splice(i, 1);
            } else {
                ctx.save();
                ctx.globalAlpha = s.alpha;
                ctx.fillStyle = s.color;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        formation.forEach(jet => drawJet(planeX + jet.dx, jet.dy));

        planeX += 3.2;
        if (planeX > canvas.width + 200) {
            planeX = -150;
        }

        requestAnimationFrame(animate);
    }

    animate();
})();
