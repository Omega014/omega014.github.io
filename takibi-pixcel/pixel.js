// ============================================================
// Takibi Pixel - ドット絵焚き火
// Doom Fire アルゴリズム + ピクセルアート
// ============================================================

const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const W = 192;
const H = 144;

// --- 16色パレット ---
const PALETTE = [
  [10, 10, 20],     // 0: 夜空（暗）
  [18, 18, 35],     // 1: 夜空（明）
  [30, 22, 15],     // 2: 地面（暗）
  [45, 32, 20],     // 3: 地面（明）
  [50, 38, 25],     // 4: 薪（暗）
  [70, 50, 30],     // 5: 薪（明）
  [80, 10, 5],      // 6: 炎 暗赤
  [150, 25, 5],     // 7: 炎 赤
  [200, 60, 5],     // 8: 炎 濃オレンジ
  [230, 100, 10],   // 9: 炎 オレンジ
  [250, 160, 20],   // 10: 炎 黄オレンジ
  [255, 210, 60],   // 11: 炎 黄色
  [255, 255, 160],  // 12: 炎 白黄
  [55, 50, 48],     // 13: 石（暗）
  [75, 70, 65],     // 14: 石（明）
  [255, 255, 220],  // 15: 白（ハイライト）
];

let time = 0;
let fireIntensity = 0.5;
let speechClouds = [];
let lastCloudTime = 0;

// --- Doom Fire バッファ ---
const FIRE_W = 60;
const FIRE_H = 40;
const fireBuffer = new Uint8Array(FIRE_W * FIRE_H);

// --- 星 ---
const stars = [];
for (let i = 0; i < 35; i++) {
  stars.push({
    x: Math.floor(Math.random() * W),
    y: Math.floor(Math.random() * 55),
    twinkleSpeed: 0.01 + Math.random() * 0.02,
    twinkleOffset: Math.random() * Math.PI * 2,
    brightness: 0.3 + Math.random() * 0.7,
  });
}

// --- 石の囲い ---
const stones = [];
{
  const stoneCount = 9;
  const cx = 96, cy = 105;
  const rx = 42, ry = 8;
  for (let i = 0; i < stoneCount; i++) {
    const angle = (i / stoneCount) * Math.PI * 2 + 0.2;
    stones.push({
      x: Math.round(cx + Math.cos(angle) * rx),
      y: Math.round(cy + Math.sin(angle) * ry),
      w: 7 + Math.floor(Math.random() * 4),
      h: 4 + Math.floor(Math.random() * 2),
      dark: Math.random() < 0.5,
    });
  }
}

// --- 薪（井桁状に積み重ね） ---
// layer: 描画順（小さい方が奥）, z: 高さ（y座標のオフセット）
const logs = [
  // 最下段: 左右に平行2本（土台）
  { x: 96, y: 104, w: 50, h: 5, angle: -0.05, layer: 0 },
  { x: 96, y: 100, w: 46, h: 5, angle: 0.05,  layer: 0 },
  // 中段: 土台に直交するように斜め2本
  { x: 86, y: 99, w: 32, h: 4, angle: -0.7,  layer: 1 },
  { x: 106, y: 99, w: 30, h: 4, angle: 0.65, layer: 1 },
  // 上段: テント状にもたれかけた1本
  { x: 96, y: 95, w: 36, h: 4, angle: -0.15, layer: 2 },
];

// --- 熾火 ---
const emberPixels = [];
for (let i = 0; i < 10; i++) {
  emberPixels.push({
    x: 82 + Math.floor(Math.random() * 28),
    y: 96 + Math.floor(Math.random() * 8),
    speed: 0.03 + Math.random() * 0.05,
    offset: Math.random() * Math.PI * 2,
  });
}

// --- 火の粉 ---
const sparks = [];
for (let i = 0; i < 8; i++) {
  sparks.push({ x: 0, y: 0, vy: 0, vx: 0, life: 0, decay: 0 });
}

function resetSpark(sp) {
  sp.x = 86 + Math.random() * 20;
  sp.y = 78 + Math.random() * 18;
  sp.vx = (Math.random() - 0.5) * 0.5;
  sp.vy = -(0.3 + Math.random() * 0.5);
  sp.life = 1;
  sp.decay = 0.01 + Math.random() * 0.02;
}
sparks.forEach(resetSpark);

