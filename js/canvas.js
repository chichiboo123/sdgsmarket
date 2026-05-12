// ── CANVAS ────────────────────────────────────────────────────────────────────
let isDrawing = false, canvas, ctx;

function initCanvas() {
    canvas = document.getElementById('drawing-canvas');
    if (!canvas || canvas._init) return;
    canvas._init = true;
    ctx = canvas.getContext('2d');
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseout', stopDraw);
    canvas.addEventListener('touchstart', e => { e.preventDefault(); const t=e.touches[0]; canvas.dispatchEvent(new MouseEvent('mousedown',{clientX:t.clientX,clientY:t.clientY})); }, {passive:false});
    canvas.addEventListener('touchmove',  e => { e.preventDefault(); const t=e.touches[0]; canvas.dispatchEvent(new MouseEvent('mousemove', {clientX:t.clientX,clientY:t.clientY})); }, {passive:false});
    canvas.addEventListener('touchend', stopDraw);
    document.getElementById('brush-size').addEventListener('input', e => {
        document.getElementById('brush-size-val').textContent = e.target.value;
    });
}

function startDraw(e) { isDrawing = true; draw(e); }

function draw(e) {
    if (!isDrawing) return;
    const r = canvas.getBoundingClientRect();
    const x = (e.clientX - r.left) * (canvas.width / r.width);
    const y = (e.clientY - r.top)  * (canvas.height / r.height);
    ctx.lineWidth = document.getElementById('brush-size').value;
    ctx.strokeStyle = document.getElementById('brush-color').value;
    ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y);
}

function stopDraw() { if (isDrawing) { isDrawing = false; ctx?.beginPath(); } }

function clearCanvas() { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }

function updatePlanMethod() {
    const m = document.querySelector('input[name="planMethod"]:checked')?.value || 'text';
    document.getElementById('text-plan').classList.toggle('hidden', m === 'drawing');
    document.getElementById('drawing-plan').classList.toggle('hidden', m === 'text');
    if (m !== 'text') setTimeout(initCanvas, 100);
}
