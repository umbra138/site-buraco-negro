/* ============================================================
   alef-1 — willow (o robôzinho; cópia isolada do robô criador)
   ============================================================ */

function $(s) { return document.querySelector(s); }
function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
function rand(a, b) { return a + Math.random() * (b - a); }
function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
function lerp(a, b, t) { return a + (b - a) * t; }
function sstep(a, b, v) { v = clamp((v - a) / (b - a), 0, 1); return v * v * (3 - 2 * v); }
function lerpC(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

const isMobile = window.innerWidth < 720 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
const TAU = Math.PI * 2;

const ROBO = {
  mensagens: [
    'Tive uma carta pra você. Toque em mim para abri-la.',
  ],
  perguntas: [
    'Ei… se este universo tem só uma função, que função você acha que é?',
    'Se você pudesse viajar para qualquer estrela daqui, para qual iria?',
    'Pergunta séria: o que faz o seu coração bater mais rápido?',
    'Qual é o seu lugar preferido deste universo?',
    'Se as estrelas pudessem falar, o que você queria que elas dissessem?',
    'Me conta: qual foi a última coisa que te fez sorrir?',
    'Curiosidade: se você fosse uma constelação, qual nome teria?',
    'Pergunta rápida: prefere o pôr do sol ou a noite estrelada?',
  ],
};

// Músicas do modo música — o willow "toca" e mostra a letra + tradução na cabeça (como uma TV).
// Edite aqui quando quiser: cada item tem nome, letra (linhas), trad (tradução, mesmo tamanho)
// e melodia (bpm + leads/chords/bass em Hz) que o willow sintetiza enquanto toca.
const MUSICAS = [
  {
    nome: 'Over the Rainbow',
    melodia: {
      bpm: 96,
      leads: [261.63, 329.63, 392, 523.25, 220, 261.63, 329.63, 440, 174.61, 220, 261.63, 349.23, 196, 246.94, 293.66, 392],
      chords: [
        [261.63, 329.63, 392],
        [220, 261.63, 329.63],
        [174.61, 220, 261.63],
        [196, 246.94, 293.66],
      ],
      bass: [130.81, 110, 87.31, 98],
    },
    letra: [
      'Somewhere over the rainbow',
      'way up high',
      'there is a land that I heard of',
      'once in a lullaby',
      'Somewhere over the rainbow',
      'skies are blue',
      'and the dreams that you dare to dream',
      'really do come true',
    ],
    trad: [
      'Em algum lugar sobre o arco-íris',
      'bem lá no alto',
      'existe uma terra sobre a qual ouvi falar',
      'certa vez numa canção de ninar',
      'Em algum lugar sobre o arco-íris',
      'os céus são azuis',
      'e os sonhos que você ousa sonhar',
      'realmente se realizam',
    ],
  },
  {
    nome: 'Earrings',
    yt: 'a4tdS3IB294', // embed oficial (YouTube IFrame API) — toca sem download
    melodia: {
      bpm: 81,
      leads: [311.13, 369.99, 233.08, 311.13, 415.3, 311.13, 261.63, 207.65, 466.16, 349.23, 293.66, 233.08, 415.3, 311.13, 369.99, 207.65],
      chords: [
        [155.56, 185, 233.08, 277.18],   // Ebm7
        [207.65, 261.63, 311.13],        // Ab
        [233.08, 293.66, 349.23],        // Bb
        [207.65, 261.63, 311.13, 185],   // Ab7
      ],
      bass: [77.78, 103.83, 116.54, 103.83],
    },
    letra: [
      'Her love is in your head',
      'You lost your earrings in her bed',
      "You couldn't tell her that you lost 'em",
      "'Cause you're scared and you're not talking",
      'So you think of what to say',
      'Then save it for another day',
      "'Cause you just never had the heart",
      'Now they just drift further apart',
      'From you, oh',
      'From you, oh',
      'From you, oh',
      'From you, oh',
      'Her love is in your head',
      'You lost your earrings in her bed',
      "You couldn't tell her that you lost 'em",
      "'Cause you're scared and you're not talking",
      'So you think of what to say',
      'Then save it for another day',
      "'Cause you just never had the heart",
      'Now they just drift further apart',
      'extra, extra, read all about it',
      "Mac is in his feelings and he can't get out of it",
      '(From you, oh) extra, extra, read all about it',
      "Mac is in his feelings and he can't get out of it",
      '(From you, oh) extra, extra, read all about it',
      "Mac is in his feelings and he can't get out of it",
      '(From you, oh) extra, extra, read all about it',
      "Mac is in his feelings and he can't get out of it",
      'From you, oh',
      'From you, oh',
      'extra, extra, read all about it',
      "Mac is in his feelings and he can't get out of it",
      '(From you, oh) extra, extra, read all about it',
      "Mac is in his feelings and he can't get out of it",
      "Can't get out of it, can't get out of it",
      'Okay, well, I hope you like my mixtape',
    ],
    trad: [
      'O amor dela está na sua cabeça',
      'Você perdeu os seus brincos na cama dela',
      'Você não conseguiu dizer que os perdeu',
      'Porque está com medo e não está conversando',
      'Então você pensa no que dizer',
      'E guarda para outro dia',
      'Porque você nunca teve coragem',
      'Agora eles só se afastam cada vez mais',
      'De você, oh',
      'De você, oh',
      'De você, oh',
      'De você, oh',
      'O amor dela está na sua cabeça',
      'Você perdeu os seus brincos na cama dela',
      'Você não conseguiu dizer que os perdeu',
      'Porque está com medo e não está conversando',
      'Então você pensa no que dizer',
      'E guarda para outro dia',
      'Porque você nunca teve coragem',
      'Agora eles só se afastam cada vez mais',
      'extra, extra, leiam sobre isso',
      'Mac está emocionado e não consegue sair disso',
      '(De você, oh) extra, extra, leiam sobre isso',
      'Mac está emocionado e não consegue sair disso',
      '(De você, oh) extra, extra, leiam sobre isso',
      'Mac está emocionado e não consegue sair disso',
      '(De você, oh) extra, extra, leiam sobre isso',
      'Mac está emocionado e não consegue sair disso',
      'De você, oh',
      'De você, oh',
      'extra, extra, leiam sobre isso',
      'Mac está emocionado e não consegue sair disso',
      '(De você, oh) extra, extra, leiam sobre isso',
      'Mac está emocionado e não consegue sair disso',
      'Não consegue sair disso, não consegue sair disso',
      'Ok, bem, espero que vocês gostem da minha mixtape',
    ],
  },
];

// Melodia sintetizada (Web Audio) — progressão C → Am → F → G com lead e baixo.
const MELODIA = {
  bpm: 96,
  // nota (freq Hz) por batida; 0 = pausa
  leads: [261.63, 329.63, 392, 523.25, 220, 261.63, 329.63, 440, 174.61, 220, 261.63, 349.23, 196, 246.94, 293.66, 392],
  // acorde por compasso (4 compassos)
  chords: [
    [261.63, 329.63, 392],   // C
    [220, 261.63, 329.63],   // Am
    [174.61, 220, 261.63],   // F
    [196, 246.94, 293.66],   // G
  ],
  // baixo: fundamental por compasso
  bass: [130.81, 110, 87.31, 98],
};

// Gestos do corpo inteiro — disparados sozinhos quando o willow está à toa.
// Cada f(u) devolve offsets para as juntas; os valores voltam a 0 no fim (suave).
const ANIMS = {
  oi: {
    dur: 1.7,
    f: function (u) {
      const e = sstep(0, 0.1, u) * (1 - sstep(0.72, 1, u));
      const wag = Math.sin(u * 26) * 0.22;
      return {
        b2: (-1.15 + wag) * e,
        cabRot: 0.25 * e,
        cabDy: 3 * e,
        at: -0.4 * e,
        al: 0.25 * e, ar: -0.25 * e,
        ol: 0.5 * e,
      };
    },
  },
  giro: {
    dur: 2.0,
    f: function (u) {
      const e = sstep(0, 0.08, u) * (1 - sstep(0.85, 1, u));
      const flip = Math.cos(2 * Math.PI * u);
      return {
        gSx: Math.max(0.08, Math.abs(flip)) * (flip < 0 ? -1 : 1),
        rSy: 1 + 0.08 * Math.sin(Math.PI * u) * e,
        rDy: 10 * Math.sin(Math.PI * u) * e,
        b1: 1.2 * e, b2: -1.2 * e,
        corpo: 0.06 * Math.sin(Math.PI * u) * e,
      };
    },
  },
  danca: {
    dur: 2.1,
    f: function (u) {
      const e = sstep(0, 0.08, u) * (1 - sstep(0.85, 1, u));
      const w = Math.sin(u * Math.PI * 5);
      const w2 = Math.sin(u * Math.PI * 5 + 1.3);
      return {
        rDy: w * 6 * e,
        rDx: w2 * 5 * e,
        rRot: w * 0.08 * e,
        b1: w * 0.55 * e, b2: -w * 0.55 * e,
        corpo: w2 * 0.05 * e,
        n: 1 + w * 0.05 * e,
        cabRot: -w * 0.16 * e,
        at: w2 * 0.2 * e,
        al: w2 * 0.3 * e, ar: -w2 * 0.3 * e,
        g: w2 * 1.6 * e,
      };
    },
  },
  estica: {
    dur: 2.0,
    f: function (u) {
      const e = sstep(0, 0.1, u) * (1 - sstep(0.75, 1, u));
      const h = Math.sin(Math.PI * u);
      return {
        rDy: -16 * h * e,
        rSx: 1 + 0.1 * h * e,
        rSy: 1 - 0.12 * h * e,
        b1: (1.35 - 0.1 * h) * e, b2: (-1.35 + 0.1 * h) * e,
        n: 1 + 0.08 * h * e,
        cabDy: 5 * h * e,
        corpo: 0.03 * h * e,
      };
    },
  },
  mortal: {
    dur: 1.7,
    f: function (u) {
      const h = Math.sin(Math.PI * u);
      const voo = sstep(0, 0.1, u) * (1 - sstep(0.9, 1, u));
      const impact = sstep(0.82, 0.9, u) * (1 - sstep(0.94, 1, u));
      return {
        mDy: -55 * h * voo,
        mRot: 2 * Math.PI * sstep(0.06, 0.94, u),
        b1: 1.15 * voo, b2: -1.15 * voo,
        rSx: 1 + 0.07 * impact,
        rSy: 1 - 0.08 * impact,
      };
    },
  },
};

const COL = {
  vTop: [1, 0.91, 0.66],
  vBot: [0.79, 0.49, 0.08],
  escTop: [1, 0.84, 0.42],
  escBot: [0.72, 0.47, 0.10],
  telaTop: [0.045, 0.055, 0.11],
  telaBot: [0.016, 0.02, 0.05],
  azul: [0.35, 0.82, 1],
  azulEsc: [0.22, 0.55, 1],
  azulBril: [0.85, 0.96, 1],
  escuro: [0.05, 0.05, 0.1],
  amarelo: [1, 0.86, 0.32],
  contorno: [0.28, 0.12, 0.05],
  rosa: [1, 0.5, 0.62],
  branco: [1, 1, 1],
  dourado: [1, 0.86, 0.32],
  marrom: [0.79, 0.49, 0.08],
};

function m3() { return [1, 0, 0, 0, 1, 0, 0, 0, 1]; }
function m3mul(a, b) {
  return [
    a[0] * b[0] + a[3] * b[1] + a[6] * b[2],
    a[1] * b[0] + a[4] * b[1] + a[7] * b[2],
    a[2] * b[0] + a[5] * b[1] + a[8] * b[2],
    a[0] * b[3] + a[3] * b[4] + a[6] * b[5],
    a[1] * b[3] + a[4] * b[4] + a[7] * b[5],
    a[2] * b[3] + a[5] * b[4] + a[8] * b[5],
    a[0] * b[6] + a[3] * b[7] + a[6] * b[8],
    a[1] * b[6] + a[4] * b[7] + a[7] * b[8],
    a[2] * b[6] + a[5] * b[7] + a[8] * b[8],
  ];
}
function m3T(x, y) { return [1, 0, 0, 0, 1, 0, x, y, 1]; }
function m3R(a) { const c = Math.cos(a), s = Math.sin(a); return [c, s, 0, -s, c, 0, 0, 0, 1]; }
function m3S(x, y) { return [x, 0, 0, 0, y, 0, 0, 0, 1]; }
function m3Apply(m, x, y) { return [m[0] * x + m[3] * y + m[6], m[1] * x + m[4] * y + m[7]]; }

function pushV(out, x, y, col, alpha, phase, amp) {
  out.push(x, y, col[0], col[1], col[2], alpha, phase, amp);
}

function fan(out, pts, cTop, cBot, alpha, phase, amp) {
  let cx = 0, cy = 0, ymin = Infinity, ymax = -Infinity;
  for (let i = 0; i < pts.length; i++) {
    cx += pts[i][0]; cy += pts[i][1];
    if (pts[i][1] < ymin) ymin = pts[i][1];
    if (pts[i][1] > ymax) ymax = pts[i][1];
  }
  cx /= pts.length; cy /= pts.length;
  const d = Math.max(1, ymax - ymin);
  const tc = (cy - ymin) / d;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    pushV(out, p[0], p[1], lerpC(cTop, cBot, (p[1] - ymin) / d), alpha, phase, amp);
    pushV(out, q[0], q[1], lerpC(cTop, cBot, (q[1] - ymin) / d), alpha, phase, amp);
    pushV(out, cx, cy, lerpC(cTop, cBot, tc), alpha, phase, amp);
  }
}