// --- 煙 ---
const smokeParticles = [];
for (let i = 0; i < 5; i++) {
  smokeParticles.push({ x: 0, y: 0, vx: 0, vy: 0, life: 0, size: 0 });
}

function resetSmoke(sm) {
  sm.x = 92 + Math.random() * 8;
  sm.y = 60 + Math.random() * 15;
  sm.vx = (Math.random() - 0.5) * 0.2;
  sm.vy = -(0.15 + Math.random() * 0.2);
  sm.life = 1;
  sm.decay = 0.005 + Math.random() * 0.008;
  sm.size = 2 + Math.floor(Math.random() * 3);
}
smokeParticles.forEach(resetSmoke);

// --- ユーティリティ ---
function rand(a, b) { return Math.random() * (b - a) + a; }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }

function setPixel(x, y, r, g, b, a) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  x = Math.floor(x);
  y = Math.floor(y);
  if (a === undefined) a = 255;
  if (a < 255) {
    // アルファブレンド
    const idx = (y * W + x) * 4;
    const sr = imageData.data[idx];
    const sg = imageData.data[idx + 1];
    const sb = imageData.data[idx + 2];
    const t = a / 255;
    imageData.data[idx] = Math.floor(sr * (1 - t) + r * t);
    imageData.data[idx + 1] = Math.floor(sg * (1 - t) + g * t);
    imageData.data[idx + 2] = Math.floor(sb * (1 - t) + b * t);
    imageData.data[idx + 3] = 255;
  } else {
    const idx = (y * W + x) * 4;
    imageData.data[idx] = r;
    imageData.data[idx + 1] = g;
    imageData.data[idx + 2] = b;
    imageData.data[idx + 3] = 255;
  }
}

function setPalettePixel(x, y, palIdx, alpha) {
  const c = PALETTE[palIdx];
  setPixel(x, y, c[0], c[1], c[2], alpha);
}

let imageData = ctx.createImageData(W, H);

// --- Bayer 4x4 ディザリングマトリクス ---
const BAYER4 = [
  [ 0,  8,  2, 10],
  [12,  4, 14,  6],
  [ 3, 11,  1,  9],
  [15,  7, 13,  5],
];

function bayerThreshold(x, y) {
  return BAYER4[y & 3][x & 3] / 16;
}

// --- 描画: 夜空グラデーション ---
function drawSky() {
  for (let y = 0; y < 70; y++) {
    for (let x = 0; x < W; x++) {
      const t = y / 70;
      const r = Math.floor(lerp(10, 18, t));
      const g = Math.floor(lerp(10, 18, t));
      const b = Math.floor(lerp(20, 35, t));
      setPixel(x, y, r, g, b);
    }
  }
}

// --- 流れ星 ---
let shootingStar = null;
let nextShootingStarTime = time + Math.floor(rand(300, 900));

function updateAndDrawShootingStar() {
  // 出現タイミング
  if (!shootingStar && time >= nextShootingStarTime) {
    const startX = Math.floor(rand(20, W - 20));
    const startY = Math.floor(rand(3, 25));
    const angle = rand(0.3, 0.8) * (Math.random() < 0.5 ? 1 : -1);
    shootingStar = {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * rand(2.5, 4),
      vy: Math.sin(Math.abs(angle)) * rand(1.5, 3),
      life: 1,
      decay: rand(0.025, 0.045),
      tailLen: Math.floor(rand(5, 10)),
    };
  }

  if (!shootingStar) return;

  const s = shootingStar;

  // 尾を描画（古い位置から現在位置へ）
  for (let i = s.tailLen; i >= 0; i--) {
    const t = i / s.tailLen;
    const px = Math.floor(s.x - s.vx * i * 0.6);
    const py = Math.floor(s.y - s.vy * i * 0.6);
    const a = Math.floor(s.life * (1 - t) * 220);
    if (a > 10) {
      setPixel(px, py, 255, 255, 240, a);
    }
  }
  // 先端を明るく
  setPixel(Math.floor(s.x), Math.floor(s.y), 255, 255, 255, Math.floor(s.life * 255));

  // 更新
  s.x += s.vx;
  s.y += s.vy;
  s.life -= s.decay;

  if (s.life <= 0 || s.x < -10 || s.x > W + 10 || s.y > 60) {
    shootingStar = null;
    nextShootingStarTime = time + Math.floor(rand(300, 900));
  }
}

