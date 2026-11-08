/* The QA Lab – ứng dụng ôn thi (không cần build). Luồng: 1 Học → 2 Luyện tập → 3 Phòng thi. */
(function(){
'use strict';
const QL = window.QALAB;
const cert = QL.certs.ctfl;
const EN = cert.en || {q: {}, los: {}, chapters: {}};
const byId = Object.fromEntries(cert.bank.map(q => [q.id, q]));
const L = 'ABCD';
const $ = s => document.querySelector(s);
const app = $('#app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- lưu trữ trên trình duyệt ---------- */
const store = {
  get(k, d){ try { const v = localStorage.getItem('qalab_' + k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem('qalab_' + k, JSON.stringify(v)); } catch(e){} }
};
let hist = store.get('hist_ctfl', {});
let known = store.get('known_ctfl', {});
let learned = store.get('learned_ctfl', {});
let attempts = store.get('attempts', []);
let active = store.get('active', null);
let daily = store.get('daily_ctfl', {});
let lang = store.get('lang', 'bi');
const save = {
  hist(){ store.set('hist_ctfl', hist); }, known(){ store.set('known_ctfl', known); },
  learned(){ store.set('learned_ctfl', learned); }, attempts(){ store.set('attempts', attempts); },
  active(){ store.set('active', active); }, daily(){ store.set('daily_ctfl', daily); }, lang(){ store.set('lang', lang); }
};
/* ---------- giao diện sáng / tối ---------- */
let theme = store.get('theme', 'auto');
const THEMES = {auto: ['Tự động', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>'],
  light: ['Sáng', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'],
  dark: ['Tối', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>']};
function applyTheme(){
  const el = document.documentElement, host = window.__hostTheme;
  if (theme === 'auto'){ if (host === 'light' || host === 'dark') el.setAttribute('data-theme', host); else el.removeAttribute('data-theme'); }
  else el.setAttribute('data-theme', theme);
  const b = $('#theme'); b.innerHTML = THEMES[theme][1] + '<span class="lbl">' + THEMES[theme][0] + '</span>';
  b.setAttribute('aria-label', 'Giao diện: ' + THEMES[theme][0] + '. Bấm để đổi'); b.title = 'Giao diện: ' + THEMES[theme][0] + ' (sáng → tối → tự động)';
}
$('#theme').onclick = () => { theme = theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto'; store.set('theme', theme); applyTheme(); toast('Giao diện: ' + THEMES[theme][0]); };
applyTheme();
function record(id, ok){ const h = hist[id] || {r:0, w:0}; ok ? h.r++ : h.w++; h.last = ok; hist[id] = h; save.hist(); }

/* ---------- tiện ích ---------- */
function hash(s){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed){ let a = seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const shuffle = (a, r = Math.random) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const perm = (n, r) => shuffle([...Array(n).keys()], r);
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const clock = ms => { ms = Math.max(0, ms); const h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000), s = Math.floor(ms % 60000 / 1000); return (h ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'); };
const mins = ms => { const m = Math.round(ms / 60000); return m < 1 ? 'dưới 1 phút' : m + ' phút'; };
const dateStr = t => new Date(t).toLocaleString('vi-VN', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function isoWeek(d = new Date()){ const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day); const y = t.getUTCFullYear(); const w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 86400000 + 1) / 7); return {y, w, label: 'Đề tuần ' + w + '/' + y}; }
const CH0 = {n: 0, title: 'Bắt đầu từ số 0'};
const chap = n => n === 0 ? CH0 : cert.chapters[n - 1];
const tone = p => p >= 65 ? 'good' : p >= 50 ? 'warn' : 'bad';
function bar(p){ return `<div class="bar" role="img" aria-label="${p}%"><i style="width:${Math.min(100, p)}%"></i></div>`; }
const correctIdx = (q, order) => order.indexOf(q.a);
function modal(html, wide){ closeModal(); const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = `<div class="card stack ${wide ? 'wide' : ''}" role="dialog" aria-modal="true">${html}</div>`; m.addEventListener('click', e => { if (e.target === m) m.remove(); }); document.body.appendChild(m); const f = m.querySelector('button,a'); if (f) f.focus(); return m; }
function closeModal(){ const m = document.querySelector('.modal'); if (m) m.remove(); }
function toast(t){ const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = t; document.body.appendChild(el); setTimeout(() => el.remove(), 1800); }
async function copy(txt){ try { await navigator.clipboard.writeText(txt); toast('Đã sao chép'); } catch(e){ toast('Trình duyệt chặn sao chép'); } }

/* ---------- song ngữ ---------- */
const LANGS = [['vi', 'Tiếng Việt'], ['en', 'English'], ['bi', 'Song ngữ']];
const nextLang = l => LANGS[(LANGS.findIndex(x => x[0] === l) + 1) % LANGS.length][0];
function langSeg(cur, id){ return `<div class="seg" role="group" aria-label="Ngôn ngữ câu hỏi" id="${id}">${LANGS.map(([k, t]) => `<button type="button" data-lang="${k}" aria-pressed="${cur === k}">${t}</button>`).join('')}</div>`; }
function bindLang(id, fn){ const g = document.getElementById(id); if (g) g.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => fn(b.dataset.lang)); }
function stemHtml(q, lg){
  const e = EN.q[q.id];
  if (lg === 'en' && e) return `<p class="stem" lang="en">${esc(e.q)}</p>`;
  if (lg === 'bi' && e) return `<p class="stem" lang="en">${esc(e.q)}</p><p class="stem-vi">${esc(q.q)}</p>`;
  return `<p class="stem">${esc(q.q)}</p>`;
}
function optText(q, i, lg){
  const e = EN.q[q.id];
  if (lg === 'en' && e) return `<span lang="en">${esc(e.o[i])}</span>`;
  if (lg === 'bi' && e) return `<span><span lang="en">${esc(e.o[i])}</span><span class="opt-vi">${esc(q.o[i])}</span></span>`;
  return `<span>${esc(q.o[i])}</span>`;
}

/* ---------- thống kê ---------- */
function stats(){
  let done = 0, right = 0; cert.bank.forEach(q => { const h = hist[q.id]; if (h){ done++; if (h.last) right++; } });
  const subs = attempts.filter(a => a.cert === 'ctfl');
  return {done, right, total: cert.bank.length, learnedN: Object.keys(learned).length, attempts: subs.length, best: subs.length ? Math.max(...subs.map(a => a.score)) : null};
}
function streak(){
  let n = 0; const d = new Date();
  if (!daily[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (daily[dayKey(d)]){ n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* ---------- phím tắt ---------- */
let keys = {};
const SHORTCUTS = [
  ['Mọi nơi', [['?', 'Mở bảng phím tắt'], ['Esc', 'Đóng hộp thoại']]],
  ['Luyện tập · câu hỏi', [['1–4 hoặc A–D', 'Chọn đáp án'], ['Enter hoặc →', 'Câu tiếp theo'], ['L', 'Đổi ngôn ngữ: Việt → Anh → Song ngữ'], ['F', 'Chuyển sang flashcard']]],
  ['Flashcard', [['Space', 'Lật thẻ'], ['← →', 'Thẻ trước / sau'], ['K', 'Đã thuộc'], ['J', 'Chưa thuộc'], ['Q', 'Quay lại câu hỏi']]],
  ['Phòng thi', [['1–4 hoặc A–D', 'Chọn đáp án'], ['← →', 'Câu trước / sau'], ['F', 'Đánh dấu xem lại'], ['L', 'Đổi ngôn ngữ đề'], ['S', 'Nộp bài']]],
  ['Bài học', [['← →', 'Mục trước / sau'], ['L', 'Đổi ngôn ngữ câu kiểm tra nhanh']]],
  ['Ôn nhanh · thẻ', [['Space', 'Lật thẻ'], ['Enter', 'Đã nhớ, sang thẻ sau'], ['← →', 'Thẻ trước / sau'], ['S', 'Xáo trộn']]],
  ['Câu hỏi của ngày', [['1–4 hoặc A–D', 'Trả lời ngay trên trang chủ']]]
];
function showKeys(){ modal(`<h2 class="h2">Phím tắt</h2><div class="keys">${SHORTCUTS.map(([g, list]) => `<h3>${esc(g.toUpperCase())}</h3>` + list.map(([k, t]) => `<span>${k.split(' hoặc ').map(x => `<kbd>${esc(x)}</kbd>`).join(' hoặc ')}</span><span>${esc(t)}</span>`).join('')).join('')}</div><div class="row"><button class="btn" id="kClose">Đã hiểu</button></div>`, true); $('#kClose').onclick = closeModal; }
$('#kbd').onclick = showKeys;
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'Escape'){ closeModal(); return; }
  if (e.target.closest && e.target.closest('input,select,textarea')) return;
  if (e.key === '?'){ e.preventDefault(); showKeys(); return; }
  if (document.querySelector('.modal')) return;
  let k = e.key.length === 1 ? e.key.toUpperCase() : e.key;
  if ('1234'.includes(k) && k.length === 1) k = 'ABCD'['1234'.indexOf(k)];
  if (k === ' ') k = 'Space';
  const fn = keys['ABCD'.includes(k) && k.length === 1 ? 'choose' : k];
  if (!fn) return;
  e.preventDefault();
  'ABCD'.includes(k) && k.length === 1 ? fn('ABCD'.indexOf(k)) : fn();
});

/* ---------- hiệu ứng ---------- */
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
function confetti(x, y, n = 70){
  if (reduceMotion()) return;
  const cv = document.createElement('canvas'), g = cv.getContext('2d'), dpr = Math.min(2, devicePixelRatio || 1);
  cv.className = 'fx'; cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; g.scale(dpr, dpr); document.body.appendChild(cv);
  const cols = ['--accent', '--pink', '--good', '--warn'].map(cssVar);
  const ps = Array.from({length: n}, () => { const a = -Math.PI / 2 + (Math.random() - .5) * 2.2, v = 4 + Math.random() * 7; return {x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, s: 4 + Math.random() * 5, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: cols[Math.floor(Math.random() * cols.length)]}; });
  const t0 = performance.now();
  (function f(t){ const k = (t - t0) / 1300; g.clearRect(0, 0, innerWidth, innerHeight);
    ps.forEach(p => { p.vy += .22; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; g.save(); g.globalAlpha = Math.max(0, 1 - k); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c; g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); g.restore(); });
    k < 1 ? requestAnimationFrame(f) : cv.remove(); })(t0);
}
function burstFrom(el){ if (!el) return; const r = el.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + r.height / 2, 46); }
function countUp(){
  if (reduceMotion()) return;
  app.querySelectorAll('[data-count]').forEach(el => { const to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), d = 900;
    (function f(t){ const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e) + suf; if (k < 1) requestAnimationFrame(f); })(t0); });
}
let heroRAF = 0;
function heroFx(){
  cancelAnimationFrame(heroRAF);
  const cv = document.getElementById('heroFx'); if (!cv) return;
  const hero = cv.parentElement, g = cv.getContext('2d'), dpr = Math.min(2, devicePixelRatio || 1);
  let W = 0, H = 0; const ptr = {x: -999, y: -999};
  const size = () => { const r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); };
  size();
  const n = Math.max(18, Math.min(64, Math.round(W * H / 8000)));
  const pts = Array.from({length: n}, () => ({x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.4 + 1}));
  hero.onpointermove = e => { const r = cv.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; };
  hero.onpointerleave = () => { ptr.x = ptr.y = -999; };
  window.onresize = () => { if (document.body.contains(cv)) size(); };
  const still = reduceMotion();
  function frame(t){
    if (!document.body.contains(cv)) return;
    const acc = cssVar('--accent'), pink = cssVar('--pink');
    g.clearRect(0, 0, W, H);
    pts.forEach(p => { if (!still){ p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; } });
    g.strokeStyle = acc; g.lineWidth = 1;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++){ const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 120){ g.globalAlpha = (1 - d / 120) * .28; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); } }
    pts.forEach(p => { const d = Math.hypot(p.x - ptr.x, p.y - ptr.y); if (d < 160){ g.globalAlpha = (1 - d / 160) * .6; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(ptr.x, ptr.y); g.stroke(); } });
    g.fillStyle = acc; pts.forEach(p => { g.globalAlpha = .55; g.beginPath(); g.arc(p.x, p.y, p.r, 0, Math.PI * 2); g.fill(); });
    const b = pts[0], pulse = still ? .5 : (Math.sin(t / 500) + 1) / 2;
    g.globalAlpha = .9; g.fillStyle = pink; g.beginPath(); g.arc(b.x, b.y, 3.2, 0, Math.PI * 2); g.fill();
    g.globalAlpha = .5 * (1 - pulse); g.strokeStyle = pink; g.beginPath(); g.arc(b.x, b.y, 4 + pulse * 18, 0, Math.PI * 2); g.stroke();
    g.globalAlpha = 1;
    if (!still) heroRAF = requestAnimationFrame(frame);
  }
  heroRAF = requestAnimationFrame(frame);
}
let enterTimer = 0;
function enter(){ clearTimeout(enterTimer); app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter'); enterTimer = setTimeout(() => app.classList.remove('enter'), 1300); countUp(); }

/* ---------- điều hướng ---------- */
const views = {home, learn, review, practice, exam, roadmap};
let tick = null, curView = null;
let reviewId = null, reviewFilter = 'all';
function go(v){
  if (!views[v]) v = 'home';
  if (v !== curView && v === 'exam' && curView !== null) reviewId = null;
  curView = v; keys = {}; closeModal();
  if (tick && v !== 'exam'){ clearInterval(tick); tick = null; }
  document.body.classList.remove('in-room');
  document.querySelectorAll('#nav a').forEach(a => { if (a.dataset.v === (v === 'review' ? 'learn' : v)) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  if (location.hash !== '#' + v) history.replaceState(null, '', '#' + v);
  views[v]();
  enter();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', () => go(location.hash.slice(1)));
document.querySelectorAll('#nav a, .brand').forEach(a => a.addEventListener('click', e => { const v = a.getAttribute('href').slice(1); if (location.hash === '#' + v){ e.preventDefault(); if (v === 'exam') reviewId = null; go(v); } }));
function link(sel, fn){ app.querySelectorAll(sel).forEach(el => el.addEventListener('click', fn)); }

/* ============ TRANG CHỦ ============ */
function dailyQ(){
  const key = dayKey(), r = rng(hash('daily-' + key));
  const q = cert.bank[Math.floor(r() * cert.bank.length)];
  const n = Math.floor((new Date(key) - new Date('2026-11-01')) / 86400000) + 1;
  return {key, q, order: perm(q.o.length, r), n};
}
function home(){
  const s = stats();
  const learnDone = s.learnedN >= 6;
  const practiceDone = s.done >= Math.ceil(s.total * 0.6) && pct(s.right, s.done) >= 65;
  const now = !learnDone ? 1 : !practiceDone ? 2 : 3;
  const nextCh = cert.chapters.find(c => !learned[c.n]);
  const running = active && !active.submittedAt;
  const d = dailyQ(), dd = daily[d.key], ci = correctIdx(d.q, d.order), st = streak();
  const wk = isoWeek(), wb = weekBest(wk.label);
  const cta = now === 1 ? ['#learn', !Object.keys(secDone).length && !s.learnedN ? 'Bắt đầu từ số 0' : 'Học chương ' + (nextCh ? nextCh.n : 1)] : now === 2 ? ['#practice', 'Tiếp tục luyện tập'] : ['#exam', 'Vào phòng thi'];
  const steps = [
    ['#learn', 'Học', `${s.learnedN}/6 chương`, pct(s.learnedN, 6), learnDone],
    ['#practice', 'Luyện tập', `${s.done}/${s.total} câu · đúng ${pct(s.right, s.done)}%`, pct(s.done, s.total), practiceDone],
    ['#exam', 'Phòng thi', s.attempts ? `Cao nhất ${s.best}/40` : 'Chưa thi', s.best === null ? 0 : pct(s.best, 40), s.best !== null && s.best >= 26]
  ];
  app.innerHTML = `
  ${running ? `<div class="card row between"><div><b>Bạn có bài thi đang làm dở.</b> <span class="muted small">Còn ${clock(active.endsAt - Date.now())}.</span></div><a class="btn" href="#exam">Quay lại phòng thi</a></div>` : ''}
  <section class="hero">
    <canvas id="heroFx" aria-hidden="true"></canvas>
    <span class="eyebrow">ISTQB CTFL v4.0.1 · Việt – Anh</span>
    <h1 class="h1" style="font-size:clamp(30px,4.6vw,46px)">Học, luyện, rồi vào <span class="grad">phòng thi</span>.</h1>
    <p class="lead">Ví dụ thực tế trước lý thuyết, câu hỏi song ngữ có giải thích, và phòng thi 40 câu trong 60 phút như thật.</p>
    <div class="row"><a class="btn" href="${cta[0]}" id="cta">${cta[1]}</a><a class="btn ghost" href="#roadmap">Xem lộ trình</a></div>
  </section>
  <nav class="card stepper" aria-label="3 bước">
    ${steps.map(([h, t, sub, p, done], i) => `<a href="${h}" class="${done ? 'done' : ''} ${now === i + 1 ? 'now' : ''}">
      <span class="num">${done ? '✓' : i + 1}</span><h3>${t}</h3><span class="meta">${sub}</span>${bar(p)}</a>`).join('')}
  </nav>
  <div class="grid2">
    <section class="card stack" aria-labelledby="dailyT">
      <div class="row between"><h2 class="h2" id="dailyT">Câu hỏi của ngày #${d.n}</h2>${st ? `<span class="streak">Chuỗi ${st} ngày</span>` : ''}</div>
      ${stemHtml(d.q, lang)}
      <div class="opts">${d.order.map((oi, j) => `<button class="opt ${dd ? (j === ci ? 'ok' : j === dd.pick ? 'no' : '') : ''}" data-dj="${j}" ${dd ? 'disabled' : ''}><span class="k">${L[j]}</span>${optText(d.q, oi, lang)}</button>`).join('')}</div>
      ${dd ? `<div class="exp"><b style="color:var(--${dd.ok ? 'good' : 'bad'})">${dd.ok ? 'Chính xác.' : 'Chưa đúng. Đáp án: ' + L[ci] + '.'}</b> ${esc(d.q.e)}</div>
        <div class="row between"><span class="small muted">Câu mới mỗi ngày, cả cộng đồng cùng một câu.</span><button class="textlink small" id="dShare">Sao chép để chia sẻ</button></div>` : '<p class="small muted">Cả cộng đồng cùng một câu mỗi ngày.</p>'}
    </section>
    <div class="stack">
      <section class="card stack lift">
        <h2 class="h2">${esc(wk.label)}</h2>
        <p class="small muted">Cả cộng đồng cùng một đề 40 câu, đổi vào thứ Hai. Thi xong có ảnh kết quả để chia sẻ.</p>
        <div class="row between"><span class="small">${wb === null ? 'Bạn chưa thi đề tuần này' : 'Điểm cao nhất của bạn: <b>' + wb + '/40</b>'}</span><a class="btn sm" href="#exam">Thi đề tuần</a></div>
      </section>
      <section class="card stack">
        <h2 class="h2">Sau CTFL</h2>
        ${QL.tracks.map(t => `<a href="#roadmap" class="row between" style="text-decoration:none;color:inherit"><span><b>${esc(t.title)}</b><br><span class="small muted">${esc(t.steps.filter(x => !x.branch).map(x => x.code).join(' → '))}</span></span><span class="muted" aria-hidden="true">→</span></a>`).join('')}
      </section>
    </div>
  </div>`;
  if (now === 1 && nextCh) $('#cta').onclick = () => { learnCh = nextCh.n; };
  const answer = j => { if (daily[d.key]) return; daily[d.key] = {pick: j, ok: j === ci}; save.daily(); record(d.q.id, j === ci); home(); feedback(j, ci, '[data-dj]'); };
  if (!dd){ link('[data-dj]', e => answer(+e.currentTarget.dataset.dj)); keys.choose = answer; }
  const sh = $('#dShare'); if (sh) sh.onclick = () => copy(`The QA Lab · Câu hỏi của ngày #${d.n} (ISTQB CTFL)\n${dd.ok ? 'Đúng' : 'Sai'}${st ? ' · chuỗi ' + st + ' ngày' : ''}\nThử sức: ${siteUrl()}`);
  keys.L = () => { lang = nextLang(lang); save.lang(); home(); };
  heroFx();
}
function feedback(j, ci, sel){
  const opts = app.querySelectorAll(sel), mine = opts[j];
  if (j === ci){ if (mine) mine.classList.add('pop'); burstFrom(mine); } else if (mine) mine.classList.add('shake');
  const ex = app.querySelector('.exp'); if (ex) ex.classList.add('reveal');
}
function siteUrl(){ return /^https?:/.test(location.protocol) && !/claude\.ai|claudeusercontent/.test(location.host) ? location.origin : 'The QA Lab'; }

/* ============ 1. HỌC ============ */
let learnCh = 1, learnSec = store.get('learnSec', {}), chk = {};
let secDone = store.get('secDone_ctfl', {});
const GROUPS = cert.lessonGroups || {}, MIGRATE = cert.lessonMigrate || {};
/* chuyển tiến độ cũ (mục gộp nhiều LO) sang mã mục mới theo LO */
(function(){ let ch = false; const mv = o => { for (const k of Object.keys(o)) if (MIGRATE[k] && MIGRATE[k] !== k){ o[MIGRATE[k]] = o[MIGRATE[k]] || o[k]; delete o[k]; ch = true; } return o; };
  mv(secDone); const ls = store.get('learnSec', {}); for (const c in ls) if (MIGRATE[ls[c]]) { ls[c] = MIGRATE[ls[c]]; ch = true; } const rv = mv(store.get('reviewed_ctfl', {}));
  if (ch){ store.set('secDone_ctfl', secDone); store.set('learnSec', ls); store.set('reviewed_ctfl', rv); } learnSec = ls; })();
if (!Object.keys(secDone).length && !Object.keys(learned).length) learnCh = 0;
const grpOf = id => id.split('.').slice(0, 2).join('.');
function tocItems(secs, sid, noSum){
  let g = '', h = '';
  secs.forEach(x => { const gg = grpOf(x.id); if (gg !== g && GROUPS[gg]){ g = gg; h += `<div class="toc-g">${gg} · ${esc(GROUPS[gg])}</div>`; }
    h += `<button data-s="${x.id}" aria-current="${x.id === sid}" class="${secDone[x.id] ? 'done' : ''}"><span class="n">${secDone[x.id] ? '✓' : x.id}</span><span class="t">${esc(x.title)}</span></button>`; });
  const n = secs.filter(x => secDone[x.id]).length;
  return `<div class="toc-p small muted">Đã hiểu ${n}/${secs.length} mục${bar(pct(n, secs.length))}</div>` + h + (noSum ? '' : `<button data-s="sum" aria-current="${sid === 'sum'}"><span class="n">∑</span><span class="t">Tóm tắt chương</span></button>`);
}
const LESSONS = cert.lessons || {};
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
function block(b){
  if (b.t === 'h') return `<h3 class="sec">${md(b.v)}</h3>`;
  if (b.t === 'p') return `<p>${md(b.v)}</p>`;
  if (b.t === 'list') return `<ul class="pts">${b.v.map(x => `<li>${md(x)}</li>`).join('')}</ul>`;
  if (b.t === 'table') return `<div class="tablewrap"><table>${b.head ? `<thead><tr>${b.head.map(h => `<th>${md(h)}</th>`).join('')}</tr></thead>` : ''}<tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (b.t === 'compare') return `<div class="cmp">${[b.l, b.r].map(x => `<div><h4>${md(x.h)}</h4><span class="q">${md(x.q)}</span><ul>${x.v.map(i => `<li>${md(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
  if (b.t === 'steps') return `<div class="flowsteps">${b.v.map(([a, t]) => `<div><span><b>${md(a)}</b><span class="small muted">${md(t)}</span></span></div>`).join('')}</div>`;
  if (b.t === 'principles') return `<div class="prin">${b.v.map(([n, h, t, ex]) => `<details ${n === '1' ? 'open' : ''}><summary><span class="no">${n}</span><span>${md(h)}</span></summary><p style="margin-top:8px">${md(t)}</p><div class="ex"><b>Ví dụ:</b> ${md(ex)}</div></details>`).join('')}</div>`;
  if (b.t === 'tip') return `<div class="callout good"><b>Mẹo</b>${md(b.v)}</div>`;
  if (b.t === 'trap') return `<div class="callout bad"><b>Bẫy hay gặp trong đề</b><ul class="pts">${b.v.map(x => `<li>${md(x)}</li>`).join('')}</ul></div>`;
  if (b.t === 'worked') return `<div class="worked"><span class="meta">Bài tập có lời giải</span><h4>${md(b.title)}</h4><p>${md(b.given)}</p>
    <details><summary>Tự làm trước, rồi xem lời giải từng bước</summary><ol class="wsteps">${b.steps.map(x => `<li>${md(x)}</li>`).join('')}</ol><div class="wans"><b>Đáp án</b>${md(b.answer)}</div></details></div>`;
  if (b.t === 'lab') return labHtml(b.kind);
  return '';
}

/* ---------- Lab: công cụ tương tác trong bài ---------- */
const LABS = {
  bva: {name: 'Máy tính EP và BVA', hint: 'Nhập khoảng hợp lệ (số nguyên), xem ngay các vùng và giá trị cần thử.', inputs: [['min', 'Nhỏ nhất', 18], ['max', 'Lớn nhất', 60]]},
  dt: {name: 'Sinh bảng quyết định đầy đủ', hint: 'Mỗi điều kiện một dòng (tối đa 5). Bảng sinh đủ 2ⁿ quy tắc.', inputs: [['conds', 'Điều kiện', 'Là thành viên\nĐơn ≥ 500k\nCó mã giảm giá', 'area']]},
  est3: {name: 'Ước lượng ba điểm và theo tỷ lệ', hint: 'Đơn vị tùy chọn: người-giờ, người-ngày…', inputs: [['a', 'Lạc quan (a)', 6], ['m', 'Khả dĩ nhất (m)', 9], ['b', 'Bi quan (b)', 18], ['dev', 'Công sức dev', 600], ['rd', 'Tỷ lệ dev', 3], ['rt', 'Tỷ lệ test', 2]]},
  risk: {name: 'Ma trận rủi ro', hint: 'Kéo để chọn khả năng xảy ra và tác động (1–5).', inputs: [['l', 'Khả năng', 4, 'range'], ['i', 'Tác động', 5, 'range']]}
};
function labHtml(kind){
  if (LABX[kind]) return `<div class="lab" data-lab="${kind}"><div class="lab-h"><span class="pill">Lab</span><b>${LABX[kind].name}</b></div><p class="small muted">${LABX[kind].hint}</p><div class="lab-x"></div></div>`;
  const L = LABS[kind]; if (!L) return '';
  const field = ([k, t, v, type]) => type === 'area' ? `<label class="lab-f wide"><span>${t}</span><textarea data-k="${k}" rows="4">${esc(v)}</textarea></label>`
    : type === 'range' ? `<label class="lab-f"><span>${t}: <b data-show="${k}">${v}</b></span><input type="range" min="1" max="5" step="1" data-k="${k}" value="${v}"></label>`
    : `<label class="lab-f"><span>${t}</span><input type="number" inputmode="decimal" data-k="${k}" value="${v}"></label>`;
  return `<div class="lab" data-lab="${kind}"><div class="lab-h"><span class="pill">Lab</span><b>${L.name}</b></div><p class="small muted">${L.hint}</p>
    <div class="lab-in">${L.inputs.map(field).join('')}</div><div class="lab-out" aria-live="polite"></div></div>`;
}
const chips = (arr, cls) => arr.map(([v, ok]) => `<span class="vchip ${ok ? 'ok' : 'no'} ${cls || ''}">${v}</span>`).join('');
const labCalc = {
  bva(v){
    const a = Math.round(v.min), b = Math.round(v.max);
    if (!isFinite(a) || !isFinite(b)) return '<p class="muted">Nhập hai số nguyên.</p>';
    if (b < a) return '<p class="bad-t">Giá trị lớn nhất phải ≥ nhỏ nhất.</p>';
    const ok = x => x >= a && x <= b, uniq = xs => [...new Set(xs)].sort((x, y) => x - y).map(x => [x, ok(x)]);
    const two = uniq([a - 1, a, b, b + 1]), three = uniq([a - 1, a, a + 1, b - 1, b, b + 1]);
    const mid = Math.floor((a + b) / 2);
    return `<div class="tablewrap"><table><thead><tr><th>Phân vùng</th><th>Khoảng</th><th>Ví dụ EP</th></tr></thead><tbody>
      <tr><td><span class="vchip no">Không hợp lệ</span></td><td>≤ ${a - 1}</td><td class="mono">${a - 10}</td></tr>
      <tr><td><span class="vchip ok">Hợp lệ</span></td><td>${a} – ${b}</td><td class="mono">${mid}</td></tr>
      <tr><td><span class="vchip no">Không hợp lệ</span></td><td>≥ ${b + 1}</td><td class="mono">${b + 10}</td></tr></tbody></table></div>
      <div class="lab-r"><b>EP:</b> 3 vùng → tối thiểu 3 ca kiểm thử.</div>
      <div class="lab-r"><b>BVA 2 giá trị (${two.length}):</b> ${chips(two)}</div>
      <div class="lab-r"><b>BVA 3 giá trị (${three.length}):</b> ${chips(three)}</div>`;
  },
  dt(v){
    const cs = String(v.conds || '').split('\n').map(s => s.trim()).filter(Boolean).slice(0, 5);
    if (!cs.length) return '<p class="muted">Nhập ít nhất một điều kiện.</p>';
    const n = cs.length, cols = 1 << n;
    return `<div class="lab-r"><b>${n} điều kiện → 2<sup>${n}</sup> = ${cols} quy tắc (cột).</b> Gạch bỏ cột không khả thi và gộp cột có điều kiện không liên quan (–) để rút gọn.</div>
      <div class="tablewrap"><table class="dt"><thead><tr><th></th>${Array.from({length: cols}, (_, j) => `<th>R${j + 1}</th>`).join('')}</tr></thead><tbody>
      ${cs.map((c, r) => `<tr><td>${esc(c)}</td>${Array.from({length: cols}, (_, j) => { const t = !((j >> (n - 1 - r)) & 1); return `<td class="${t ? 'good-t' : 'bad-t'}">${t ? 'T' : 'F'}</td>`; }).join('')}</tr>`).join('')}
      <tr><td class="muted">Hành động</td>${Array.from({length: cols}, () => '<td class="muted">?</td>').join('')}</tr></tbody></table></div>`;
  },
  est3(v){
    const {a, m, b} = v; let out = '';
    if ([a, m, b].some(x => !isFinite(x))) out = '<p class="muted">Nhập đủ a, m, b.</p>';
    else if (!(a <= m && m <= b)) out = '<p class="bad-t">Cần a ≤ m ≤ b.</p>';
    else { const E = (a + 4 * m + b) / 6, SD = (b - a) / 6, f = x => +x.toFixed(2);
      out = `<div class="lab-r"><b>E</b> = (${a} + 4×${m} + ${b}) / 6 = <b class="big">${f(E)}</b></div><div class="lab-r"><b>SD</b> = (${b} − ${a}) / 6 = <b>${f(SD)}</b> → khoảng <b>${f(E - SD)} – ${f(E + SD)}</b></div>`; }
    if (isFinite(v.dev) && v.rd > 0 && v.rt >= 0) out += `<div class="lab-r"><b>Theo tỷ lệ</b> dev : test = ${v.rd} : ${v.rt} → công sức test ≈ ${v.dev} × ${v.rt} / ${v.rd} = <b>${+(v.dev * v.rt / v.rd).toFixed(2)}</b></div>`;
    return out;
  },
  risk(v){
    const l = v.l, i = v.i, s = l * i, lv = s >= 15 ? ['Rất cao', 'bad'] : s >= 8 ? ['Cao', 'warn'] : s >= 4 ? ['Trung bình', 'mid'] : ['Thấp', 'good'];
    let g = '<div class="rgrid" role="img" aria-label="Ma trận rủi ro 5 x 5">';
    for (let y = 5; y >= 1; y--) for (let x = 1; x <= 5; x++){ const p = x * y, c = p >= 15 ? 'bad' : p >= 8 ? 'warn' : p >= 4 ? 'mid' : 'good'; g += `<span class="r-${c} ${x === l && y === i ? 'on' : ''}">${p}</span>`; }
    g += '</div>';
    return `<div class="rbox">${g}<div class="stack" style="gap:6px"><div class="lab-r">Mức rủi ro = ${l} × ${i} = <b class="big">${s}</b></div><div><span class="vchip r-${lv[1]}">${lv[0]}</span></div>
      <p class="small muted">Trục ngang: khả năng xảy ra; trục dọc: tác động. Ngưỡng màu chỉ là ví dụ, mỗi tổ chức tự quy định. Rủi ro càng cao càng test sớm, kỹ và độc lập hơn.</p></div></div>`;
  }
};

/* Lab có trạng thái riêng: chuyển trạng thái và bao phủ câu lệnh/nhánh */
const ST = {
  states: ['Mới', 'Đã thanh toán', 'Đang giao', 'Hoàn tất', 'Đã hủy'],
  events: ['thanh toán', 'giao hàng', 'nhận hàng', 'hủy'],
  next: {'Mới|thanh toán': 'Đã thanh toán', 'Mới|hủy': 'Đã hủy', 'Đã thanh toán|giao hàng': 'Đang giao', 'Đã thanh toán|hủy': 'Đã hủy', 'Đang giao|nhận hàng': 'Hoàn tất'}
};
const COV = {
  code: [['function phiShip(tong, vip) {', 0], ['  let phi = 30000', 1], ['  if (tong >= 150000) {', 1], ['    phi = 0', 1], ['  }', 0], ['  if (vip) {', 1], ['    phi = phi / 2', 1], ['  }', 0], ['  return phi', 1], ['}', 0]],
  run(t, v){ const ex = [1, 2, 5, 8]; const b = []; let phi = 30000; if (t >= 150000){ ex.push(3); phi = 0; b.push('d1T'); } else b.push('d1F'); if (v){ ex.push(6); phi = phi / 2; b.push('d2T'); } else b.push('d2F'); return {ex, b, phi}; }
};
const LABX = {
  st: {name: 'Mô phỏng chuyển trạng thái: đơn hàng', hint: 'Mỗi ca kiểm thử bắt đầu ở “Mới”. Bấm sự kiện để chuyển trạng thái, xem độ bao phủ tăng dần. Thử cả sự kiện không hợp lệ (mỗi ca chỉ nên có một).',
    init(box){
      const S = {cur: 'Mới', path: ['Mới'], cases: 1, vs: new Set(['Mới']), vt: new Set(), all: new Set(), badInCase: 0, log: []};
      const nValid = Object.keys(ST.next).length, nAll = ST.states.length * ST.events.length;
      const draw = (msg) => {
        const cell = (st, ev) => { const k = st + '|' + ev, to = ST.next[k], hit = S.all.has(k); return `<td class="${to ? 'v' : 'iv'} ${hit ? 'hit' : ''}">${to ? esc(to) : '–'}</td>`; };
        box.innerHTML = `<div class="st-now"><span class="small muted">Ca ${S.cases} · trạng thái hiện tại</span><b>${esc(S.cur)}</b><span class="small muted mono">${S.path.map(esc).join(' → ')}</span></div>
          <div class="row" style="gap:8px">${ST.events.map(ev => `<button class="btn ghost sm" data-ev="${ev}">${ev}</button>`).join('')}<button class="btn link sm" data-new>Ca kiểm thử mới ↺</button></div>
          ${msg ? `<div class="small ${msg[0]}">${msg[1]}</div>` : ''}
          <div class="lab-out"><div class="covrow">
            <span>Mọi trạng thái <b>${S.vs.size}/${ST.states.length}</b>${bar(pct(S.vs.size, ST.states.length))}</span>
            <span>Chuyển hợp lệ <b>${S.vt.size}/${nValid}</b>${bar(pct(S.vt.size, nValid))}</span>
            <span>Mọi chuyển <b>${S.all.size}/${nAll}</b>${bar(pct(S.all.size, nAll))}</span></div>
            <div class="tablewrap"><table class="st-t"><thead><tr><th>Trạng thái \\ sự kiện</th>${ST.events.map(e => `<th>${e}</th>`).join('')}</tr></thead>
            <tbody>${ST.states.map(st => `<tr class="${st === S.cur ? 'cur' : ''}"><td>${S.vs.has(st) ? '✓ ' : ''}${esc(st)}</td>${ST.events.map(ev => cell(st, ev)).join('')}</tr>`).join('')}</tbody></table></div>
            <p class="small muted">Ô có tên trạng thái là chuyển hợp lệ, ô “–” là chuyển không hợp lệ. Ô tô màu là đã được thử.</p></div>`;
        box.querySelectorAll('[data-ev]').forEach(b => b.onclick = () => {
          const ev = b.dataset.ev, k = S.cur + '|' + ev, to = ST.next[k]; S.all.add(k);
          if (to){ S.vt.add(k); S.cur = to; S.vs.add(to); S.path.push(to); draw(['good-t', `Hợp lệ: ${ev} → ${to}`]); }
          else { S.badInCase++; S.path.push('✕ ' + ev); draw(['bad-t', S.badInCase > 1 ? 'Ca này đã có nhiều hơn một chuyển không hợp lệ: lỗi có thể bị che lấp. Nên bắt đầu ca mới.' : `Không hợp lệ: “${ev}” từ “${S.cur}”, trạng thái giữ nguyên. Hệ thống đúng phải từ chối.`]); }
        });
        box.querySelector('[data-new]').onclick = () => { S.cur = 'Mới'; S.path = ['Mới']; S.cases++; S.badInCase = 0; draw(['muted', 'Bắt đầu ca kiểm thử mới từ “Mới”.']); };
      };
      draw();
    }},
  cov: {name: 'Đo bao phủ câu lệnh và nhánh', hint: 'Nhập dữ liệu cho từng ca kiểm thử rồi bấm Chạy. Dòng đã chạy sáng lên; bao phủ cộng dồn qua các ca.',
    init(box){
      const S = {lines: new Set(), br: new Set(), runs: []};
      const nSt = COV.code.filter(x => x[1]).length;
      const BR = [['d1T', 'if 1 đúng'], ['d1F', 'if 1 sai'], ['d2T', 'if 2 đúng'], ['d2F', 'if 2 sai']];
      const draw = (last) => {
        const stc = [...S.lines].filter(i => COV.code[i][1]).length;
        box.innerHTML = `<div class="row" style="gap:10px;align-items:flex-end"><label class="lab-f"><span>tong (đồng)</span><input type="number" id="cvT" value="${last ? last.t : 200000}"></label>
          <label class="small row" style="gap:6px;min-height:40px"><input type="checkbox" id="cvV" ${last && last.v ? 'checked' : ''}> vip</label>
          <button class="btn sm" id="cvRun">Chạy ca kiểm thử</button><button class="btn link sm" id="cvReset">Làm lại</button></div>
          <pre class="code">${COV.code.map(([l, st], i) => `<span class="${last && last.ex.includes(i) ? 'now' : S.lines.has(i) ? 'ran' : ''} ${st ? '' : 'ne'}"><i>${i + 1}</i>${esc(l)}</span>`).join('')}</pre>
          <div class="lab-out"><div class="covrow"><span>Bao phủ câu lệnh <b>${stc}/${nSt}</b> = ${pct(stc, nSt)}%${bar(pct(stc, nSt))}</span><span>Bao phủ nhánh <b>${S.br.size}/4</b> = ${pct(S.br.size, 4)}%${bar(pct(S.br.size, 4))}</span></div>
            <div class="row" style="gap:6px">${BR.map(([k, t]) => `<span class="vchip ${S.br.has(k) ? 'ok' : 'no'}">${t}</span>`).join('')}</div>
            ${S.runs.length ? `<ol class="small" style="margin:0;padding-left:20px">${S.runs.map(r => `<li>tong = ${r.t.toLocaleString('vi-VN')}, vip = ${r.v} → phí ${r.phi.toLocaleString('vi-VN')}</li>`).join('')}</ol>` : '<p class="small muted">Gợi ý: một ca đạt 100% câu lệnh, nhưng cần ít nhất 2 ca để đạt 100% nhánh.</p>'}
            ${stc === nSt && S.br.size < 4 ? '<div class="small good-t">Đã đạt 100% bao phủ câu lệnh nhưng chưa đủ nhánh: đúng như lý thuyết, 100% câu lệnh không kéo theo 100% nhánh.</div>' : ''}
            ${S.br.size === 4 ? `<div class="small good-t">100% bao phủ nhánh với ${S.runs.length} ca, và vì thế cũng 100% câu lệnh.</div>` : ''}
            <p class="small muted">Ở đây đếm 6 câu lệnh thực thi được và 4 nhánh có điều kiện (đúng/sai của 2 câu if).</p></div>`;
        $('#cvRun').onclick = () => { const t = parseFloat($('#cvT').value) || 0, v = $('#cvV').checked, r = COV.run(t, v); r.ex.forEach(i => S.lines.add(i)); r.b.forEach(b => S.br.add(b)); const rec = {t, v, phi: r.phi, ex: r.ex}; S.runs.push(rec); draw(rec); };
        $('#cvReset').onclick = () => { S.lines.clear(); S.br.clear(); S.runs = []; draw(); };
      };
      draw();
    }}
};
function initLabs(){
  app.querySelectorAll('.lab').forEach(el => {
    const kind = el.dataset.lab, out = el.querySelector('.lab-out');
    if (LABX[kind]){ LABX[kind].init(el.querySelector('.lab-x')); return; }
    const run = () => { const v = {}; el.querySelectorAll('[data-k]').forEach(i => { v[i.dataset.k] = i.tagName === 'TEXTAREA' ? i.value : parseFloat(i.value); const sh = el.querySelector(`[data-show="${i.dataset.k}"]`); if (sh) sh.textContent = i.value; }); out.innerHTML = labCalc[kind](v); };
    el.querySelectorAll('[data-k]').forEach(i => i.addEventListener('input', run)); run();
  });
}
function learn(){
  const c = chap(learnCh), secs = LESSONS[c.n];
  const tabs = learnHead('learn') + `
  <div class="tabs" role="group" aria-label="Chọn chương">${LESSONS[0] ? `<button aria-pressed="${learnCh === 0}" data-c="0">Bắt đầu</button>` : ''}${cert.chapters.map(x => `<button aria-pressed="${x.n === learnCh}" data-c="${x.n}">Chương ${x.n}${learned[x.n] ? '<span class="ok" aria-label="đã học">✓</span>' : ''}</button>`).join('')}</div>`;
  if (!secs) return learnSummary(c, tabs);
  const sid = secs.find(s => s.id === learnSec[c.n]) ? learnSec[c.n] : secs[0].id;
  const i = secs.findIndex(s => s.id === sid), s = secs[i];
  const qs = cert.bank.filter(q => s.los.includes(q.lo)).slice(0, s.los[0] && (cert.los[s.los[0]] || [])[0] === 'K3' ? 4 : 3);
  app.innerHTML = tabs + `
  <div class="lesson">
    <nav class="card toc" aria-label="Mục lục chương ${c.n}">
      ${tocItems(secs, sid, c.n === 0)}
    </nav>
    <article class="card lesson-body ${chk.anim ? 'qin' : ''}">
      <div class="stack" style="gap:6px"><span class="meta">${c.n ? 'Chương ' + c.n : 'Bắt đầu · kiến thức nền, không có trong đề'} · Mục ${s.id} · ${s.minutes} phút</span>
        <h2 class="h1" style="font-size:28px">${esc(s.title)}</h2><span class="muted" lang="en">${esc(s.en)}</span>
        <div class="row" style="margin-top:4px">${s.los.map(lo => `<span class="pill mute" title="${esc((cert.los[lo] || ['', ''])[1])}">${lo} · ${(cert.los[lo] || ['?'])[0]}</span>`).join('')}</div></div>
      <div class="example"><b>Ví dụ thực tế</b>${md(s.example)}</div>
      ${s.blocks.map(block).join('')}
      ${s.terms ? `<div class="stack" style="gap:8px"><h3 class="sec">Từ khóa của mục</h3><div class="terms">${s.terms.map(([en, vi]) => `<span><b lang="en">${esc(en)}</b> · ${esc(vi)}</span>`).join('')}</div></div>` : ''}
      ${s.summary ? `<section class="sumbox" aria-label="Tóm tắt mục ${s.id}"><div class="row between"><span class="sum-h">Tóm tắt mục ${s.id}</span><span class="row" style="gap:12px"><button class="btn link sm" id="toCarou">Tạo carousel</button><a href="#review" class="small" id="toReview">Xem trong Ôn nhanh →</a></span></div>
        <ol>${s.summary.map(x => `<li>${md(x)}</li>`).join('')}</ol></section>` : ''}
      ${qs.length ? `<div class="stack"><h3 class="sec">Kiểm tra nhanh (${qs.length} câu)</h3>${qs.map((q, n) => quick(q, n)).join('')}</div>` : ''}
      <div class="row between" style="border-top:1px solid var(--line);padding-top:16px">
        <button class="btn ghost" id="sPrev" ${i === 0 ? 'disabled' : ''}>← Mục trước</button>
        <button class="btn ${secDone[s.id] ? 'ghost' : ''}" id="sDone">${secDone[s.id] ? 'Đã hiểu ✓' : 'Đã hiểu mục này'}</button>
        <button class="btn ghost" id="sNext">${i < secs.length - 1 ? 'Mục sau →' : c.n === 0 ? 'Vào chương 1 →' : 'Tóm tắt chương →'}</button>
      </div>
    </article>
  </div>`;
  chk.anim = false;
  initLabs();
  const tr = $('#toReview'); if (tr) tr.onclick = () => { revCh = c.n; revFocus = s.id; };
  const tc = $('#toCarou'); if (tc) tc.onclick = () => carousel(Object.assign({c: c.n}, s));
  const goSec = id => { learnSec[c.n] = id; store.set('learnSec', learnSec); chk.anim = true; learn(); window.scrollTo({top: 0, behavior: reduceMotion() ? 'auto' : 'smooth'}); };
  link('[data-c]', e => { learnCh = +e.currentTarget.dataset.c; learn(); });
  link('[data-s]', e => { const id = e.currentTarget.dataset.s; if (id === 'sum'){ learnSec[c.n] = 'sum'; store.set('learnSec', learnSec); learnSummary(c, tabs, true); } else goSec(id); });
  $('#sPrev').onclick = () => goSec(secs[i - 1].id);
  $('#sNext').onclick = () => { if (i < secs.length - 1) goSec(secs[i + 1].id); else if (c.n === 0){ learnCh = 1; learn(); window.scrollTo(0, 0); } else { learnSec[c.n] = 'sum'; store.set('learnSec', learnSec); learnSummary(c, tabs, true); window.scrollTo(0, 0); } };
  $('#sDone').onclick = () => { if (secDone[s.id]) delete secDone[s.id]; else { secDone[s.id] = Date.now(); burstFrom($('#sDone')); }
    store.set('secDone_ctfl', secDone);
    if (c.n === 0){} else if (secs.every(x => secDone[x.id])) learned[c.n] = learned[c.n] || Date.now(); else delete learned[c.n];
    save.learned(); if (secDone[s.id] && i < secs.length - 1) setTimeout(() => goSec(secs[i + 1].id), 500); else learn(); };
  app.querySelectorAll('[data-qk]').forEach(b => b.onclick = () => { const [id, j] = b.dataset.qk.split('|'); if (chk[id] !== undefined) return; chk[id] = +j; const q = byId[id], ord = perm(q.o.length, rng(hash(id))); record(id, +j === ord.indexOf(q.a)); learn(); const el = app.querySelector(`[data-qk="${id}|${j}"]`); if (el) feedbackEl(el, +j === ord.indexOf(q.a)); });
  keys.ArrowRight = () => $('#sNext').click(); keys.ArrowLeft = () => { if (i > 0) $('#sPrev').click(); };
  keys.L = () => { lang = nextLang(lang); save.lang(); learn(); };
  if (c.n && learnSec[c.n] === 'sum') learnSummary(c, tabs, true);
}
function quick(q, n){
  const ord = perm(q.o.length, rng(hash(q.id))), ci = ord.indexOf(q.a), picked = chk[q.id], ans = picked !== undefined;
  return `<div class="stack" style="gap:10px;padding:14px;border:1px solid var(--line);border-radius:12px"><span class="meta">Câu ${n + 1} · ${q.lo} · ${q.k}</span>${stemHtml(q, lang)}
    <div class="opts">${ord.map((oi, j) => `<button class="opt ${ans ? (j === ci ? 'ok' : j === picked ? 'no' : '') : ''}" data-qk="${q.id}|${j}" ${ans ? 'disabled' : ''}><span class="k">${L[j]}</span>${optText(q, oi, lang)}</button>`).join('')}</div>
    ${ans ? `<div class="exp"><b style="color:var(--${picked === ci ? 'good' : 'bad'})">${picked === ci ? 'Chính xác.' : 'Chưa đúng. Đáp án: ' + L[ci] + '.'}</b> ${esc(q.e)}</div>` : ''}</div>`;
}
function feedbackEl(el, ok){ if (ok){ el.classList.add('pop'); burstFrom(el); } else el.classList.add('shake'); }
function learnSummary(c, tabs, inLesson){
  const n = cert.bank.filter(q => q.c === c.n).length;
  const los = Object.entries(cert.los).filter(([k]) => k.startsWith('FL-' + c.n + '.'));
  const secs = LESSONS[c.n];
  const body = `<article class="card stack ${inLesson ? 'qin' : ''}">
    <div class="row"><span class="pill">${c.time} phút học</span><span class="pill pink">${c.exam}/40 câu trong đề</span>${learned[c.n] ? '<span class="pill good">Đã học xong</span>' : ''}</div>
    <div><h2 class="h1" style="font-size:28px">${secs ? 'Tóm tắt chương ' + c.n : 'Chương ' + c.n + '. ' + esc(c.title)}</h2><p class="muted" lang="en">${esc(EN.chapters[c.n] || '')}</p></div>
    ${secs ? '' : '<div class="callout"><b>Bài học chi tiết đang được soạn</b>Chương này hiện có bản tóm tắt. Bài chi tiết theo từng mục, kèm ví dụ và kiểm tra nhanh, sẽ có sớm.</div>'}
    <div class="example"><b>Ví dụ thực tế</b>${esc(c.story)}</div>
    <h3 class="sec">Kiến thức chính</h3>
    <ul class="pts">${c.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
    ${secs ? `<h3 class="sec">Tóm tắt từng mục</h3><div class="sumlist">${secs.map(x => `<details class="sumbox"><summary><span class="sum-h">${x.id} · ${esc(x.title)}</span></summary><ol>${(x.summary || []).map(t => `<li>${md(t)}</li>`).join('')}</ol></details>`).join('')}</div>` : ''}
    <div class="callout bad"><b>Bẫy hay gặp trong đề</b><ul class="pts">${c.traps.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
    <div class="callout good"><b>Mẹo nhớ</b>${esc(c.mnemonic)}</div>
    <details><summary>Mục tiêu học tập của chương (${los.length}) · song ngữ</summary>
      <div class="tablewrap" style="margin-top:8px"><table><tbody>${los.map(([k, v]) => `<tr><td class="mono" style="white-space:nowrap">${k}</td><td><span class="pill mute">${v[0]}</span></td><td><span lang="en">${esc(EN.los[k] || '')}</span><br><span class="muted small">${esc(v[1])}</span></td></tr>`).join('')}</tbody></table></div>
    </details>
    <div class="row">
      ${secs ? '' : `<button class="btn ${learned[c.n] ? 'ghost' : ''}" id="mark">${learned[c.n] ? 'Bỏ đánh dấu đã học' : 'Đánh dấu đã học xong'}</button>`}
      <button class="btn ${secs ? '' : 'ghost'}" id="toPractice">Luyện ${n} câu chương ${c.n}</button>
      ${secs ? `<button class="btn ghost" id="toRev">Ôn nhanh chương ${c.n}</button>` : ''}
      <button class="btn ghost" id="toCards">Ôn thuật ngữ chương ${c.n}</button>
    </div>
  </article>`;
  if (secs){
    app.innerHTML = tabs + `<div class="lesson"><nav class="card toc" aria-label="Mục lục chương ${c.n}">
      ${tocItems(secs, 'sum')}</nav>${body}</div>`;
    link('[data-s]', e => { const id = e.currentTarget.dataset.s; if (id !== 'sum'){ learnSec[c.n] = id; store.set('learnSec', learnSec); chk.anim = true; learn(); } });
  } else app.innerHTML = tabs + body;
  link('[data-c]', e => { learnCh = +e.currentTarget.dataset.c; learn(); });
  const mk = $('#mark'); if (mk) mk.onclick = () => { if (learned[c.n]) delete learned[c.n]; else learned[c.n] = Date.now(); save.learned(); learn(); };
  $('#toPractice').onclick = () => { pcfg = {ch: c.n, mode: 'all'}; pmode = 'q'; pr = null; go('practice'); };
  $('#toCards').onclick = () => { cardCh = c.n; cardIdx = 0; pmode = 'cards'; go('practice'); };
  const trv = $('#toRev'); if (trv) trv.onclick = () => { revCh = c.n; revFocus = null; go('review'); };
  keys = {ArrowRight: () => { if (learnCh < 6){ learnCh++; learn(); } }, ArrowLeft: () => { if (learnCh > 1){ learnCh--; learn(); } }};
}

function learnHead(mode){
  const n = Object.keys(LESSONS).filter(c => +c).reduce((t, c) => t + LESSONS[c].length, 0);
  return `<div class="row between"><div><span class="eyebrow">Bước 1 · Học</span><h1 class="h2" style="font-size:24px;margin-top:4px">${mode === 'review' ? 'Ôn nhanh' : 'CTFL v4.0.1 theo chương'}</h1></div>
    <div class="row" style="gap:12px"><span class="muted small">${mode === 'review' ? `${n} mục · tóm tắt cuối mỗi bài` : `Đã học ${Object.keys(learned).length}/6 chương`}</span>
    <div class="seg" role="group" aria-label="Chế độ học"><button data-lm="learn" aria-pressed="${mode === 'learn'}">Bài học</button><button data-lm="review" aria-pressed="${mode === 'review'}">Ôn nhanh</button></div></div></div>`;
}
document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-lm]'); if (b && b.getAttribute('aria-pressed') !== 'true') go(b.dataset.lm); });

/* ============ 1b. ÔN NHANH ============ */
let revCh = 0, revMode = store.get('revMode', 'list'), revFocus = null, revIdx = 0, revShow = false, revOrder = null, revDue = false;
let reviewed = store.get('reviewed_ctfl', {});
const DAY = 864e5;
function allSecs(){ const out = []; Object.keys(LESSONS).filter(c => +c).sort((a, b) => a - b).forEach(c => LESSONS[c].forEach(s => out.push(Object.assign({c: +c}, s)))); return out; }
function revState(id){
  const t = reviewed[id]; if (!t) return ['Chưa ôn', 'mute', true];
  const d = Math.floor((Date.now() - t) / DAY);
  return d >= 3 ? [`Nên ôn lại · ${d} ngày trước`, 'pink', true] : [d ? `Đã ôn · ${d} ngày trước` : 'Đã ôn hôm nay', 'good', false];
}
function markRev(id, on){ if (on) reviewed[id] = Date.now(); else delete reviewed[id]; store.set('reviewed_ctfl', reviewed); }
function review(){
  const all = allSecs(), inCh = all.filter(s => !revCh || s.c === revCh);
  let list = revDue ? inCh.filter(s => revState(s.id)[2]) : inCh;
  const done = inCh.filter(s => reviewed[s.id]).length;
  const bar = `<div class="card stack revbar no-print" style="gap:12px">
    <div class="row between"><div class="tabs" role="group" aria-label="Chọn chương" style="margin:0"><button data-rc="0" aria-pressed="${!revCh}">Tất cả</button>${cert.chapters.map(x => `<button data-rc="${x.n}" aria-pressed="${revCh === x.n}">Chương ${x.n}</button>`).join('')}</div>
      <div class="seg" role="group" aria-label="Kiểu ôn"><button data-rm="list" aria-pressed="${revMode === 'list'}">Danh sách</button><button data-rm="cards" aria-pressed="${revMode === 'cards'}">Thẻ tự kiểm tra</button></div></div>
    <div class="row between"><div class="row" style="gap:10px;flex:1;min-width:220px"><span class="small">Đã ôn <b>${done}/${inCh.length}</b> mục</span><div class="bar" style="flex:1;max-width:260px"><i style="width:${pct(done, inCh.length)}%"></i></div></div>
      <div class="row" style="gap:8px"><label class="small row" style="gap:6px"><input type="checkbox" id="rvDue" ${revDue ? 'checked' : ''}> Chỉ mục cần ôn</label>${revMode === 'list' ? '<button class="btn ghost sm" id="rvPrint">In / lưu PDF</button>' : ''}</div></div></div>`;
  if (!list.length){ app.innerHTML = learnHead('review') + bar + `<div class="card stack" style="align-items:flex-start"><h2 class="h2">Không còn mục nào cần ôn</h2><p class="muted">Mọi mục trong phạm vi này đã được ôn trong 3 ngày gần đây. Bỏ lọc để xem lại toàn bộ.</p></div>`; bindRev(); return; }
  if (revMode === 'cards'){
    if (revOrder) list = revOrder.map(id => list.find(s => s.id === id)).filter(Boolean).concat(list.filter(s => !revOrder.includes(s.id)));
    if (revIdx >= list.length) revIdx = 0;
    const s = list[revIdx], st = revState(s.id);
    app.innerHTML = learnHead('review') + bar + `<article class="card revcard stack ${chk.anim ? 'qin' : ''}">
      <div class="row between"><span class="meta">Thẻ ${revIdx + 1}/${list.length} · Chương ${s.c} · Mục ${s.id}</span><span class="pill ${st[1]}">${st[0]}</span></div>
      <h2 class="h1" style="font-size:26px">${esc(s.title)}</h2><span class="muted" lang="en">${esc(s.en)}</span>
      ${revShow ? `<ol class="revol">${s.summary.map(x => `<li>${md(x)}</li>`).join('')}</ol>
        <div class="row"><button class="btn" id="rvGot">Đã nhớ <kbd>Enter</kbd></button><button class="btn ghost" id="rvLearn">Học lại mục này</button></div>`
      : `<div class="recall"><p>Nhớ lại <b>${s.summary.length} ý chính</b> của mục này. Nói thành lời hoặc viết ra giấy, rồi lật thẻ để so.</p><button class="btn" id="rvFlip">Lật thẻ <kbd>Space</kbd></button></div>`}
      <div class="row between" style="border-top:1px solid var(--line);padding-top:14px"><button class="btn ghost" id="rvPrev" ${revIdx ? '' : 'disabled'}>← Thẻ trước</button><button class="btn ghost" id="rvShuf">Xáo trộn <kbd>S</kbd></button><button class="btn ghost" id="rvNext">Thẻ sau →</button></div></article>`;
    chk.anim = false;
    const nav = d => { revIdx = (revIdx + d + list.length) % list.length; revShow = false; chk.anim = true; review(); };
    const flip = () => { revShow = !revShow; review(); };
    const got = () => { markRev(s.id, true); burstFrom($('#rvGot')); setTimeout(() => nav(1), 280); };
    $('#rvPrev').onclick = () => nav(-1); $('#rvNext').onclick = () => nav(1);
    $('#rvShuf').onclick = () => { const r = rng(Date.now() >>> 0); revOrder = perm(list.length, r).map(i => list[i].id); revIdx = 0; revShow = false; chk.anim = true; review(); toast('Đã xáo trộn thẻ'); };
    if (revShow){ $('#rvGot').onclick = got; $('#rvLearn').onclick = () => openSec(s); } else $('#rvFlip').onclick = flip;
    keys = {Space: flip, ArrowRight: () => nav(1), ArrowLeft: () => { if (revIdx) nav(-1); }, S: () => $('#rvShuf').click(), Enter: () => { if (revShow) got(); else flip(); }};
  } else {
    app.innerHTML = learnHead('review') + bar + `<div class="print-only"><h1>The QA Lab · Ôn nhanh CTFL v4.0.1${revCh ? ' · Chương ' + revCh : ''}</h1></div>
    <div class="revgrid">${list.map(s => { const st = revState(s.id); return `<article class="card rev ${revFocus === s.id ? 'focus' : ''}" id="rv-${s.id.replace(/\./g, '-')}">
      <div class="row between"><span class="meta">Chương ${s.c} · Mục ${s.id}</span><span class="pill ${st[1]} no-print">${st[0]}</span></div>
      <h3>${esc(s.title)}</h3>
      <ol class="revol">${s.summary.map(x => `<li>${md(x)}</li>`).join('')}</ol>
      <div class="row no-print" style="margin-top:auto"><button class="btn ghost sm ${reviewed[s.id] ? 'ok-b' : ''}" data-rd="${s.id}">${reviewed[s.id] ? 'Đã ôn ✓' : 'Đánh dấu đã ôn'}</button><button class="btn link sm" data-rg="${s.id}">Học lại →</button><button class="btn link sm" data-cr="${s.id}">Carousel</button></div></article>`; }).join('')}</div>`;
    link('[data-rd]', e => { const id = e.currentTarget.dataset.rd, on = !reviewed[id]; markRev(id, on); if (on) burstFrom(e.currentTarget); revFocus = null; setTimeout(review, on ? 250 : 0); });
    link('[data-rg]', e => openSec(all.find(s => s.id === e.currentTarget.dataset.rg)));
    link('[data-cr]', e => carousel(all.find(s => s.id === e.currentTarget.dataset.cr)));
    const pr = $('#rvPrint'); if (pr) pr.onclick = () => { try { window.print(); } catch(err){ toast('Trình duyệt chặn in ở đây'); } };
    if (revFocus){ const el = document.getElementById('rv-' + revFocus.replace(/\./g, '-')); if (el) setTimeout(() => el.scrollIntoView({block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth'}), 60); }
  }
  bindRev();
}
function bindRev(){
  link('[data-rc]', e => { revCh = +e.currentTarget.dataset.rc; revIdx = 0; revOrder = null; revShow = false; revFocus = null; review(); });
  link('[data-rm]', e => { revMode = e.currentTarget.dataset.rm; store.set('revMode', revMode); revIdx = 0; revShow = false; review(); });
  const d = $('#rvDue'); if (d) d.onchange = () => { revDue = d.checked; revIdx = 0; review(); };
}
function openSec(s){ learnCh = s.c; learnSec[s.c] = s.id; store.set('learnSec', learnSec); go('learn'); }

/* ============ 2. LUYỆN TẬP ============ */
let pmode = 'q', pcfg = {ch: 1, mode: 'all'}, pr = null;
let cardCh = 0, cardIdx = 0, cardFlip = false, cardOnlyNew = false;
function practice(){
  app.innerHTML = `
  <div class="row between"><div><span class="eyebrow">Bước 2 · Luyện tập</span><h1 class="h2" style="font-size:26px;margin-top:4px">Luyện có chấm ngay</h1></div>
  <div class="seg" role="group" aria-label="Kiểu luyện tập"><button aria-pressed="${pmode === 'q'}" data-m="q">Câu hỏi</button><button aria-pressed="${pmode === 'cards'}" data-m="cards">Flashcard</button></div></div>
  <div id="pbody" class="stack"></div>`;
  link('[data-m]', e => { pmode = e.currentTarget.dataset.m; practice(); });
  pmode === 'q' ? questions() : cards();
}
function startPractice(){
  let qs = cert.bank.filter(q => !pcfg.ch || q.c === pcfg.ch);
  if (pcfg.mode === 'new') qs = qs.filter(q => !hist[q.id]);
  if (pcfg.mode === 'wrong') qs = qs.filter(q => hist[q.id] && !hist[q.id].last);
  if (pcfg.mode === 'ids') qs = pcfg.ids.map(id => byId[id]).filter(Boolean);
  qs = shuffle(qs);
  pr = {ids: qs.map(q => q.id), orders: qs.map(q => perm(q.o.length)), i: 0, picked: null, right: 0, cfg: JSON.stringify(pcfg)};
}
function questions(){
  if (!pr || pr.cfg !== JSON.stringify(pcfg)) startPractice();
  keys = {F: () => { pmode = 'cards'; practice(); }, L: () => { lang = nextLang(lang); save.lang(); questions(); }};
  const box = $('#pbody');
  const head = `<div class="toolbar">
    <div class="row">
      <label class="hidden" for="pc">Chương</label>
      <select id="pc"><option value="0">Tất cả chương</option>${cert.chapters.map(c => `<option value="${c.n}" ${c.n === pcfg.ch ? 'selected' : ''}>Chương ${c.n}. ${esc(c.title)}</option>`).join('')}</select>
      <label class="hidden" for="pm">Nhóm câu</label>
      <select id="pm"><option value="all">Tất cả câu</option><option value="new" ${pcfg.mode === 'new' ? 'selected' : ''}>Chưa làm</option><option value="wrong" ${pcfg.mode === 'wrong' ? 'selected' : ''}>Sai lần trước</option>${pcfg.mode === 'ids' ? '<option value="ids" selected>Câu sai từ bài thi</option>' : ''}</select>
    </div>
    ${langSeg(lang, 'pLang')}</div>
    <div class="progress"><span>${pr.ids.length ? Math.min(pr.i + 1, pr.ids.length) : 0}/${pr.ids.length}</span>${bar(pct(Math.min(pr.i, pr.ids.length), pr.ids.length))}<span>Đúng ${pr.right}</span></div>`;
  const bind = () => {
    $('#pc').onchange = e => { pcfg = {ch: +e.target.value, mode: pcfg.mode === 'ids' ? 'all' : pcfg.mode}; questions(); };
    $('#pm').onchange = e => { pcfg = {ch: pcfg.ch, mode: e.target.value}; questions(); };
    bindLang('pLang', l => { lang = l; save.lang(); questions(); });
  };
  if (!pr.ids.length){ box.innerHTML = head + `<div class="card">Không còn câu nào trong nhóm này. Chọn chương hoặc nhóm câu khác.</div>`; bind(); return; }
  if (pr.i >= pr.ids.length){
    const p = pct(pr.right, pr.ids.length);
    box.innerHTML = head + `<div class="card stack"><h2 class="h2">Xong lượt luyện: ${pr.right}/${pr.ids.length} câu đúng (${p}%)</h2>
      <p class="muted">${p >= 65 ? 'Đạt ngưỡng 65% của đề thật. Sang chương khác, hoặc vào phòng thi khi các chương đều ≥ 65%.' : 'Chưa tới 65%. Đọc lại chương ở bước Học rồi luyện các câu sai.'}</p>
      <div class="row"><button class="btn" id="again">Làm lại</button><button class="btn ghost" id="wr">Luyện câu sai</button><a class="btn ghost" href="#exam">Vào phòng thi</a></div></div>`;
    bind(); $('#again').onclick = () => { pr = null; questions(); }; $('#wr').onclick = () => { pcfg = {ch: pcfg.mode === 'ids' ? 0 : pcfg.ch, mode: 'wrong'}; pr = null; questions(); };
    keys.Enter = () => $('#again').click(); return;
  }
  const q = byId[pr.ids[pr.i]], order = pr.orders[pr.i], ci = correctIdx(q, order), ans = pr.picked !== null;
  box.innerHTML = head + `<article class="card stack ${pr.anim ? 'qin' : ''}">
    <span class="meta">Chương ${q.c} · ${q.lo} · ${q.k}</span>
    ${stemHtml(q, lang)}
    <div class="opts">${order.map((oi, j) => `<button class="opt ${ans ? (j === ci ? 'ok' : j === pr.picked ? 'no' : '') : ''}" data-j="${j}" ${ans ? 'disabled' : ''}><span class="k">${L[j]}</span>${optText(q, oi, lang)}</button>`).join('')}</div>
    ${ans ? `<div class="exp"><b style="color:var(--${pr.picked === ci ? 'good' : 'bad'})">${pr.picked === ci ? 'Chính xác.' : 'Chưa đúng. Đáp án: ' + L[ci] + '.'}</b> ${esc(q.e)}</div><div class="row"><button class="btn" id="nx">${pr.i + 1 < pr.ids.length ? 'Câu tiếp theo' : 'Xem kết quả'}</button></div>` : ''}
  </article>
  <p class="keynote">Phím <kbd>1</kbd>–<kbd>4</kbd> chọn · <kbd>Enter</kbd> tiếp · <kbd>L</kbd> ngôn ngữ · <kbd>?</kbd> tất cả phím tắt</p>`;
  bind();
  pr.anim = false;
  const pick = j => { pr.picked = j; const ok = j === ci; if (ok) pr.right++; record(q.id, ok); questions(); feedback(j, ci, '#pbody .opt'); };
  const next = () => { pr.i++; pr.picked = null; pr.anim = true; questions(); };
  if (!ans){ box.querySelectorAll('.opt').forEach(b => b.onclick = () => pick(+b.dataset.j)); keys.choose = pick; }
  else { $('#nx').onclick = next; keys.Enter = next; keys.ArrowRight = next; keys.N = next; }
}
function cardList(){ let l = cert.glossary.map((g, i) => ({g, i})).filter(x => !cardCh || x.g[3] === cardCh); if (cardOnlyNew) l = l.filter(x => !known[x.i]); return l; }
function cards(){
  keys = {Q: () => { pmode = 'q'; practice(); }};
  const box = $('#pbody'); const l = cardList(); if (cardIdx >= l.length) cardIdx = 0; const cur = l[cardIdx];
  box.innerHTML = `<div class="toolbar"><div class="row">
      <label class="hidden" for="fc">Chương</label><select id="fc"><option value="0">Tất cả chương</option>${cert.chapters.map(c => `<option value="${c.n}" ${c.n === cardCh ? 'selected' : ''}>${c.n}. ${esc(c.title)}</option>`).join('')}</select>
      <label class="check small"><input type="checkbox" id="fn" ${cardOnlyNew ? 'checked' : ''}> Chỉ thẻ chưa thuộc</label></div>
    <span class="small muted">${l.length ? cardIdx + 1 : 0}/${l.length} · đã thuộc ${Object.keys(known).length}/${cert.glossary.length}</span></div>
  ${cur ? `<button class="flash-wrap ${cardFlip ? 'flipped' : ''}" id="fl" aria-label="Lật thẻ" aria-pressed="${cardFlip}"><div class="flash-inner">
      <div class="face card flash"><span class="en" lang="en">${esc(cur.g[0])}</span><span class="small muted">Nhấn để xem nghĩa</span>${known[cur.i] ? '<span class="pill good">Đã thuộc</span>' : ''}</div>
      <div class="face back card flash"><span class="small muted" lang="en">${esc(cur.g[0])}</span><span class="vi">${esc(cur.g[1])}</span><span class="def">${esc(cur.g[2])}</span><span class="pill">Chương ${cur.g[3]}</span></div>
    </div></button>
    <div class="row between"><button class="btn ghost" id="fp">← Trước</button><div class="row"><button class="btn ghost" id="fr">Chưa thuộc</button><button class="btn" id="fk">Đã thuộc</button></div><button class="btn ghost" id="fx">Sau →</button></div>`
  : `<div class="card">Bạn đã thuộc hết thẻ trong nhóm này. Bỏ chọn “Chỉ thẻ chưa thuộc” để ôn lại.</div>`}
  <p class="keynote"><kbd>Space</kbd> lật · <kbd>←</kbd> <kbd>→</kbd> chuyển · <kbd>K</kbd> đã thuộc · <kbd>J</kbd> chưa thuộc</p>`;
  $('#fc').onchange = e => { cardCh = +e.target.value; cardIdx = 0; cardFlip = false; cards(); };
  $('#fn').onchange = e => { cardOnlyNew = e.target.checked; cardIdx = 0; cardFlip = false; cards(); };
  if (!cur) return;
  const step = d => { cardIdx = (cardIdx + d + l.length) % l.length; cardFlip = false; cards(); };
  const flip = () => { cardFlip = !cardFlip; const f = $('#fl'); f.classList.toggle('flipped', cardFlip); f.setAttribute('aria-pressed', cardFlip); };
  const ok = () => { known[cur.i] = true; save.known(); cardOnlyNew ? (cardFlip = false, cards()) : step(1); };
  const no = () => { delete known[cur.i]; save.known(); step(1); };
  $('#fl').onclick = flip; $('#fp').onclick = () => step(-1); $('#fx').onclick = () => step(1); $('#fk').onclick = ok; $('#fr').onclick = no;
  Object.assign(keys, {Space: flip, Enter: flip, ArrowLeft: () => step(-1), ArrowRight: () => step(1), K: ok, J: no});
}

/* ============ 3. PHÒNG THI ============ */
function exam(){
  if (active && !active.submittedAt){ if (Date.now() >= active.endsAt) return submit(true); return room(); }
  if (reviewId) return result();
  lobby();
}
function weekBest(label){ const s = attempts.filter(a => a.week === label); return s.length ? Math.max(...s.map(a => a.score)) : null; }
function lobby(){
  const name = store.get('candidate', ''), extra = store.get('extra', false), elang = store.get('examLang', 'vi'), kind = store.get('examKind', 'week');
  const wk = isoWeek(), wb = weekBest(wk.label);
  const mine = attempts.filter(a => a.cert === 'ctfl').slice().reverse();
  app.innerHTML = `
  <div><span class="eyebrow">Bước 3 · Phòng thi</span><h1 class="h1" style="font-size:32px;margin-top:6px">Phòng thi thử CTFL v4.0.1</h1></div>
  <div class="grid2">
    <form class="card stack" id="checkin">
      <h2 class="h2">Làm thủ tục vào phòng</h2>
      <label for="cand" class="small muted">Họ tên thí sinh (in trên bảng kết quả và ảnh chia sẻ)</label>
      <input type="text" id="cand" maxlength="40" value="${esc(name)}" placeholder="Ví dụ: Nguyễn Văn A" autocomplete="name">
      <fieldset class="stack" style="border:0;padding:0;margin:0"><legend class="small muted" style="margin-bottom:8px">Chọn đề</legend>
        <label class="choice"><input type="radio" name="kind" value="week" ${kind === 'week' ? 'checked' : ''}><span><b>${esc(wk.label)}</b><br><span class="small muted">Cả cộng đồng cùng một đề trong tuần, đổi vào thứ Hai. So điểm và chia sẻ được.${wb !== null ? ' Điểm cao nhất của bạn: ' + wb + '/40.' : ''}</span></span></label>
        <label class="choice"><input type="radio" name="kind" value="random" ${kind === 'random' ? 'checked' : ''}><span><b>Đề ngẫu nhiên</b><br><span class="small muted">Rút mới từ ngân hàng ${cert.bank.length} câu mỗi lần thi.</span></span></label>
      </fieldset>
      <div class="row"><span class="small muted">Ngôn ngữ đề</span>${langSeg(elang, 'eLang')}</div>
      <label class="check"><input type="checkbox" id="extra" ${extra ? 'checked' : ''}><span>Thi bằng ngôn ngữ không phải tiếng mẹ đẻ: cộng 25% thời gian (75 phút)</span></label>
      <label class="check"><input type="checkbox" id="agree" required><span>Tôi đã đọc quy định phòng thi</span></label>
      <button class="btn" type="submit" id="go">Vào phòng thi</button>
    </form>
    <section class="card stack">
      <h2 class="h2">Quy định</h2>
      <ul class="pts small">
        <li>40 câu trắc nghiệm, mỗi câu 1 điểm, chỉ một đáp án đúng. Không trừ điểm câu sai.</li>
        <li>Phân bổ theo chương như đề thật: ${cert.chapters.map(c => 'C' + c.n + ': ' + c.exam).join(' · ')}.</li>
        <li>Đạt khi đúng từ 26/40 câu (65%).</li>
        <li>Không có đáp án trong khi thi. Có thể đánh dấu câu để xem lại, chuyển câu tự do và đổi ngôn ngữ đề.</li>
        <li>Đồng hồ chạy liên tục, kể cả khi tải lại trang. Hết giờ, bài được nộp tự động.</li>
        <li>Sau khi nộp: điểm theo chương, mục tiêu học tập cần ôn, đáp án chi tiết từng câu và ảnh kết quả để chia sẻ.</li>
      </ul>
      <p class="muted small">Câu hỏi tự soạn theo syllabus, không phải đề ISTQB chính thức.</p>
    </section>
  </div>
  <section class="card stack">
    <h2 class="h2">Lịch sử thi</h2>
    ${mine.length ? `<div class="tablewrap"><table><thead><tr><th>Ngày</th><th>Đề</th><th>Thí sinh</th><th>Điểm</th><th>Kết quả</th><th>Thời gian</th><th></th></tr></thead><tbody>
      ${mine.map(a => `<tr><td class="num">${dateStr(a.submittedAt)}</td><td class="small">${esc(a.week || 'Ngẫu nhiên')}</td><td>${esc(a.name || '–')}</td><td class="num"><b>${a.score}</b>/40</td><td><span class="pill ${a.score >= 26 ? 'good' : 'bad'}">${a.score >= 26 ? 'Đạt' : 'Chưa đạt'}</span></td><td class="num">${mins(a.submittedAt - a.startedAt)}</td><td><button class="btn ghost sm" data-r="${a.id}">Xem lại</button></td></tr>`).join('')}
    </tbody></table></div>` : '<p class="muted">Chưa có lần thi nào.</p>'}
  </section>`;
  let chosenLang = elang;
  bindLang('eLang', l => { chosenLang = l; document.querySelectorAll('#eLang [data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l)); });
  $('#checkin').onsubmit = e => {
    e.preventDefault();
    const nm = $('#cand').value.trim(), ex = $('#extra').checked, kd = (document.querySelector('input[name=kind]:checked') || {}).value || 'week';
    store.set('candidate', nm); store.set('extra', ex); store.set('examLang', chosenLang); store.set('examKind', kd);
    const minutes = cert.exam.minutes + (ex ? cert.exam.extra : 0);
    const m = modal(`<h2 class="h2">Sẵn sàng?</h2><p>${kd === 'week' ? esc(wk.label) : 'Đề ngẫu nhiên'} · <b>${minutes} phút</b> cho 40 câu. Đồng hồ bắt đầu ngay khi bấm “Bắt đầu thi”.</p><div class="row"><button class="btn" id="mStart">Bắt đầu thi</button><button class="btn ghost" id="mBack">Chưa, quay lại</button></div>`);
    m.querySelector('#mBack').onclick = closeModal;
    m.querySelector('#mStart').onclick = () => { closeModal(); startExam(nm, minutes, kd, chosenLang); };
  };
  link('[data-r]', e => { reviewId = e.currentTarget.dataset.r; reviewFilter = 'all'; result(); window.scrollTo(0, 0); });
}
function startExam(name, minutes, kind, elang){
  const wk = isoWeek(), r = kind === 'week' ? rng(hash('ctfl-week-' + wk.y + '-' + wk.w)) : Math.random;
  const ids = [];
  cert.chapters.forEach(c => ids.push(...shuffle(cert.bank.filter(q => q.c === c.n), r).slice(0, cert.exam.dist[c.n]).map(q => q.id)));
  const now = Date.now();
  active = {id: 'a' + now, cert: 'ctfl', name, kind, week: kind === 'week' ? wk.label : null, lang: elang, startedAt: now, endsAt: now + minutes * 60000, minutes,
    qids: ids, orders: ids.map(id => perm(byId[id].o.length, r)), ans: ids.map(() => null), flags: ids.map(() => false), i: 0, submittedAt: null};
  save.active(); room();
}
let roomLast = -1;
function room(){
  document.body.classList.add('in-room');
  const a = active, q = byId[a.qids[a.i]], order = a.orders[a.i];
  const answered = a.ans.filter(x => x !== null).length, flagged = a.flags.filter(Boolean).length;
  app.innerHTML = `
  <div class="card roombar">
    <div><span class="eyebrow">Phòng thi · CTFL v4.0.1</span><div class="small">${esc(a.name || 'Thí sinh')} · ${esc(a.week || 'Đề ngẫu nhiên')} · ${a.minutes} phút</div></div>
    <div style="text-align:center"><span class="small muted">Thời gian còn lại</span><div class="timer" id="tm">${clock(a.endsAt - Date.now())}</div></div>
    <button class="btn pink" id="sub">Nộp bài</button>
  </div>
  <div id="warn"></div>
  <div class="room">
    <article class="card stack ${roomLast !== a.i ? 'qin' : ''}">
      <div class="row between"><span class="mono muted">CÂU ${a.i + 1} / ${a.qids.length}</span>
        <div class="row">${langSeg(a.lang, 'rLang')}<button class="btn ghost sm flagbtn" id="flag" aria-pressed="${a.flags[a.i]}">${a.flags[a.i] ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}</button></div></div>
      ${stemHtml(q, a.lang)}
      <div class="opts" role="radiogroup" aria-label="Các phương án">${order.map((oi, j) => `<button class="opt ${a.ans[a.i] === j ? 'sel' : ''}" role="radio" aria-checked="${a.ans[a.i] === j}" data-j="${j}"><span class="k">${L[j]}</span>${optText(q, oi, a.lang)}</button>`).join('')}</div>
      <div class="row between"><button class="btn ghost" id="prev" ${a.i === 0 ? 'disabled' : ''}>← Câu trước</button><button class="btn ghost" id="next" ${a.i === a.qids.length - 1 ? 'disabled' : ''}>Câu sau →</button></div>
    </article>
    <aside class="card stack">
      <div class="row between small"><span>Đã trả lời <b>${answered}</b>/${a.qids.length}</span><span>Đánh dấu <b>${flagged}</b></span></div>
      <div class="qgrid">${a.qids.map((_, k) => `<button data-k="${k}" class="${a.ans[k] !== null ? 'ans' : ''} ${a.flags[k] ? 'flag' : ''} ${k === a.i ? 'cur' : ''}" aria-label="Câu ${k + 1}${a.ans[k] !== null ? ', đã trả lời' : ''}${a.flags[k] ? ', đã đánh dấu' : ''}">${k + 1}</button>`).join('')}</div>
      <div class="legend"><span class="l-ans">Đã trả lời</span><span>Chưa trả lời</span><span class="l-flag">Đánh dấu</span></div>
    </aside>
  </div>`;
  roomLast = a.i;
  const re = () => { save.active(); room(); };
  const choose = j => { a.ans[a.i] = j; re(); };
  const move = d => { const n = a.i + d; if (n >= 0 && n < a.qids.length){ a.i = n; re(); } };
  app.querySelectorAll('.opt').forEach(b => b.onclick = () => choose(+b.dataset.j));
  link('.qgrid button', e => { a.i = +e.currentTarget.dataset.k; re(); });
  $('#prev').onclick = () => move(-1); $('#next').onclick = () => move(1);
  $('#flag').onclick = () => { a.flags[a.i] = !a.flags[a.i]; re(); };
  $('#sub').onclick = confirmSubmit;
  bindLang('rLang', l => { a.lang = l; re(); });
  keys = {choose, ArrowLeft: () => move(-1), ArrowRight: () => move(1), F: () => $('#flag').click(), S: confirmSubmit, L: () => { a.lang = nextLang(a.lang); re(); }};
  updateTimer();
  if (!tick) tick = setInterval(updateTimer, 1000);
}
function updateTimer(){
  if (!active || active.submittedAt){ clearInterval(tick); tick = null; return; }
  const left = active.endsAt - Date.now(), t = $('#tm');
  if (left <= 0){ clearInterval(tick); tick = null; return submit(true); }
  if (t){ t.textContent = clock(left); t.className = 'timer' + (left < 60000 ? ' crit' : left < 300000 ? ' low' : ''); }
  const w = $('#warn'); if (w) w.innerHTML = left < 300000 ? `<div class="banner">Còn dưới 5 phút. Kiểm tra lại các câu chưa trả lời và câu đã đánh dấu.</div>` : '';
}
function confirmSubmit(){
  const blank = active.ans.filter(x => x === null).length, fl = active.flags.filter(Boolean).length;
  const m = modal(`<h2 class="h2">Nộp bài?</h2>
    <p>${blank ? `Còn <b>${blank} câu chưa trả lời</b>. ` : 'Bạn đã trả lời đủ 40 câu. '}${fl ? `Có ${fl} câu đang đánh dấu xem lại.` : ''}</p>
    <p class="muted small">Sau khi nộp sẽ không sửa được đáp án.</p>
    <div class="row"><button class="btn ghost" id="mNo">Làm tiếp</button><button class="btn pink" id="mYes">Nộp bài</button></div>`);
  m.querySelector('#mNo').onclick = closeModal;
  m.querySelector('#mYes').onclick = () => { closeModal(); submit(false); };
}
function submit(auto){
  if (tick){ clearInterval(tick); tick = null; }
  const a = active; if (!a || a.submittedAt) return;
  a.submittedAt = Math.min(Date.now(), a.endsAt); a.auto = auto;
  let score = 0; const byCh = {};
  a.qids.forEach((id, k) => { const q = byId[id], ok = a.ans[k] === correctIdx(q, a.orders[k]); if (ok) score++; record(id, ok); const b = byCh[q.c] = byCh[q.c] || [0, 0]; b[1]++; if (ok) b[0]++; });
  a.score = score; a.byCh = byCh; delete a.i;
  attempts.push(a); if (attempts.length > 50) attempts = attempts.slice(-50); save.attempts();
  active = null; save.active();
  document.body.classList.remove('in-room'); keys = {};
  reviewId = a.id; reviewFilter = 'all';
  result(); window.scrollTo(0, 0); enter();
  if (a.score >= cert.exam.pass) setTimeout(() => confetti(innerWidth / 2, innerHeight / 3, 140), 400);
}
function ring(p, pass){
  const r = 56, c = 2 * Math.PI * r, col = pass ? 'var(--good)' : 'var(--bad)';
  return `<svg class="ring" viewBox="0 0 132 132" role="img" aria-label="${p}%"><circle cx="66" cy="66" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="12"/>${p ? `<circle cx="66" cy="66" r="${r}" fill="none" stroke="${col}" stroke-width="12" stroke-linecap="round" class="arc" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p / 100)}" style="--c:${c}" transform="rotate(-90 66 66)"/>` : ''}<text x="66" y="62" text-anchor="middle" fill="var(--ink)" font-size="28" font-weight="700" font-family="Nunito Sans, sans-serif">${p}%</text><text x="66" y="84" text-anchor="middle" fill="var(--muted)" font-size="12" font-family="Nunito Sans, sans-serif">≥ 65% để đạt</text></svg>`;
}
function result(){
  const a = attempts.find(x => x.id === reviewId);
  if (!a){ reviewId = null; return lobby(); }
  const rl = lang;
  const pass = a.score >= cert.exam.pass, p = pct(a.score, a.qids.length);
  const rows = a.qids.map((id, k) => { const q = byId[id]; if (!q) return null; const ci = correctIdx(q, a.orders[k]); return {k, q, ci, my: a.ans[k], ok: a.ans[k] === ci, blank: a.ans[k] === null, flag: a.flags[k]}; }).filter(Boolean);
  const wrong = rows.filter(r => !r.ok);
  const loMiss = {}; wrong.forEach(r => { (loMiss[r.q.lo] = loMiss[r.q.lo] || {c: r.q.c, n: 0}).n++; });
  const loList = Object.entries(loMiss).sort((x, y) => x[1].c - y[1].c || x[0].localeCompare(y[0]));
  const weak = cert.chapters.filter(c => { const b = a.byCh[c.n] || [0, 0]; return b[1] && pct(b[0], b[1]) < 65; });
  const match = (r, f) => f === 'all' || (f === 'wrong' && !r.ok && !r.blank) || (f === 'blank' && r.blank) || (f === 'flag' && r.flag);
  const shown = rows.filter(r => match(r, reviewFilter));
  app.innerHTML = `
  <div class="row between"><div><span class="eyebrow">Kết quả thi thử</span><h1 class="h1" style="font-size:30px;margin-top:6px">CTFL v4.0.1 · ${esc(a.week || 'Đề ngẫu nhiên')}</h1></div><button class="btn ghost sm" id="back">← Về phòng thi</button></div>
  <section class="card score">
    ${ring(p, pass)}
    <div class="stack" style="flex:1;min-width:240px">
      <div class="row"><span style="font-size:34px;font-weight:700"><span data-count="${a.score}">${a.score}</span>/40</span><span class="pill ${pass ? 'good' : 'bad'}" style="font-size:14px">${pass ? 'ĐẠT' : 'CHƯA ĐẠT'}</span>${a.auto ? '<span class="pill warn">Nộp tự động khi hết giờ</span>' : ''}</div>
      <dl class="kv"><dt>Thí sinh</dt><dd>${esc(a.name || '–')}</dd><dt>Ngày thi</dt><dd>${dateStr(a.submittedAt)}</dd><dt>Thời gian làm</dt><dd>${mins(a.submittedAt - a.startedAt)} / ${a.minutes} phút</dd><dt>Câu sai · bỏ trống</dt><dd>${rows.filter(r => !r.ok && !r.blank).length} · ${rows.filter(r => r.blank).length}</dd></dl>
    </div>
    <div class="stack"><button class="btn" id="shareImg">Tạo ảnh kết quả</button><button class="btn ghost" id="copy">Sao chép kết quả</button><button class="btn ghost" id="newExam">Thi đề khác</button></div>
  </section>
  <div class="grid2">
    <section class="card stack"><h2 class="h2">Điểm theo chương</h2>
      <div class="tablewrap"><table><tbody>${cert.chapters.map(c => { const b = a.byCh[c.n] || [0, 0], q = pct(b[0], b[1]); return `<tr><td>${c.n}. ${esc(c.title)}</td><td class="num">${b[0]}/${b[1]}</td><td style="width:90px"><span class="pill ${tone(q)}">${q}%</span></td></tr>`; }).join('')}</tbody></table></div>
    </section>
    <section class="card stack"><h2 class="h2">Rút kinh nghiệm</h2>
      ${wrong.length ? `<p class="small muted">${weak.length ? 'Chương dưới 65%: ' + weak.map(c => 'chương ' + c.n).join(', ') + '. ' : ''}Các mục tiêu học tập bạn trả lời sai:</p>
      <div class="tablewrap"><table><tbody>${loList.map(([lo, v]) => `<tr><td class="mono" style="white-space:nowrap">${lo}</td><td>${esc((cert.los[lo] || ['', ''])[1])}<br><span class="small muted" lang="en">${esc(EN.los[lo] || '')}</span></td><td class="num">${v.n} câu</td></tr>`).join('')}</tbody></table></div>
      <div class="row"><button class="btn" id="redo">Luyện lại ${wrong.length} câu sai</button>${weak.length ? `<button class="btn ghost" id="study" data-ch="${weak[0].n}">Học lại chương ${weak[0].n}</button>` : ''}</div>`
      : '<p>Không sai câu nào. Thử đề khác để chắc phong độ.</p>'}
    </section>
  </div>
  <section class="stack">
    <div class="row between"><h2 class="h2">Xem lại từng câu</h2><div class="row">${langSeg(rl, 'vLang')}</div></div>
    <div class="tabs" role="group" aria-label="Lọc câu">${[['all', 'Tất cả'], ['wrong', 'Sai'], ['blank', 'Bỏ trống'], ['flag', 'Đã đánh dấu']].map(([f, t]) => `<button aria-pressed="${reviewFilter === f}" data-f="${f}">${t} (${rows.filter(r => match(r, f)).length})</button>`).join('')}</div>
    <div class="qgrid card" style="grid-template-columns:repeat(auto-fill,minmax(34px,1fr))">${rows.map(r => `<button data-go="${r.k}" class="${r.ok ? 'ok' : 'no'} ${r.flag ? 'flag' : ''}" aria-label="Câu ${r.k + 1} ${r.ok ? 'đúng' : 'sai'}">${r.k + 1}</button>`).join('')}</div>
    ${shown.length ? shown.map(r => `<article class="card stack" id="rq${r.k}">
      <div class="qhead"><span class="pill ${r.ok ? 'good' : r.blank ? 'warn' : 'bad'}">Câu ${r.k + 1} · ${r.ok ? 'Đúng' : r.blank ? 'Bỏ trống' : 'Sai'}</span>${r.flag ? '<span class="pill pink">Đã đánh dấu</span>' : ''}<span class="mono muted">Chương ${r.q.c} · ${r.q.lo} · ${r.q.k}</span></div>
      ${stemHtml(r.q, rl)}
      <div class="opts">${a.orders[r.k].map((oi, j) => `<div class="opt ${j === r.ci ? 'ok' : j === r.my ? 'no' : ''}"><span class="k">${L[j]}</span>${optText(r.q, oi, rl)}${j === r.my ? '<span class="pill mute" style="margin-left:auto">Bạn chọn</span>' : ''}</div>`).join('')}</div>
      <div class="exp"><b>Giải thích.</b> ${esc(r.q.e)}</div></article>`).join('') : '<div class="card muted">Không có câu nào trong mục này.</div>'}
  </section>`;
  $('#back').onclick = () => { reviewId = null; lobby(); window.scrollTo(0, 0); };
  $('#newExam').onclick = () => { reviewId = null; lobby(); window.scrollTo(0, 0); };
  $('#copy').onclick = () => copy(`The QA Lab · Thi thử ISTQB CTFL v4.0.1${a.week ? ' · ' + a.week : ''}\n${a.name ? 'Thí sinh: ' + a.name + '\n' : ''}Điểm: ${a.score}/40 (${p}%) · ${pass ? 'ĐẠT' : 'CHƯA ĐẠT'}\n` + cert.chapters.map(c => { const b = a.byCh[c.n] || [0, 0]; return `Chương ${c.n}: ${b[0]}/${b[1]}`; }).join('\n') + `\nThi thử: ${siteUrl()}`);
  $('#shareImg').onclick = () => shareCard(a);
  const rd = $('#redo'); if (rd) rd.onclick = () => { pcfg = {ch: 0, mode: 'ids', ids: wrong.map(r => r.q.id)}; pmode = 'q'; pr = null; go('practice'); };
  const st = $('#study'); if (st) st.onclick = () => { learnCh = +st.dataset.ch; go('learn'); };
  bindLang('vLang', l => { lang = l; save.lang(); result(); });
  link('[data-f]', e => { reviewFilter = e.currentTarget.dataset.f; result(); });
  link('[data-go]', e => { const k = e.currentTarget.dataset.go; if (!$('#rq' + k)){ reviewFilter = 'all'; result(); } const el = $('#rq' + k); if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'}); });
  keys = {L: () => { lang = nextLang(lang); save.lang(); result(); }};
}

/* ---------- ảnh kết quả để chia sẻ ---------- */
async function shareCard(a){
  try { await document.fonts.ready; } catch(e){}
  const W = 1080, H = 1350, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const g = cv.getContext('2d'), F = '"Nunito Sans", system-ui, sans-serif', M = '"JetBrains Mono", ui-monospace, monospace';
  const pass = a.score >= cert.exam.pass, p = pct(a.score, 40);
  g.fillStyle = '#0b1a33'; g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(34,211,238,0.06)'; g.lineWidth = 2;
  for (let x = 0; x <= W; x += 60){ g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
  for (let y = 0; y <= H; y += 60){ g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  g.fillStyle = '#22d3ee'; g.font = `700 30px ${M}`; g.fillText('THE QA LAB', 88, 120);
  g.fillStyle = '#a9bbd6'; g.font = `500 26px ${F}`; g.fillText('Understand the System · Find the Real Issue', 88, 162);
  g.fillStyle = '#f2f6fc'; g.font = `700 64px ${F}`; g.fillText('Thi thử ISTQB CTFL', 88, 290);
  g.fillStyle = '#a9bbd6'; g.font = `500 32px ${F}`; g.fillText('v4.0.1 · ' + (a.week || 'Đề ngẫu nhiên'), 88, 340);
  const cx = 250, cy = 560, r = 150;
  g.lineWidth = 34; g.strokeStyle = '#162d50'; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
  if (p){ g.strokeStyle = pass ? '#4ade9b' : '#ff7a7a'; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p / 100); g.stroke(); }
  g.textAlign = 'center'; g.fillStyle = '#f2f6fc'; g.font = `700 92px ${F}`; g.fillText(a.score + '/40', cx, cy + 20);
  g.fillStyle = '#a9bbd6'; g.font = `500 28px ${F}`; g.fillText(p + '%', cx, cy + 66); g.textAlign = 'left';
  g.fillStyle = pass ? 'rgba(74,222,155,0.16)' : 'rgba(255,122,122,0.16)'; roundRect(g, 480, 470, 300, 76, 38); g.fill();
  g.fillStyle = pass ? '#4ade9b' : '#ff7a7a'; g.font = `700 38px ${F}`; g.fillText(pass ? 'ĐẠT' : 'CHƯA ĐẠT', 512, 522);
  g.fillStyle = '#f2f6fc'; g.font = `700 40px ${F}`; g.fillText(fit(g, a.name || 'Thí sinh The QA Lab', 520), 480, 610);
  g.fillStyle = '#a9bbd6'; g.font = `500 28px ${F}`; g.fillText(new Date(a.submittedAt).toLocaleDateString('vi-VN') + ' · ' + mins(a.submittedAt - a.startedAt), 480, 656);
  let y = 820;
  g.fillStyle = '#22d3ee'; g.font = `700 24px ${M}`; g.fillText('ĐIỂM THEO CHƯƠNG', 88, y - 40);
  cert.chapters.forEach(c => {
    const b = a.byCh[c.n] || [0, 0], q = pct(b[0], b[1]);
    g.fillStyle = '#f2f6fc'; g.font = `600 28px ${F}`; g.fillText('Chương ' + c.n, 88, y + 10);
    g.fillStyle = '#162d50'; roundRect(g, 280, y - 12, 560, 24, 12); g.fill();
    if (q){ g.fillStyle = q >= 65 ? '#4ade9b' : q >= 50 ? '#f5b84a' : '#ff7a7a'; roundRect(g, 280, y - 12, Math.max(24, 560 * q / 100), 24, 12); g.fill(); }
    g.fillStyle = '#a9bbd6'; g.font = `600 28px ${F}`; g.textAlign = 'right'; g.fillText(b[0] + '/' + b[1], 992, y + 10); g.textAlign = 'left';
    y += 64;
  });
  g.fillStyle = '#264670'; g.fillRect(88, H - 150, W - 176, 2);
  g.fillStyle = '#a9bbd6'; g.font = `500 26px ${F}`; g.fillText('Thi thử miễn phí, song ngữ Việt – Anh:', 88, H - 98);
  g.fillStyle = '#22d3ee'; g.font = `700 28px ${M}`; g.fillText(siteUrl(), 88, H - 56);
  const url = cv.toDataURL('image/png');
  const fname = 'the-qa-lab-ctfl-' + a.score + 'of40.png';
  const m = modal(`<h2 class="h2">Ảnh kết quả</h2><img class="shareimg" src="${url}" alt="Ảnh kết quả ${a.score}/40"><p class="small muted">Trên điện thoại: nhấn giữ ảnh để lưu. Kích thước 1080×1350, hợp đăng TikTok, Facebook, Threads.</p><div class="row"><a class="btn" href="${url}" download="${fname}">Tải ảnh</a><button class="btn ghost" id="mClose">Đóng</button></div>`, true);
  m.querySelector('#mClose').onclick = closeModal;
}

/* ---------- carousel tóm tắt để đăng TikTok / Facebook / Threads ---------- */
function wrapText(g, t, w){ const out = []; String(t).split('\n').forEach(par => { let line = ''; par.split(/\s+/).forEach(word => { const tt = line ? line + ' ' + word : word; if (g.measureText(tt).width > w && line){ out.push(line); line = word; } else line = tt; }); out.push(line); }); return out; }
const plain = t => String(t).replace(/\*\*(.+?)\*\*/g, '$1').replace(/`/g, '');
async function carousel(sec){
  try { await document.fonts.ready; } catch(e){}
  const W = 1080, H = 1350, F = '"Nunito Sans", system-ui, sans-serif', M = '"JetBrains Mono", ui-monospace, monospace';
  const pts = sec.summary.map(plain), chunks = [];
  // gom ý vào từng slide theo chiều cao chữ
  const probe = document.createElement('canvas').getContext('2d'); probe.font = `600 44px ${F}`;
  let cur = [], hgt = 0;
  pts.forEach((t, i) => { const h = wrapText(probe, t, W - 260).length * 60 + 70; if (cur.length && (hgt + h > 860 || cur.length >= 3)){ chunks.push(cur); cur = []; hgt = 0; } cur.push([i + 1, t]); hgt += h; });
  if (cur.length) chunks.push(cur);
  const total = chunks.length + 2;
  const base = (g, n) => {
    g.fillStyle = '#0b1a33'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(34,211,238,0.06)'; g.lineWidth = 2;
    for (let x = 0; x <= W; x += 60){ g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (let y = 0; y <= H; y += 60){ g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    g.fillStyle = '#22d3ee'; g.font = `700 28px ${M}`; g.fillText('THE QA LAB', 88, 110);
    g.fillStyle = '#a9bbd6'; g.font = `500 26px ${M}`; g.textAlign = 'right'; g.fillText(n + '/' + total, W - 88, 110); g.textAlign = 'left';
    g.fillStyle = '#a9bbd6'; g.font = `500 24px ${F}`; g.fillText('ISTQB CTFL v4.0.1 · Mục ' + sec.id, 88, H - 70);
    for (let i = 0; i < total; i++){ g.fillStyle = i === n - 1 ? '#22d3ee' : '#264670'; roundRect(g, W - 88 - (total - i) * 30 + 8, H - 84, i === n - 1 ? 22 : 12, 12, 6); g.fill(); }
  };
  const slides = [];
  const mk = draw => { const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const g = cv.getContext('2d'); draw(g); slides.push(cv.toDataURL('image/png')); };
  mk(g => { base(g, 1);
    g.font = `700 30px ${F}`; const pw = g.measureText('ÔN NHANH · MỤC ' + sec.id).width + 56;
    g.fillStyle = 'rgba(34,211,238,0.14)'; roundRect(g, 88, 300, pw, 64, 32); g.fill();
    g.fillStyle = '#22d3ee'; g.fillText('ÔN NHANH · MỤC ' + sec.id, 116, 343);
    g.fillStyle = '#f2f6fc'; g.font = `800 84px ${F}`; let y = 490; wrapText(g, sec.title, W - 176).slice(0, 4).forEach(l => { g.fillText(l, 88, y); y += 100; });
    g.fillStyle = '#a9bbd6'; g.font = `500 36px ${F}`; wrapText(g, sec.en, W - 176).slice(0, 2).forEach(l => { y += 6; g.fillText(l, 88, y); y += 44; });
    g.fillStyle = '#f5b84a'; g.font = `700 34px ${F}`; g.fillText(sec.summary.length + ' ý cần nhớ trước ngày thi  →', 88, H - 200); });
  chunks.forEach((ch, k) => mk(g => { base(g, k + 2);
    g.fillStyle = '#a9bbd6'; g.font = `600 30px ${F}`; g.fillText(fit(g, sec.id + ' · ' + plain(sec.title), W - 176), 88, 210);
    g.font = `600 44px ${F}`; const tot = ch.reduce((a, [, t]) => a + wrapText(g, t, W - 260).length * 60 + 70, -70);
    let y = Math.max(330, Math.round(260 + (1180 - 260 - tot) / 2) + 30);
    ch.forEach(([n, t]) => {
      g.fillStyle = 'rgba(34,211,238,0.14)'; g.beginPath(); g.arc(128, y - 14, 40, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#22d3ee'; g.font = `700 40px ${M}`; g.textAlign = 'center'; g.fillText(n, 128, y); g.textAlign = 'left';
      g.fillStyle = '#f2f6fc'; g.font = `600 44px ${F}`; const ls = wrapText(g, t, W - 260); ls.forEach((l, j) => g.fillText(l, 200, y + j * 60)); y += ls.length * 60 + 70;
    }); }));
  mk(g => { base(g, total);
    g.fillStyle = '#f2f6fc'; g.font = `800 72px ${F}`; let y = 420; ['Lưu lại để ôn,', 'rồi thử sức nhé.'].forEach(l => { g.fillText(l, 88, y); y += 90; });
    g.fillStyle = '#a9bbd6'; g.font = `500 38px ${F}`; y += 30; wrapText(g, 'Bài học chi tiết, luyện câu hỏi song ngữ và phòng thi thử CTFL miễn phí:', W - 176).forEach(l => { g.fillText(l, 88, y); y += 52; });
    g.fillStyle = '#22d3ee'; g.font = `700 44px ${M}`; g.fillText(siteUrl().replace(/^https?:\/\//, ''), 88, y + 40);
    g.fillStyle = '#f5b84a'; g.font = `700 32px ${F}`; g.fillText('Bạn thấy ý nào hay bị nhầm nhất? Bình luận nhé.', 88, H - 200); });
  const cap = `Ôn ISTQB CTFL · ${sec.id} ${plain(sec.title)}\n${sec.summary.length} ý cần nhớ, lưu lại để ôn trước ngày thi.\nHọc và thi thử miễn phí: ${siteUrl()}\n#ISTQB #CTFL #Tester #QA #KiemThuPhanMem #TheQALab`;
  const m = modal(`<h2 class="h2">Carousel mục ${sec.id}</h2><p class="small muted">${slides.length} ảnh 1080×1350. Trên điện thoại: nhấn giữ từng ảnh để lưu. Trên máy tính: bấm Tải tất cả.</p>
    <div class="carou">${slides.map((u, i) => `<img src="${u}" alt="Slide ${i + 1}" loading="lazy">`).join('')}</div>
    <div class="row"><button class="btn" id="cDl">Tải tất cả</button><button class="btn ghost" id="cCap">Sao chép caption</button><button class="btn link" id="mClose">Đóng</button></div>`, true);
  m.querySelector('#mClose').onclick = closeModal;
  m.querySelector('#cCap').onclick = () => copy(cap);
  m.querySelector('#cDl').onclick = () => slides.forEach((u, i) => setTimeout(() => { const a = document.createElement('a'); a.href = u; a.download = `the-qa-lab-${sec.id}-${i + 1}.png`; document.body.appendChild(a); a.click(); a.remove(); }, i * 350));
}
function roundRect(g, x, y, w, h, r){ g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function fit(g, t, w){ if (g.measureText(t).width <= w) return t; while (t.length && g.measureText(t + '…').width > w) t = t.slice(0, -1); return t + '…'; }

/* ============ LỘ TRÌNH ============ */
function roadmap(){
  const st = {open: ['good', 'Đang mở trên The QA Lab'], next: ['', 'Sắp có'], later: ['mute', 'Dự kiến']};
  app.innerHTML = `
  <section class="hero"><span class="eyebrow">Lộ trình nghề nghiệp · cập nhật ${QL.roadmapUpdated}</span>
    <h1 class="h1">Từ CTFL đến QA Specialist hoặc QA Manager</h1>
    <p class="lead">Hai hướng phát triển dựa trên danh mục chứng chỉ ISTQB hiện hành. Mọi lộ trình đều bắt đầu từ CTFL. Mỗi chứng chỉ sẽ lần lượt có đủ ba bước Học, Luyện tập và Phòng thi trên The QA Lab.</p></section>
  <div class="grid2">
    ${QL.tracks.map(t => `<section class="stack">
      <div><h2 class="h2" style="font-size:24px">${esc(t.title)}</h2><p class="muted small">${esc(t.tagline)}</p></div>
      <div class="track">${t.steps.map((s, i) => `<div class="node ${s.status}"><span class="dot">${s.status === 'open' ? '✓' : i + 1}</span>
        <div class="card stack">
          <div class="row between"><span class="mono" style="color:var(--cyan)">${esc(s.code)}</span><span class="pill ${st[s.status][0]}">${st[s.status][1]}</span></div>
          <h3 style="font-size:17px">${esc(s.name)}</h3>
          <div class="row"><span class="pill mute">${esc(s.level)}</span><span class="small muted">${esc(s.when)}</span></div>
          <p class="small">${esc(s.learn)}</p>
          ${s.options ? `<div class="opt-list">${s.options.map(o => `<div><span class="mono" style="color:var(--cyan)">${esc(o[0])}</span> <b class="small">${esc(o[1])}</b><div class="small muted">${esc(o[2])}</div></div>`).join('')}</div>` : ''}
          <p class="small muted"><b>Điều kiện:</b> ${esc(s.req)}</p>
          ${s.cert ? `<div class="row"><a class="btn sm" href="#learn">Học ngay</a><a class="btn ghost sm" href="#exam">Thi thử</a></div>` : ''}
        </div></div>`).join('')}</div></section>`).join('')}
  </div>
  <section class="card stack"><h2 class="h2">Lưu ý</h2><ul class="pts small">${QL.roadmapNotes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
    <div class="row">${QL.roadmapLinks.map(l => `<a class="btn ghost sm" href="${l[1]}" target="_blank" rel="noopener">${esc(l[0])} ↗</a>`).join('')}</div></section>`;
}

go(location.hash.slice(1) || 'home');
})();