function stripQ(out, o, i, col, alpha, phase, amp) {
  const n = Math.min(o.length, i.length) - 1;
  for (let k = 0; k < n; k++) {
    pushV(out, o[k][0], o[k][1], col, alpha, phase, amp);
    pushV(out, o[k + 1][0], o[k + 1][1], col, alpha, phase, amp);
    pushV(out, i[k][0], i[k][1], col, alpha, phase, amp);
    pushV(out, i[k][0], i[k][1], col, alpha, phase, amp);
    pushV(out, o[k + 1][0], o[k + 1][1], col, alpha, phase, amp);
    pushV(out, i[k + 1][0], i[k + 1][1], col, alpha, phase, amp);
  }
}

function ribbon(out, line, thick, col, alpha, phase, amp) {
  for (let i = 0; i < line.length - 1; i++) {
    const a = line[i], b = line[i + 1];
    let dx = b[0] - a[0], dy = b[1] - a[1];
    const L = Math.hypot(dx, dy) || 1;
    dx /= L; dy /= L;
    const nx = -dy * thick / 2, ny = dx * thick / 2;
    pushV(out, a[0] + nx, a[1] + ny, col, alpha, phase, amp);
    pushV(out, a[0] - nx, a[1] - ny, col, alpha, phase, amp);
    pushV(out, b[0] + nx, b[1] + ny, col, alpha, phase, amp);
    pushV(out, a[0] - nx, a[1] - ny, col, alpha, phase, amp);
    pushV(out, b[0] - nx, b[1] - ny, col, alpha, phase, amp);
    pushV(out, b[0] + nx, b[1] + ny, col, alpha, phase, amp);
  }
}

function rrectPts(x, y, w, h, r, arc) {
  r = Math.min(r, w / 2, h / 2);
  arc = arc || 5;
  const p = [];
  const c1x = x + r, c1y = y + r, c2x = x + w - r, c2y = y + r, c3x = x + w - r, c3y = y + h - r, c4x = x + r, c4y = y + h - r;
  const c = (ccx, ccy, a0, a1) => {
    for (let i = 0; i <= arc; i++) {
      const a = a0 + (a1 - a0) * i / arc;
      p.push([ccx + Math.cos(a) * r, ccy + Math.sin(a) * r]);
    }
  };
  c(c1x, c1y, Math.PI, Math.PI * 1.5);
  p.push([c2x, y]);
  c(c2x, c2y, Math.PI * 1.5, Math.PI * 2);
  p.push([x + w, c3y]);
  c(c3x, c3y, 0, Math.PI / 2);
  p.push([c4x, y + h]);
  c(c4x, c4y, Math.PI / 2, Math.PI);
  return p;
}

function roundedPolyPts(verts, r) {
  const n = verts.length;
  const out = [];
  const arc = 6;
  for (let i = 0; i < n; i++) {
    const pv = verts[(i - 1 + n) % n];
    const cv = verts[i];
    const nv = verts[(i + 1) % n];
    let uin = [cv[0] - pv[0], cv[1] - pv[1]];
    let uout = [nv[0] - cv[0], nv[1] - cv[1]];
    const lin = Math.hypot(uin[0], uin[1]) || 1;
    const lout = Math.hypot(uout[0], uout[1]) || 1;
    uin = [uin[0] / lin, uin[1] / lin];
    uout = [uout[0] / lout, uout[1] / lout];
    const cosInter = clamp(-(uin[0] * uout[0] + uin[1] * uout[1]), -0.9999, 0.9999);
    const sinHalf = Math.sqrt((1 - cosInter) / 2);
    const tanHalf = Math.sqrt((1 - cosInter) / (1 + cosInter)) || 1;
    const rr = Math.min(r, lin * 0.4, lout * 0.4);
    const d = rr / tanHalf;
    const bx = uout[0] - uin[0], by = uout[1] - uin[1];
    const bl = Math.hypot(bx, by) || 1;
    const Cx = cv[0] + bx / bl * (rr / sinHalf);
    const Cy = cv[1] + by / bl * (rr / sinHalf);
    const Ax = cv[0] - uin[0] * d, Ay = cv[1] - uin[1] * d;
    const Bx = cv[0] + uout[0] * d, By = cv[1] + uout[1] * d;
    let aA = Math.atan2(Ay - Cy, Ax - Cx);
    let aB = Math.atan2(By - Cy, Bx - Cx);
    let sweep = aB - aA;
    while (sweep <= 0) sweep += TAU;
    for (let k = 0; k <= arc; k++) {
      const a = aA + sweep * k / arc;
      out.push([Cx + Math.cos(a) * rr, Cy + Math.sin(a) * rr]);
    }
  }
  return out;
}

function strokeRrect(out, x, y, w, h, r, thick, col, alpha, phase, amp) {
  const arc = 5;
  const o = rrectPts(x - thick / 2, y - thick / 2, w + thick, h + thick, r + thick / 2, arc);
  const i = rrectPts(x + thick / 2, y + thick / 2, w - thick, h - thick, Math.max(0, r - thick / 2), arc);
  stripQ(out, o, i, col, alpha, phase, amp);
}

function strokeCircle(out, cx, cy, r, thick, col, alpha, phase, amp) {
  const segs = 20;
  const o = [], i = [];
  for (let k = 0; k <= segs; k++) {
    const a = k / segs * TAU;
    o.push([cx + Math.cos(a) * (r + thick / 2), cy + Math.sin(a) * (r + thick / 2)]);
    i.push([cx + Math.cos(a) * (r - thick / 2), cy + Math.sin(a) * (r - thick / 2)]);
  }
  stripQ(out, o, i, col, alpha, phase, amp);
}

function circlePts(cx, cy, r, segs) {
  const p = [];
  for (let k = 0; k <= segs; k++) {
    const a = k / segs * TAU;
    p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return p;
}

function ellipsePts(cx, cy, rx, ry, segs) {
  const p = [];
  for (let k = 0; k <= segs; k++) {
    const a = k / segs * TAU;
    p.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return p;
}

function glow(out, cx, cy, rx, ry, col, a, phase, amp, segs) {
  segs = segs || 24;
  for (let k = 0; k < segs; k++) {
    const a1 = k / segs * TAU, a2 = (k + 1) / segs * TAU;
    pushV(out, cx, cy, col, a, phase, amp);
    pushV(out, cx + Math.cos(a1) * rx, cy + Math.sin(a1) * ry, col, 0, phase, amp);
    pushV(out, cx + Math.cos(a2) * rx, cy + Math.sin(a2) * ry, col, 0, phase, amp);
  }
}

function gearV(out, cx, cy, r, thick, teeth, ringCol, dotCol, alpha, phase, amp) {
  const segs = 26;
  const o = [], i = [];
  for (let k = 0; k <= segs; k++) {
    const a = k / segs * TAU;
    o.push([cx + Math.cos(a) * (r + thick / 2), cy + Math.sin(a) * (r + thick / 2)]);
    i.push([cx + Math.cos(a) * (r - thick / 2), cy + Math.sin(a) * (r - thick / 2)]);
  }
  stripQ(out, o, i, ringCol, alpha, phase, amp);
  const ri = r + thick / 2 + 1, ro = ri + 8, hw = 4.6;
  for (let k = 0; k < teeth; k++) {
    const a = k / teeth * TAU;
    const ca = Math.cos(a), sa = Math.sin(a);
    const p1 = [cx + ca * ri - sa * hw, cy + sa * ri + ca * hw];
    const p2 = [cx + ca * ri + sa * hw, cy + sa * ri - ca * hw];
    const p3 = [cx + ca * ro + sa * hw, cy + sa * ro - ca * hw];
    const p4 = [cx + ca * ro - sa * hw, cy + sa * ro + ca * hw];
    fan(out, [p1, p2, p3, p4], ringCol, ringCol, alpha, phase, amp);
  }
  const cr = r * 0.32;
  fan(out, circlePts(cx, cy, cr, 16), ringCol, ringCol, Math.min(1, alpha + 0.15), phase, amp);
  fan(out, circlePts(cx, cy, cr * 0.42, 12), dotCol, dotCol, Math.min(1, alpha + 0.2), phase, amp);
}

function quadPts(x0, y0, cx, cy, x1, y1, n) {
  const p = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    p.push([u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1]);
  }
  return p;
}

function cubicPts(x0, y0, c1x, c1y, c2x, c2y, x1, y1, n) {
  const p = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    p.push([
      u * u * u * x0 + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * x1,
      u * u * u * y0 + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * y1,
    ]);
  }
  return p;
}

function spiralPts(cx, cy, r0, r1, turns, n) {
  const p = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const r = r0 + (r1 - r0) * u;
    const a = u * turns * TAU;
    p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return p;
}

function starPts(cx, cy, R, r) {
  const p = [];
  for (let i = 0; i < 8; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = (i / 8) * TAU - Math.PI / 2;
    p.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]);
  }
  return p;
}

function sh(v, a, glow) { return { v: v, a: a, glow: !!glow }; }
function node(px, py) { return { px: px || 0, py: py || 0, dx: 0, dy: 0, rot: 0, sx: 1, sy: 1, alpha: 1, shapes: [], children: [] }; }