// --- 描画: 星 ---
function drawStars() {
  for (const star of stars) {
    const alpha = star.brightness * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset));
    if (alpha > 0.4) {
      setPalettePixel(star.x, star.y, 15, Math.floor(alpha * 200));
    }
  }
  updateAndDrawShootingStar();
}

// --- ヘビ ---
let snake = null;
let nextSnakeTime = time + Math.floor(rand(600, 1500));

function updateAndDrawSnake() {
  if (!snake && time >= nextSnakeTime) {
    const goRight = Math.random() < 0.5;
    snake = {
      x: goRight ? -12 : W + 12,
      y: 115 + Math.floor(rand(0, 18)),
      vx: goRight ? rand(0.4, 0.8) : rand(-0.8, -0.4),
      segLen: Math.floor(rand(8, 13)),
      phase: rand(0, Math.PI * 2),
      freq: rand(0.12, 0.2),
      amp: rand(1.5, 3),
      bodyColor: Math.random() < 0.5 ? [40, 70, 30] : [55, 45, 30],
    };
  }

  if (!snake) return;

  const s = snake;

  // 体節を描画（尾→頭）
  for (let i = s.segLen; i >= 0; i--) {
    const t = i / s.segLen;
    const sx = s.x - s.vx * i * 2.2;
    const sy = s.y + Math.sin(s.phase + i * 0.6) * s.amp;
    const px = Math.floor(sx);
    const py = Math.floor(sy);

    if (i === 0) {
      // 頭（少し大きめ）
      setPixel(px, py, s.bodyColor[0] + 20, s.bodyColor[1] + 20, s.bodyColor[2] + 15, 230);
      setPixel(px + (s.vx > 0 ? 1 : -1), py, s.bodyColor[0] + 20, s.bodyColor[1] + 20, s.bodyColor[2] + 15, 200);
      // 目
      setPixel(px + (s.vx > 0 ? 1 : -1), py - 1, 200, 180, 50, 255);
    } else {
      // 胴体（先端にいくほど細い印象 → 尾は薄め）
      const a = Math.floor(lerp(255, 140, t));
      setPixel(px, py, s.bodyColor[0], s.bodyColor[1], s.bodyColor[2], a);
    }
  }

  // 更新
  s.x += s.vx;
  s.phase += s.freq;

  // 画面外に出たら消す
  if ((s.vx > 0 && s.x > W + 30) || (s.vx < 0 && s.x < -30)) {
    snake = null;
    nextSnakeTime = time + Math.floor(rand(600, 1500));
  }
}

// --- 描画: 地面 ---
function drawGround() {
  for (let y = 108; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = (y - 108) / (H - 108);
      const c0 = PALETTE[2];
      const c1 = PALETTE[0];
      const r = Math.floor(lerp(c0[0], c1[0], t));
      const g = Math.floor(lerp(c0[1], c1[1], t));
      const b = Math.floor(lerp(c0[2], c1[2], t));
      setPixel(x, y, r, g, b);
    }
  }
}

// --- 描画: 石の囲い ---
function drawStones() {
  for (const st of stones) {
    const pi = st.dark ? 13 : 14;
    const c = PALETTE[pi];
    const hw = Math.floor(st.w / 2);
    const hh = Math.floor(st.h / 2);
    for (let dy = -hh; dy <= hh; dy++) {
      for (let dx = -hw; dx <= hw; dx++) {
        // 丸みを付ける
        const nx = dx / hw;
        const ny = dy / hh;
        if (nx * nx + ny * ny > 1.1) continue;
        const shade = (ny < -0.3) ? 10 : (ny > 0.3 ? -10 : 0);
        setPixel(st.x + dx, st.y + dy,
          clamp(c[0] + shade, 0, 255),
          clamp(c[1] + shade, 0, 255),
          clamp(c[2] + shade, 0, 255)
        );
      }
    }
  }
}

