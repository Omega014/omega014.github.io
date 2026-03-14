// ============================================================
// Takibi - 焚き火アプリ
// みんなの心に余白をつくるプロダクト
// ============================================================

const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

let width, height, centerX, fireBaseY;
let flameTongues = [];
let flameSparks = [];
let coreFlames = [];
let embers = [];
let stars = [];
let smokeParticles = [];
let time = 0;
let scale = 1;
let fireIntensity = 0.5;
let speechClouds = [];
let lastCloudTime = 0;

// シード付きランダム（薪のテクスチャ固定用）
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// --- 初期化 ---

function resize() {
  const dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  centerX = width / 2;
  fireBaseY = height * 0.68;
  scale = Math.min(width, height) / 500;
  initStars();
}

window.addEventListener('resize', resize);
resize();

// --- ユーティリティ ---

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function rand(min, max) { return Math.random() * (max - min) + min; }

// --- 星空 ---

function initStars() {
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.45,
      size: Math.random() * 1.8 + 0.2,
      twinkleSpeed: rand(0.008, 0.025),
      twinkleOffset: rand(0, Math.PI * 2),
      brightness: rand(0.2, 0.7),
    });
  }
}

function drawStars() {
  for (const star of stars) {
    const alpha = star.brightness * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 245, ${alpha})`;
    ctx.fill();
  }
}

// --- 地面と光の反射 ---

function drawGround() {
  const groundY = fireBaseY + 50 * scale;
  const gradient = ctx.createLinearGradient(0, groundY, 0, height);
  gradient.addColorStop(0, '#1e1610');
  gradient.addColorStop(0.2, '#14100a');
  gradient.addColorStop(1, '#0a0a0f');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, groundY, width, height - groundY);

  const flicker = Math.sin(time * 0.07) * 10 + Math.sin(time * 0.11) * 5;
  const glowR = 350 * scale + flicker;
  const glow = ctx.createRadialGradient(centerX, groundY, 0, centerX, groundY, glowR);
  glow.addColorStop(0, 'rgba(255, 130, 40, 0.12)');
  glow.addColorStop(0.3, 'rgba(255, 90, 20, 0.06)');
  glow.addColorStop(0.6, 'rgba(200, 50, 0, 0.02)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, groundY - glowR * 0.3, width, glowR * 1.3);
}

// --- 焚き火台（石の囲い） ---

function drawFirepit() {
  const stoneCount = 14;
  const radiusX = 110 * scale;
  const radiusY = 28 * scale;
  const stoneW = 30 * scale;
  const stoneH = 16 * scale;
  const baseY = fireBaseY + 40 * scale;
  const stoneRng = seededRandom(42);

  for (let i = 0; i < stoneCount; i++) {
    const angle = (i / stoneCount) * Math.PI * 2 + 0.15;
    const x = centerX + Math.cos(angle) * radiusX;
    const y = baseY + Math.sin(angle) * radiusY;
    const depth = (Math.sin(angle) + 1) / 2;
    const sizeVar = 0.8 + stoneRng() * 0.4;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);

    const baseBright = 30 + depth * 25;
    const sw = stoneW * sizeVar / 2;
    const sh = stoneH * sizeVar / 2;

    // 石の影
    ctx.beginPath();
    ctx.ellipse(2, 2, sw + 1, sh + 1, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();

    // 石本体
    const stoneGrad = ctx.createRadialGradient(-sw * 0.3, -sh * 0.3, 0, 0, 0, sw);
    stoneGrad.addColorStop(0, `rgb(${baseBright + 30}, ${baseBright + 25}, ${baseBright + 20})`);
    stoneGrad.addColorStop(0.5, `rgb(${baseBright + 10}, ${baseBright + 5}, ${baseBright})`);
    stoneGrad.addColorStop(1, `rgb(${baseBright - 10}, ${baseBright - 15}, ${baseBright - 18})`);
    ctx.fillStyle = stoneGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, sw, sh, 0, 0, Math.PI * 2);
    ctx.fill();

    // 石の表面テクスチャ（斑点）
    for (let j = 0; j < 4; j++) {
      const sx = (stoneRng() - 0.5) * sw;
      const sy = (stoneRng() - 0.5) * sh;
      ctx.beginPath();
      ctx.arc(sx, sy, stoneRng() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${baseBright - 20}, ${baseBright - 25}, ${baseBright - 28}, 0.4)`;
      ctx.fill();
    }

    // 炎の反射光
    const reflectAlpha = 0.06 + depth * 0.04;
    const reflGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, sw * 0.8);
    reflGlow.addColorStop(0, `rgba(255, 140, 60, ${reflectAlpha})`);
    reflGlow.addColorStop(1, 'rgba(255, 100, 30, 0)');
    ctx.fillStyle = reflGlow;
    ctx.beginPath();
    ctx.ellipse(0, 0, sw, sh, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// --- 薪（リアルな丸太） ---

function drawLogs() {
  const s = scale;
  const logs = [
    { x: -55 * s, y: 25 * s, angle: -0.35, len: 140 * s, w: 16 * s, seed: 100, charLevel: 0.7 },
    { x: 50 * s, y: 28 * s, angle: 0.4, len: 130 * s, w: 14 * s, seed: 200, charLevel: 0.8 },
    { x: -8 * s, y: 35 * s, angle: -0.08, len: 120 * s, w: 18 * s, seed: 300, charLevel: 0.9 },
    { x: -30 * s, y: 20 * s, angle: 0.65, len: 110 * s, w: 13 * s, seed: 400, charLevel: 0.6 },
    { x: 25 * s, y: 18 * s, angle: -0.55, len: 105 * s, w: 15 * s, seed: 500, charLevel: 0.75 },
    { x: 0, y: 30 * s, angle: 0.15, len: 90 * s, w: 12 * s, seed: 600, charLevel: 0.85 },
  ];

  for (const log of logs) {
    const rng = seededRandom(log.seed);
    ctx.save();
    ctx.translate(centerX + log.x, fireBaseY + log.y);
    ctx.rotate(log.angle);

    const halfLen = log.len / 2;
    const hw = log.w / 2;

    // --- 丸太の影 ---
    ctx.beginPath();
    ctx.roundRect(-halfLen + 3, -hw + 3, log.len, log.w, hw / 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fill();

    // --- 樹皮ベース ---
    const barkGrad = ctx.createLinearGradient(0, -hw, 0, hw);
    barkGrad.addColorStop(0, '#5a4030');
    barkGrad.addColorStop(0.15, '#4a3322');
    barkGrad.addColorStop(0.35, '#3a2518');
    barkGrad.addColorStop(0.5, '#2e1c10');
    barkGrad.addColorStop(0.65, '#3a2518');
    barkGrad.addColorStop(0.85, '#4a3322');
    barkGrad.addColorStop(1, '#3d2a1a');
    ctx.fillStyle = barkGrad;
    ctx.beginPath();
    ctx.roundRect(-halfLen, -hw, log.len, log.w, hw / 2);
    ctx.fill();

    // --- 樹皮テクスチャ（縦の割れ目） ---
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(-halfLen, -hw, log.len, log.w, hw / 2);
    ctx.clip();

    // 縦の溝（樹皮のひび）
    for (let i = 0; i < 12; i++) {
      const gx = -halfLen + rng() * log.len;
      const gy = -hw + rng() * log.w;
      const glen = rng() * log.w * 0.6 + log.w * 0.2;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx + (rng() - 0.5) * 4, gy + glen);
      ctx.strokeStyle = `rgba(20, 12, 5, ${rng() * 0.4 + 0.2})`;
      ctx.lineWidth = rng() * 1.5 + 0.5;
      ctx.stroke();
    }

    // 横の木目ライン
    for (let i = 0; i < 6; i++) {
      const ly = -hw * 0.8 + (i / 5) * log.w * 0.8;
      ctx.beginPath();
      ctx.moveTo(-halfLen + 5, ly);
      for (let j = 0; j < 8; j++) {
        const lx = -halfLen + 5 + (j / 7) * (log.len - 10);
        ctx.lineTo(lx, ly + (rng() - 0.5) * 3);
      }
      ctx.strokeStyle = `rgba(80, 55, 35, ${rng() * 0.15 + 0.05})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // 樹皮のこぶ・節
    for (let i = 0; i < 3; i++) {
      const kx = -halfLen * 0.6 + rng() * halfLen * 1.2;
      const ky = (rng() - 0.5) * hw * 0.8;
      const kr = rng() * 4 + 2;
      const knotGrad = ctx.createRadialGradient(kx, ky, 0, kx, ky, kr * s);
      knotGrad.addColorStop(0, 'rgba(25, 15, 8, 0.6)');
      knotGrad.addColorStop(0.5, 'rgba(40, 28, 15, 0.3)');
      knotGrad.addColorStop(1, 'rgba(50, 35, 20, 0)');
      ctx.fillStyle = knotGrad;
      ctx.beginPath();
      ctx.ellipse(kx, ky, kr * s, kr * 0.7 * s, rng() * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- 炭化部分（中央に近いほど焦げている） ---
    const charGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, halfLen * 0.8);
    charGrad.addColorStop(0, `rgba(10, 5, 2, ${log.charLevel * 0.8})`);
    charGrad.addColorStop(0.4, `rgba(15, 8, 3, ${log.charLevel * 0.5})`);
    charGrad.addColorStop(0.7, `rgba(20, 12, 5, ${log.charLevel * 0.2})`);
    charGrad.addColorStop(1, 'rgba(30, 18, 8, 0)');
    ctx.fillStyle = charGrad;
    ctx.fillRect(-halfLen, -hw, log.len, log.w);

    // --- 赤熱のひび割れ（炭化した薪の間から光が漏れる） ---
    const crackCount = 5 + Math.floor(rng() * 4);
    for (let i = 0; i < crackCount; i++) {
      const cx = (rng() - 0.5) * log.len * 0.6;
      const cy = (rng() - 0.5) * log.w * 0.5;
      const clen = rng() * hw * 1.5 + hw * 0.3;
      const cangle = rng() * Math.PI - Math.PI / 2;

      // ひび割れの光（太いグロー）
      const pulse = 0.4 + Math.sin(time * 0.04 + i * 1.7 + log.seed) * 0.2
                   + Math.sin(time * 0.09 + i * 2.3) * 0.1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      const ex = cx + Math.cos(cangle) * clen;
      const ey = cy + Math.sin(cangle) * clen;
      // 曲がったひび割れ
      const mx = (cx + ex) / 2 + (rng() - 0.5) * 8;
      const my = (cy + ey) / 2 + (rng() - 0.5) * 6;
      ctx.quadraticCurveTo(mx, my, ex, ey);
      ctx.strokeStyle = `rgba(255, 200, 80, ${pulse * log.charLevel * 0.6})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 内側の明るい線
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(mx, my, ex, ey);
      ctx.strokeStyle = `rgba(255, 255, 180, ${pulse * log.charLevel * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // ひび割れからのグロー
      const crackGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 12 * s);
      crackGlow.addColorStop(0, `rgba(255, 150, 50, ${pulse * 0.15})`);
      crackGlow.addColorStop(1, 'rgba(255, 80, 20, 0)');
      ctx.fillStyle = crackGlow;
      ctx.fillRect(mx - 12 * s, my - 12 * s, 24 * s, 24 * s);
    }

    // --- 灰（薪の下に溜まる） ---
    for (let i = 0; i < 5; i++) {
      const ax = (rng() - 0.5) * log.len * 0.5;
      const ay = hw + rng() * 4;
      ctx.beginPath();
      ctx.ellipse(ax, ay, rng() * 6 + 3, rng() * 2 + 1, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(80, 75, 70, ${rng() * 0.3 + 0.1})`;
      ctx.fill();
    }

    // --- 薪の表面熱ゆらぎ ---
    for (let i = 0; i < 3; i++) {
      const hx = (i - 1) * halfLen * 0.5;
      const hy = -hw * 0.3;
      const hr = (8 + i * 3) * s;
      const hPulse = 0.08 + Math.sin(time * 0.05 + log.seed + i * 2.1) * 0.05
                    + Math.sin(time * 0.09 + i * 3.7) * 0.03;
      ctx.beginPath();
      ctx.ellipse(hx, hy + Math.sin(time * 0.03 + i) * 2, hr, hr * 0.4, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 140, 40, ${hPulse * log.charLevel})`;
      ctx.fill();
    }

    ctx.restore(); // clip解除

    // --- 丸太の断面（端） ---
    ctx.beginPath();
    ctx.ellipse(-halfLen, 0, hw * 0.6, hw, 0, 0, Math.PI * 2);
    const crossGrad = ctx.createRadialGradient(-halfLen, 0, 0, -halfLen, 0, hw);
    crossGrad.addColorStop(0, '#6a5540');
    crossGrad.addColorStop(0.3, '#5a4530');
    crossGrad.addColorStop(0.6, '#4a3520');
    crossGrad.addColorStop(1, '#3a2818');
    ctx.fillStyle = crossGrad;
    ctx.fill();

    // 年輪
    for (let r = 0; r < 4; r++) {
      const ringR = hw * (0.2 + r * 0.2);
      ctx.beginPath();
      ctx.ellipse(-halfLen, 0, ringR * 0.6, ringR, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(80, 60, 40, ${0.15 + rng() * 0.1})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // 芯
    ctx.beginPath();
    ctx.ellipse(-halfLen, 0, 2, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#5a4530';
    ctx.fill();

    // --- 丸太の上面ハイライト（3D感） ---
    const topLight = ctx.createLinearGradient(0, -hw, 0, 0);
    topLight.addColorStop(0, 'rgba(255, 200, 150, 0.04)');
    topLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = topLight;
    ctx.beginPath();
    ctx.roundRect(-halfLen, -hw, log.len, hw, hw / 2);
    ctx.fill();

    // --- 薪全体の赤熱グロー ---
    const logGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, halfLen * 0.5);
    const glowPulse = 0.08 + Math.sin(time * 0.04 + log.seed * 0.1) * 0.04;
    logGlow.addColorStop(0, `rgba(255, 100, 20, ${glowPulse})`);
    logGlow.addColorStop(0.5, `rgba(255, 50, 0, ${glowPulse * 0.3})`);
    logGlow.addColorStop(1, 'rgba(200, 30, 0, 0)');
    ctx.fillStyle = logGlow;
    ctx.fillRect(-halfLen, -hw * 1.5, log.len, log.w * 1.5);

    ctx.restore();
  }
}

// --- 薪の交差部分の発光スポット ---

function drawInterLogEmbers() {
  const s = scale;
  const spots = [
    { x: -20 * s, y: 22 * s },
    { x: 15 * s, y: 25 * s },
    { x: -5 * s, y: 30 * s },
    { x: 30 * s, y: 20 * s },
    { x: -35 * s, y: 28 * s },
  ];

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < spots.length; i++) {
    const sp = spots[i];
    const x = centerX + sp.x;
    const y = fireBaseY + sp.y;
    const r = (10 + Math.sin(time * 0.06 + i * 1.4) * 3) * s;
    const pulse = 0.15 + Math.sin(time * 0.04 + i * 2.3) * 0.08
                + Math.sin(time * 0.11 + i * 0.9) * 0.05;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(255, 220, 120, ${pulse * fireIntensity})`);
    grad.addColorStop(0.4, `rgba(255, 150, 50, ${pulse * 0.5 * fireIntensity})`);
    grad.addColorStop(1, 'rgba(255, 80, 20, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// --- 炎の舌（ベジェ曲線で有機的な形状） ---

class FlameTongue {
  constructor() {
    this.reset();
  }

  reset() {
    const s = scale;
    this.baseX = centerX + rand(-45, 45) * s;
    this.baseY = fireBaseY + rand(0, 20) * s;
    this.height = rand(60, 180) * s * fireIntensity;
    this.width = rand(15, 40) * s * fireIntensity;
    this.life = 1;
    this.decay = rand(0.008, 0.018);
    this.wobble = rand(0, Math.PI * 2);
    this.wobbleSpeed = rand(0.06, 0.15);
    this.wobbleAmt = rand(5, 20) * s * fireIntensity;
    this.lean = rand(-0.3, 0.3);
    this.layer = rand(0, 1);
    this.tipSharpness = rand(0.15, 0.45);
    this.fadeIn = 0;
    // 多周波タービュランス用パラメータ
    this.turbFreq1 = rand(0.02, 0.04);
    this.turbFreq2 = rand(0.07, 0.12);
    this.turbFreq3 = rand(0.18, 0.3);
    this.turbPhase = rand(0, Math.PI * 2);
  }

  update() {
    this.wobble += this.wobbleSpeed;
    this.life -= this.decay;
    if (this.fadeIn < 1) this.fadeIn = Math.min(1, this.fadeIn + 0.05);
    if (this.life <= 0) this.reset();
  }

  draw() {
    if (this.life <= 0) return;
    const alpha = clamp(this.life, 0, 1) * this.fadeIn;
    const s = scale;

    // 多周波タービュランス: 低速うねり + 中速揺れ + 高速振動
    const turb1 = Math.sin(time * this.turbFreq1 + this.turbPhase) * this.wobbleAmt * 1.2;
    const turb2 = Math.sin(time * this.turbFreq2 + this.turbPhase + 1.5) * this.wobbleAmt * 0.6;
    const turb3 = Math.sin(time * this.turbFreq3 + this.turbPhase + 3.0) * this.wobbleAmt * 0.25;
    const wobbleX = turb1 + turb2 + turb3;
    const wobbleX2 = Math.sin(this.wobble * 1.3 + 1) * this.wobbleAmt * 0.5;

    const bx = this.baseX;
    const by = this.baseY;
    const tipX = bx + wobbleX + this.lean * this.height;
    const tipY = by - this.height * this.life;
    const w = this.width * Math.pow(this.life, 0.3);
    const tipW = w * this.tipSharpness;

    // 炎の舌をベジェ曲線で描画（cubic）
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // 外側の炎（赤〜オレンジ）— cubic bezier
    ctx.beginPath();
    ctx.moveTo(bx - w, by);
    ctx.bezierCurveTo(
      bx - w * 0.9 + wobbleX2 * 0.3, by - this.height * 0.25,
      bx - tipW + wobbleX * 0.7, by - this.height * 0.65,
      tipX, tipY
    );
    ctx.bezierCurveTo(
      bx + tipW + wobbleX * 0.7, by - this.height * 0.65,
      bx + w * 0.9 + wobbleX2 * 0.3, by - this.height * 0.25,
      bx + w, by
    );
    ctx.closePath();

    const outerGrad = ctx.createLinearGradient(bx, by, tipX, tipY);
    outerGrad.addColorStop(0, `rgba(255, 120, 20, ${alpha * 0.25})`);
    outerGrad.addColorStop(0.3, `rgba(255, 80, 10, ${alpha * 0.2})`);
    outerGrad.addColorStop(0.6, `rgba(220, 50, 5, ${alpha * 0.12})`);
    outerGrad.addColorStop(1, `rgba(180, 20, 0, 0)`);
    ctx.fillStyle = outerGrad;
    ctx.fill();

    // 中間の炎（オレンジ〜黄色）— cubic bezier
    const mw = w * 0.6;
    const mtipW = mw * this.tipSharpness;
    ctx.beginPath();
    ctx.moveTo(bx - mw, by);
    ctx.bezierCurveTo(
      bx - mw * 0.7 + wobbleX * 0.4, by - this.height * 0.3,
      bx - mtipW + wobbleX * 0.6, by - this.height * 0.6,
      tipX, tipY + this.height * 0.15
    );
    ctx.bezierCurveTo(
      bx + mtipW + wobbleX * 0.6, by - this.height * 0.6,
      bx + mw * 0.7 + wobbleX * 0.4, by - this.height * 0.3,
      bx + mw, by
    );
    ctx.closePath();

    const midGrad = ctx.createLinearGradient(bx, by, tipX, tipY);
    midGrad.addColorStop(0, `rgba(255, 200, 50, ${alpha * 0.3})`);
    midGrad.addColorStop(0.3, `rgba(255, 160, 30, ${alpha * 0.22})`);
    midGrad.addColorStop(0.7, `rgba(255, 100, 10, ${alpha * 0.1})`);
    midGrad.addColorStop(1, 'rgba(255, 60, 0, 0)');
    ctx.fillStyle = midGrad;
    ctx.fill();

    // 芯の炎（白〜黄白）— cubic bezier
    const iw = w * 0.25;
    const itipW = iw * this.tipSharpness;
    ctx.beginPath();
    ctx.moveTo(bx - iw, by);
    ctx.bezierCurveTo(
      bx - iw * 0.4 + wobbleX * 0.2, by - this.height * 0.2,
      bx - itipW + wobbleX * 0.4, by - this.height * 0.45,
      tipX, tipY + this.height * 0.35
    );
    ctx.bezierCurveTo(
      bx + itipW + wobbleX * 0.4, by - this.height * 0.45,
      bx + iw * 0.4 + wobbleX * 0.2, by - this.height * 0.2,
      bx + iw, by
    );
    ctx.closePath();

    const innerGrad = ctx.createLinearGradient(bx, by, tipX, tipY + this.height * 0.35);
    innerGrad.addColorStop(0, `rgba(255, 255, 230, ${alpha * 0.5})`);
    innerGrad.addColorStop(0.4, `rgba(255, 245, 180, ${alpha * 0.3})`);
    innerGrad.addColorStop(1, 'rgba(255, 220, 100, 0)');
    ctx.fillStyle = innerGrad;
    ctx.fill();

    ctx.restore();
  }
}

// --- 炎の火花（FlameSpark） ---

class FlameSpark {
  constructor() {
    this.reset();
  }

  reset() {
    const s = scale;
    this.x = centerX + rand(-35, 35) * s;
    this.y = fireBaseY - rand(40, 120) * s * fireIntensity;
    this.vx = rand(-1.5, 1.5);
    this.vy = rand(-2.5, -0.8) * s;
    this.life = 1;
    this.decay = rand(0.02, 0.06);
    this.size = rand(0.5, 2) * s;
    this.color = Math.random() < 0.5 ? 'yellow' : 'orange';
  }

  update() {
    this.x += this.vx + Math.sin(time * 0.08 + this.x * 0.02) * 0.3;
    this.y += this.vy;
    this.vy -= 0.005 * scale;
    this.life -= this.decay;
    if (this.life <= 0) this.reset();
  }

  draw() {
    if (this.life <= 0) return;
    const alpha = clamp(this.life, 0, 1);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    if (this.color === 'yellow') {
      ctx.fillStyle = `rgba(255, 255, 100, ${alpha * 0.8})`;
    } else {
      ctx.fillStyle = `rgba(255, 180, 50, ${alpha * 0.8})`;
    }
    ctx.fill();
  }
}

// --- 根元の熾火（おきび）グロー ---

function drawEmberBed() {
  const s = scale;
  const bedY = fireBaseY + 25 * s;
  const rng = seededRandom(999);

  // 赤熱した炭のベッド — 温度バリエーション: 白熱(15%) / オレンジ(35%) / 暗赤(50%)
  for (let i = 0; i < 25; i++) {
    const ex = centerX + (rng() - 0.5) * 120 * s;
    const ey = bedY + (rng() - 0.5) * 20 * s;
    const er = rng() * 12 * s + 5 * s;
    const pulse = (0.3 + Math.sin(time * 0.03 + i * 0.7) * 0.15
                + Math.sin(time * 0.07 + i * 1.3) * 0.1) * fireIntensity;

    const tempRoll = rng();
    const emberGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, er);

    if (tempRoll < 0.15) {
      // 白熱（最も熱い）
      emberGrad.addColorStop(0, `rgba(255, 255, 200, ${pulse * 0.6})`);
      emberGrad.addColorStop(0.3, `rgba(255, 230, 120, ${pulse * 0.4})`);
      emberGrad.addColorStop(0.6, `rgba(255, 180, 60, ${pulse * 0.2})`);
      emberGrad.addColorStop(1, 'rgba(255, 120, 20, 0)');
    } else if (tempRoll < 0.5) {
      // オレンジ（中温）
      emberGrad.addColorStop(0, `rgba(255, 180, 60, ${pulse * 0.5})`);
      emberGrad.addColorStop(0.3, `rgba(255, 100, 20, ${pulse * 0.3})`);
      emberGrad.addColorStop(0.6, `rgba(200, 50, 5, ${pulse * 0.15})`);
      emberGrad.addColorStop(1, 'rgba(100, 20, 0, 0)');
    } else {
      // 暗赤（冷めかけ）
      emberGrad.addColorStop(0, `rgba(200, 60, 10, ${pulse * 0.35})`);
      emberGrad.addColorStop(0.3, `rgba(150, 30, 5, ${pulse * 0.2})`);
      emberGrad.addColorStop(0.6, `rgba(100, 15, 0, ${pulse * 0.1})`);
      emberGrad.addColorStop(1, 'rgba(60, 5, 0, 0)');
    }

    ctx.fillStyle = emberGrad;
    ctx.beginPath();
    ctx.arc(ex, ey, er, 0, Math.PI * 2);
    ctx.fill();
  }
}

// --- 火の粉 ---

class Ember {
  constructor() {
    this.reset();
  }

  reset() {
    const s = scale;
    this.x = centerX + rand(-40, 40) * s;
    this.y = fireBaseY + rand(-10, 15) * s;
    this.vx = rand(-2, 2);
    this.vy = rand(-4, -1.5) * s * fireIntensity;
    this.life = 1;
    this.decay = rand(0.004, 0.012);
    this.size = rand(1, 3.5) * s;
    this.trail = [];
  }

  update() {
    if (this.life > 0.3) {
      this.trail.push({ x: this.x, y: this.y, life: this.life });
      if (this.trail.length > 6) this.trail.shift();
    }
    this.x += this.vx + Math.sin(time * 0.04 + this.y * 0.01) * 0.8;
    this.y += this.vy;
    this.vy -= 0.01 * scale;
    this.vx *= 0.995;
    this.life -= this.decay;
    if (this.life <= 0) {
      this.trail = [];
      this.reset();
    }
  }

  draw() {
    const alpha = clamp(this.life, 0, 1);
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      const a = (i / this.trail.length) * alpha * 0.4;
      ctx.beginPath();
      ctx.arc(t.x, t.y, this.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, ${120 + i * 20}, 30, ${a})`;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const bright = 150 + Math.random() * 80;
    ctx.fillStyle = `rgba(255, ${bright}, 40, ${alpha * 0.9})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, ${bright}, 40, ${alpha * 0.1})`;
    ctx.fill();
  }
}

// --- 煙 ---

class SmokeParticle {
  constructor() {
    this.reset();
  }

  reset() {
    const s = scale;
    this.x = centerX + rand(-15, 15) * s;
    this.y = fireBaseY - rand(60, 120) * s;
    this.vx = rand(-0.4, 0.4);
    this.vy = rand(-0.8, -0.3) * s;
    this.life = 1;
    this.decay = rand(0.002, 0.005);
    this.size = rand(20, 40) * s;
    this.originalSize = this.size;
    this.wobble = rand(0, Math.PI * 2);
  }

  update() {
    this.wobble += 0.008;
    this.x += this.vx + Math.sin(this.wobble) * 0.6;
    this.y += this.vy;
    this.vy *= 0.999;
    this.life -= this.decay;
    this.size = this.originalSize + (1 - this.life) * 60 * scale;
    if (this.life <= 0) this.reset();
  }

  draw() {
    const alpha = clamp(this.life, 0, 1) * 0.06;
    if (alpha < 0.001) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(160, 155, 150, ${alpha})`;
    ctx.fill();
  }
}

// --- 音声検出の雲エフェクト ---

class SpeechCloud {
  constructor() {
    const s = scale;
    // 焚き火周辺にランダムに出現（360度方向）
    const angle = rand(0, Math.PI * 2);
    const dist = rand(250, 400) * s;
    this.spawnX = centerX + Math.cos(angle) * dist;
    this.spawnY = fireBaseY - rand(20, 80) * s + Math.sin(angle) * dist * 0.4;
    this.x = this.spawnX;
    this.y = this.spawnY;
    this.size = rand(45, 80) * s;
    this.originalSize = this.size;
    this.alpha = 0;
    this.phase = 'appear'; // appear -> float -> fly
    this.phaseTime = 0;
    this.wobble = rand(0, Math.PI * 2);
    this.wobbleSpeed = rand(0.03, 0.06);
    this.floatVy = rand(-0.3, 0.3);
    this.dead = false;
    this.targetX = this.spawnX;
    this.targetY = this.spawnY;
    // 雲の構成円（ふわふわ感）
    this.blobs = [];
    const blobCount = Math.floor(rand(5, 9));
    for (let i = 0; i < blobCount; i++) {
      this.blobs.push({
        ox: (Math.random() - 0.5) * this.size * 0.8,
        oy: (Math.random() - 0.5) * this.size * 0.5,
        r: rand(0.4, 0.8) * this.size,
      });
    }
  }

  update() {
    this.phaseTime += 1 / 60;
    this.wobble += this.wobbleSpeed;

    if (this.phase === 'appear') {
      const t = Math.min(this.phaseTime / 0.5, 1);
      this.alpha = t * 0.6;
      this.x = this.targetX + Math.sin(this.wobble) * 5;
      this.y = this.targetY + Math.cos(this.wobble * 0.8) * 4;
      if (this.phaseTime >= 0.5) {
        this.phase = 'float';
        this.phaseTime = 0;
      }
    } else if (this.phase === 'float') {
      this.x = this.targetX + Math.sin(this.wobble) * 10;
      this.y += this.floatVy + Math.cos(this.wobble * 0.7) * 0.3;
      this.alpha = 0.6;
      if (this.phaseTime >= 1.0) {
        this.phase = 'fly';
        this.phaseTime = 0;
        this.flyStartX = this.x;
        this.flyStartY = this.y;
      }
    } else if (this.phase === 'fly') {
      const t = Math.min(this.phaseTime / 1.5, 1);
      const ease = t * t;
      this.x = lerp(this.flyStartX, centerX, ease);
      this.y = lerp(this.flyStartY, fireBaseY, ease);
      this.size = this.originalSize * (1 - ease * 0.7);
      this.alpha = 0.6 * (1 - t * t);

      if (t >= 1) {
        fireIntensity = clamp(fireIntensity + 0.15, 0.3, 2.0);
        this.dead = true;
      }
    }
  }

  draw() {
    if (this.alpha <= 0.01) return;
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const sizeRatio = this.size / this.originalSize;
    for (const blob of this.blobs) {
      const bx = this.x + blob.ox * sizeRatio + Math.sin(this.wobble + blob.ox) * 2;
      const by = this.y + blob.oy * sizeRatio + Math.cos(this.wobble + blob.oy) * 2;
      const r = blob.r * sizeRatio;

      const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
      grad.addColorStop(0, `rgba(255, 255, 200, ${this.alpha * 0.7})`);
      grad.addColorStop(0.3, `rgba(255, 255, 170, ${this.alpha * 0.5})`);
      grad.addColorStop(0.6, `rgba(255, 250, 140, ${this.alpha * 0.25})`);
      grad.addColorStop(1, `rgba(255, 245, 120, 0)`);

      ctx.beginPath();
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    ctx.restore();
  }
}

// --- 炎全体のグロー ---

function drawFireGlow() {
  const s = scale;
  const f1 = Math.sin(time * 0.07) * 8 + Math.sin(time * 0.11) * 5;
  const f2 = Math.sin(time * 0.09) * 4;

  // 色温度のゆるやかな変動
  const tempShift = Math.sin(time * 0.015) * 0.5 + 0.5; // 0-1
  const rBase = Math.floor(lerp(255, 255, tempShift));
  const gBase = Math.floor(lerp(140, 180, tempShift));
  const bBase = Math.floor(lerp(40, 80, tempShift));

  // アルファ値のダイナミックなフリッカー
  const flickerAlpha = 1 + Math.sin(time * 0.13) * 0.15 + Math.sin(time * 0.23) * 0.1;

  // グロー中心のわずかなシフト
  const glowCX = centerX + Math.sin(time * 0.02) * 5 * s;
  const glowCY = fireBaseY + Math.cos(time * 0.025) * 3 * s;

  const envR = 400 * s * fireIntensity + f1;
  const envGlow = ctx.createRadialGradient(glowCX, glowCY, 10 * s, glowCX, glowCY, envR);
  envGlow.addColorStop(0, `rgba(${rBase}, ${gBase}, ${bBase}, ${0.10 * flickerAlpha})`);
  envGlow.addColorStop(0.2, `rgba(255, 120, 40, ${0.06 * flickerAlpha})`);
  envGlow.addColorStop(0.4, `rgba(255, 80, 20, ${0.03 * flickerAlpha})`);
  envGlow.addColorStop(0.7, `rgba(200, 40, 0, ${0.01 * flickerAlpha})`);
  envGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = envGlow;
  ctx.beginPath();
  ctx.arc(glowCX, glowCY, envR, 0, Math.PI * 2);
  ctx.fill();

  const coreR = 120 * s * fireIntensity + f2;
  const coreGlow = ctx.createRadialGradient(glowCX, glowCY + 10 * s, 0, glowCX, glowCY + 10 * s, coreR);
  coreGlow.addColorStop(0, `rgba(255, 200, 100, ${0.18 * flickerAlpha})`);
  coreGlow.addColorStop(0.3, `rgba(255, 150, 50, ${0.10 * flickerAlpha})`);
  coreGlow.addColorStop(1, 'rgba(255, 100, 20, 0)');
  ctx.fillStyle = coreGlow;
  ctx.beginPath();
  ctx.arc(glowCX, glowCY + 10 * s, coreR, 0, Math.PI * 2);
  ctx.fill();
}

// --- 熱のゆらぎ ---

function drawHeatShimmer() {
  const s = scale;
  const shimmerScale = 0.7 + fireIntensity * 0.6;
  for (let i = 0; i < 8; i++) {
    const xOff = Math.sin(time * 0.02 + i * 1.3) * 30 * s
               + Math.cos(time * 0.035 + i * 0.9) * 15 * s;
    const x = centerX + xOff;
    const y = fireBaseY - (120 + i * 12) * s;
    const alpha = (0.018 - i * 0.002) * shimmerScale;
    ctx.beginPath();
    ctx.arc(x, y, rand(15, 25) * s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 200, 150, ${Math.max(0, alpha)})`;
    ctx.fill();
  }
}

// --- パーティクル初期化 ---

const FLAME_TONGUE_COUNT = 24;
const FLAME_SPARK_COUNT = 50;
const EMBER_COUNT = 25;
const SMOKE_COUNT = 12;

function initParticles() {
  flameTongues = [];
  for (let i = 0; i < FLAME_TONGUE_COUNT; i++) {
    const f = new FlameTongue();
    f.life = Math.random();
    f.fadeIn = 1;
    flameTongues.push(f);
  }
  flameSparks = [];
  for (let i = 0; i < FLAME_SPARK_COUNT; i++) {
    const sp = new FlameSpark();
    sp.life = Math.random();
    flameSparks.push(sp);
  }
  embers = [];
  for (let i = 0; i < EMBER_COUNT; i++) {
    const e = new Ember();
    e.life = Math.random();
    embers.push(e);
  }
  smokeParticles = [];
  for (let i = 0; i < SMOKE_COUNT; i++) {
    const s = new SmokeParticle();
    s.life = Math.random();
    smokeParticles.push(s);
  }
}

// --- 音声検出（VAD） ---

function startSpeechDetection() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const micCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = micCtx.createMediaStreamSource(stream);
    const analyser = micCtx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    const dataArray = new Float32Array(analyser.fftSize);
    const THRESHOLD = 0.035;

    setInterval(() => {
      analyser.getFloatTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i] * dataArray[i];
      const rms = Math.sqrt(sum / dataArray.length);

      if (rms > THRESHOLD) {
        const now = Date.now();
        if (now - lastCloudTime > 800) {
          const cloud = new SpeechCloud();
          speechClouds.push(cloud);
          lastCloudTime = now;
          console.log('雲生成:', 'x:', cloud.x.toFixed(0), 'y:', cloud.y.toFixed(0), 'rms:', rms.toFixed(4));
        }
      }
    }, 100);
  }).catch(err => {
    console.warn('マイク取得失敗:', err);
  });
}

// --- パチパチ音 ---

let audioCtx = null;

function initAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  scheduleCrackle();
  startAmbientRoar();
  startBGM();
}

function startBGM() {
  const bgm = new Audio('music/takibi-loop.mp3');
  bgm.loop = true;
  bgm.volume = 0.5;
  bgm.play();
}

function playCrackle() {
  if (!audioCtx) return;
  const duration = rand(0.02, 0.08);
  const now = audioCtx.currentTime;
  const bufferSize = Math.floor(audioCtx.sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.4;
    const env = Math.min(i / (bufferSize * 0.1), 1) * Math.max(0, 1 - i / bufferSize);
    data[i] *= env;
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = rand(1000, 4000);
  filter.Q.value = rand(0.5, 2);
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(rand(0.06, 0.14), now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  source.start(now);
  source.stop(now + duration);
}

function startAmbientRoar() {
  if (!audioCtx) return;
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 200;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.025;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  source.start();
}

function scheduleCrackle() {
  if (!audioCtx) return;
  const burstCount = Math.random() < 0.3 ? Math.floor(rand(2, 4)) : 1;
  for (let i = 0; i < burstCount; i++) {
    setTimeout(() => playCrackle(), i * rand(30, 80));
  }
  setTimeout(scheduleCrackle, rand(300, 1200));
}

// --- メインループ ---

function draw() {
  time++;

  // fireIntensityの自然減衰
  fireIntensity = lerp(fireIntensity, 0.3, 0.005);

  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, width, height);

  drawStars();
  drawGround();
  drawFireGlow();

  for (const s of smokeParticles) { s.update(); s.draw(); }

  // 音声検出の雲エフェクト
  for (const cloud of speechClouds) { cloud.update(); cloud.draw(); }
  speechClouds = speechClouds.filter(c => !c.dead);

  drawHeatShimmer();
  drawFirepit();

  // 熾火のベッド（薪の下）
  drawEmberBed();

  drawLogs();

  // 薪の交差部分の発光
  drawInterLogEmbers();

  // 炎の舌
  // 奥のレイヤーを先に描画
  const sortedFlames = [...flameTongues].sort((a, b) => a.layer - b.layer);
  for (const f of sortedFlames) { f.update(); f.draw(); }

  // 炎の火花
  for (const sp of flameSparks) { sp.update(); sp.draw(); }

  // 火の粉
  for (const e of embers) { e.update(); e.draw(); }

  requestAnimationFrame(draw);
}

// --- 起動 ---

initParticles();
draw();

function onUserInteraction() {
  if (audioCtx) return;
  initAudio();
  // iOS Safari: AudioContext が suspended の場合 resume する
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  startSpeechDetection();
  const hint = document.getElementById('tapHint');
  if (hint) hint.style.display = 'none';
  document.removeEventListener('click', onUserInteraction);
  document.removeEventListener('touchstart', onUserInteraction);
}

document.addEventListener('click', onUserInteraction);
document.addEventListener('touchstart', onUserInteraction);