function buildScene() {
  const R = node(250, 285);
  const G = {};

  const sombra = node(250, 545);
  sombra.shapes.push(sh((function () {
    const out = [];
    fan(out, ellipsePts(250, 545, 150, 13, 24), [0.01, 0.01, 0.05], [0.01, 0.01, 0.05], 0.5, 0, 0);
    return out;
  })(), 1));

  const CORPO = node(250, 375);
  CORPO.shapes.push(sh((function () {
    const out = [];
    fan(out, rrectPts(198, 326, 104, 96, 30), COL.vTop, COL.vBot, 1, 1.3, 1.2);
    strokeRrect(out, 198, 326, 104, 96, 30, 5, COL.contorno, 0.55, 1.3, 0.6);
    fan(out, rrectPts(198, 330, 104, 7, 3.5), COL.branco, COL.branco, 0.13, 1.3, 0.4);
    fan(out, rrectPts(224, 352, 52, 40, 14), COL.telaTop, COL.telaBot, 1, 1.3, 0.5);
    strokeRrect(out, 224, 352, 52, 40, 14, 3, COL.contorno, 0.5, 1.3, 0.6);
    return out;
  })(), 1));

  const gE = node(224, 378);
  const gD = node(276, 378);
  const gB = node(250, 372);
  gE.alpha = 0; gD.alpha = 0; gB.alpha = 0;
  CORPO.children.push(gE, gD, gB);

  const gBarriga = node(250, 372);
  gBarriga.shapes.push(sh((function () {
    const out = [];
    gearV(out, 250, 372, 9, 3, 8, COL.azul, COL.azulBril, 1, 1.3, 0.5);
    return out;
  })(), 1));
  const gBarrigaGlow = node(250, 372);
  gBarrigaGlow.shapes.push(sh((function () {
    const out = [];
    glow(out, 250, 372, 24, 18, COL.azulEsc, 0.14, 1.3, 0);
    return out;
  })(), 1, true));
  CORPO.children.push(gBarriga, gBarrigaGlow);

  function armTubeDraw(flip) {
    const handChunk = (function () {
      const o = [];
      fan(o, circlePts(0, 0, 13, 20), COL.vTop, COL.vBot, 1, 0.8, 0.5);
      strokeCircle(o, 0, 0, 13, 3.5, COL.contorno, 0.5, 0.8, 0.5);
      return o;
    })();
    return function (m, alpha, out, outG) {
      const sx = this.px, sy = this.py;
      const sw = Math.sin(t * 2.2) * 1.2 + (estado === 'falando' ? Math.sin(t * 13) * 1.2 : 0);
      const wrist = [sx + 30 * flip + sw, sy + 44];
      const chunk = [];
      ribbon(chunk, [[sx, sy], wrist], 26, COL.escTop, 1, 0.8, 0.4);
      emitChunk(chunk, m, alpha, out, outG, false);
      const hc = [];
      for (let i = 0; i < handChunk.length; i += 8) {
        hc.push(wrist[0] + handChunk[i], wrist[1] + handChunk[i + 1], handChunk[i + 2], handChunk[i + 3], handChunk[i + 4], handChunk[i + 5], handChunk[i + 6], handChunk[i + 7]);
      }
      emitChunk(hc, m, alpha, out, outG, false);
    };
  }

  const B1 = node(196, 348);
  B1.shapes.push(sh((function () {
    const out = [];
    fan(out, circlePts(196, 348, 14, 20), COL.amarelo, COL.amarelo, 1, 0.8, 0.5);
    strokeCircle(out, 196, 348, 14, 3.5, COL.contorno, 0.5, 0.8, 0.5);
    fan(out, circlePts(196, 348, 4.5, 12), COL.branco, COL.branco, 0.65, 0.8, 0.5);
    return out;
  })(), 1));
  const B2 = node(304, 348);
  B2.shapes.push(sh((function () {
    const out = [];
    fan(out, circlePts(304, 348, 14, 20), COL.amarelo, COL.amarelo, 1, 0.8, 0.5);
    strokeCircle(out, 304, 348, 14, 3.5, COL.contorno, 0.5, 0.8, 0.5);
    fan(out, circlePts(304, 348, 4.5, 12), COL.branco, COL.branco, 0.65, 0.8, 0.5);
    return out;
  })(), 1));
  B1.draw = armTubeDraw(-1);
  B2.draw = armTubeDraw(1);

  const N = node(250, 323);
  N.shapes.push(sh((function () {
    const out = [];
    fan(out, rrectPts(232, 318, 36, 10, 5), COL.amarelo, COL.amarelo, 0.9, 2, 0.4);
    return out;
  })(), 1));

  const CAB = node(250, 220);

  const aTop = node(250, 95);
  aTop.shapes.push(sh((function () {
    const out = [];
    ribbon(out, [[250, 134], [250, 78]], 6, COL.vBot, 1, 2.1, 0.5);
    fan(out, circlePts(250, 70, 9, 18), COL.amarelo, COL.amarelo, 1, 2.1, 0.6);
    strokeCircle(out, 250, 70, 9, 3, COL.contorno, 0.5, 2.1, 0.5);
    fan(out, circlePts(250, 70, 4, 12), COL.branco, COL.branco, 0.95, 2.1, 0.6);
    return out;
  })(), 1));
  const aLuz = node(250, 70);
  aLuz.shapes.push(sh((function () {
    const out = [];
    glow(out, 250, 70, 16, 16, COL.amarelo, 0.45, 2.1, 0);
    return out;
  })(), 1, true));

  const aLatL = node(170, 122);
  aLatL.shapes.push(sh((function () {
    const out = [];
    fan(out, circlePts(170, 136, 5, 12), COL.vBot, COL.vBot, 1, 2.1, 0.5);
    ribbon(out, cubicPts(168, 134, 156, 112, 148, 100, 140, 92, 12), 5, COL.vBot, 1, 2.1, 0.5);
    fan(out, circlePts(139, 91, 7, 14), COL.amarelo, COL.amarelo, 1, 2.1, 0.6);
    fan(out, circlePts(139, 91, 3, 10), COL.branco, COL.branco, 0.95, 2.1, 0.6);
    return out;
  })(), 1));
  const aLatR = node(330, 122);
  aLatR.shapes.push(sh((function () {
    const out = [];
    fan(out, circlePts(330, 136, 5, 12), COL.vBot, COL.vBot, 1, 2.1, 0.5);
    ribbon(out, cubicPts(332, 134, 344, 112, 352, 100, 360, 92, 12), 5, COL.vBot, 1, 2.1, 0.5);
    fan(out, circlePts(361, 91, 7, 14), COL.amarelo, COL.amarelo, 1, 2.1, 0.6);
    fan(out, circlePts(361, 91, 3, 10), COL.branco, COL.branco, 0.95, 2.1, 0.6);
    return out;
  })(), 1));

  CAB.shapes.push(sh((function () {
    const out = [];
    fan(out, rrectPts(130, 128, 240, 184, 40), COL.vTop, COL.vBot, 1, 2.1, 0.9);
    strokeRrect(out, 130, 128, 240, 184, 40, 6, COL.contorno, 0.55, 2.1, 0.7);
    fan(out, rrectPts(146, 136, 100, 7, 3.5), COL.branco, COL.branco, 0.14, 2.1, 0.4);
    fan(out, rrectPts(148, 148, 204, 140, 24), COL.telaTop, COL.telaBot, 1, 2.1, 0.5);
    strokeRrect(out, 148, 148, 204, 140, 24, 4, COL.contorno, 0.5, 2.1, 0.6);
    return out;
  })(), 1));

  const scan = [];
  for (let k = 0; k < 7; k++) scan.push({ y: 168 + k * 15.5 });
  const SCAN = node(0, 0);
  SCAN.draw = function (m, alpha, out) {
    for (let k = 0; k < scan.length; k++) {
      const y = scan[k].y + Math.sin(t * 3 + k * 1.7) * 1.2;
      const q = rrectPts(162, y, 176, 2, 1, 3);
      const a = 0.05 + 0.04 * Math.sin(t * 24 + k * 2.1);
      const chunk = [];
      fan(chunk, q, COL.branco, COL.branco, a, 2.1, 0.2);
      emitChunk(chunk, m, alpha, out, outGlow, false);
    }
  };

  const sGlow = node(250, 220);
  sGlow.shapes.push(sh((function () {
    const out = [];
    glow(out, 250, 220, 95, 70, COL.azulEsc, 0.1, 2.1, 0);
    return out;
  })(), 1, true));

  const OL = node(208, 206);
  OL.shapes.push(sh((function () {
    const out = [];
    fan(out, rrectPts(198, 186, 20, 44, 10), COL.azulBril, COL.azul, 0.95, 3.1, 0.3);
    return out;
  })(), 1));
  const OR = node(292, 206);
  OR.shapes.push(sh((function () {
    const out = [];
    fan(out, rrectPts(282, 186, 20, 44, 10), COL.azulBril, COL.azul, 0.95, 3.1, 0.3);
    return out;
  })(), 1));
  const eGlowL = node(208, 206);
  eGlowL.shapes.push(sh((function () {
    const out = [];
    glow(out, 208, 206, 26, 34, COL.azulEsc, 0.14, 3.1, 0);
    return out;
  })(), 1, true));
  const eGlowR = node(292, 206);
  eGlowR.shapes.push(sh((function () {
    const out = [];
    glow(out, 292, 206, 26, 34, COL.azulEsc, 0.14, 3.1, 0);
    return out;
  })(), 1, true));

  const BOCA = node(250, 248);
  BOCA.shapes.push(sh((function () {
    const out = [];
    ribbon(out, quadPts(232, 244, 250, 252, 268, 244, 14), 6, COL.azul, 0.9, 3.4, 0.4);
    return out;
  })(), 1));

  const EQ = [];
  const eqHeights = [12, 16, 10, 18, 12, 18, 10, 16, 12];
  const eqXs = [198, 210, 222, 234, 246, 258, 270, 282, 294];
  for (let k = 0; k < 9; k++) {
    const bx = eqXs[k], bh = eqHeights[k];
    const bn = node(bx, 256);
    bn.shapes.push(sh((function (bx, bh) {
      const out = [];
      fan(out, rrectPts(bx - 4, 256 - bh, 8, bh, 4), COL.azul, COL.azul, 0.9, 3.4 + k * 0.3, 0.5);
      return out;
    })(bx, bh), 1));
    EQ.push(bn);
  }

  const PERG = node(250, 218);
  PERG.shapes.push(sh((function () {
    const out = [];
    const q = cubicPts(232, 186, 232, 168, 268, 168, 268, 186, 14)
      .concat(cubicPts(268, 186, 268, 202, 254, 204, 250, 212, 10))
      .concat([[250, 212], [250, 218]]);
    ribbon(out, q, 7, COL.azul, 0.95, 4, 0.3);
    fan(out, circlePts(250, 238, 8, 14), COL.azul, COL.azul, 0.95, 0.3, 0.3);
    return out;
  })(), 1));

  CAB.children.push(aTop, aLuz, aLatL, aLatR);
  CAB.children.push(SCAN, sGlow, OL, OR, eGlowL, eGlowR, BOCA);
  EQ.forEach(function (n) { CAB.children.push(n); });
  CAB.children.push(PERG);

  const SPIN = node(250, 218);
  SPIN.shapes.push(sh((function () {
    const out = [];
    const segs = 18, r0 = 16, r1 = 24;
    for (let k = 0; k < segs; k++) {
      const a0 = k / segs * TAU, a1 = (k + 1) / segs * TAU;
      const bright = k < 4;
      const col = bright ? COL.azul : COL.azulEsc;
      const al = bright ? 0.95 : 0.3;
      fan(out, [
        [250 + Math.cos(a0) * r0, 218 + Math.sin(a0) * r0],
        [250 + Math.cos(a1) * r0, 218 + Math.sin(a1) * r0],
        [250 + Math.cos(a1) * r1, 218 + Math.sin(a1) * r1],
        [250 + Math.cos(a0) * r1, 218 + Math.sin(a0) * r1],
      ], col, col, al, 2.1, 0.2);
    }
    fan(out, circlePts(250, 218, 4, 10), COL.azulBril, COL.azul, 0.9, 2.1, 0.4);
    return out;
  })(), 1));
  const spinGlow = node(250, 218);
  spinGlow.shapes.push(sh((function () {
    const out = [];
    glow(out, 250, 218, 60, 45, COL.azulEsc, 0.14, 2.1, 0);
    return out;
  })(), 1, true));

  const CARTA = node(250, 218);
  CARTA.shapes.push(sh((function () {
    const out = [];
    fan(out, rrectPts(226, 202, 48, 32, 6), [0.95, 0.97, 1], [0.78, 0.85, 0.95], 1, 2.1, 0.4);
    ribbon(out, [[226, 202], [250, 216]], 2.5, [0.5, 0.55, 0.7], 0.75, 2.1, 0.4);
    ribbon(out, [[274, 202], [250, 216]], 2.5, [0.5, 0.55, 0.7], 0.75, 2.1, 0.4);
    fan(out, circlePts(250, 216, 4, 12), COL.amarelo, COL.amarelo, 1, 2.1, 0.5);
    return out;
  })(), 1));
  const cartaGlow = node(250, 218);
  cartaGlow.shapes.push(sh((function () {
    const out = [];
    glow(out, 250, 218, 72, 52, [1, 0.85, 0.6], 0.18, 2.1, 0);
    return out;
  })(), 1, true));

  const GEAR = node(250, 218);
  GEAR.shapes.push(sh((function () {
    const out = [];
    gearV(out, 250, 218, 28, 6, 10, COL.azul, COL.azulBril, 1, 2.1, 0.5);
    return out;
  })(), 1));
  const gearGlow = node(250, 218);
  gearGlow.shapes.push(sh((function () {
    const out = [];
    glow(out, 250, 218, 68, 52, COL.azulEsc, 0.16, 2.1, 0);
    return out;
  })(), 1, true));

  CAB.children.push(SPIN, spinGlow, CARTA, cartaGlow, GEAR, gearGlow);

  const BOOT = node(250, 218);
  BOOT.shapes.push(sh((function () {
    const out = [];
    fan(out, rrectPts(162, 212.5, 176, 11, 5), [0.9, 0.97, 1], [0.62, 0.82, 0.97], 0.95, 2.1, 0.3);
    return out;
  })(), 1));
  const bootGlow = node(250, 218);
  bootGlow.shapes.push(sh((function () {
    const out = [];
    glow(out, 250, 218, 100, 8, COL.azulBril, 0.4, 2.1, 0);
    return out;
  })(), 1, true));
  CAB.children.push(BOOT, bootGlow);

  // ===== emote "tonto" (atordoado): espiral + estrelas orbitando na telinha =====
  const TONT = node(250, 218);
  TONT.alpha = 0;
  TONT.shapes.push(sh((function () {
    const out = [];
    ribbon(out, spiralPts(250, 218, 3, 26, 1.7, 44), 5, COL.azulBril, 0.95, 2.1, 0.3);
    ribbon(out, spiralPts(250, 218, 3, 26, 1.7, 44), 2, COL.azulEsc, 0.6, 2.1, 0.3);
    return out;
  })(), 1));
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * TAU;
    const sx = 250 + Math.cos(a) * 36, sy = 218 + Math.sin(a) * 36;
    TONT.shapes.push(sh((function (sx, sy) {
      const out = [];
      fan(out, starPts(sx, sy, 8, 3.2), COL.amarelo, COL.amarelo, 0.95, 2.1, 0.3);
      fan(out, starPts(sx, sy, 4.5, 1.8), COL.branco, COL.branco, 0.85, 2.1, 0.3);
      return out;
    })(sx, sy), 1));
  }
  const tontGlow = node(250, 218);
  tontGlow.shapes.push(sh((function () {
    const out = [];
    glow(out, 250, 218, 74, 54, COL.azulEsc, 0.14, 2.1, 0);
    return out;
  })(), 1, true));
  CAB.children.push(TONT, tontGlow);

  // ===== modo música: a "tela" da TV (mesma forma e tamanho da tela de expressões) =====
  const MUS = node(250, 218);
  MUS.alpha = 0;
  const musPts = rrectPts(148, 148, 204, 140, 24);
  MUS.draw = function (m, alpha, out, outG, outT) {
    if (alpha <= 0.001 || !outT) return;
    const n = musPts.length;
    let cx = 0, cy = 0;
    for (let i = 0; i < n; i++) { cx += musPts[i][0]; cy += musPts[i][1]; }
    cx /= n; cy /= n;
    const push = function (px, py) {
      outT.push(
        m[0] * px + m[3] * py + m[6],
        m[1] * px + m[4] * py + m[7],
        (px - 148) / 204, 1 - (py - 148) / 140,
        1, 1, 1, alpha
      );
    };
    for (let i = 0; i < n; i++) {
      const p = musPts[i], q = musPts[(i + 1) % n];
      push(p[0], p[1]);
      push(q[0], q[1]);
      push(cx, cy);
    }
  };
  CAB.children.push(MUS);

  // ondinhas de rádio que saem dos lados da antena central (visíveis no modo música)
  const RWV = node(250, 70);
  RWV.alpha = 0;
  RWV.draw = function (m, alpha, out, outG) {
    if (alpha <= 0.001) return;
    // pisca a ponta da antena em preto e âmbar (bolinha por cima da estática)
    const amber = [1, 0.68, 0.15];
    const black = [0.04, 0.04, 0.07];
    const bl = musT >= 0 ? (Math.sin(t * 10) > 0 ? 1 : 0) : 0;
    const chunk = [];
    fan(chunk, circlePts(250, 70, 9, 14), black, black, 0.95, 2.1, 0.5);
    if (bl > 0.5) {
      fan(chunk, circlePts(250, 70, 6, 12), amber, amber, 1, 2.1, 0.5);
      fan(chunk, circlePts(250, 70, 2.5, 8), [1, 0.95, 0.75], [1, 0.95, 0.75], 0.9, 2.1, 0.6);
    }
    emitChunk(chunk, m, alpha, out, outG, false);
    const gch = [];
    glow(gch, 250, 70, 16, 16, amber, 0.55 * (bl > 0.5 ? 1 : 0.15), 2.1, 0);
    emitChunk(gch, m, alpha, out, outG, true);
    // ondas para a esquerda e para a direita da ponta
    for (let s = -1; s <= 1; s += 2) {
      for (let k = 0; k < 3; k++) {
        const ph = (t * 0.9 + k * 0.33) % 1;
        const r = 9 + ph * 20;
        const fade = 1 - ph;
        const a = fade * 0.55 * alpha;
        if (a <= 0.012) continue;
        const sp = 0.5 + 0.35 * (r / 29);
        const center = s > 0 ? 0 : Math.PI;
        const pts = [];
        const steps = 12;
        for (let i = 0; i <= steps; i++) {
          const an = center - sp + (2 * sp) * i / steps;
          pts.push([250 + Math.cos(an) * r, 70 + Math.sin(an) * r]);
        }
        const chunk = [];
        ribbon(chunk, pts, 2.5, COL.azulBril, a, 3, 0.2);
        emitChunk(chunk, m, alpha, out, outG, true);
      }
    }
  };
  CAB.children.push(RWV);

  const halo = node(250, 285);
  halo.shapes.push(sh((function () {
    const out = [];
    glow(out, 250, 285, 190, 215, [1, 0.78, 0.45], 0.07, 1, 0);
    glow(out, 250, 470, 190, 60, [1, 0.78, 0.45], 0.09, 1, 0);
    return out;
  })(), 1, true));

  R.children.push(sombra, halo);

  // grupo "mortal": corpo+braços+cabeça voam e giram sem levar a sombra junto
  const MORT = node(250, 340);
  MORT.children.push(CORPO, B1, B2, N, CAB);
  R.children.push(MORT);

  G.root = R; G.mort = MORT; G.corpo = CORPO; G.b1 = B1; G.b2 = B2; G.n = N;
  G.cab = CAB; G.aTop = aTop; G.sombra = sombra; G.halo = halo;
  G.aL = aLatL; G.aR = aLatR; G.gE = gE; G.gD = gD; G.gB = gB;
  G.gBarriga = gBarriga;
  G.ol = OL; G.or = OR; G.boca = BOCA; G.eq = EQ; G.perg = PERG;
  G.spin = SPIN; G.spinGlow = spinGlow; G.carta = CARTA; G.cartaGlow = cartaGlow;
  G.gear = GEAR; G.gearGlow = gearGlow;
  G.tont = TONT; G.tontGlow = tontGlow;
  G.boot = BOOT; G.bootGlow = bootGlow; G.halo = halo;
  G.mus = MUS;
  G.scan = SCAN;
  G.rwv = RWV;
  G.aLuz = aLuz;
  return G;
}