// --- 描画: 薪 ---
function drawLogs() {
  // レイヤー順に描画（奥→手前）
  const sorted = [...logs].sort((a, b) => a.layer - b.layer);
  for (const log of sorted) {
    const hw = Math.floor(log.w / 2);
    const hh = Math.floor(log.h / 2);
    for (let dy = -hh; dy <= hh; dy++) {
      for (let dx = -hw; dx <= hw; dx++) {
        const px = log.x + dx + Math.round(dy * log.angle);
        const py = log.y + dy;
        // 炭化テクスチャ（中央ほど暗い）
        const distCenter = Math.abs(dx) / hw;
        const charDark = (distCenter < 0.4) ? -15 : 0;
        const barkNoise = ((dx * 7 + dy * 13) & 7) < 2 ? -8 : 0;
        const isTop = dy === -hh;
        const base = isTop ? PALETTE[5] : PALETTE[4];
        // 上段の薪ほどわずかに明るく（炎に近いので）
        const layerBright = log.layer * 5;
        setPixel(px, py,
          clamp(base[0] + charDark + barkNoise + layerBright, 0, 255),
          clamp(base[1] + charDark + barkNoise + layerBright, 0, 255),
          clamp(base[2] + charDark + barkNoise + layerBright, 0, 255)
        );
      }
    }

    // 薪の端（断面の丸み）
    const endX1 = log.x - hw + Math.round(-hh * log.angle);
    const endX2 = log.x + hw + Math.round(-hh * log.angle);
    for (let dy = -hh; dy <= hh; dy++) {
      setPixel(endX1 - 1, log.y + dy, 45, 30, 18);
      setPixel(endX2 + 1, log.y + dy, 45, 30, 18);
    }
  }

  // 交差部分の赤熱グロー
  const crossPoints = [
    { x: 88, y: 100 },
    { x: 104, y: 100 },
    { x: 96, y: 97 },
  ];
  for (let i = 0; i < crossPoints.length; i++) {
    const cp = crossPoints[i];
    const pulse = 0.4 + Math.sin(time * 0.05 + i * 2.3) * 0.3;
    const a = Math.floor(pulse * fireIntensity * 180);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (Math.abs(dx) + Math.abs(dy) > 2) continue;
        const dist = Math.abs(dx) + Math.abs(dy);
        const fa = Math.floor(a * (1 - dist * 0.35));
        setPixel(cp.x + dx, cp.y + dy, 255, 160, 40, fa);
      }
    }
  }
}

// --- 描画: 熾火ベッド ---
function drawEmberBed() {
  for (const em of emberPixels) {
    const pulse = 0.5 + Math.sin(time * em.speed + em.offset) * 0.5;
    const bright = pulse > 0.7;
    const pi = bright ? 10 : (pulse > 0.3 ? 8 : 6);
    const a = Math.floor(120 + pulse * 135);
    setPalettePixel(em.x, em.y, pi, a);
    if (bright) {
      setPalettePixel(em.x + 1, em.y, 9, Math.floor(a * 0.5));
      setPalettePixel(em.x, em.y + 1, 7, Math.floor(a * 0.3));
    }
  }
}

// --- Doom Fire アルゴリズム ---
function initFireBuffer() {
  fireBuffer.fill(0);
}

function updateFire() {
  // 下端に熱源をセット
  const baseHeat = Math.floor(fireIntensity * 7);
  for (let x = 0; x < FIRE_W; x++) {
    const idx = (FIRE_H - 1) * FIRE_W + x;
    // 中央付近ほど強い
    const cx = Math.abs(x - FIRE_W / 2) / (FIRE_W / 2);
    if (cx < 0.5) {
      fireBuffer[idx] = Math.min(7, baseHeat + Math.floor(Math.random() * 2));
    } else if (cx < 0.8) {
      fireBuffer[idx] = Math.max(0, baseHeat - 1 + Math.floor(Math.random() * 2));
    } else {
      fireBuffer[idx] = Math.max(0, Math.floor(Math.random() * baseHeat * 0.5));
    }
  }

  // 上方向へ伝播
  for (let y = 0; y < FIRE_H - 1; y++) {
    for (let x = 0; x < FIRE_W; x++) {
      const below = [];
      for (let dx = -1; dx <= 1; dx++) {
        const sx = clamp(x + dx, 0, FIRE_W - 1);
        below.push(fireBuffer[(y + 1) * FIRE_W + sx]);
      }
      const avg = (below[0] + below[1] + below[2]) / 3;
      const decay = Math.random() * 0.8;
      const wind = Math.random() < 0.15 ? (Math.random() < 0.5 ? -1 : 1) : 0;
      const destX = clamp(x + wind, 0, FIRE_W - 1);
      fireBuffer[y * FIRE_W + destX] = Math.max(0, Math.floor(avg - decay));
    }
  }
}

