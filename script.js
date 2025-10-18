// Theme toggle & persistence
const root = document.documentElement;
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light' || (!storedTheme && prefersLight)) {
  root.classList.add('light');
}
document.getElementById('themeToggle').addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Countdown to a target date (adjust as you like)
const target = new Date();
target.setDate(target.getDate() + 21); // 21 days from now
const timerEl = document.getElementById('timer');
const pad = (n) => String(n).padStart(2, '0');

function tick() {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    timerEl.textContent = "🚀 It's live!";
    confetti();
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  timerEl.textContent = `${pad(d)}d : ${pad(h)}h : ${pad(m)}m : ${pad(s)}s`;
  requestAnimationFrame(() => {});
}
setInterval(tick, 1000); tick();

// Copy email
document.getElementById('copyEmail').addEventListener('click', async () => {
  await navigator.clipboard.writeText('parvesh@example.com');
  const btn = document.getElementById('copyEmail');
  const old = btn.textContent;
  btn.textContent = 'Copied!';
  setTimeout(() => (btn.textContent = old), 1200);
});

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Tiny confetti
function confetti() {
  const c = document.createElement('canvas');
  c.width = innerWidth; c.height = innerHeight;
  c.style.position = 'fixed'; c.style.inset = '0'; c.style.pointerEvents = 'none';
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  const pieces = Array.from({length: 150}, () => ({
    x: Math.random() * c.width,
    y: -20 - Math.random() * c.height,
    r: 2 + Math.random() * 4,
    vx: (Math.random() - 0.5) * 2,
    vy: 2 + Math.random() * 3
  }));
  let t = 0;
  function draw() {
    ctx.clearRect(0,0,c.width,c.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy + Math.sin((t+p.x)*0.02);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    });
    t += 1;
    if (t < 500) requestAnimationFrame(draw); else c.remove();
  }
  draw();
}

// Subtle particle background
(function bg() {
  const canvas = document.getElementById('bg-particles');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener('resize', resize);
  const dots = Array.from({length: 80}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random()*1.8+0.3,
    vx: (Math.random()-0.5)*0.5,
    vy: (Math.random()-0.5)*0.5
  }));
  function step(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.globalAlpha = 0.7;
    dots.forEach(d => {
      d.x+=d.vx; d.y+=d.vy;
      if (d.x<0||d.x>canvas.width) d.vx*=-1;
      if (d.y<0||d.y>canvas.height) d.vy*=-1;
      ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fill();
    });
    // connect nearby dots
    ctx.globalAlpha = 0.08;
    for (let i=0;i<dots.length;i++){
      for (let j=i+1;j<dots.length;j++){
        const a = dots[i], b = dots[j];
        const dist = Math.hypot(a.x-b.x, a.y-b.y);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  step();
})();