const G = buildScene();
const sceneRoot = G.root;

let canvas = null, gl = null;
let PROG = null, PROG_P = null;
let uModel, uProj, uTime, uWobble, uTint, uAdd;
let pUProj, pUdpr;
let aLoc = {}, pLoc = {};
let VP = { cw: 1, ch: 1, dpr: 1, s: 1, proj: m3() };

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
  }
  return sh;
}

function buildProgram(gl, vs, fs) {
  const p = gl.createProgram();
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(p));
  }
  return p;
}

const VS = [
  'attribute vec2 a_position;',
  'attribute vec4 a_color;',
  'attribute float a_phase;',
  'attribute float a_amp;',
  'uniform mat3 u_model;',
  'uniform mat3 u_proj;',
  'uniform float u_time;',
  'uniform float u_wobble;',
  'varying vec4 v_color;',
  'void main(){',
  '  vec2 p = (u_model * vec3(a_position, 1.0)).xy;',
  '  p.x += sin(u_time * 1.7 + a_phase) * u_wobble * a_amp;',
  '  p.y += cos(u_time * 1.3 + a_phase * 1.7) * u_wobble * a_amp;',
  '  gl_Position = vec4((u_proj * vec3(p, 1.0)).xy, 0.0, 1.0);',
  '  v_color = a_color;',
  '}',
].join('\n');

const FS = [
  'precision mediump float;',
  'uniform vec4 u_tint;',
  'uniform float u_add;',
  'varying vec4 v_color;',
  'void main(){',
  '  vec4 c = v_color * u_tint;',
  '  if (u_add > 0.5) { c = vec4(c.rgb * c.a, c.a); }',
  '  gl_FragColor = c;',
  '}',
].join('\n');

const VS_P = [
  'attribute vec2 a_position;',
  'attribute float a_size;',
  'attribute vec4 a_color;',
  'attribute float a_phase;',
  'uniform mat3 u_proj;',
  'uniform float u_dpr;',
  'varying vec4 v_color;',
  'void main(){',
  '  gl_Position = vec4((u_proj * vec3(a_position, 1.0)).xy, 0.0, 1.0);',
  '  gl_PointSize = a_size * u_dpr;',
  '  v_color = a_color;',
  '}',
].join('\n');

const FS_P = [
  'precision mediump float;',
  'varying vec4 v_color;',
  'void main(){',
  '  vec2 d = gl_PointCoord - vec2(0.5);',
  '  if (dot(d, d) > 0.25) discard;',
  '  gl_FragColor = vec4(v_color.rgb * v_color.a, v_color.a);',
  '}',
].join('\n');

/* shaders do modo música: a "tela" da TV com a letra (textura 2D) */
const VS_T = [
  'attribute vec2 a_position;',
  'attribute vec2 a_tex;',
  'attribute vec4 a_color;',
  'uniform mat3 u_model;',
  'uniform mat3 u_proj;',
  'varying vec2 v_tex;',
  'varying vec4 v_color;',
  'void main(){',
  '  vec2 p = (u_model * vec3(a_position, 1.0)).xy;',
  '  gl_Position = vec4((u_proj * vec3(p, 1.0)).xy, 0.0, 1.0);',
  '  v_tex = a_tex;',
  '  v_color = a_color;',
  '}',
].join('\n');

const FS_T = [
  'precision mediump float;',
  'varying vec2 v_tex;',
  'varying vec4 v_color;',
  'uniform sampler2D u_sampler;',
  'void main(){',
  '  vec4 c = texture2D(u_sampler, v_tex) * v_color;',
  '  gl_FragColor = vec4(c.rgb * c.a, c.a);',
  '}',
].join('\n');

function resizeCanvas() {
  if (!canvas) return;
  VP.dpr = window.devicePixelRatio || 1;
  VP.cw = Math.max(2, canvas.clientWidth * VP.dpr);
  VP.ch = Math.max(2, canvas.clientHeight * VP.dpr);
  if (canvas.width !== VP.cw) canvas.width = VP.cw;
  if (canvas.height !== VP.ch) canvas.height = VP.ch;
  gl.viewport(0, 0, VP.cw, VP.ch);
  VP.s = Math.min((VP.cw / 500) * 0.94, (VP.ch / 570) * 0.94);
  const a = (2 * VP.s) / VP.cw, e = -(2 * VP.s) / VP.ch;
  VP.proj = [a, 0, 0, 0, e, 0, -250 * a, 285 * -e, 1];
}

function initGL() {
  canvas = $('#robo-canvas');
  if (!canvas) return;
  gl = canvas.getContext('webgl', { antialias: true, alpha: true }) ||
    canvas.getContext('experimental-webgl', { antialias: true, alpha: true });
  if (!gl) return;
  PROG = buildProgram(gl, VS, FS);
  PROG_P = buildProgram(gl, VS_P, FS_P);
  PROG_T = buildProgram(gl, VS_T, FS_T);
  uModel = gl.getUniformLocation(PROG, 'u_model');
  uProj = gl.getUniformLocation(PROG, 'u_proj');
  uTime = gl.getUniformLocation(PROG, 'u_time');
  uWobble = gl.getUniformLocation(PROG, 'u_wobble');
  uTint = gl.getUniformLocation(PROG, 'u_tint');
  uAdd = gl.getUniformLocation(PROG, 'u_add');
  pUProj = gl.getUniformLocation(PROG_P, 'u_proj');
  pUdpr = gl.getUniformLocation(PROG_P, 'u_dpr');
  aLoc = {
    pos: gl.getAttribLocation(PROG, 'a_position'),
    col: gl.getAttribLocation(PROG, 'a_color'),
    phase: gl.getAttribLocation(PROG, 'a_phase'),
    amp: gl.getAttribLocation(PROG, 'a_amp'),
  };
  pLoc = {
    pos: gl.getAttribLocation(PROG_P, 'a_position'),
    size: gl.getAttribLocation(PROG_P, 'a_size'),
    col: gl.getAttribLocation(PROG_P, 'a_color'),
    phase: gl.getAttribLocation(PROG_P, 'a_phase'),
  };
  tLoc = {
    pos: gl.getAttribLocation(PROG_T, 'a_position'),
    tex: gl.getAttribLocation(PROG_T, 'a_tex'),
    col: gl.getAttribLocation(PROG_T, 'a_color'),
  };
  uTModel = gl.getUniformLocation(PROG_T, 'u_model');
  uTProj = gl.getUniformLocation(PROG_T, 'u_proj');
  uTSampler = gl.getUniformLocation(PROG_T, 'u_sampler');
  gl.enable(gl.BLEND);
  gl.clearColor(0, 0, 0, 0);
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  starInit();
  initMusTex();
}