// 炎パレットインデックス（熱値 0-7 → PALETTE インデックス）
const FIRE_PALETTE_MAP = [0, 6, 7, 8, 9, 10, 11, 12];

function drawFire() {
  // 炎の描画領域: キャンバス上で x=66..126 (60px), y=56..96 (40px)
  const ox = 66;
  const oy = 56;
  for (let fy = 0; fy < FIRE_H; fy++) {
    for (let fx = 0; fx < FIRE_W; fx++) {
      const heat = fireBuffer[fy * FIRE_W + fx];
      if (heat <= 0) continue;
      const pi = FIRE_PALETTE_MAP[heat];
      const c = PALETTE[pi];
      const px = ox + fx;
      const py = oy + fy;
      if (px >= 0 && px < W && py >= 0 && py < H) {
        // additive blend for brighter flames
        const idx = (py * W + px) * 4;
        imageData.data[idx] = Math.min(255, imageData.data[idx] + c[0]);
        imageData.data[idx + 1] = Math.min(255, imageData.data[idx + 1] + c[1]);
        imageData.data[idx + 2] = Math.min(255, imageData.data[idx + 2] + c[2]);
        imageData.data[idx + 3] = 255;
      }
    }
  }
}

// --- 描画: 火の粉 ---
function updateAndDrawSparks() {
  for (const sp of sparks) {
    sp.x += sp.vx + Math.sin(time * 0.05 + sp.y * 0.1) * 0.2;
    sp.y += sp.vy;
    sp.life -= sp.decay;
    if (sp.life <= 0) resetSpark(sp);

    const px = Math.floor(sp.x);
    const py = Math.floor(sp.y);
    const brightness = sp.life > 0.5 ? 11 : 9;
    const a = Math.floor(sp.life * 255);
    setPalettePixel(px, py, brightness, a);
  }
}

// --- 描画: 煙 ---
function updateAndDrawSmoke() {
  for (const sm of smokeParticles) {
    sm.x += sm.vx + Math.sin(time * 0.01 + sm.y * 0.05) * 0.15;
    sm.y += sm.vy;
    sm.life -= sm.decay;
    if (sm.life <= 0) resetSmoke(sm);

    const a = Math.floor(sm.life * 60);
    if (a < 5) continue;
    const px = Math.floor(sm.x);
    const py = Math.floor(sm.y);
    for (let dy = 0; dy < sm.size; dy++) {
      for (let dx = 0; dx < sm.size; dx++) {
        setPixel(px + dx, py + dy, 100, 95, 90, a);
      }
    }
  }
}

// --- 描画: 火のグロー（Bayer ディザリング） ---
function drawGlow() {
  const cx = 96;
  const cy = 90;
  const maxR = 55 + Math.sin(time * 0.04) * 5;

  for (let y = Math.max(0, Math.floor(cy - maxR)); y < Math.min(H, Math.ceil(cy + maxR)); y++) {
    for (let x = Math.max(0, Math.floor(cx - maxR)); x < Math.min(W, Math.ceil(cx + maxR)); x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > maxR) continue;

      const intensity = (1 - dist / maxR) * fireIntensity * 0.35;
      const threshold = bayerThreshold(x, y);

      if (intensity > threshold) {
        const t = 1 - dist / maxR;
        const r = Math.floor(lerp(100, 255, t));
        const g = Math.floor(lerp(30, 140, t));
        const b = Math.floor(lerp(0, 30, t));
        const a = Math.floor(intensity * 120);
        setPixel(x, y, r, g, b, a);
      }
    }
  }
}

// --- PixelCloud: 音声検出の雲 ---

