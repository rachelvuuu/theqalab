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
const chap = n => cert.chapters[n - 1];
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

/* ---------- điều hướng ---------- */
const views = {home, learn, practice, exam, roadmap};
let tick = null, curView = null;
let reviewId = null, reviewFilter = 'all';
function go(v){
  if (!views[v]) v = 'home';
  if (v !== curView && v === 'exam' && curView !== null) reviewId = null;
  curView = v; keys = {}; closeModal();
  if (tick && v !== 'exam'){ clearInterval(tick); tick = null; }
  document.body.classList.remove('in-room');
  document.querySelectorAll('#nav a').forEach(a => { if (a.dataset.v === v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  if (location.hash !== '#' + v) history.replaceState(null, '', '#' + v);
  views[v]();
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
  const cta = now === 1 ? ['#learn', 'Học chương ' + (nextCh ? nextCh.n : 1)] : now === 2 ? ['#practice', 'Tiếp tục luyện tập'] : ['#exam', 'Vào phòng thi'];
  const steps = [
    ['#learn', 'Học', `${s.learnedN}/6 chương`, pct(s.learnedN, 6), learnDone],
    ['#practice', 'Luyện tập', `${s.done}/${s.total} câu · đúng ${pct(s.right, s.done)}%`, pct(s.done, s.total), practiceDone],
    ['#exam', 'Phòng thi', s.attempts ? `Cao nhất ${s.best}/40` : 'Chưa thi', s.best === null ? 0 : pct(s.best, 40), s.best !== null && s.best >= 26]
  ];
  app.innerHTML = `
  ${running ? `<div class="card row between"><div><b>Bạn có bài thi đang làm dở.</b> <span class="muted small">Còn ${clock(active.endsAt - Date.now())}.</span></div><a class="btn" href="#exam">Quay lại phòng thi</a></div>` : ''}
  <section class="hero">
    <span class="eyebrow">ISTQB CTFL v4.0.1 · Việt – Anh</span>
    <h1 class="h1">Học, luyện, rồi vào phòng thi.</h1>
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
      <section class="card stack">
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
  const answer = j => { if (daily[d.key]) return; daily[d.key] = {pick: j, ok: j === ci}; save.daily(); record(d.q.id, j === ci); home(); };
  if (!dd){ link('[data-dj]', e => answer(+e.currentTarget.dataset.dj)); keys.choose = answer; }
  const sh = $('#dShare'); if (sh) sh.onclick = () => copy(`The QA Lab · Câu hỏi của ngày #${d.n} (ISTQB CTFL)\n${dd.ok ? 'Đúng' : 'Sai'}${st ? ' · chuỗi ' + st + ' ngày' : ''}\nThử sức: ${siteUrl()}`);
  keys.L = () => { lang = nextLang(lang); save.lang(); home(); };
}
function siteUrl(){ return /^https?:/.test(location.protocol) && !/claude\.ai|claudeusercontent/.test(location.host) ? location.origin : 'The QA Lab'; }

/* ============ 1. HỌC ============ */
let learnCh = 1;
function learn(){
  const c = chap(learnCh);
  const n = cert.bank.filter(q => q.c === c.n).length;
  const los = Object.entries(cert.los).filter(([k]) => k.startsWith('FL-' + c.n + '.'));
  app.innerHTML = `
  <div class="row between"><div><span class="eyebrow">Bước 1 · Học</span><h1 class="h2" style="font-size:26px;margin-top:4px">CTFL v4.0.1 theo chương</h1></div>
  <span class="muted small">Đã học ${Object.keys(learned).length}/6 chương</span></div>
  <div class="tabs" role="group" aria-label="Chọn chương">${cert.chapters.map(x => `<button aria-pressed="${x.n === learnCh}" data-c="${x.n}">Chương ${x.n}${learned[x.n] ? '<span class="ok" aria-label="đã học">✓</span>' : ''}</button>`).join('')}</div>
  <article class="card stack">
    <div class="row"><span class="pill">${c.time} phút học</span><span class="pill pink">${c.exam}/40 câu trong đề</span>${learned[c.n] ? '<span class="pill good">Đã học xong</span>' : ''}</div>
    <div><h2 class="h1" style="font-size:30px">Chương ${c.n}. ${esc(c.title)}</h2><p class="muted" lang="en">${esc(EN.chapters[c.n] || '')}</p></div>
    <div class="callout"><b>Ví dụ thực tế</b>${esc(c.story)}</div>
    <h3 class="h2">Kiến thức chính</h3>
    <ul class="pts">${c.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
    <div class="callout bad"><b>Bẫy hay gặp trong đề</b><ul class="pts">${c.traps.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>
    <div class="callout good"><b>Mẹo nhớ</b>${esc(c.mnemonic)}</div>
    <details><summary class="muted" style="cursor:pointer">Mục tiêu học tập của chương (${los.length}) · song ngữ</summary>
      <div class="tablewrap" style="margin-top:8px"><table><tbody>${los.map(([k, v]) => `<tr><td class="mono" style="white-space:nowrap">${k}</td><td><span class="pill mute">${v[0]}</span></td><td><span lang="en">${esc(EN.los[k] || '')}</span><br><span class="muted small">${esc(v[1])}</span></td></tr>`).join('')}</tbody></table></div>
    </details>
    <div class="row">
      <button class="btn ${learned[c.n] ? 'ghost' : ''}" id="mark">${learned[c.n] ? 'Bỏ đánh dấu đã học' : 'Đánh dấu đã học xong'}</button>
      <button class="btn ghost" id="toPractice">Luyện ${n} câu chương ${c.n}</button>
      <button class="btn ghost" id="toCards">Ôn thuật ngữ chương ${c.n}</button>
    </div>
  </article>`;
  link('[data-c]', e => { learnCh = +e.currentTarget.dataset.c; learn(); });
  $('#mark').onclick = () => { if (learned[c.n]) delete learned[c.n]; else learned[c.n] = Date.now(); save.learned(); learn(); };
  $('#toPractice').onclick = () => { pcfg = {ch: c.n, mode: 'all'}; pmode = 'q'; pr = null; go('practice'); };
  $('#toCards').onclick = () => { cardCh = c.n; cardIdx = 0; pmode = 'cards'; go('practice'); };
  keys.ArrowRight = () => { if (learnCh < 6){ learnCh++; learn(); } };
  keys.ArrowLeft = () => { if (learnCh > 1){ learnCh--; learn(); } };
}

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
  box.innerHTML = head + `<article class="card stack">
    <span class="meta">Chương ${q.c} · ${q.lo} · ${q.k}</span>
    ${stemHtml(q, lang)}
    <div class="opts">${order.map((oi, j) => `<button class="opt ${ans ? (j === ci ? 'ok' : j === pr.picked ? 'no' : '') : ''}" data-j="${j}" ${ans ? 'disabled' : ''}><span class="k">${L[j]}</span>${optText(q, oi, lang)}</button>`).join('')}</div>
    ${ans ? `<div class="exp"><b style="color:var(--${pr.picked === ci ? 'good' : 'bad'})">${pr.picked === ci ? 'Chính xác.' : 'Chưa đúng. Đáp án: ' + L[ci] + '.'}</b> ${esc(q.e)}</div><div class="row"><button class="btn" id="nx">${pr.i + 1 < pr.ids.length ? 'Câu tiếp theo' : 'Xem kết quả'}</button></div>` : ''}
  </article>
  <p class="keynote">Phím <kbd>1</kbd>–<kbd>4</kbd> chọn · <kbd>Enter</kbd> tiếp · <kbd>L</kbd> ngôn ngữ · <kbd>?</kbd> tất cả phím tắt</p>`;
  bind();
  const pick = j => { pr.picked = j; const ok = j === ci; if (ok) pr.right++; record(q.id, ok); questions(); };
  const next = () => { pr.i++; pr.picked = null; questions(); };
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
  ${cur ? `<button class="card flash" id="fl" aria-label="Lật thẻ">
      <span class="en" lang="en">${esc(cur.g[0])}</span>
      ${cardFlip ? `<span class="vi">${esc(cur.g[1])}</span><span class="def">${esc(cur.g[2])}</span><span class="pill">Chương ${cur.g[3]}</span>` : '<span class="small muted">Nhấn để xem nghĩa</span>'}
      ${known[cur.i] ? '<span class="pill good">Đã thuộc</span>' : ''}</button>
    <div class="row between"><button class="btn ghost" id="fp">← Trước</button><div class="row"><button class="btn ghost" id="fr">Chưa thuộc</button><button class="btn" id="fk">Đã thuộc</button></div><button class="btn ghost" id="fx">Sau →</button></div>`
  : `<div class="card">Bạn đã thuộc hết thẻ trong nhóm này. Bỏ chọn “Chỉ thẻ chưa thuộc” để ôn lại.</div>`}
  <p class="keynote"><kbd>Space</kbd> lật · <kbd>←</kbd> <kbd>→</kbd> chuyển · <kbd>K</kbd> đã thuộc · <kbd>J</kbd> chưa thuộc</p>`;
  $('#fc').onchange = e => { cardCh = +e.target.value; cardIdx = 0; cardFlip = false; cards(); };
  $('#fn').onchange = e => { cardOnlyNew = e.target.checked; cardIdx = 0; cardFlip = false; cards(); };
  if (!cur) return;
  const step = d => { cardIdx = (cardIdx + d + l.length) % l.length; cardFlip = false; cards(); };
  const flip = () => { cardFlip = !cardFlip; cards(); };
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
    <article class="card stack">
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
  result(); window.scrollTo(0, 0);
}
function ring(p, pass){
  const r = 56, c = 2 * Math.PI * r, col = pass ? 'var(--good)' : 'var(--bad)';
  return `<svg class="ring" viewBox="0 0 132 132" role="img" aria-label="${p}%"><circle cx="66" cy="66" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="12"/>${p ? `<circle cx="66" cy="66" r="${r}" fill="none" stroke="${col}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${c * p / 100} ${c}" transform="rotate(-90 66 66)"/>` : ''}<text x="66" y="62" text-anchor="middle" fill="var(--ink)" font-size="28" font-weight="800" font-family="Be Vietnam Pro, sans-serif">${p}%</text><text x="66" y="84" text-anchor="middle" fill="var(--muted)" font-size="12" font-family="Be Vietnam Pro, sans-serif">≥ 65% để đạt</text></svg>`;
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
      <div class="row"><span style="font-size:34px;font-weight:800">${a.score}/40</span><span class="pill ${pass ? 'good' : 'bad'}" style="font-size:14px">${pass ? 'ĐẠT' : 'CHƯA ĐẠT'}</span>${a.auto ? '<span class="pill warn">Nộp tự động khi hết giờ</span>' : ''}</div>
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
  const g = cv.getContext('2d'), F = '"Be Vietnam Pro", system-ui, sans-serif', M = '"JetBrains Mono", ui-monospace, monospace';
  const pass = a.score >= cert.exam.pass, p = pct(a.score, 40);
  g.fillStyle = '#0b1a33'; g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(34,211,238,0.06)'; g.lineWidth = 2;
  for (let x = 0; x <= W; x += 60){ g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
  for (let y = 0; y <= H; y += 60){ g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  g.fillStyle = '#22d3ee'; g.font = `700 30px ${M}`; g.fillText('THE QA LAB', 88, 120);
  g.fillStyle = '#a9bbd6'; g.font = `500 26px ${F}`; g.fillText('Understand the System · Find the Real Issue', 88, 162);
  g.fillStyle = '#f2f6fc'; g.font = `800 64px ${F}`; g.fillText('Thi thử ISTQB CTFL', 88, 290);
  g.fillStyle = '#a9bbd6'; g.font = `500 32px ${F}`; g.fillText('v4.0.1 · ' + (a.week || 'Đề ngẫu nhiên'), 88, 340);
  const cx = 250, cy = 560, r = 150;
  g.lineWidth = 34; g.strokeStyle = '#162d50'; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
  if (p){ g.strokeStyle = pass ? '#4ade9b' : '#ff7a7a'; g.lineCap = 'round'; g.beginPath(); g.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p / 100); g.stroke(); }
  g.textAlign = 'center'; g.fillStyle = '#f2f6fc'; g.font = `800 92px ${F}`; g.fillText(a.score + '/40', cx, cy + 20);
  g.fillStyle = '#a9bbd6'; g.font = `500 28px ${F}`; g.fillText(p + '%', cx, cy + 66); g.textAlign = 'left';
  g.fillStyle = pass ? 'rgba(74,222,155,0.16)' : 'rgba(255,122,122,0.16)'; roundRect(g, 480, 470, 300, 76, 38); g.fill();
  g.fillStyle = pass ? '#4ade9b' : '#ff7a7a'; g.font = `800 38px ${F}`; g.fillText(pass ? 'ĐẠT' : 'CHƯA ĐẠT', 512, 522);
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