/* textura 2D para a "tela" da TV (letra/tradução/EQ/progresso) */
function initMusTex() {
  musCanvas = document.createElement('canvas');
  musCanvas.width = 512;
  musCanvas.height = 256;
  musCtx2d = musCanvas.getContext('2d');
  tBuffer = gl.createBuffer();
  musTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, musTex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 512, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

function emitChunk(a, m, alphaMul, out, outG, isGlow) {
  const n = a.length, k = a[5] * alphaMul;
  const tar = isGlow ? outG : out;
  for (let i = 0; i < n; i += 8) {
    const x = a[i], y = a[i + 1];
    tar.push(m[0] * x + m[3] * y + m[6], m[1] * x + m[4] * y + m[7], a[i + 2], a[i + 3], a[i + 4], a[i + 5] * k, a[i + 6], a[i + 7]);
  }
}

function walk(n, world, out, outG, outT) {
  let m = world;
  if (n.px || n.py || n.rot || n.sx !== 1 || n.sy !== 1 || n.dx || n.dy) {
    m = m3mul(world, m3T(n.dx, n.dy));
    m = m3mul(m, m3T(n.px, n.py));
    m = m3mul(m, m3R(n.rot));
    m = m3mul(m, m3S(n.sx, n.sy));
    m = m3mul(m, m3T(-n.px, -n.py));
  }
  const al = n.alpha;
  for (let i = 0; i < n.shapes.length; i++) {
    const c = n.shapes[i];
    if (c.a > 0.001) emitChunk(c.v, m, al, out, outG, c.glow);
  }
  if (n.draw) n.draw(m, al, out, outG, outT);
  for (let i = 0; i < n.children.length; i++) walk(n.children[i], m, out, outG, outT);
}

let outSolid = [], outGlow = [], outPts = [], outTex = [];

/* --- modo música (textura da "tela" da TV) --- */
let PROG_T = null, uTModel = null, uTProj = null, uTSampler = null, tLoc = {}, tBuffer = null;
let musCanvas = null, musCtx2d = null, musTex = null, musRedrawAt = 0;

function render() {
  if (!gl) return;
  gl.clear(gl.COLOR_BUFFER_BIT);

  outPts.length = 0;
  buildPts(outPts);
  if (outPts.length) {
    gl.useProgram(PROG_P);
    gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(outPts), gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(pLoc.pos);
    gl.vertexAttribPointer(pLoc.pos, 2, gl.FLOAT, false, 32, 0);
    gl.enableVertexAttribArray(pLoc.size);
    gl.vertexAttribPointer(pLoc.size, 1, gl.FLOAT, false, 32, 8);
    gl.enableVertexAttribArray(pLoc.col);
    gl.vertexAttribPointer(pLoc.col, 4, gl.FLOAT, false, 32, 12);
    gl.enableVertexAttribArray(pLoc.phase);
    gl.vertexAttribPointer(pLoc.phase, 1, gl.FLOAT, false, 32, 28);
    gl.uniformMatrix3fv(pUProj, false, m3());
    gl.uniform1f(pUdpr, VP.dpr);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.drawArrays(gl.POINTS, 0, outPts.length / 8);
  }

  outSolid.length = 0;
  outGlow.length = 0;
  outTex.length = 0;
  walk(sceneRoot, m3(), outSolid, outGlow, outTex);

  if (outGlow.length) {
    drawTri(outGlow, 1);
  }
  if (outSolid.length) {
    drawTri(outSolid, 0);
  }
  if (outTex.length) {
    drawTex(outTex);
  }
}

function drawTex(data) {
  gl.useProgram(PROG_T);
  gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(tLoc.pos);
  gl.vertexAttribPointer(tLoc.pos, 2, gl.FLOAT, false, 32, 0);
  gl.enableVertexAttribArray(tLoc.tex);
  gl.vertexAttribPointer(tLoc.tex, 2, gl.FLOAT, false, 32, 8);
  gl.enableVertexAttribArray(tLoc.col);
  gl.vertexAttribPointer(tLoc.col, 4, gl.FLOAT, false, 32, 16);
  gl.uniformMatrix3fv(uTModel, false, m3());
  gl.uniformMatrix3fv(uTProj, false, VP.proj);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, musTex);
  gl.uniform1i(uTSampler, 0);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.drawArrays(gl.TRIANGLES, 0, data.length / 8);
}

function drawTri(data, add) {
  gl.useProgram(PROG);
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(aLoc.pos);
  gl.vertexAttribPointer(aLoc.pos, 2, gl.FLOAT, false, 32, 0);
  gl.enableVertexAttribArray(aLoc.col);
  gl.vertexAttribPointer(aLoc.col, 4, gl.FLOAT, false, 32, 8);
  gl.enableVertexAttribArray(aLoc.phase);
  gl.vertexAttribPointer(aLoc.phase, 1, gl.FLOAT, false, 32, 24);
  gl.enableVertexAttribArray(aLoc.amp);
  gl.vertexAttribPointer(aLoc.amp, 1, gl.FLOAT, false, 32, 28);
  gl.uniformMatrix3fv(uModel, false, m3());
  gl.uniformMatrix3fv(uProj, false, VP.proj);
  gl.uniform1f(uTime, t);
  gl.uniform1f(uWobble, wobble);
  gl.uniform4f(uTint, tintR, tintG, tintB, 1);
  gl.uniform1f(uAdd, add ? 1 : 0);
  gl.blendFunc(add ? gl.ONE : gl.SRC_ALPHA, add ? gl.ONE : gl.ONE_MINUS_SRC_ALPHA);
  gl.drawArrays(gl.TRIANGLES, 0, data.length / 8);
}

let vBuffer = null, pBuffer = null;

const PTS = { stars: [], sparks: [] };

function starInit() {
  PTS.stars.length = 0;
  const n = isMobile ? 34 : 60;
  for (let i = 0; i < n; i++) {
    PTS.stars.push({
      x: rand(-1, 1), y: rand(-1, 1),
      size: rand(1, 2.6), phase: rand(0, TAU),
      spd: rand(0.4, 1.3), base: rand(0.25, 0.85), drift: rand(0.006, 0.02),
    });
  }
}

function spawnSpark(wx, wy, n, col) {
  const b = m3Apply(VP.proj, wx, wy);
  for (let i = 0; i < n; i++) {
    PTS.sparks.push({
      x: b[0], y: b[1],
      vx: rand(-0.14, 0.14), vy: rand(-0.4, -0.06),
      size: rand(1.6, 3.6), life: rand(0.5, 1.1), total: 1,
      col: col, phase: rand(0, TAU),
    });
  }
}

function buildPts(out) {
  for (let i = PTS.sparks.length - 1; i >= 0; i--) {
    const s = PTS.sparks[i];
    s.life -= dt;
    if (s.life <= 0) { PTS.sparks.splice(i, 1); continue; }
    s.x += s.vx * dt; s.y += s.vy * dt;
    const a = Math.max(0, s.life / s.total) * 0.95;
    out.push(s.x, s.y, s.size, s.col[0], s.col[1], s.col[2], a, 0);
  }
}

let t = 0, dt = 0.016, wobble = 0.8, tintR = 1, tintG = 1, tintB = 1;
let roboAberto = false;
let fase = 'fechada', faseT = 0;
let estado = 'parado';
let roboMensagemIndex = -1, perguntaIndex = -1, modoPergunta = false;
let roboDigitando = false, roboTyper = null;
let posturaRobo = 'flutuar', posturaTimer = null;
let curioT = 0, curio = 0, curioTimer = null;
let antTimer = null, antImp = { l: 0, r: 0 };
let gaze = { x: 0, y: 0 }, gazeCur = { x: 0, y: 0 };
let poseY = 0, poseRot = 0;
let blinkT = rand(2.5, 5), blinkOn = false, blinkS = 0;
let talk = 0, hopT = 0, hopAmp = 0, eyesClose = 0;
let exprModo = 'normal', exprLoad = 0, exprCarta = 0, exprGear = 0, exprTont = 0;
let bootT = -1, bootBipFim = false;

/* --- modo música --- */
let musT = -1, musIndex = 0;
let musPlaying = false, musFade = 0;
let musZoomCur = 1;
let musBeats = 0, musTotal = 0;
let musSfxNodes = [];
let musAudio = null;

// Melodia da música atual (cada entrada do MUSICAS tem a própria).
function melodiaAtual() {
  const m = MUSICAS[musIndex];
  return m && m.melodia ? m.melodia : MELODIA;
}
function musDuracao() {
  const md = melodiaAtual();
  return md.leads.length * (60 / md.bpm);
}
// A música atual usa áudio real (YouTube via IFrame API ou arquivo mp3) em vez de síntese?
function musTemAudio() {
  const m = MUSICAS[musIndex];
  return !!(m && (m.yt || m.src));
}
// Estado do player do YouTube: 'novo' (não criado) | 'pronto' | 'carregando'
let ytPlayer = null, ytEstado = 'novo';
// A API do YouTube já terminou de carregar?
let ytDisponivel = false;
window.onYouTubeIframeAPIReady = function () { ytDisponivel = true; };
// Posição atual (seg) e duração (seg) da fonte real — atualizadas a cada frame.
let musTempoReal = 0, musDuracaoReal = 0;
// A música atual terminou sozinha (fim do mp3/vídeo)?
let musRealAcabou = false;

function prepararMusicaReal() {
  const m = MUSICAS[musIndex];
  if (m && m.yt) {
    if (ytEstado === 'novo' && ytDisponivel) {
      ytEstado = 'carregando';
      ytPlayer = new YT.Player('robo-yt', {
        width: 1,
        height: 1,
        playerVars: { rel: 0, controls: 0 },
        events: {
          onReady: function () { ytEstado = 'pronto'; },
          onStateChange: function (ev) {
            if (ev.data === YT.PlayerState.ENDED) musRealAcabou = true;
          },
        },
      });
    }
    return true;
  }
  if (m && m.src) {
    if (!musAudio) {
      musAudio = new Audio();
      musAudio.addEventListener('ended', function () { musRealAcabou = true; });
    }
    return true;
  }
  return false;
}

/* --- gestos do corpo inteiro --- */
let gest = null, gestTimer = null;

function comecarAnimacao(nome) {
  const a = ANIMS[nome];
  if (!a) return;
  resetPose();
  gest = { nome: nome, t: 0, dur: a.dur };
}

function resetPose() {
  const m = G.mort;
  if (m) { m.dx = 0; m.dy = 0; m.rot = 0; m.sx = 1; m.sy = 1; }
  const R = sceneRoot;
  R.dx = 0; R.dy = 0; R.rot = 0; R.sx = 1; R.sy = 1; R.alpha = 1;
  G.corpo.rot = 0;
  G.b1.rot = 0; G.b2.rot = 0;
  G.n.sy = 1;
  G.cab.rot = 0; G.cab.dy = 0;
  G.aTop.rot = 0; G.aL.rot = 0; G.aR.rot = 0;
  G.ol.dx = 0; G.or.dx = 0;
}

let tontTimer = null;

function ficarTonto() {
  if (musT >= 0 || modoPergunta) return;
  willowExpr('tonto');
  clearTimeout(tontTimer);
  tontTimer = setTimeout(function () {
    if (exprModo === 'tonto') willowExpr('normal');
  }, 1900);
}

function agendarAnimacaoRobo() {
  clearTimeout(gestTimer);
  gestTimer = setTimeout(function () {
    if (!roboAberto) return;
    if (fase !== 'aberta' || estado === 'falando' || roboDigitando || modoPergunta || musT >= 0) {
      agendarAnimacaoRobo();
      return;
    }
    const nomes = ['oi', 'giro', 'danca', 'estica', 'mortal'];
    comecarAnimacao(nomes[Math.floor(Math.random() * nomes.length)]);
    agendarAnimacaoRobo();
  }, rand(6000, 12000));
}

function gestApply(off) {
  if (!off) return;
  if (off.rRot) sceneRoot.rot += off.rRot;
  if (off.rDx) sceneRoot.dx += off.rDx;
  if (off.rDy) sceneRoot.dy += off.rDy;
  if (off.rSx) sceneRoot.sx *= off.rSx;
  if (off.rSy) sceneRoot.sy *= off.rSy;
  if (off.gSx) sceneRoot.sx = off.gSx;
  if (off.rA !== undefined) sceneRoot.alpha *= off.rA;
  if (off.b1) G.b1.rot += off.b1;
  if (off.b2) G.b2.rot += off.b2;
  if (off.corpo) G.corpo.rot += off.corpo;
  if (off.mDy !== undefined) G.mort.dy = off.mDy;
  if (off.mSy !== undefined) G.mort.sy = off.mSy;
  if (off.mRot !== undefined) G.mort.rot += off.mRot;
  if (off.n) G.n.sy *= off.n;
  if (off.cabRot) G.cab.rot += off.cabRot;
  if (off.cabDy) G.cab.dy += off.cabDy;
  if (off.at) G.aTop.rot += off.at;
  if (off.al) G.aL.rot += off.al;
  if (off.ar) G.aR.rot += off.ar;
  if (off.ol) { G.ol.dx += off.ol; G.or.dx += off.ol; }
  if (off.g) {
    G.gE.rot += off.g; G.gD.rot += off.g; G.gB.rot += off.g; G.gBarriga.rot += off.g;
  }
}