class PixelCloud {
  constructor() {
    const angle = rand(0, Math.PI * 2);
    const dist = rand(60, 90);
    this.spawnX = 96 + Math.cos(angle) * dist;
    this.spawnY = 80 + Math.sin(angle) * dist * 0.4;
    this.x = this.spawnX;
    this.y = this.spawnY;
    this.size = Math.floor(rand(4, 8));
    this.originalSize = this.size;
    this.alpha = 0;
    this.phase = 'appear';
    this.phaseTime = 0;
    this.wobble = rand(0, Math.PI * 2);
    this.wobbleSpeed = rand(0.03, 0.06);
    this.floatVy = rand(-0.1, 0.1);
    this.dead = false;
    // クラスター形状
    this.pixels = [];
    for (let i = 0; i < this.size * 2; i++) {
      this.pixels.push({
        ox: Math.floor((Math.random() - 0.5) * this.size),
        oy: Math.floor((Math.random() - 0.5) * this.size * 0.6),
      });
    }
  }

  update() {
    this.phaseTime += 1 / 60;
    this.wobble += this.wobbleSpeed;

    if (this.phase === 'appear') {
      const t = Math.min(this.phaseTime / 0.5, 1);
      this.alpha = t * 200;
      this.x = this.spawnX + Math.sin(this.wobble) * 2;
      this.y = this.spawnY + Math.cos(this.wobble * 0.8) * 1;
      if (this.phaseTime >= 0.5) {
        this.phase = 'float';
        this.phaseTime = 0;
      }
    } else if (this.phase === 'float') {
      this.x = this.spawnX + Math.sin(this.wobble) * 3;
      this.y += this.floatVy;
      this.alpha = 200;
      if (this.phaseTime >= 1.0) {
        this.phase = 'fly';
        this.phaseTime = 0;
        this.flyStartX = this.x;
        this.flyStartY = this.y;
      }
    } else if (this.phase === 'fly') {
      const t = Math.min(this.phaseTime / 1.5, 1);
      const ease = t * t;
      this.x = lerp(this.flyStartX, 96, ease);
      this.y = lerp(this.flyStartY, 88, ease);
      this.size = Math.max(1, Math.floor(this.originalSize * (1 - ease * 0.7)));
      this.alpha = 200 * (1 - t * t);

      if (t >= 1) {
        fireIntensity = clamp(fireIntensity + 0.15, 0.3, 2.0);
        // ブースト: fireBuffer の下端熱量を上げる
        for (let x = 15; x < 45; x++) {
          const idx = (FIRE_H - 1) * FIRE_W + x;
          fireBuffer[idx] = Math.min(7, fireBuffer[idx] + 2);
        }
        this.dead = true;
      }
    }
  }

  draw() {
    if (this.alpha < 5) return;
    const a = Math.floor(this.alpha);
    const sizeRatio = this.size / this.originalSize;
    for (const p of this.pixels) {
      const px = Math.floor(this.x + p.ox * sizeRatio);
      const py = Math.floor(this.y + p.oy * sizeRatio);
      setPixel(px, py, 255, 255, 200, a);
    }
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
          const cloud = new PixelCloud();
          speechClouds.push(cloud);
          lastCloudTime = now;
        }
      }
    }, 100);
  }).catch(err => {
    console.warn('マイク取得失敗:', err);
  });
}

// --- オーディオ ---

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

initFireBuffer();

function draw() {
  time++;

  // fireIntensity 自然減衰
  fireIntensity = lerp(fireIntensity, 0.3, 0.005);

  // imageData をクリア
  imageData = ctx.createImageData(W, H);

  // 背景
  drawSky();
  drawGround();

  // グロー（ディザリング）
  drawGlow();

  // 煙
  updateAndDrawSmoke();

  // 音声検出の雲
  for (const cloud of speechClouds) { cloud.update(); cloud.draw(); }
  speechClouds = speechClouds.filter(c => !c.dead);

  // 石の囲い
  drawStones();

  // 熾火
  drawEmberBed();

  // 薪
  drawLogs();

  // Doom Fire
  updateFire();
  drawFire();

  // 火の粉
  updateAndDrawSparks();

  // 星
  drawStars();

  // ヘビ
  updateAndDrawSnake();

  // 描画
  ctx.putImageData(imageData, 0, 0);

  requestAnimationFrame(draw);
}

// --- 起動 ---

draw();

function onUserInteraction() {
  if (audioCtx) return;
  initAudio();
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