function update(d) {
  t += d;
  dt = d;
  faseT += d;

  const musOn = musT >= 0;
  if (musOn) {
    musFade += d;
    if (musPlaying) {
      if (musTemAudio()) {
        // fonte real (YouTube/mp3): acompanha a posição da reprodução
        let pos = 0, dur = 0;
        if (musAudio && !musAudio.paused && musAudio.currentTime > 0) {
          pos = musAudio.currentTime;
          dur = musAudio.duration || 0;
        } else if (ytPlayer && ytEstado === 'pronto') {
          const st = ytPlayer.getPlayerState();
          if (st === 1 || st === 2 || st === 3) {
            pos = ytPlayer.getCurrentTime() || 0;
            dur = ytPlayer.getDuration() || 0;
          }
        }
        if (dur > 0) musTotal = dur;
        if (pos > 0) musT = pos;
        else musT = Math.min(musT + d, musTotal || Infinity);
        if (musRealAcabou || (dur > 0 && musT >= dur - 0.4)) {
          stopAllMusic();
          musPlaying = false;
          musT = -1;
          musFade = 0;
          musRealAcabou = false;
          willowExpr('normal');
          proximaMensagemRobo();
          return;
        }
      } else {
        musT = Math.min(musT + d, musTotal);
        stepMusic(d);
        if (musT >= musTotal) {
          stopAllMusic();
          musPlaying = false;
          musT = -1;
          musFade = 0;
          willowExpr('normal');
          proximaMensagemRobo();
        }
      }
    }
    drawMusTex();
  } else {
    musFade = 0;
  }

  const talkTarget = estado === 'falando' ? 1 : 0;
  talk += (talkTarget - talk) * Math.min(1, d * 9);
  wobble = 0.7 + talk * 1.5;
  const flash = 1 + talk * 0.06 * Math.sin(t * 24);
  tintR = 1 + (flash - 1); tintG = 1 + (flash - 1); tintB = 1 + (flash - 1);

  if (hopT > 0) hopT -= d;
  hopAmp = hopT > 0 ? Math.sin(hopT / 0.45 * Math.PI) : 0;

  blinkT -= d;
  if (!blinkOn && blinkT <= 0) { blinkOn = true; blinkS = 0; }
  if (blinkOn) {
    blinkS += d * 8;
    if (blinkS >= 1) { blinkOn = false; blinkS = 1; blinkT = rand(2.6, 5.6); }
  }
  const blinkScale = blinkOn ? sstep(0, 0.14, blinkS) : 1;

  gazeCur.x += (gaze.x - gazeCur.x) * Math.min(1, d * 10);
  gazeCur.y += (gaze.y - gazeCur.y) * Math.min(1, d * 10);

  const base = posturaRobo === 'tela' ? { y: 8, rot: 0.09 } : { y: 0, rot: 0 };
  poseY += (base.y - poseY) * Math.min(1, d * 5);
  curio += (curioT - curio) * Math.min(1, d * 6);
  poseRot += ((base.rot + curio) - poseRot) * Math.min(1, d * 5);

  antImp.l *= Math.exp(-d * 6);
  antImp.r *= Math.exp(-d * 6);

  if (fase === 'saindo') { eyesClose = Math.min(1, eyesClose + d * 1.4); }
  else { eyesClose = Math.max(0, eyesClose - d * 2); }

  if (fase === 'entrando' && faseT > 1.15) {
    fase = 'aberta';
    roboMensagemIndex = -1;
    if (ROBO.mensagens.length === 0) {
      setTimeout(function () { willowExpr('carta'); }, 1200);
    } else {
      proximaMensagemRobo();
    }
    agendarPosturaRobo();
  }
  if (fase === 'saindo' && faseT >= 1.9) finishClose();
  if (fase === 'celebrando' && faseT >= 1.6) fase = 'aberta';

  const R = sceneRoot;
  const j = hopAmp;
  R.dx = Math.sin(t * 0.9) * 3;
  R.dy = -2 + Math.sin(t * 1.35) * 5 + Math.sin(t * 0.63 + 1.2) * 2 - j * 12;
  R.rot = Math.sin(t * 0.5) * 0.018;
  R.sx = 1 + 0.012 * Math.sin(t * 2.1);
  R.sy = 1 + 0.012 * Math.sin(t * 2.1 + 0.6);
  R.alpha = 1;
  if (fase === 'entrando') {
    const e = sstep(0, 1, faseT / 1.15);
    R.alpha = Math.min(1, e * 1.35);
    R.dy += 48 * (1 - e);
    R.sx *= 1 - 0.16 * (1 - e);
    R.sy *= 1 + 0.12 * (1 - e);
  }
  if (fase === 'saindo') {
    R.alpha = 1 - sstep(1.1, 1.75, faseT);
    R.dy -= 12 * sstep(1.1, 1.75, faseT);
    R.sx *= 1 - 0.05 * sstep(1.1, 1.75, faseT);
  }
  if (fase === 'celebrando') {
    const e = faseT / 1.5;
    if (e < 1) {
      const cb = Math.sin(Math.min(1, e) * Math.PI);
      R.dy += -cb * 22;
      R.sx *= 1 - cb * 0.05;
      R.sy *= 1 - cb * 0.12;
    }
  }

  G.corpo.sy = 1 + 0.02 * Math.sin(t * 2.2);
  G.corpo.rot = Math.sin(t * 0.8) * 0.006;
  G.n.sy = 1 + 0.02 * Math.sin(t * 2.2 + 1);

  let a1 = Math.sin(t * 1.15) * 0.05 + Math.sin(t * 0.7) * 0.018;
  let a2 = Math.sin(t * 1.15 + 0.7) * -0.05 + Math.sin(t * 0.7 + 0.9) * -0.018;
  if (estado === 'falando') {
    a1 += Math.sin(t * 17) * 0.045 + Math.sin(t * 29 + 2) * 0.02;
    a2 += Math.sin(t * 17 + 1) * 0.045 + Math.sin(t * 29) * 0.02;
  }
  if (fase === 'celebrando') {
    const e = faseT / 1.5;
    if (e < 1) {
      const cb = Math.sin(Math.min(1, e * 2) * Math.PI);
      a1 = -0.85 * cb;
      a2 = 0.85 * cb;
    }
  }
  if (fase === 'saindo') {
    if (faseT < 0.62) {
      a1 = 0.6 * Math.sin(faseT / 0.62 * Math.PI) * (0.5 + 0.5 * Math.sin(t * 20));
    } else {
      a1 = 0;
    }
    a2 = 0;
  }
  G.b1.rot = a1;
  G.b2.rot = a2;

  G.gE.rot = -t * 0.9;
  G.gD.rot = t * 0.8;
  G.gB.rot = -t * 0.45;
  G.gBarriga.rot = t * 1.6;

  G.cab.rot = poseRot + Math.sin(t * 1.8) * 0.014;
  G.cab.dy = poseY + Math.sin(t * 1.4 + 1) * 1.3 + (musZoomCur - 1) * 150;
  musZoomCur += ((musT >= 0 ? 1.85 : 1) - musZoomCur) * Math.min(1, d * 5);
  G.cab.sx = (posturaRobo === 'tela' ? 1.03 : 1) * musZoomCur;
  G.cab.sy = musZoomCur;

  G.aTop.rot = Math.sin(t * 1.2) * 0.02 + antImp.r * 0.4;
  G.aL.rot = Math.sin(t * 1.7) * 0.02 + (estado === 'falando' ? Math.sin(t * 26) * 0.06 : 0) + antImp.l;
  G.aR.rot = Math.sin(t * 1.7 + 0.8) * -0.02 + (estado === 'falando' ? Math.sin(t * 26 + 1) * 0.06 : 0) + antImp.r;

  const eyeScale = blinkScale * (1 - eyesClose) + 0.08 * eyesClose;
  G.ol.sy = eyeScale; G.or.sy = eyeScale;
  G.ol.dx = gazeCur.x * 4; G.ol.dy = gazeCur.y * 3;
  G.or.dx = gazeCur.x * 4; G.or.dy = gazeCur.y * 3;

  const musVis = musOn ? sstep(0, 0.35, musFade) * (musPlaying ? (1 - sstep(musTotal - 0.35, musTotal, musT)) : 1) : 0;
  const musHide = musOn ? 1 : 0;
  const corpoHide = musHide * musVis;

  G.corpo.alpha = 1 - corpoHide;
  G.b1.alpha = G.corpo.alpha; G.b2.alpha = G.corpo.alpha;
  G.n.alpha = G.corpo.alpha;
  G.gE.alpha = G.corpo.alpha; G.gD.alpha = G.corpo.alpha; G.gB.alpha = G.corpo.alpha;
  G.gBarriga.alpha = G.corpo.alpha;
  G.aL.alpha = G.corpo.alpha; G.aR.alpha = G.corpo.alpha;
  G.aTop.alpha = 1;
  G.mus.alpha = musVis;
  G.mus.sx = 1;
  G.mus.sy = 1;
  G.scan.alpha = musT >= 0 ? 0 : 1;
  G.rwv.alpha = musVis;
  G.aLuz.alpha = 1;

  const exprOn = exprModo === 'loading' ? 1 : 0;
  const exprOnC = exprModo === 'carta' ? 1 : 0;
  const exprOnG = exprModo === 'engrenagem' ? 1 : 0;
  const exprOnB = exprModo === 'ligando' ? 1 : 0;
  const exprOnT = exprModo === 'tonto' ? 1 : 0;
  exprLoad += (exprOn - exprLoad) * Math.min(1, d * 5);
  exprCarta += (exprOnC - exprCarta) * Math.min(1, d * 5);
  exprGear += (exprOnG - exprGear) * Math.min(1, d * 5);
  exprTont += (exprOnT - exprTont) * Math.min(1, d * 5);
  if (exprOnB && bootT >= 0) bootT += d;
  const bootHide = exprOnB && bootT >= 0 ? 1 - sstep(0.65, 1.0, bootT) : 0;
  const faceHide = Math.max(exprLoad, exprCarta, exprGear, exprTont, bootHide, musHide);

  if (exprOnB && bootT >= 0 && bootT >= 0.9 && !bootBipFim) {
    bootBipFim = true;
    tocarBipSfx('curto');
    spawnSpark(250, 240, 6, COL.azulBril);
  }
  if (exprOnB && bootT >= 1.2) willowExpr('normal');

  G.ol.alpha = (1 - modoPergunta) * (1 - faceHide);
  G.or.alpha = G.ol.alpha;

  const bocaMix = sstep(0.25, 0.7, talk) * (1 - modoPergunta);
  G.boca.alpha = 0;
  G.boca.sy = 1 + bocaMix * 0.15 * Math.sin(t * 22);

  for (let i = 0; i < G.eq.length; i++) {
    G.eq[i].alpha = bocaMix * (1 - faceHide);
    G.eq[i].sy = 0.35 + 0.75 * Math.abs(Math.sin(t * 23 + i * 0.8 + Math.sin(t * 3 + i)));
  }

  G.perg.alpha = modoPergunta * (1 - faceHide);
  G.perg.sx = 1 + (modoPergunta ? Math.sin(t * 2) * 0.02 : 0);

  G.spin.alpha = exprLoad;
  G.spin.rot = t * 1.5;
  G.spin.sx = 0.8 + 0.2 * sstep(0, 1, exprLoad);
  G.spin.sy = G.spin.sx;
  G.spinGlow.alpha = exprLoad * 0.9;

  const cartaEase = sstep(0, 1, exprCarta);
  G.carta.alpha = exprCarta;
  G.carta.dy = Math.sin(t * 1.8) * 3;
  G.carta.sx = 0.72 + 0.28 * cartaEase;
  G.carta.sy = 0.72 + 0.28 * cartaEase;
  G.cartaGlow.alpha = exprCarta * 0.9;

  const gearEase = sstep(0, 1, exprGear);
  G.gear.alpha = exprGear;
  G.gear.rot = t * 1.5;
  G.gear.sx = 0.8 + 0.2 * gearEase;
  G.gear.sy = G.gear.sx;
  G.gearGlow.alpha = exprGear * 0.9;

  G.tont.alpha = exprTont * (1 - modoPergunta);
  G.tont.rot = t * 2.2;
  G.tont.sx = 0.85 + 0.15 * sstep(0, 1, exprTont);
  G.tont.sy = G.tont.sx;
  G.tontGlow.alpha = exprTont * 0.9;

  const tontW = exprTont * (1 - modoPergunta);
  G.corpo.rot += Math.sin(t * 7) * 0.05 * tontW;
  G.cab.rot += Math.sin(t * 7 + 1.1) * 0.06 * tontW;
  G.b1.rot += Math.sin(t * 7) * 0.08 * tontW;
  G.b2.rot += Math.sin(t * 7 + 0.7) * 0.08 * tontW;
  G.aTop.rot += Math.sin(t * 9) * 0.3 * tontW;
  G.aL.rot += Math.sin(t * 9) * 0.35 * tontW;
  G.aR.rot += Math.sin(t * 9 + 1) * 0.35 * tontW;

  const bootProg = sstep(0.1, 0.9, bootT);
  let bootA = exprOnB ? sstep(0.05, 0.3, bootT) * (1 - sstep(0.54, 0.62, bootT)) : 0;
  if (exprOnB && bootT < 0.5) bootA *= 0.6 + 0.4 * Math.abs(Math.sin(t * 70));
  G.boot.alpha = bootA;
  G.boot.dy = 160 + 122.5 * bootProg - 218;
  G.boot.sx = 1 + 0.06 * sstep(0.55, 0.65, bootT);
  G.bootGlow.alpha = exprOnB ? Math.max(bootA, sstep(0.6, 0.7, bootT) * (1 - sstep(0.78, 0.9, bootT))) * 1.2 : 0;
  G.bootGlow.dy = G.boot.dy;
  G.halo.alpha = exprOnB ? 0.7 + 0.3 * sstep(0.7, 1.1, bootT) : (musT > 0 ? 0.45 : 1);

  if (gest) {
    gest.t += d;
    const u = Math.min(1, gest.t / gest.dur);
    gestApply(ANIMS[gest.nome].f(u, gest));
    if (gest.nome === 'mortal' && !gest.landed && u >= 0.9) {
      gest.landed = true;
      spawnSpark(250, 455, 7, COL.dourado);
      tocarBipSfx('curto');
    }
    if (u >= 1) {
      const fim = gest.nome;
      gest = null;
      if (fim === 'mortal') ficarTonto();
    }
  }
}

function agendarPosturaRobo() {
  clearTimeout(posturaTimer);
  posturaTimer = setTimeout(function () {
    if (!roboAberto) return;
    const pesos = ['flutuar', 'flutuar', 'tela', 'flutuar', 'tela', 'flutuar'];
    posturaRobo = pesos[Math.floor(Math.random() * pesos.length)];
    agendarPosturaRobo();
  }, rand(5200, 9200));
}

function agendarCuriosidadeRobo() {
  clearTimeout(curioTimer);
  curioTimer = setTimeout(function () {
    if (!roboAberto) return;
    const lado = Math.random() < 0.5 ? -1 : 1;
    curioT = lado * rand(0.05, 0.09);
    antImp[lado < 0 ? 'l' : 'r'] += lado * 0.7;
    setTimeout(function () { curioT = 0; }, 1400);
    agendarCuriosidadeRobo();
  }, rand(5000, 10000));
}

function agendarAntenaRobo() {
  clearTimeout(antTimer);
  antTimer = setTimeout(function () {
    if (!roboAberto) return;
    const lado = Math.random() < 0.5 ? 'l' : 'r';
    const dir = Math.random() < 0.5 ? -1 : 1;
    antImp[lado] += dir * 0.5;
    agendarAntenaRobo();
  }, rand(2800, 6500));
}

function aparecerRobo() {
  if (roboAberto) return;
  roboAberto = true;
  document.body.classList.add('robo-open');
  const cena = $('#robo-cena');
  cena.classList.add('is-ativa');
  cena.setAttribute('aria-hidden', 'false');
  $('#robo-faces').setAttribute('aria-hidden', 'false');
  posturaRobo = 'flutuar';
  gaze.x = 0; gaze.y = 0; gazeCur.x = 0; gazeCur.y = 0;
  poseY = 0; poseRot = 0;
  eyesClose = 0;
  exprModo = 'normal'; exprLoad = 0; exprCarta = 0; exprGear = 0; exprTont = 0;
  bootT = -1; bootBipFim = false;
  stopAllMusic();
  musT = -1;
  musPlaying = false;
  musFade = 0;
  gest = null;
  clearTimeout(gestTimer);
  if (isMobile) { gaze.y = 0.35; gazeCur.y = 0.35; }
  window.addEventListener('mousemove', roboMouseMove, { passive: true });
  window.addEventListener('touchmove', roboTouchMove, { passive: true });
  agendarAntenaRobo();
  agendarCuriosidadeRobo();
  agendarAnimacaoRobo();

  fase = 'entrando';
  faseT = 0;
  estado = 'parado';
  modoPergunta = false;
  const r = 220, cx = 250, cy = 285;
  for (let i = 0; i < (isMobile ? 10 : 18); i++) {
    const a = rand(0, TAU), rr = rand(r, r + 130);
    const wx = cx + Math.cos(a) * rr, wy = cy + Math.sin(a) * rr * 0.8;
    spawnSpark(wx, wy, 1, COL.dourado);
  }

  gsap.set('#robo-fechar', { opacity: 0 });
  gsap.set('#robo-pergunta-btn', { opacity: 0 });
  gsap.set('#robo-tag', { opacity: 0 });
  gsap.set('#robo-bolha', { opacity: 0, scale: 0.9 });
  gsap.to('#robo-fechar', { opacity: 1, duration: 0.4, delay: 0.4 });
  gsap.to('#robo-pergunta-btn', { opacity: 1, duration: 0.4, delay: 0.55 });
}

function proximaMensagemRobo() {
  if (!roboAberto) return;
  if (musT >= 0) return;
  const lista = modoPergunta ? ROBO.perguntas : ROBO.mensagens;
  if (!modoPergunta && lista.length === 0) return;
  if (roboDigitando) {
    clearInterval(roboTyper);
    roboTyper = null;
    roboDigitando = false;
    estado = 'parado';
    $('#robo-bolha-texto').textContent = lista[modoPergunta ? perguntaIndex : roboMensagemIndex];
    return;
  }
  if (modoPergunta) {
    perguntaIndex++;
    if (perguntaIndex >= lista.length) perguntaIndex = 0;
  } else {
    roboMensagemIndex++;
    if (roboMensagemIndex >= lista.length) { fecharRobo(); return; }
  }
  const idx = modoPergunta ? perguntaIndex : roboMensagemIndex;

  const bolha = $('#robo-bolha');
  const texto = $('#robo-bolha-texto');
  const tag = $('#robo-tag');

  estado = 'falando';
  hopT = 0.45;
  gest = null;
  resetPose();
  tocarBipSfx(modoPergunta ? 'curto' : (roboMensagemIndex === 0 ? 'longo' : (Math.random() < 0.5 ? 'curto' : 'longo')));
  spawnSpark(250, 248, 4, COL.azul);

  bolha.classList.add('is-visivel');
  bolha.setAttribute('aria-hidden', 'false');
  gsap.killTweensOf(bolha);
  gsap.to(bolha, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.8)' });
  gsap.to(tag, { opacity: 0, duration: 0.2 });

  gsap.killTweensOf(texto);
  texto.textContent = '';
  roboDigitando = true;
  const msg = lista[idx];
  let i = 0;
  roboTyper = setInterval(function () {
    i++;
    texto.textContent = msg.slice(0, i);
    if (i >= msg.length) {
      clearInterval(roboTyper);
      roboTyper = null;
      roboDigitando = false;
      estado = 'parado';
      if (!modoPergunta && roboMensagemIndex === ROBO.mensagens.length - 1) {
        fase = 'celebrando';
        faseT = 0;
        spawnSpark(250, 320, 12, COL.dourado);
        tocarBipSfx('longo');
        tag.textContent = 'toque para fechar';
        gsap.to(tag, { opacity: 0.85, duration: 0.5 });
      }
    }
  }, 32);
}

function alternarPerguntaRobo(e) {
  if (e) e.stopPropagation();
  if (!roboAberto) return;
  if (modoPergunta) sairModoPergunta();
  else entrarModoPergunta();
}

function entrarModoPergunta() {
  clearInterval(roboTyper);
  roboTyper = null;
  roboDigitando = false;
  estado = 'parado';
  stopAllMusic();
  musT = -1;
  musPlaying = false;
  musFade = 0;
  gest = null;
  resetPose();
  clearTimeout(tontTimer);
  modoPergunta = true;
  exprModo = 'normal'; exprLoad = 0; exprCarta = 0; exprGear = 0; exprTont = 0;
  bootT = -1; bootBipFim = false;
  perguntaIndex = -1;
  tocarBipSfx('curto');
  proximaMensagemRobo();
}

function sairModoPergunta() {
  clearInterval(roboTyper);
  roboTyper = null;
  roboDigitando = false;
  estado = 'parado';
  modoPergunta = false;
  perguntaIndex = -1;
  tocarBipSfx('longo');
  proximaMensagemRobo();
}

function fecharRobo() {
  if (!roboAberto || fase === 'saindo') return;
  roboDigitando = false;
  clearInterval(roboTyper);
  roboTyper = null;
  clearTimeout(posturaTimer);
  clearTimeout(curioTimer);
  modoPergunta = false;
  estado = 'parado';
  fase = 'saindo';
  faseT = 0;
  window.removeEventListener('mousemove', roboMouseMove);
  window.removeEventListener('touchmove', roboTouchMove);
  clearTimeout(gestTimer);
  gest = null;
  resetPose();
  stopAllMusic();
  musT = -1;
  musPlaying = false;
  musFade = 0;
  tocarBipSfx('curto');
}

function finishClose() {
  const cena = $('#robo-cena');
  cena.classList.remove('is-ativa');
  cena.setAttribute('aria-hidden', 'true');
  $('#robo-faces').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('robo-open');
  $('#robo-bolha').classList.remove('is-visivel');
  $('#robo-bolha').setAttribute('aria-hidden', 'true');
  $('#robo-bolha-texto').textContent = '';
  $('#robo-tag').textContent = 'willow — toque nele';
  $('#robo-btn').classList.add('robo-btn--escondido');
  roboAberto = false;
  fase = 'fechada';
  posturaRobo = 'flutuar';
  PTS.sparks.length = 0;
  bootT = -1; bootBipFim = false;
  exprModo = 'normal'; exprLoad = 0; exprCarta = 0; exprGear = 0; exprTont = 0;
  clearTimeout(tontTimer);
  if (typeof window.onWillowClose === 'function') window.onWillowClose();
}

function roboPosicaoCursor(e) {
  const r = canvas.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  gaze.x = clamp((e.clientX - cx) / (r.width * 0.55), -1, 1);
  gaze.y = clamp((e.clientY - cy) / (r.height * 0.55), -1, 1);
}

function roboMouseMove(e) { roboPosicaoCursor(e); }

function roboTouchMove(e) {
  if (!e.touches || !e.touches.length) return;
  const t = e.touches[0];
  roboPosicaoCursor({ clientX: t.clientX, clientY: t.clientY });
}

let sfxCtx = null;

function prepararSfx() {
  if (sfxCtx) {
    if (sfxCtx.state === 'suspended') sfxCtx.resume();
    return;
  }
  try {
    sfxCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    sfxCtx = null;
  }
}

function precarregarBips() {
  prepararSfx();
}

function tocarBipSfx(tipo) {
}

function tocarBipSintetico(tipo) {
  prepararSfx();
  if (!sfxCtx) return;
  if (sfxCtx.state === 'suspended') sfxCtx.resume();
  const t0 = sfxCtx.currentTime;
  const longo = tipo === 'longo';

  const bips = longo
    ? [{ f: 520, d: 0.16, at: 0.00 }, { f: 660, d: 0.16, at: 0.22 }, { f: 780, d: 0.24, at: 0.44 }]
    : [{ f: 620, d: 0.12, at: 0.00 }, { f: 820, d: 0.18, at: 0.14 }];

  bips.forEach(function (b) {
    const tt = t0 + b.at;
    const o = sfxCtx.createOscillator();
    o.type = 'square';
    o.frequency.setValueAtTime(b.f, tt);
    const g = sfxCtx.createGain();
    g.gain.setValueAtTime(0.0001, tt);
    g.gain.linearRampToValueAtTime(0.07, tt + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, tt + b.d);
    o.connect(g).connect(sfxCtx.destination);
    o.start(tt);
    o.stop(tt + b.d + 0.05);
  });

  const fim = t0 + bips[bips.length - 1].at + 0.05;
  const buf = sfxCtx.createBuffer(1, Math.floor(sfxCtx.sampleRate * 0.06), sfxCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const ns = sfxCtx.createBufferSource();
  ns.buffer = buf;
  const lp = sfxCtx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 1600;
  const ng = sfxCtx.createGain();
  ng.gain.setValueAtTime(0.0001, fim);
  ng.gain.linearRampToValueAtTime(0.03, fim + 0.03);
  ng.gain.linearRampToValueAtTime(0.0001, fim + 0.06);
  ns.connect(lp).connect(ng).connect(sfxCtx.destination);
  ns.start(fim);
}

/* ============================== modo música ============================== */

function S(nota, dur, ganho, tipo, tempoIni) {
  const t0 = sfxCtx.currentTime + tempoIni;
  const o = sfxCtx.createOscillator();
  o.type = tipo || 'triangle';
  o.frequency.setValueAtTime(nota, t0);
  const g = sfxCtx.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(ganho, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(sfxCtx.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
  musSfxNodes.push(o, g);
}

function stopAllMusic() {
  for (let i = 0; i < musSfxNodes.length; i++) {
    try { musSfxNodes[i].stop(); } catch (e) {}
  }
  musSfxNodes.length = 0;
  if (musAudio) { try { musAudio.pause(); } catch (e) {} }
  if (ytPlayer && ytEstado === 'pronto') { try { ytPlayer.pauseVideo(); } catch (e) {} }
}

function startMusic() {
  const m = MUSICAS[musIndex];
  musRealAcabou = false;
  if (m && m.yt) {
    prepararMusicaReal();
    if (ytEstado === 'pronto') {
      ytPlayer.loadVideoById({ videoId: m.yt, startSeconds: 0 });
    } else {
      // API ainda carregando: agenda para tocar assim que puder
      const tenta = function () {
        if (ytEstado === 'pronto') {
          ytPlayer.loadVideoById({ videoId: m.yt, startSeconds: 0 });
          return;
        }
        if (!ytDisponivel) { setTimeout(tenta, 200); return; }
        if (ytEstado === 'novo') { prepararMusicaReal(); setTimeout(tenta, 200); return; }
        if (ytEstado === 'carregando') { setTimeout(tenta, 200); }
      };
      setTimeout(tenta, 200);
    }
    musBeats = 0;
    return;
  }
  if (m && m.src) {
    prepararMusicaReal();
    try {
      musAudio.src = m.src;
      const p = musAudio.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
    musBeats = 0;
    return;
  }
  // síntese (fallback)
  prepararSfx();
  if (!sfxCtx) return;
  if (sfxCtx.state === 'suspended') sfxCtx.resume();
  const md = melodiaAtual();
  const spb = 60 / md.bpm;
  musSfxNodes.length = 0;
  for (let c = 0; c < 4; c++) {
    const ca = md.chords[c];
    for (let i = 0; i < ca.length; i++) S(ca[i], spb * 2.2, 0.045, 'sine', c * 4 * spb);
    S(md.bass[c], spb * 3.4, 0.05, 'triangle', c * 4 * spb);
    for (let b = 0; b < 4; b++) {
      const f = md.leads[c * 4 + b];
      if (f) S(f, spb * 1.6, 0.055, 'square', (c * 4 + b) * spb);
    }
  }
  musBeats = 0;
}

function stepMusic(d) {
  if (!sfxCtx) return;
  const spb = 60 / melodiaAtual().bpm;
  musBeats += d / spb;
}

function drawMusTex() {
  if (!musCtx2d) return;
  const g = musCtx2d;
  const W = musCanvas.width, H = musCanvas.height;
  const m = MUSICAS[musIndex];

  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalAlpha = 1;
  g.fillStyle = '#0a0d1a';
  g.fillRect(0, 0, W, H);

  g.fillStyle = '#cfd9f5';
  g.font = '700 42px "Segoe UI", system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(m.nome, W / 2, 44);

  if (!musPlaying) {
    // botão de player: toque na tela para começar
    const cx = W / 2, cy = 134;
    g.fillStyle = '#141a30';
    g.beginPath();
    g.arc(cx, cy, 46, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = '#59d1ff';
    g.lineWidth = 4;
    g.beginPath();
    g.arc(cx, cy, 46, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = '#59d1ff';
    g.beginPath();
    g.moveTo(cx - 15, cy - 23);
    g.lineTo(cx - 15, cy + 23);
    g.lineTo(cx + 24, cy);
    g.closePath();
    g.fill();
    // trocar de música: setas ◀ ▶ nas laterais
    const bY = 134, bR = 30;
    g.strokeStyle = '#93a2cc';
    g.lineWidth = 3;
    g.beginPath(); g.arc(70, bY, bR, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.arc(W - 70, bY, bR, 0, Math.PI * 2); g.stroke();
    g.fillStyle = '#93a2cc';
    g.beginPath();
    g.moveTo(82, bY - 11); g.lineTo(82, bY + 11); g.lineTo(60, bY);
    g.closePath(); g.fill();
    g.beginPath();
    g.moveTo(W - 82, bY - 11); g.lineTo(W - 82, bY + 11); g.lineTo(W - 60, bY);
    g.closePath(); g.fill();
    g.globalAlpha = 0.75;
    g.fillStyle = '#93a2cc';
    g.font = '600 22px "Segoe UI", system-ui, sans-serif';
    g.fillText('toque na tela para tocar', W / 2, 218);
    g.globalAlpha = 1;
  } else {
    const f = musTemAudio()
      ? (musTotal > 0 ? Math.min(1, musT / musTotal) : 0)
      : musBeats / melodiaAtual().leads.length;
    const linIdx = Math.min(m.letra.length - 1, Math.floor(f * m.letra.length));
    g.font = '600 25px "Segoe UI", system-ui, sans-serif';
    const yL = [118, 174];
    for (let i = 0; i < 2; i++) {
      const li = linIdx - 1 + i;
      if (li < 0 || li >= m.letra.length) continue;
      g.globalAlpha = li === linIdx ? 1 : 0.5;
      g.fillStyle = '#f3f6ff';
      g.fillText(m.letra[li], W / 2, yL[i]);
      g.globalAlpha = li === linIdx ? 0.8 : 0.45;
      g.fillStyle = '#93a2cc';
      g.font = '600 19px "Segoe UI", system-ui, sans-serif';
      g.fillText(m.trad[li] || '', W / 2, yL[i] + 28);
      g.font = '600 25px "Segoe UI", system-ui, sans-serif';
    }
    g.globalAlpha = 1;

    const pbY = H - 16;
    const pbW = W * 0.86, pbX = (W - pbW) / 2;
    g.fillStyle = '#20263f';
    g.fillRect(pbX, pbY, pbW, 6);
    g.fillStyle = '#9ee7ff';
    g.fillRect(pbX, pbY, pbW * Math.min(1, f), 6);
  }

  gl.bindTexture(gl.TEXTURE_2D, musTex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, musCanvas);
}

function willowMusic() {
  if (musT >= 0) willowMusica(false);
  else willowMusica(true);
}

function willowMusica(on) {
  if (on) {
    exprModo = 'normal';
    exprTont = 0;
    clearTimeout(tontTimer);
    modoPergunta = false;
    if (estado === 'falando') {
      clearInterval(roboTyper);
      roboTyper = null;
      roboDigitando = false;
      estado = 'parado';
    }
    const bolha = $('#robo-bolha');
    bolha.classList.remove('is-visivel');
    bolha.setAttribute('aria-hidden', 'true');
    gsap.killTweensOf(bolha);
    gsap.to(bolha, { opacity: 0, scale: 0.9, duration: 0.2 });
    gsap.to('#robo-tag', { opacity: 0, duration: 0.2 });
    gest = null;
    resetPose();
    musIndex = 0;
    musTotal = musDuracao();
    musT = 0;
    musPlaying = false;
    musFade = 0;
    musBeats = 0;
    hopT = 0.45;
    spawnSpark(250, 220, 10, COL.dourado);
    const botoes = $$('.robo-faces__btn');
    for (let i = 0; i < botoes.length; i++) {
      botoes[i].classList.toggle('is-ativa', botoes[i].getAttribute('data-expr') === 'musica');
    }
  } else {
    stopAllMusic();
    musPlaying = false;
    musT = -1;
    musFade = 0;
    willowExpr('normal');
    proximaMensagemRobo();
  }
}

// clique dentro da telinha da cabeça (TV) no modo música
// devolve {x, y} em coordenadas do canvas da TV (0..512, 0..256) ou null
function clickNaTela(e) {
  const r = canvas.getBoundingClientRect();
  const ndcX = ((e.clientX - r.left) / r.width) * 2 - 1;
  const ndcY = -(((e.clientY - r.top) / r.height) * 2 - 1);
  const a = VP.proj[0], e2 = VP.proj[4];
  const wx = ndcX / a + 250, wy = ndcY / e2 + 285;
  let m = m3();
  const R = sceneRoot;
  m = m3mul(m, m3T(R.dx, R.dy));
  m = m3mul(m, m3T(R.px, R.py));
  m = m3mul(m, m3R(R.rot));
  m = m3mul(m, m3S(R.sx, R.sy));
  m = m3mul(m, m3T(-R.px, -R.py));
  const C = G.cab;
  m = m3mul(m, m3T(C.dx, C.dy));
  m = m3mul(m, m3T(C.px, C.py));
  m = m3mul(m, m3R(C.rot));
  m = m3mul(m, m3S(C.sx, C.sy));
  m = m3mul(m, m3T(-C.px, -C.py));
  const cs = [[148, 148], [352, 148], [148, 288], [352, 288]];
  const ps = [];
  for (let i = 0; i < 4; i++) {
    ps[i] = [m[0] * cs[i][0] + m[3] * cs[i][1] + m[6], m[1] * cs[i][0] + m[4] * cs[i][1] + m[7]];
  }
  function inside(p0, p1, p2, p3, p) {
    function sg(ax, ay, bx, by, px, py) { return (bx - ax) * (py - ay) - (by - ay) * (px - ax); }
    const d1 = sg(p0[0], p0[1], p1[0], p1[1], p[0], p[1]);
    const d2 = sg(p1[0], p1[1], p2[0], p2[1], p[0], p[1]);
    const d3 = sg(p2[0], p2[1], p3[0], p3[1], p[0], p[1]);
    const d4 = sg(p3[0], p3[1], p0[0], p0[1], p[0], p[1]);
    const hasNeg = d1 < 0 || d2 < 0 || d3 < 0 || d4 < 0;
    const hasPos = d1 > 0 || d2 > 0 || d3 > 0 || d4 > 0;
    return !(hasNeg && hasPos);
  }
  if (!inside(ps[0], ps[1], ps[3], ps[2], [wx, wy])) return null;
  // mapeia bilinearmente (u,v) em [0,1]x[0,1] na tela da TV
  const ox = ps[0][0], oy = ps[0][1];
  const ex = ps[1][0] - ox, ey = ps[1][1] - oy;
  const gx = ps[2][0] - ox, gy = ps[2][1] - oy;
  const dx = wx - ox, dy = wy - oy;
  const denom = ex * gy - ey * gx;
  if (Math.abs(denom) < 1e-6) return null;
  const u = (dx * gy - dy * gx) / denom;
  const v = (dy * ex - dx * ey) / denom;
  return { x: clamp(u, 0, 1) * 512, y: clamp(v, 0, 1) * 256 };
}

function trocarMusica(dir) {
  stopAllMusic();
  const n = MUSICAS.length;
  musIndex = (musIndex + dir + n) % n;
  musTotal = musDuracao();
  musT = 0;
  musPlaying = false;
  musBeats = 0;
  drawMusTex();
  tocarBipSfx('curto');
  spawnSpark(250, 220, 6, COL.azulBril);
}

function tocarMusica() {
  if (musPlaying) return;
  musT = 0;
  musTotal = musTemAudio() ? 0 : musDuracao();
  musPlaying = true;
  musBeats = 0;
  musRealAcabou = false;
  startMusic();
  tocarBipSfx('curto');
  spawnSpark(250, 220, 8, COL.dourado);
}

$('#robo-cena').addEventListener('click', function (e) {
  if (e.target.closest('#robo-fechar') || e.target.closest('#robo-pergunta-btn') || e.target.closest('#robo-faces')) return;
  if (musT >= 0) {
    if (musPlaying) return;
    const p = clickNaTela(e);
    if (!p) return;
    const bY = 134, bR = 30;
    if (Math.hypot(p.x - 70, p.y - bY) <= bR) { trocarMusica(-1); return; }
    if (Math.hypot(p.x - (512 - 70), p.y - bY) <= bR) { trocarMusica(1); return; }
    tocarMusica();
    return;
  }
  proximaMensagemRobo();
});
$('#robo-fechar').addEventListener('click', function (e) { e.stopPropagation(); fecharRobo(); });
$('#robo-pergunta-btn').addEventListener('click', alternarPerguntaRobo);
$('#robo-btn').addEventListener('click', aparecerRobo);

function willowExpr(mode) {
  if (mode === 'musica') { willowMusic(); return; }
  exprModo = mode || 'normal';
  if (exprModo !== 'normal') { modoPergunta = false; }
  if (exprModo === 'carta') {
    hopT = 0.45;
    spawnSpark(250, 220, 8, COL.amarelo);
    tocarBipSfx('curto');
  }
  if (exprModo === 'engrenagem') {
    spawnSpark(250, 220, 6, COL.azulBril);
    tocarBipSfx('curto');
  }
  if (exprModo === 'ligando') {
    bootT = 0;
    bootBipFim = false;
    spawnSpark(250, 260, 10, COL.azulBril);
    tocarBipSfx('longo');
  }
  if (exprModo === 'tonto') {
    hopT = 0.35;
    spawnSpark(250, 218, 5, COL.amarelo);
    tocarBipSfx('curto');
  }
  const botoes = $$('.robo-faces__btn');
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].classList.toggle('is-ativa', botoes[i].getAttribute('data-expr') === exprModo);
  }
}

$('#robo-faces').addEventListener('click', function (e) {
  const btn = e.target.closest('.robo-faces__btn');
  if (!btn) return;
  willowExpr(btn.getAttribute('data-expr'));
});

$('#robo-gestos').addEventListener('click', function (e) {
  const btn = e.target.closest('.robo-faces__btn');
  if (!btn) return;
  const nome = btn.getAttribute('data-gest');
  if (!nome || !roboAberto) return;
  comecarAnimacao(nome);
  agendarAnimacaoRobo();
  tocarBipSfx('curto');
});

window.willowGesto = function (nome) {
  if (!roboAberto) return;
  comecarAnimacao(nome);
  agendarAnimacaoRobo();
};

window.willowExpr = willowExpr;
window.willowAnim = comecarAnimacao;

initGL();
vBuffer = gl ? gl.createBuffer() : null;
pBuffer = gl ? gl.createBuffer() : null;
precarregarBips();

gsap.ticker.add(function (time, deltaTime) {
  const d = Math.min(0.05, (deltaTime || 0.016) / 1000);
  if (!isNaN(d)) { update(d); }
  if (gl) render();
});

gsap.set('#robo-btn', { opacity: 0, y: -14 });
gsap.to('#robo-btn', { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power1.out' });
