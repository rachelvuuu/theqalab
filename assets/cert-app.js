/* The QA Lab – ứng dụng ôn thi cho các chứng chỉ nâng cao (không cần build).
   Dùng chung dữ liệu dạng window.QALAB.certs[<id>]. Trang chọn chứng chỉ qua window.QALAB_CERT.
   Luồng: 1 Học → 2 Luyện tập → 3 Phòng thi. Hỗ trợ điểm theo mức K và câu “chọn HAI”. */
(function(){
'use strict';
const QL = window.QALAB, ID = window.QALAB_CERT || 'ctal-ta', cert = QL.certs[ID];
const EN = cert.en || {q:{}, los:{}, chapters:{}};
const byId = Object.fromEntries(cert.bank.map(q => [q.id, q]));
const LET = 'ABCDE';
const LABEL = cert.code + ' ' + cert.version;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const app = $('#app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
const pct = (a, b) => b ? Math.round(a * 100 / b) : 0;
const LESSONS = cert.lessons || {}, GROUPS = cert.lessonGroups || {};
const SECTIONS = Object.keys(LESSONS).sort((a, b) => a - b).flatMap(c => LESSONS[c].map(s => Object.assign(s, {ch: +c})));
const secById = Object.fromEntries(SECTIONS.map(s => [s.id, s]));
const chap = n => cert.chapters.find(c => c.n === n);

/* ---------- lưu trữ ---------- */
const store = {
  get(k, d){ try { const v = localStorage.getItem('qalab_' + k); return v ? JSON.parse(v) : d; } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem('qalab_' + k, JSON.stringify(v)); } catch(e){} }
};
const K = k => k + '_' + ID;
let hist = store.get(K('hist'), {}), secDone = store.get(K('secDone'), {}), reviewed = store.get(K('reviewed'), {});
let known = store.get(K('known'), {}), attempts = store.get(K('attempts'), []), active = store.get(K('active'), null);
let lang = store.get(K('lang'), 'bi'), daily = store.get(K('daily'), {});
const save = {
  hist(){ store.set(K('hist'), hist); }, secDone(){ store.set(K('secDone'), secDone); }, reviewed(){ store.set(K('reviewed'), reviewed); },
  known(){ store.set(K('known'), known); }, attempts(){ store.set(K('attempts'), attempts); }, active(){ store.set(K('active'), active); },
  lang(){ store.set(K('lang'), lang); }, daily(){ store.set(K('daily'), daily); }
};
function record(id, ok){ const h = hist[id] || {r:0, w:0}; ok ? h.r++ : h.w++; h.last = ok; h.t = Date.now(); hist[id] = h; save.hist(); }

/* ---------- giao diện sáng / tối (dùng chung với trang CTFL) ---------- */
let theme = store.get('theme', 'auto');
const THEMES = {auto:'Tự động', light:'Sáng', dark:'Tối'};
const THEME_ICON = {auto:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>',
  light:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  dark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>'};
function applyTheme(){
  const el = document.documentElement, host = window.__hostTheme;
  if (theme === 'auto'){ if (host === 'light' || host === 'dark') el.setAttribute('data-theme', host); else el.removeAttribute('data-theme'); }
  else el.setAttribute('data-theme', theme);
  const b = $('#theme'); if (!b) return;
  b.innerHTML = THEME_ICON[theme] + '<span class="lbl">' + THEMES[theme] + '</span>';
  b.setAttribute('aria-label', 'Giao diện: ' + THEMES[theme] + '. Bấm để đổi'); b.title = 'Giao diện: ' + THEMES[theme] + ' (sáng → tối → tự động)';
}
if ($('#theme')) $('#theme').onclick = () => { theme = theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto'; store.set('theme', theme); applyTheme(); toast('Giao diện: ' + THEMES[theme]); };
applyTheme();

/* ---------- tiện ích ---------- */
function toast(msg){ let t = $('#ta-toast'); if (!t){ t = document.createElement('div'); t.id = 'ta-toast'; t.className = 'ta-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('on'), 2200); }
function hash(s){ let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; }
function rng(seed){ let s = seed || 1; return () => { s = Math.imul(s ^ (s >>> 15), 2246822507) >>> 0; s = Math.imul(s ^ (s >>> 13), 3266489909) >>> 0; s ^= s >>> 16; return (s >>> 0) / 4294967296; }; }
function shuffle(a, r = Math.random){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function isoWeek(d = new Date()){ const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())); const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear(), w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7); return {y, w, label: 'Đề tuần ' + w + '/' + y}; }
function copy(text){ (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => toast('Đã sao chép'), () => toast('Không sao chép được')); }
const siteUrl = () => location.origin + location.pathname;
const multi = q => Array.isArray(q.a);
const need = q => multi(q) ? q.a.length : 1;
const pts = q => (cert.exam.points || {})[q.k] || 1;
const isRight = (q, sel) => multi(q) ? sel.length === q.a.length && q.a.every(i => sel.includes(i)) : sel.length === 1 && sel[0] === q.a;
const ansText = (q, arr) => arr.map(i => LET[i]).join(', ');
const loK = lo => (cert.los[lo] || ['?'])[0];
const loTxt = lo => (cert.los[lo] || ['', ''])[1];
const secOfLo = lo => SECTIONS.find(s => s.los.includes(lo));
function modal(html, buttons){
  return new Promise(res => {
    const w = document.createElement('div'); w.className = 'ta-modal'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true');
    w.innerHTML = `<div class="ta-modal-box">${html}<div class="row ta-modal-btns">${buttons.map((b, i) => `<button class="btn ${b[2] || ''}" data-i="${i}">${b[0]}</button>`).join('')}</div></div>`;
    document.body.appendChild(w);
    const close = v => { w.remove(); document.removeEventListener('keydown', onKey, true); res(v); };
    const onKey = e => { if (e.key === 'Escape'){ e.stopPropagation(); close(null); } };
    document.addEventListener('keydown', onKey, true);
    w.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) close(buttons[+b.dataset.i][1]); else if (e.target === w) close(null); });
    const f = w.querySelector('.btn:last-child'); if (f) f.focus();
  });
}

/* ---------- hiển thị câu hỏi ---------- */
function qText(q){
  const en = EN.q[q.id];
  const vi = `<p class="ta-qtext">${md(q.q)}</p>`, e = en ? `<p class="ta-qtext ta-en" lang="en">${md(en.q)}</p>` : '';
  return lang === 'en' && en ? `<p class="ta-qtext" lang="en">${md(en.q)}</p>` : lang === 'bi' ? vi + e : vi;
}
function optText(q, i){
  const en = EN.q[q.id], vi = md(q.o[i]), e = en ? md(en.o[i]) : '';
  return lang === 'en' && en ? `<span lang="en">${e}</span>` : lang === 'bi' && en && en.o[i] !== q.o[i] ? `${vi}<span class="ta-en" lang="en">${e}</span>` : vi;
}
function qMeta(q, extra){
  return `<div class="ta-qmeta"><span class="pill mute" title="${esc(loTxt(q.lo))}">${q.lo}</span><span class="pill mute">${q.k} · ${pts(q)} điểm</span>${multi(q) ? `<span class="pill ta-pill-multi">Chọn ${need(q)}</span>` : ''}${extra || ''}</div>`;
}
function langSwitch(){
  return `<div class="tabs ta-lang" role="group" aria-label="Ngôn ngữ câu hỏi">${[['vi', 'Việt'], ['bi', 'Song ngữ'], ['en', 'English']].map(([v, t]) => `<button data-lang="${v}" aria-pressed="${lang === v}">${t}</button>`).join('')}</div>`;
}
function bindLang(rerender){ $$('[data-lang]').forEach(b => b.onclick = () => { lang = b.dataset.lang; save.lang(); rerender(); }); }

/* Câu hỏi có phản hồi ngay (dùng trong bài học, luyện tập, câu hỏi của ngày). */
function quizHTML(q, n){
  return `<div class="ta-q" data-qid="${q.id}" data-live="1">${qMeta(q, n ? `<span class="small muted">${n}</span>` : '')}${qText(q)}
    <div class="ta-opts" role="group">${q.o.map((o, i) => `<button class="ta-opt" data-i="${i}" aria-pressed="false"><span class="ta-let">${LET[i]}</span><span class="ta-otext">${optText(q, i)}</span></button>`).join('')}</div>
    ${multi(q) ? `<div class="row"><button class="btn sm ta-check" disabled>Kiểm tra</button><span class="small muted">Chọn đủ ${need(q)} phương án</span></div>` : ''}
    <div class="ta-fb" aria-live="polite"></div></div>`;
}
function bindQuiz(root, onDone){
  root.querySelectorAll('.ta-q[data-live]').forEach(el => {
    const q = byId[el.dataset.qid]; let sel = [];
    const opts = [...el.querySelectorAll('.ta-opt')], chk = el.querySelector('.ta-check');
    const grade = () => {
      el.removeAttribute('data-live'); const ok = isRight(q, sel); record(q.id, ok);
      const right = multi(q) ? q.a : [q.a];
      opts.forEach((b, i) => { b.disabled = true; if (right.includes(i)) b.classList.add('ok'); else if (sel.includes(i)) b.classList.add('no'); });
      if (chk) chk.parentElement.remove();
      el.querySelector('.ta-fb').innerHTML = `<div class="callout ${ok ? 'good' : 'bad'}"><b>${ok ? 'Chính xác' : 'Chưa đúng · đáp án: ' + ansText(q, right)}</b>${md(q.e)}</div>`;
      if (onDone) onDone(q, ok, sel);
    };
    opts.forEach((b, i) => b.onclick = () => {
      if (!multi(q)){ sel = [i]; grade(); return; }
      sel = sel.includes(i) ? sel.filter(x => x !== i) : sel.concat(i).slice(-need(q));
      opts.forEach((x, j) => x.setAttribute('aria-pressed', sel.includes(j)));
      chk.disabled = sel.length !== need(q);
    });
    if (chk) chk.onclick = grade;
  });
}

/* ---------- khối nội dung bài học ---------- */
function block(b){
  if (b.t === 'h') return `<h3 class="sec">${md(b.v)}</h3>`;
  if (b.t === 'p') return `<p>${md(b.v)}</p>`;
  if (b.t === 'list') return `<ul class="pts">${b.v.map(x => `<li>${md(x)}</li>`).join('')}</ul>`;
  if (b.t === 'table') return `<div class="tablewrap"><table>${b.head ? `<thead><tr>${b.head.map(h => `<th>${md(h)}</th>`).join('')}</tr></thead>` : ''}<tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (b.t === 'compare') return `<div class="cmp">${[b.l, b.r].map(x => `<div><h4>${md(x.h)}</h4><span class="q">${md(x.q)}</span><ul>${x.v.map(i => `<li>${md(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
  if (b.t === 'steps') return `<div class="flowsteps">${b.v.map(([a, t]) => `<div><span><b>${md(a)}</b><span class="small muted">${md(t)}</span></span></div>`).join('')}</div>`;
  if (b.t === 'tip') return `<div class="callout good"><b>Mẹo</b>${md(b.v)}</div>`;
  if (b.t === 'trap') return `<div class="callout bad"><b>Bẫy hay gặp trong đề</b><ul class="pts">${b.v.map(x => `<li>${md(x)}</li>`).join('')}</ul></div>`;
  if (b.t === 'worked') return `<div class="worked"><span class="meta">Bài tập có lời giải</span><h4>${md(b.title)}</h4><p>${md(b.given)}</p>
    <details><summary>Tự làm trước, rồi xem lời giải từng bước</summary><ol class="wsteps">${b.steps.map(x => `<li>${md(x)}</li>`).join('')}</ol><div class="wans"><b>Đáp án</b>${md(b.answer)}</div></details></div>`;
  if (b.t === 'lab') return labHtml(b.kind);
  return '';
}

/* ---------- Lab tương tác ---------- */
const LABS = {
  bva: {name:'Máy tính EP và BVA', hint:'Nhập khoảng hợp lệ (số nguyên).', inputs:[['min','Nhỏ nhất',10,'num'],['max','Lớn nhất',100,'num']]},
  risk: {name:'Ma trận rủi ro', hint:'Kéo để chọn khả năng xảy ra và tác động (1–5).', inputs:[['l','Khả năng',4,'range'],['i','Tác động',5,'range']]},
  dt: {name:'Sinh bảng quyết định đầy đủ', hint:'Mỗi điều kiện một dòng, dạng “Tên: giá trị 1, giá trị 2, …” (tối đa 5 điều kiện). Không ghi giá trị thì hiểu là Có/Không.', inputs:[['conds','Điều kiện','Thành viên vàng: C, K\nThời điểm hủy: ≥7 ngày, 1–6 ngày, trong ngày\nCó bảo hiểm: C, K','area']]},
  domain: {name:'Điểm ON / OFF / IN / OUT cho một biên', hint:'Chọn toán tử của điều kiện “x [toán tử] giá trị” và độ chính xác của dữ liệu.', inputs:[['op','Toán tử','≥','sel',['<','≤','>','≥','=','≠']],['v','Giá trị biên',18,'num'],['p','Độ chính xác',1,'num']]},
  pairwise: {name:'Base choice và pairwise', hint:'Mỗi tham số một dòng “Tên: giá trị 1, giá trị 2, …”. Giá trị đầu tiên là giá trị gốc. Tối đa 8 tham số, 6 giá trị.', inputs:[['params','Tham số','Trình duyệt: Chrome, Firefox, Safari\nHệ điều hành: Windows, macOS\nNgôn ngữ: VI, EN, JA','area']]},
  nswitch: {name:'Đếm 0-switch, 1-switch, 2-switch', hint:'Mỗi chuyển đổi một dòng dạng “Từ > Đến : sự kiện” (sự kiện có thể bỏ trống).', inputs:[['tr','Chuyển đổi','Mới > Đã thanh toán : pay\nMới > Đã hủy : cancel\nĐã thanh toán > Đang giao : ship\nĐã thanh toán > Đã hủy : cancel\nĐang giao > Đã nhận : deliver','area']]},
  ddp: {name:'DDP và DRE', hint:'DDP cho một cấp kiểm thử; DRE cho cả release.', inputs:[['f','Lỗi tìm ở cấp này',80,'num'],['e','Lỗi lọt sau đó',20,'num'],['x','Lọt nhưng cấp này không thể phát hiện',5,'num']]}
};
function labHtml(kind){
  const L = LABS[kind]; if (!L) return '';
  const field = ([k, t, v, type, opts]) => type === 'area' ? `<label class="lab-f wide"><span>${t}</span><textarea data-k="${k}" rows="4">${esc(v)}</textarea></label>`
    : type === 'range' ? `<label class="lab-f"><span>${t}: <b data-show="${k}">${v}</b></span><input type="range" min="1" max="5" step="1" data-k="${k}" value="${v}"></label>`
    : type === 'sel' ? `<label class="lab-f"><span>${t}</span><select data-k="${k}">${opts.map(o => `<option ${o === v ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`
    : `<label class="lab-f"><span>${t}</span><input type="number" inputmode="decimal" data-k="${k}" value="${v}"></label>`;
  return `<div class="lab" data-lab="${kind}"><div class="lab-h"><span class="pill">Lab</span><b>${L.name}</b></div><p class="small muted">${L.hint}</p>
    <div class="lab-in">${L.inputs.map(field).join('')}</div><div class="lab-out" aria-live="polite"></div></div>`;
}
const chips = arr => arr.map(([v, ok, t]) => `<span class="vchip ${ok ? 'ok' : 'no'}"${t ? ` title="${esc(t)}"` : ''}>${esc(v)}</span>`).join(' ');
const parseLines = s => String(s || '').split('\n').map(l => l.trim()).filter(Boolean);
const fmt = (x, p) => { const d = Math.max(0, Math.min(6, Math.round(-Math.log10(p)))); return (Math.round(x / p) * p).toFixed(isFinite(d) ? d : 0); };
const labCalc = {
  bva(v){
    const a = Math.round(v.min), b = Math.round(v.max);
    if (!isFinite(a) || !isFinite(b)) return '<p class="muted">Nhập hai số nguyên.</p>';
    if (b < a) return '<p class="bad-t">Giá trị lớn nhất phải ≥ nhỏ nhất.</p>';
    const ok = x => x >= a && x <= b, uniq = xs => [...new Set(xs)].sort((x, y) => x - y).map(x => [x, ok(x)]);
    return `<div class="lab-r"><b>EP:</b> ${chips([['≤ ' + (a - 1), false], [a + '–' + b, true], ['≥ ' + (b + 1), false]])} → 3 vùng, tối thiểu 3 ca.</div>
      <div class="lab-r"><b>BVA 2 giá trị:</b> ${chips(uniq([a - 1, a, b, b + 1]))}</div><div class="lab-r"><b>BVA 3 giá trị:</b> ${chips(uniq([a - 1, a, a + 1, b - 1, b, b + 1]))}</div>`;
  },
  risk(v){
    const s = v.l * v.i, lv = s >= 15 ? ['Cao', 'no'] : s >= 8 ? ['Trung bình', ''] : ['Thấp', 'ok'];
    const act = s >= 15 ? 'Kiểm thử sớm và kỹ: review từ yêu cầu, kỹ thuật hình thức, bao phủ nghiêm ngặt, độc lập cao, hồi quy ưu tiên.' : s >= 8 ? 'Kiểm thử có hệ thống với mức bao phủ vừa phải; đưa vào bộ hồi quy theo ưu tiên.' : 'Kiểm thử dựa trên kinh nghiệm hoặc smoke test có thể là đủ.';
    return `<div class="lab-r"><b>Mức rủi ro:</b> ${v.l} × ${v.i} = <b>${s}</b> <span class="vchip ${lv[1]}">${lv[0]}</span></div><p class="small">${act}</p>`;
  },
  dt(v){
    const cs = parseLines(v.conds).slice(0, 5).map(l => { const [n, vals] = l.split(':'); const vs = (vals || '').split(',').map(x => x.trim()).filter(Boolean); return [n.trim(), vs.length ? vs : ['C', 'K']]; });
    if (!cs.length) return '<p class="muted">Nhập ít nhất một điều kiện.</p>';
    const total = cs.reduce((a, c) => a * c[1].length, 1);
    let cols = [[]]; cs.forEach(c => { cols = cols.flatMap(p => c[1].map(x => p.concat(x))); });
    const show = cols.slice(0, 48);
    return `<div class="lab-r"><b>Số quy tắc của bảng đầy đủ:</b> ${cs.map(c => c[1].length).join(' × ')} = <b>${total}</b>. Đây cũng là checksum của bảng gốc.</div>
      <div class="tablewrap"><table><thead><tr><th>Điều kiện</th>${show.map((_, i) => `<th>R${i + 1}</th>`).join('')}</tr></thead><tbody>${cs.map((c, ci) => `<tr><td>${esc(c[0])}</td>${show.map(col => `<td class="mono">${esc(col[ci])}</td>`).join('')}</tr>`).join('')}<tr><td><i>Hành động</i></td>${show.map(() => '<td>?</td>').join('')}</tr></tbody></table></div>
      ${total > 48 ? '<p class="small muted">Chỉ hiển thị 48 quy tắc đầu.</p>' : ''}<p class="small">Gộp hai quy tắc khi chúng có cùng hành động, chỉ khác đúng một điều kiện và phủ hết giá trị của điều kiện đó → thay bằng “–”. Mỗi “–” nhân điểm checksum của quy tắc với số giá trị của điều kiện đó.</p>`;
  },
  domain(v){
    const op = v.op, x = +v.v, p = Math.abs(+v.p) || 1;
    if (!isFinite(x)) return '<p class="muted">Nhập giá trị biên.</p>';
    const f = n => fmt(n, p), closed = ['≤', '≥', '='].includes(op);
    const inside = {'<': -1, '≤': -1, '>': 1, '≥': 1}[op];
    let on, off, inn, out;
    if (op === '='){ on = [f(x)]; off = [f(x - p), f(x + p)]; inn = []; out = [f(x - 10 * p), f(x + 10 * p)]; }
    else if (op === '≠'){ on = [f(x - p), f(x + p)]; off = [f(x)]; inn = [f(x - 10 * p), f(x + 10 * p)]; out = []; }
    else { on = [closed ? f(x) : f(x + inside * p)]; off = [closed ? f(x - inside * p) : f(x)]; inn = [f(x + inside * 10 * p)]; out = [f(x - inside * 10 * p)]; }
    const simp = op === '=' ? on.concat(off) : op === '≠' ? off.concat(on) : on.concat(off);
    const rel = op === '=' || op === '≠' ? simp : on.concat(off, inn, out);
    return `<div class="lab-r"><b>Biên:</b> x ${op} ${f(x)} là biên <b>${closed ? 'ĐÓNG' : 'MỞ'}</b> – giá trị ${f(x)} ${closed ? 'thuộc' : 'không thuộc'} phân vùng.</div>
      <div class="lab-r"><b>ON:</b> ${chips(on.map(a => [a, true]))} <b>OFF:</b> ${chips(off.map(a => [a, false]))}${inn.length ? ` <b>IN:</b> ${chips(inn.map(a => [a, true]))}` : ''}${out.length ? ` <b>OUT:</b> ${chips(out.map(a => [a, false]))}` : ''}</div>
      <div class="lab-r"><b>Simplified (${simp.length}):</b> ${esc(simp.join(', '))}</div><div class="lab-r"><b>Reliable (${rel.length}):</b> ${esc(rel.join(', '))}</div>
      <p class="small muted">Xanh = thuộc phân vùng, đỏ = ngoài phân vùng. IN/OUT chỉ là ví dụ; bất kỳ điểm nào trong/ngoài vùng mà không phải ON/OFF đều được.</p>`;
  },
  pairwise(v){
    const ps = parseLines(v.params).slice(0, 8).map(l => { const [n, vals] = l.split(':'); return [n.trim(), [...new Set((vals || '').split(',').map(x => x.trim()).filter(Boolean))].slice(0, 6)]; }).filter(p => p[1].length);
    if (ps.length < 2) return '<p class="muted">Cần ít nhất hai tham số, mỗi tham số ít nhất một giá trị.</p>';
    const ns = ps.map(p => p[1].length), full = ns.reduce((a, b) => a * b, 1), base = 1 + ns.reduce((a, b) => a + b - 1, 0);
    const srt = ns.slice().sort((a, b) => b - a), lower = srt[0] * srt[1];
    const pairs = new Set(); for (let i = 0; i < ns.length; i++) for (let j = i + 1; j < ns.length; j++) for (let a = 0; a < ns[i]; a++) for (let b = 0; b < ns[j]; b++) pairs.add(i + ':' + a + '|' + j + ':' + b);
    const totalPairs = pairs.size, rows = [];
    let guard = 0;
    while (pairs.size && guard++ < 500){
      let best = null, bestN = -1;
      for (let t = 0; t < 60; t++){
        const first = [...pairs][t === 0 ? 0 : Math.floor(Math.random() * pairs.size)].split('|').map(s => s.split(':').map(Number));
        const row = Array(ns.length).fill(-1); row[first[0][0]] = first[0][1]; row[first[1][0]] = first[1][1];
        shuffle([...ns.keys()]).forEach(k => { if (row[k] >= 0) return; let bv = 0, bc = -1; for (let val = 0; val < ns[k]; val++){ let c = 0; row.forEach((rv, m) => { if (rv < 0 || m === k) return; const key = m < k ? m + ':' + rv + '|' + k + ':' + val : k + ':' + val + '|' + m + ':' + rv; if (pairs.has(key)) c++; }); if (c > bc){ bc = c; bv = val; } } row[k] = bv; });
        let n = 0; for (let i = 0; i < ns.length; i++) for (let j = i + 1; j < ns.length; j++) if (pairs.has(i + ':' + row[i] + '|' + j + ':' + row[j])) n++;
        if (n > bestN){ bestN = n; best = row; }
      }
      for (let i = 0; i < ns.length; i++) for (let j = i + 1; j < ns.length; j++) pairs.delete(i + ':' + best[i] + '|' + j + ':' + best[j]);
      rows.push(best);
    }
    return `<div class="lab-r"><b>Tổ hợp đầy đủ:</b> ${ns.join(' × ')} = ${full} · <b>Base choice:</b> 1 + ${ns.map(n => n - 1).join(' + ')} = <b>${base}</b> ca</div>
      <div class="lab-r"><b>Pairwise:</b> ${totalPairs} mục bao phủ (cặp) · cận dưới ${srt[0]} × ${srt[1]} = <b>${lower}</b> ca · bộ sinh ra dưới đây có <b>${rows.length}</b> ca</div>
      <div class="tablewrap"><table><thead><tr><th>#</th>${ps.map(p => `<th>${esc(p[0])}</th>`).join('')}</tr></thead><tbody>${rows.map((r, i) => `<tr><td class="num">${i + 1}</td>${r.map((x, k) => `<td>${esc(ps[k][1][x])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <p class="small muted">Bộ pairwise sinh bằng thuật toán tham lam nên có thể nhiều hơn cận dưới vài ca; bấm sửa nội dung để sinh lại.</p>`;
  },
  nswitch(v){
    const tr = parseLines(v.tr).map(l => { const [ft, ev] = l.split(':'); const [a, b] = (ft || '').split('>').map(s => (s || '').trim()); return a && b ? {a, b, e: (ev || '').trim()} : null; }).filter(Boolean);
    if (!tr.length) return '<p class="muted">Nhập ít nhất một chuyển đổi dạng “A > B”.</p>';
    const lab = (t, i) => 'T' + (i + 1);
    const one = []; tr.forEach((x, i) => tr.forEach((y, j) => { if (x.b === y.a) one.push([i, j]); }));
    let two = 0; one.forEach(([i, j]) => tr.forEach(z => { if (tr[j].b === z.a) two++; }));
    const states = [...new Set(tr.flatMap(t => [t.a, t.b]))];
    return `<div class="lab-r"><b>Trạng thái (${states.length}):</b> ${esc(states.join(', '))}</div>
      <div class="lab-r"><b>0-switch (${tr.length}):</b> ${tr.map((t, i) => esc(lab(t, i) + ' ' + t.a + '→' + t.b)).join(' · ')}</div>
      <div class="lab-r"><b>1-switch (${one.length}):</b> ${one.length ? one.map(([i, j]) => `(T${i + 1}, T${j + 1})`).join(' ') : 'không có'}</div>
      <div class="lab-r"><b>2-switch:</b> ${two}</div><p class="small muted">1-switch = cặp chuyển đổi vào–ra tại một trạng thái (số vào × số ra ở mỗi trạng thái, cộng lại).</p>`;
  },
  ddp(v){
    const f = Math.max(0, +v.f || 0), e = Math.max(0, +v.e || 0), x = Math.min(e, Math.max(0, +v.x || 0)), esc2 = e - x;
    const ddp = f + esc2 ? f * 100 / (f + esc2) : 0;
    return `<div class="lab-r"><b>DDP</b> = ${f} / (${f} + ${esc2}) = <b>${ddp.toFixed(1)}%</b> <span class="small muted">(đã loại ${x} lỗi cấp này không thể phát hiện)</span></div>
      <div class="lab-r"><b>Nếu coi đây là trước/sau phát hành, DRE</b> = ${f} / (${f} + ${e}) = <b>${(f + e ? f * 100 / (f + e) : 0).toFixed(1)}%</b></div>`;
  }
};
function initLabs(root){
  root.querySelectorAll('.lab[data-lab]').forEach(el => {
    const kind = el.dataset.lab, out = el.querySelector('.lab-out');
    const run = () => { const v = {}; el.querySelectorAll('[data-k]').forEach(i => { v[i.dataset.k] = i.type === 'number' || i.type === 'range' ? parseFloat(i.value) : i.value; const s = el.querySelector(`[data-show="${i.dataset.k}"]`); if (s) s.textContent = i.value; });
      try { out.innerHTML = labCalc[kind](v); } catch(e){ out.innerHTML = '<p class="bad-t">Dữ liệu chưa hợp lệ.</p>'; } };
    el.querySelectorAll('[data-k]').forEach(i => i.addEventListener('input', run)); run();
  });
}

/* ---------- Trang chủ của chứng chỉ ---------- */
function stats(){
  let done = 0, right = 0; cert.bank.forEach(q => { const h = hist[q.id]; if (h){ done++; if (h.last) right++; } });
  return {done, right, total: cert.bank.length, secs: SECTIONS.filter(s => secDone[s.id]).length, secTotal: SECTIONS.length, att: attempts.length, best: attempts.length ? Math.max(...attempts.map(a => a.score)) : null};
}
function dailyQ(){
  const d = new Date(), key = d.toISOString().slice(0, 10), r = rng(hash(ID + key));
  return {key, q: cert.bank[Math.floor(r() * cert.bank.length)], n: Math.floor((d - new Date(2026, 0, 1)) / 864e5) + 1};
}
function streak(){ let s = 0; const d = new Date(); for (;;){ const k = d.toISOString().slice(0, 10); if (daily[k]) { s++; d.setDate(d.getDate() - 1); } else break; } return s; }
function viewHome(){
  const s = stats(), d = dailyQ(), dd = daily[d.key], ex = cert.exam;
  const nextSec = SECTIONS.find(x => !secDone[x.id]);
  app.innerHTML = `<section class="ta-hero"><span class="eyebrow">ISTQB ${esc(LABEL)} · Việt – Anh</span>
    <h1 class="h1">${esc(cert.name)}</h1>
    <p class="lead">Học từng mục tiêu học tập (LO) với ví dụ thực tế và bài tập có lời giải, luyện ${cert.bank.length} câu hỏi song ngữ, rồi vào phòng thi mô phỏng đề thật: ${ex.count} câu, ${ex.total} điểm, ${ex.minutes} phút.</p>
    <div class="row"><a class="btn" href="#learn${nextSec ? '/' + nextSec.id : ''}">${s.secs ? 'Học tiếp' : 'Bắt đầu học'}</a><a class="btn ghost" href="#practice">Luyện tập</a><a class="btn ghost" href="#exam">Vào phòng thi</a></div></section>
    <div class="ta-stats">
      <div class="ta-stat"><b>${s.secs}/${s.secTotal}</b><span>mục đã học</span><div class="ta-bar"><i style="width:${pct(s.secs, s.secTotal)}%"></i></div></div>
      <div class="ta-stat"><b>${s.done}/${s.total}</b><span>câu đã làm · đúng ${pct(s.right, s.done)}%</span><div class="ta-bar"><i style="width:${pct(s.done, s.total)}%"></i></div></div>
      <div class="ta-stat"><b>${s.best === null ? '–' : s.best + '/' + ex.total}</b><span>điểm thi thử cao nhất · ${s.att} lần thi</span><div class="ta-bar"><i style="width:${pct(s.best || 0, ex.total)}%"></i></div></div>
    </div>
    <div class="ta-grid2">
      <section class="ta-card"><div class="row between"><h2 class="h2">Câu hỏi của ngày #${d.n}</h2><span class="small muted">${streak() ? 'Chuỗi ' + streak() + ' ngày' : ''}</span></div>
        <div id="dq">${dd ? `${quizReview(d.q, dd.sel)}` : quizHTML(d.q)}</div>
        ${dd ? `<div class="row"><button class="btn ghost sm" id="dShare">Chia sẻ kết quả</button></div>` : ''}</section>
      <section class="ta-card"><h2 class="h2">Cấu trúc đề thi</h2>
        <div class="tablewrap"><table><tbody>
          <tr><td>Số câu</td><td class="num">${ex.count}</td></tr><tr><td>Tổng điểm</td><td class="num">${ex.total}</td></tr>
          <tr><td>Điểm đạt</td><td class="num">${ex.pass} (${pct(ex.pass, ex.total)}%)</td></tr><tr><td>Thời gian</td><td class="num">${ex.minutes} phút (+${ex.extra} nếu không thi bằng tiếng mẹ đẻ)</td></tr>
          <tr><td>Điểm mỗi câu</td><td class="num">K2 = 1 · K3 = 2 · K4 = 3</td></tr></tbody></table></div>
        <h3 class="sec">Theo chương</h3>
        <div class="tablewrap"><table><thead><tr><th>Chương</th><th class="num">Câu</th><th class="num">Thời lượng</th></tr></thead><tbody>${cert.chapters.map(c => `<tr><td><a href="#learn/ch${c.n}">${c.n}. ${esc(c.title)}</a></td><td class="num">${c.exam}</td><td class="num">${c.time}′</td></tr>`).join('')}</tbody></table></div></section>
    </div>
    <p class="small muted">Tiến độ được lưu trên trình duyệt này. ${esc(cert.syllabusNote || '')} <a href="index.html#home">Quay về CTFL v4.0.1</a></p>`;
  bindQuiz(app, (q, ok, sel) => { daily[d.key] = {ok, sel}; save.daily(); setTimeout(() => { if (view() === 'home') viewHome(); }, 1800); });
  const sh = $('#dShare'); if (sh) sh.onclick = () => copy(`The QA Lab · Câu hỏi của ngày #${d.n} (ISTQB ${cert.code})\n${dd.ok ? 'Đúng' : 'Sai'}${streak() ? ' · chuỗi ' + streak() + ' ngày' : ''}\nThử sức: ${siteUrl()}`);
}
function quizReview(q, sel){
  const right = multi(q) ? q.a : [q.a], ok = isRight(q, sel || []);
  return `<div class="ta-q">${qMeta(q)}${qText(q)}<div class="ta-opts">${q.o.map((o, i) => `<div class="ta-opt ${right.includes(i) ? 'ok' : (sel || []).includes(i) ? 'no' : ''}"><span class="ta-let">${LET[i]}</span><span class="ta-otext">${optText(q, i)}</span></div>`).join('')}</div>
    <div class="callout ${ok ? 'good' : 'bad'}"><b>${ok ? 'Chính xác' : 'Đáp án: ' + ansText(q, right) + (sel && sel.length ? ' · bạn chọn ' + ansText(q, sel) : ' · bạn chưa trả lời')}</b>${md(q.e)}</div></div>`;
}

/* ---------- Học ---------- */
function learnTabs(cur){
  return `<div class="tabs" role="group" aria-label="Chọn chương">${LESSONS[0] ? `<a class="ta-tab" href="#learn/ch0" aria-current="${cur === 0}">Bắt đầu</a>` : ''}${cert.chapters.map(c => `<a class="ta-tab" href="#learn/ch${c.n}" aria-current="${cur === c.n}">Chương ${c.n}</a>`).join('')}<a class="ta-tab" href="#review" aria-current="${cur === 'review'}">Ôn nhanh</a></div>`;
}
function viewLearn(ch){
  if (ch === undefined) ch = (SECTIONS.find(s => !secDone[s.id]) || SECTIONS[0]).ch;
  const list = LESSONS[ch] || [], c = chap(ch);
  const doneN = list.filter(s => secDone[s.id]).length;
  let lastG = '';
  const items = list.map(s => {
    const g = s.id.split('.').slice(0, 2).join('.'), head = GROUPS[g] && g !== lastG ? `<li class="ta-group">${g} · ${esc(GROUPS[g])}</li>` : ''; lastG = g;
    const k = s.los[0] ? loK(s.los[0]) : '';
    return head + `<li><a class="ta-secitem ${secDone[s.id] ? 'done' : ''}" href="#learn/${s.id}"><span class="mono">${s.id}</span><span><b>${esc(s.title)}</b><span class="small muted" lang="en">${esc(s.en)}</span></span><span class="small muted">${k ? k + ' · ' : ''}${s.minutes}′</span><span class="ta-tick" aria-label="${secDone[s.id] ? 'Đã học' : 'Chưa học'}">${secDone[s.id] ? '✓' : ''}</span></a></li>`;
  }).join('');
  app.innerHTML = `<div class="row between"><div><span class="eyebrow">Bước 1 · Học</span><h1 class="h2 ta-title">${esc(LABEL)} theo chương</h1></div></div>${learnTabs(ch)}
    ${c ? `<section class="ta-card"><div class="row between"><div><h2 class="h2">Chương ${c.n}. ${esc(c.title)}</h2><span class="small muted" lang="en">${esc(EN.chapters[c.n] || '')}</span></div><span class="small muted">${c.time} phút theo syllabus · ${c.exam} câu trong đề</span></div>
      <div class="callout"><b>Chuyện thực tế</b>${md(c.story)}</div>
      <details class="ta-details"><summary>Kiến thức chính, bẫy đề và mẹo nhớ của chương</summary><ul class="pts">${c.points.map(p => `<li>${md(p)}</li>`).join('')}</ul>
      <div class="callout bad"><b>Bẫy đề</b><ul class="pts">${c.traps.map(p => `<li>${md(p)}</li>`).join('')}</ul></div><div class="callout good"><b>Mẹo nhớ</b>${md(c.mnemonic)}</div></details></section>`
      : `<section class="ta-card"><h2 class="h2">Bắt đầu</h2><p>Không thi, nhưng nên đọc trước: cấu trúc đề CTAL-TA và phần ôn lại CTFL.</p></section>`}
    <div class="row between"><span class="small muted">Đã học ${doneN}/${list.length} mục</span><div class="ta-bar wide"><i style="width:${pct(doneN, list.length)}%"></i></div></div>
    <ul class="ta-seclist">${items}</ul>`;
}
function viewSection(id){
  const s = secById[id]; if (!s) return viewLearn();
  const idx = SECTIONS.indexOf(s), prev = SECTIONS[idx - 1], next = SECTIONS[idx + 1];
  const maxK = s.los.map(loK).sort().pop();
  const qs = cert.bank.filter(q => s.los.includes(q.lo)).slice(0, maxK === 'K3' || maxK === 'K4' ? 4 : 3);
  app.innerHTML = `${learnTabs(s.ch)}<article class="ta-lesson">
    <div class="small muted"><a href="#learn/ch${s.ch}">${s.ch ? 'Chương ' + s.ch : 'Bắt đầu'}</a>${GROUPS[s.id.slice(0, 3)] && s.ch ? ' · ' + esc(GROUPS[s.id.slice(0, 3)]) : ''}</div>
    <h1 class="h1 ta-title"><span class="mono">${s.id}</span> ${esc(s.title)}</h1><p class="small muted" lang="en">${esc(s.en)} · khoảng ${s.minutes} phút</p>
    ${s.los.length ? `<div class="ta-los">${s.los.map(lo => `<div><span class="pill">${lo} · ${loK(lo)}</span> ${esc(loTxt(lo))}<br><span class="small muted" lang="en">${esc(EN.los[lo] || '')}</span></div>`).join('')}</div>` : ''}
    <div class="callout"><b>Ví dụ thực tế</b>${md(s.example)}</div>
    ${s.blocks.map(block).join('')}
    <section class="ta-summary"><h3 class="sec">Tóm tắt – ý cần nhớ</h3><ul class="pts">${s.summary.map(x => `<li>${md(x)}</li>`).join('')}</ul></section>
    ${s.terms && s.terms.length ? `<h3 class="sec">Thuật ngữ</h3><div class="tablewrap"><table><tbody>${s.terms.map(t => `<tr><td lang="en"><b>${esc(t[0])}</b></td><td>${esc(t[1])}</td></tr>`).join('')}</tbody></table></div>` : ''}
    ${qs.length ? `<h3 class="sec">Kiểm tra nhanh</h3>${langSwitch()}<div id="qc">${qs.map((q, i) => quizHTML(q, (i + 1) + '/' + qs.length)).join('')}</div>` : ''}
    <div class="row between ta-secnav">${prev ? `<a class="btn ghost sm" href="#learn/${prev.id}">← ${prev.id}</a>` : '<span></span>'}
      <button class="btn ${secDone[s.id] ? 'ghost' : ''}" id="done">${secDone[s.id] ? '✓ Đã hiểu – bỏ đánh dấu' : 'Đã hiểu mục này'}</button>
      ${next ? `<a class="btn ghost sm" href="#learn/${next.id}">${next.id} →</a>` : '<a class="btn ghost sm" href="#exam">Phòng thi →</a>'}</div></article>`;
  initLabs(app); bindQuiz(app); bindLang(() => viewSection(id));
  $('#done').onclick = () => { if (secDone[s.id]) delete secDone[s.id]; else { secDone[s.id] = Date.now(); toast('Đã đánh dấu ' + s.id); } save.secDone(); if (secDone[s.id] && next) location.hash = '#learn/' + next.id; else viewSection(id); };
}

/* ---------- Ôn nhanh ---------- */
let revCh = 0, revMode = 'list';
function viewReview(){
  const list = SECTIONS.filter(s => s.ch && (!revCh || s.ch === revCh));
  const stale = id => reviewed[id] && Date.now() - reviewed[id] > 3 * 864e5;
  app.innerHTML = `<div class="row between"><div><span class="eyebrow">Bước 1 · Học</span><h1 class="h2 ta-title">Ôn nhanh ${esc(LABEL)}</h1></div><button class="btn ghost sm" id="print">In / lưu PDF</button></div>${learnTabs('review')}
    <div class="row between"><div class="tabs" role="group" aria-label="Lọc chương"><button data-rc="0" aria-pressed="${!revCh}">Tất cả</button>${cert.chapters.map(c => `<button data-rc="${c.n}" aria-pressed="${revCh === c.n}">C${c.n}</button>`).join('')}</div>
    <div class="tabs" role="group" aria-label="Kiểu xem"><button data-rm="list" aria-pressed="${revMode === 'list'}">Danh sách</button><button data-rm="cards" aria-pressed="${revMode === 'cards'}">Thẻ tự kiểm tra</button></div></div>
    <p class="small muted">Đã ôn ${list.filter(s => reviewed[s.id]).length}/${list.length} mục. Mục ôn quá 3 ngày được nhắc “nên ôn lại”.</p>
    <div class="ta-review">${list.map(s => `<section class="ta-card ta-rev" data-id="${s.id}"><div class="row between"><h3 class="h3"><a href="#learn/${s.id}"><span class="mono">${s.id}</span> ${esc(s.title)}</a></h3>
      <label class="small"><input type="checkbox" data-rv="${s.id}" ${reviewed[s.id] ? 'checked' : ''}> ${stale(s.id) ? '<span class="bad-t">nên ôn lại</span>' : 'đã ôn'}</label></div>
      ${revMode === 'cards' ? `<details><summary>Nhớ lại ${s.summary.length} ý chính rồi bấm để kiểm tra</summary><ul class="pts">${s.summary.map(x => `<li>${md(x)}</li>`).join('')}</ul></details>` : `<ul class="pts">${s.summary.map(x => `<li>${md(x)}</li>`).join('')}</ul>`}</section>`).join('')}</div>`;
  $$('[data-rc]').forEach(b => b.onclick = () => { revCh = +b.dataset.rc; viewReview(); });
  $$('[data-rm]').forEach(b => b.onclick = () => { revMode = b.dataset.rm; viewReview(); });
  $$('[data-rv]').forEach(b => b.onchange = () => { if (b.checked) reviewed[b.dataset.rv] = Date.now(); else delete reviewed[b.dataset.rv]; save.reviewed(); viewReview(); });
  $('#print').onclick = () => { revMode = 'list'; viewReview(); setTimeout(() => window.print(), 50); };
}

/* ---------- Luyện tập ---------- */
const pcfg = {ch: 0, lo: '', mode: 'all', ids: null};
let pq = [], pos = 0, sess = {r: 0, n: 0};
function buildQueue(){
  let qs = pcfg.ids ? pcfg.ids.map(id => byId[id]).filter(Boolean) : cert.bank.filter(q => (!pcfg.ch || q.c === pcfg.ch) && (!pcfg.lo || q.lo === pcfg.lo));
  if (!pcfg.ids){ if (pcfg.mode === 'new') qs = qs.filter(q => !hist[q.id]); if (pcfg.mode === 'wrong') qs = qs.filter(q => hist[q.id] && !hist[q.id].last); }
  pq = shuffle(qs.map(q => q.id)); pos = 0; sess = {r: 0, n: 0};
}
function viewPractice(){
  if (!pq.length && !pcfg.ids) buildQueue();
  const los = Object.keys(cert.los).filter(lo => !pcfg.ch || lo.startsWith(cert.loPrefix + pcfg.ch + '.'));
  const q = byId[pq[pos]];
  app.innerHTML = `<div class="row between"><div><span class="eyebrow">Bước 2 · Luyện tập</span><h1 class="h2 ta-title">Luyện câu hỏi ${esc(LABEL)}</h1></div>${langSwitch()}</div>
    <div class="ta-card ta-filters">${pcfg.ids ? `<span>Đang luyện lại <b>${pcfg.ids.length}</b> câu đã chọn.</span><button class="btn ghost sm" id="pclear">Bỏ lọc</button>` : `
      <label>Chương <select id="pc"><option value="0">Tất cả</option>${cert.chapters.map(c => `<option value="${c.n}" ${c.n === pcfg.ch ? 'selected' : ''}>${c.n}. ${esc(c.title)}</option>`).join('')}</select></label>
      <label>LO <select id="pl"><option value="">Tất cả LO</option>${los.map(lo => `<option value="${lo}" ${lo === pcfg.lo ? 'selected' : ''}>${lo} · ${loK(lo)} · ${esc(loTxt(lo)).slice(0, 60)}</option>`).join('')}</select></label>
      <label>Câu <select id="pm"><option value="all">Tất cả</option><option value="new" ${pcfg.mode === 'new' ? 'selected' : ''}>Chưa làm</option><option value="wrong" ${pcfg.mode === 'wrong' ? 'selected' : ''}>Làm sai lần gần nhất</option></select></label>`}
    </div>
    <div class="row between"><span class="small muted">${pq.length ? `Câu ${Math.min(pos + 1, pq.length)}/${pq.length}` : ''} ${sess.n ? `· phiên này đúng ${sess.r}/${sess.n}` : ''}</span><span class="small muted">Phím: 1–5 hoặc A–E chọn · Enter kiểm tra / câu tiếp</span></div>
    <div id="pbox">${q ? quizHTML(q) : `<div class="ta-card"><p>${pq.length ? `Hết lượt. Bạn đúng <b>${sess.r}/${sess.n}</b> câu.` : 'Không có câu nào khớp bộ lọc.'}</p><button class="btn" id="again">Làm lại từ đầu</button></div>`}</div>
    <div class="row"><button class="btn ghost sm" id="pprev" ${pos ? '' : 'disabled'}>← Câu trước</button><button class="btn sm ta-next" id="pnext" ${q ? '' : 'disabled'}>Câu tiếp →</button></div>`;
  bindLang(viewPractice);
  bindQuiz(app, (qq, ok) => { sess.n++; if (ok) sess.r++; });
  const re = () => { buildQueue(); viewPractice(); };
  if ($('#pc')) $('#pc').onchange = e => { pcfg.ch = +e.target.value; pcfg.lo = ''; re(); };
  if ($('#pl')) $('#pl').onchange = e => { pcfg.lo = e.target.value; re(); };
  if ($('#pm')) $('#pm').onchange = e => { pcfg.mode = e.target.value; re(); };
  if ($('#pclear')) $('#pclear').onclick = () => { pcfg.ids = null; re(); };
  if ($('#again')) $('#again').onclick = re;
  $('#pprev').onclick = () => { pos = Math.max(0, pos - 1); viewPractice(); };
  $('#pnext').onclick = () => { pos++; viewPractice(); };
}

/* ---------- Thẻ thuật ngữ ---------- */
let cardCh = 0, cardIdx = 0, cardOnlyNew = false, cardFlip = false;
const cardList = () => cert.glossary.map((g, i) => ({g, i})).filter(x => (!cardCh || x.g[3] === cardCh) && (!cardOnlyNew || !known[x.i]));
function viewCards(){
  const l = cardList(); if (cardIdx >= l.length) cardIdx = 0; const c = l[cardIdx];
  app.innerHTML = `<div class="row between"><div><span class="eyebrow">Bước 2 · Luyện tập</span><h1 class="h2 ta-title">Thẻ thuật ngữ ${esc(cert.code)}</h1></div>
    <span class="small muted">${l.length ? cardIdx + 1 : 0}/${l.length} · đã thuộc ${Object.keys(known).length}/${cert.glossary.length}</span></div>
    <div class="ta-card ta-filters"><label>Chương <select id="fc"><option value="0">Tất cả</option>${cert.chapters.map(ch => `<option value="${ch.n}" ${ch.n === cardCh ? 'selected' : ''}>${ch.n}. ${esc(ch.title)}</option>`).join('')}</select></label>
      <label><input type="checkbox" id="fn" ${cardOnlyNew ? 'checked' : ''}> Chỉ thẻ chưa thuộc</label></div>
    ${c ? `<button class="ta-flash ${cardFlip ? 'flip' : ''}" id="flash" aria-label="Lật thẻ">${cardFlip ? `<span class="ta-flash-vi">${esc(c.g[1])}</span><span class="ta-flash-def">${esc(c.g[2])}</span><span class="small muted">Chương ${c.g[3]}</span>` : `<span class="ta-flash-en" lang="en">${esc(c.g[0])}</span><span class="small muted">Bấm hoặc nhấn Space để lật</span>`}</button>
    <div class="row ta-center"><button class="btn ghost sm" id="cprev">← Trước</button><button class="btn sm ${known[c.i] ? 'ghost' : ''}" id="cknow">${known[c.i] ? 'Bỏ “đã thuộc”' : 'Đã thuộc'}</button><button class="btn ghost sm" id="cnext">Sau →</button></div>` : '<div class="ta-card"><p>Bạn đã thuộc hết thẻ trong bộ lọc này.</p></div>'}`;
  $('#fc').onchange = e => { cardCh = +e.target.value; cardIdx = 0; cardFlip = false; viewCards(); };
  $('#fn').onchange = e => { cardOnlyNew = e.target.checked; cardIdx = 0; cardFlip = false; viewCards(); };
  if (!c) return;
  $('#flash').onclick = () => { cardFlip = !cardFlip; viewCards(); };
  $('#cprev').onclick = () => { cardIdx = (cardIdx - 1 + l.length) % l.length; cardFlip = false; viewCards(); };
  $('#cnext').onclick = () => { cardIdx = (cardIdx + 1) % l.length; cardFlip = false; viewCards(); };
  $('#cknow').onclick = () => { if (known[c.i]) delete known[c.i]; else { known[c.i] = 1; if (!cardOnlyNew) cardIdx = (cardIdx + 1) % l.length; } cardFlip = false; save.known(); viewCards(); };
}

/* ---------- Phòng thi ---------- */
function genExam(r){
  const ex = cert.exam, ids = [];
  if (ex.slots){
    ex.slots.forEach(s => {
      const pool = shuffle(cert.bank.filter(q => s.from.includes(q.lo) && !ids.includes(q.id)), r), pick = [], used = new Set();
      pool.forEach(q => { if (pick.length < s.n && !used.has(q.lo)){ pick.push(q.id); used.add(q.lo); } });
      pool.forEach(q => { if (pick.length < s.n && !pick.includes(q.id)) pick.push(q.id); });
      ids.push(...pick);
    });
  } else cert.chapters.forEach(c => ids.push(...shuffle(cert.bank.filter(q => q.c === c.n), r).slice(0, ex.dist[c.n]).map(q => q.id)));
  return ids;
}
const maxScore = ids => ids.reduce((a, id) => a + pts(byId[id]), 0);
function viewExam(){
  if (active) return viewRun();
  const ex = cert.exam, wk = isoWeek();
  app.innerHTML = `<div><span class="eyebrow">Bước 3 · Phòng thi</span><h1 class="h1 ta-title">Phòng thi thử ${esc(LABEL)}</h1></div>
    <div class="ta-grid2"><section class="ta-card"><h2 class="h2">Thủ tục vào phòng</h2>
      <label class="lab-f wide"><span>Tên thí sinh (không bắt buộc)</span><input id="ename" maxlength="40" value="${esc(store.get('name', ''))}"></label>
      <div class="ta-choices"><label class="choice"><input type="radio" name="kind" value="random" checked><span><b>Đề ngẫu nhiên</b><br><span class="small muted">Rút mới từ ${cert.bank.length} câu, đúng phân bổ LO của đề mẫu ISTQB</span></span></label>
      <label class="choice"><input type="radio" name="kind" value="week"><span><b>${wk.label}</b><br><span class="small muted">Mọi người cùng làm một đề trong tuần để so điểm</span></span></label></div>
      <label class="small"><input type="checkbox" id="eextra"> Thi bằng ngôn ngữ không phải tiếng mẹ đẻ (+25%: ${ex.minutes + ex.extra} phút)</label>
      <label class="small"><input type="checkbox" id="ebi" ${lang !== 'vi' ? 'checked' : ''}> Hiện song ngữ Việt – Anh</label>
      <div class="row"><button class="btn" id="estart">Bắt đầu làm bài</button></div></section>
      <section class="ta-card"><h2 class="h2">Quy chế</h2><ul class="pts">
        <li>${ex.count} câu, tổng ${ex.total} điểm, đạt từ <b>${ex.pass}</b> điểm (${pct(ex.pass, ex.total)}%). Thời gian ${ex.minutes} phút.</li>
        <li>Điểm mỗi câu theo mức K: K2 = 1, K3 = 2, K4 = 3. Câu “Chọn 2” phải đúng cả hai mới có điểm. Không trừ điểm câu sai.</li>
        <li>Phân bổ: ${cert.chapters.map(c => 'C' + c.n + ': ' + c.exam).join(' · ')} câu.</li>
        <li>Bài làm tự lưu; tải lại trang vẫn tiếp tục được. Hết giờ hệ thống tự nộp.</li>
        <li>Phím tắt: 1–5 hoặc A–E chọn, ← → chuyển câu, F đánh dấu.</li></ul></section></div>
    ${attempts.length ? `<section class="ta-card"><h2 class="h2">Lịch sử thi</h2><div class="tablewrap"><table><thead><tr><th>Ngày</th><th>Đề</th><th class="num">Điểm</th><th>Kết quả</th><th></th></tr></thead><tbody>${attempts.slice().reverse().map(a => `<tr><td>${new Date(a.finishedAt).toLocaleString('vi-VN')}</td><td>${esc(a.week || 'Ngẫu nhiên')}</td><td class="num">${a.score}/${a.total}</td><td>${a.score >= ex.pass ? '<span class="vchip ok">Đạt</span>' : '<span class="vchip no">Chưa đạt</span>'}</td><td><a href="#result/${a.id}">Xem</a></td></tr>`).join('')}</tbody></table></div></section>` : ''}`;
  $('#estart').onclick = () => {
    const name = $('#ename').value.trim(); store.set('name', name);
    const kind = (document.querySelector('input[name=kind]:checked') || {}).value || 'random';
    const extra = $('#eextra').checked, minutes = ex.minutes + (extra ? ex.extra : 0), now = Date.now();
    const r = kind === 'week' ? rng(hash(ID + '-week-' + wk.y + '-' + wk.w)) : Math.random;
    lang = $('#ebi').checked ? 'bi' : 'vi'; save.lang();
    const qids = genExam(r);
    active = {id: 'a' + now, cert: ID, name, kind, week: kind === 'week' ? wk.label : null, startedAt: now, endsAt: now + minutes * 60000, minutes, qids, ans: {}, flags: {}, idx: 0};
    save.active(); location.hash = '#exam'; viewRun();
  };
}
let timerH = null;
function viewRun(){
  const a = active, q = byId[a.qids[a.idx]], sel = a.ans[q.id] || [];
  const answered = a.qids.filter(id => (a.ans[id] || []).length).length;
  app.innerHTML = `<div class="ta-examhead"><div><span class="eyebrow">Phòng thi · ${esc(LABEL)}</span><div class="small">${esc(a.name || 'Thí sinh')} · ${esc(a.week || 'Đề ngẫu nhiên')} · ${a.minutes} phút</div></div>
      <div class="ta-timer" id="timer" aria-live="off"></div><button class="btn sm" id="submit">Nộp bài</button></div>
    <div class="ta-examgrid"><section class="ta-card"><div class="row between"><b>Câu ${a.idx + 1}/${a.qids.length}</b><button class="btn ghost sm ${a.flags[q.id] ? 'ta-flagged' : ''}" id="flag">${a.flags[q.id] ? '⚑ Đã đánh dấu' : '⚐ Đánh dấu xem lại'}</button></div>
      <div class="ta-q">${qMeta(q)}${qText(q)}<div class="ta-opts" role="group">${q.o.map((o, i) => `<button class="ta-opt" data-i="${i}" aria-pressed="${sel.includes(i)}"><span class="ta-let">${LET[i]}</span><span class="ta-otext">${optText(q, i)}</span></button>`).join('')}</div>
      ${multi(q) ? `<p class="small muted">Chọn ${need(q)} phương án. Đã chọn ${sel.length}.</p>` : ''}</div>
      <div class="row between"><button class="btn ghost sm" id="eprev" ${a.idx ? '' : 'disabled'}>← Câu trước</button><button class="btn sm" id="enext">${a.idx < a.qids.length - 1 ? 'Câu tiếp →' : 'Xem tổng quan'}</button></div></section>
      <aside class="ta-card"><div class="small muted">Đã trả lời ${answered}/${a.qids.length} · đánh dấu ${Object.keys(a.flags).length}</div><div class="ta-navgrid">${a.qids.map((id, i) => `<button data-go="${i}" class="${(a.ans[id] || []).length ? 'ans' : ''} ${a.flags[id] ? 'flag' : ''} ${i === a.idx ? 'cur' : ''}" aria-label="Câu ${i + 1}">${i + 1}</button>`).join('')}</div>
      <p class="small muted">Ô đậm: đã trả lời · viền cam: đánh dấu.</p></aside></div>`;
  $$('.ta-opt').forEach(b => b.onclick = () => {
    const i = +b.dataset.i; let s = a.ans[q.id] || [];
    s = multi(q) ? (s.includes(i) ? s.filter(x => x !== i) : s.concat(i).slice(-need(q))) : (s[0] === i ? [] : [i]);
    a.ans[q.id] = s; save.active(); viewRun();
  });
  $('#flag').onclick = () => { if (a.flags[q.id]) delete a.flags[q.id]; else a.flags[q.id] = 1; save.active(); viewRun(); };
  $('#eprev').onclick = () => { a.idx--; save.active(); viewRun(); };
  $('#enext').onclick = () => { if (a.idx < a.qids.length - 1){ a.idx++; save.active(); viewRun(); } else confirmSubmit(); };
  $$('[data-go]').forEach(b => b.onclick = () => { a.idx = +b.dataset.go; save.active(); viewRun(); });
  $('#submit').onclick = confirmSubmit;
  tick(); clearInterval(timerH); timerH = setInterval(tick, 1000);
}
function tick(){
  if (!active){ clearInterval(timerH); return; }
  const left = Math.max(0, active.endsAt - Date.now()), t = $('#timer');
  if (t){ const m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60; t.textContent = `${m}:${String(s).padStart(2, '0')}`; t.classList.toggle('low', left < 5 * 60000); }
  if (left <= 0) submit(true);
}
async function confirmSubmit(){
  const a = active, un = a.qids.filter(id => !(a.ans[id] || []).length).length, fl = Object.keys(a.flags).length;
  const ok = await modal(`<h2 class="h2">Nộp bài?</h2><p>${un ? `Còn <b>${un}</b> câu chưa trả lời. ` : 'Bạn đã trả lời mọi câu. '}${fl ? `Có ${fl} câu đang đánh dấu xem lại.` : ''}</p>`, [['Làm tiếp', false, 'ghost'], ['Nộp bài', true]]);
  if (ok) submit(false);
}
function submit(auto){
  const a = active; if (!a) return; clearInterval(timerH);
  let score = 0; const byCh = {}, wrongLos = {};
  a.qids.forEach(id => { const q = byId[id], ok = isRight(q, a.ans[id] || []), p = pts(q); const b = byCh[q.c] || [0, 0]; b[1] += p; if (ok){ b[0] += p; score += p; } else wrongLos[q.lo] = (wrongLos[q.lo] || 0) + 1; byCh[q.c] = b; record(id, ok); });
  const res = Object.assign({}, a, {finishedAt: Date.now(), score, total: maxScore(a.qids), byCh, wrongLos, auto});
  delete res.idx; attempts.push(res); if (attempts.length > 50) attempts = attempts.slice(-50); save.attempts();
  active = null; save.active(); location.hash = '#result/' + res.id;
}
let revWrongOnly = false;
function viewResult(id){
  const a = attempts.find(x => x.id === id); if (!a){ location.hash = '#exam'; return; }
  const ex = cert.exam, pass = a.score >= ex.pass, used = Math.round((a.finishedAt - a.startedAt) / 60000);
  const wrong = Object.entries(a.wrongLos).sort((x, y) => y[1] - x[1]);
  const shown = a.qids.filter(qid => !revWrongOnly || !isRight(byId[qid], a.ans[qid] || []));
  app.innerHTML = `<div class="row between"><div><span class="eyebrow">Kết quả thi thử</span><h1 class="h1 ta-title">${esc(LABEL)} · ${esc(a.week || 'Đề ngẫu nhiên')}</h1></div><a class="btn ghost sm" href="#exam">Về phòng thi</a></div>
    <section class="ta-card ta-score ${pass ? 'pass' : 'fail'}"><div><b class="ta-big">${a.score}<small>/${a.total}</small></b><span>${pct(a.score, a.total)}% · ${pass ? 'ĐẠT' : 'CHƯA ĐẠT'} (mức đạt ${ex.pass})</span></div>
      <div class="small">${a.auto ? 'Hết giờ, hệ thống tự nộp. ' : ''}Thời gian làm: ${used} phút · Đúng ${a.qids.filter(q => isRight(byId[q], a.ans[q] || [])).length}/${a.qids.length} câu</div>
      <div class="row"><button class="btn sm" id="copyres">Sao chép kết quả</button><button class="btn ghost sm" id="retry" ${wrong.length ? '' : 'disabled'}>Luyện lại câu sai</button><a class="btn ghost sm" href="#exam" id="newexam">Thi đề mới</a></div></section>
    <div class="ta-grid2"><section class="ta-card"><h2 class="h2">Điểm theo chương</h2><div class="tablewrap"><table><tbody>${cert.chapters.map(c => { const b = a.byCh[c.n] || [0, 0], p = pct(b[0], b[1]); return `<tr><td>${c.n}. ${esc(c.title)}</td><td class="num">${b[0]}/${b[1]}</td><td style="width:30%"><div class="ta-bar"><i class="${p < 65 ? 'low' : ''}" style="width:${p}%"></i></div></td></tr>`; }).join('')}</tbody></table></div></section>
      <section class="ta-card"><h2 class="h2">Mục tiêu học tập cần ôn lại</h2>${wrong.length ? `<div class="tablewrap"><table><tbody>${wrong.map(([lo, n]) => { const s = secOfLo(lo); return `<tr><td class="mono" style="white-space:nowrap">${lo}</td><td>${esc(loTxt(lo))}<br><span class="small muted">${n} câu sai · ${loK(lo)}</span></td><td>${s ? `<a href="#learn/${s.id}">Học lại</a>` : ''}</td></tr>`; }).join('')}</tbody></table></div>` : '<p>Bạn không sai câu nào. Tuyệt vời!</p>'}</section></div>
    <section class="ta-card"><div class="row between"><h2 class="h2">Xem lại đáp án</h2><div class="row">${langSwitch()}<label class="small"><input type="checkbox" id="wonly" ${revWrongOnly ? 'checked' : ''}> Chỉ câu sai</label></div></div>
      ${shown.map(qid => `<div class="ta-revq"><div class="small muted">Câu ${a.qids.indexOf(qid) + 1}</div>${quizReview(byId[qid], a.ans[qid] || [])}</div>`).join('') || '<p>Không có câu sai.</p>'}</section>`;
  bindLang(() => viewResult(id));
  $('#wonly').onchange = e => { revWrongOnly = e.target.checked; viewResult(id); };
  $('#copyres').onclick = () => copy(`The QA Lab · Thi thử ISTQB ${LABEL}${a.week ? ' · ' + a.week : ''}\n${a.name ? 'Thí sinh: ' + a.name + '\n' : ''}Điểm: ${a.score}/${a.total} (${pct(a.score, a.total)}%) · ${pass ? 'ĐẠT' : 'CHƯA ĐẠT'}\n` + cert.chapters.map(c => { const b = a.byCh[c.n] || [0, 0]; return `C${c.n}: ${b[0]}/${b[1]}`; }).join(' · ') + `\nThi thử miễn phí: ${siteUrl()}`);
  $('#retry').onclick = () => { pcfg.ids = a.qids.filter(q => !isRight(byId[q], a.ans[q] || [])); buildQueue(); location.hash = '#practice'; };
  if (pass) toast('Chúc mừng, bạn đã đạt!');
}

/* ---------- Phím tắt ---------- */
function help(){
  modal(`<h2 class="h2">Phím tắt</h2><div class="tablewrap"><table><tbody>
    <tr><td><kbd>1</kbd>–<kbd>5</kbd> hoặc <kbd>A</kbd>–<kbd>E</kbd></td><td>Chọn phương án</td></tr><tr><td><kbd>Enter</kbd></td><td>Kiểm tra (câu chọn hai) hoặc sang câu tiếp</td></tr>
    <tr><td><kbd>←</kbd> <kbd>→</kbd></td><td>Câu trước / sau (luyện tập, phòng thi), thẻ trước / sau</td></tr><tr><td><kbd>F</kbd></td><td>Đánh dấu câu trong phòng thi</td></tr>
    <tr><td><kbd>Space</kbd></td><td>Lật thẻ thuật ngữ</td></tr><tr><td><kbd>G</kbd> rồi <kbd>H/L/P/T/E</kbd></td><td>Tổng quan, Học, Luyện tập, Thẻ, Phòng thi</td></tr><tr><td><kbd>?</kbd></td><td>Bảng này</td></tr></tbody></table></div>`, [['Đóng', null]]);
}
let gKey = false;
document.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey || document.querySelector('.ta-modal')) return;
  const tag = (e.target.tagName || '').toLowerCase(); if (['input', 'textarea', 'select'].includes(tag)) return;
  const k = e.key, v = view();
  if (k === '?'){ e.preventDefault(); help(); return; }
  if (gKey){ gKey = false; const m = {h: '#home', l: '#learn', p: '#practice', t: '#cards', e: '#exam', r: '#review'}[k.toLowerCase()]; if (m){ location.hash = m; e.preventDefault(); } return; }
  if (k.toLowerCase() === 'g'){ gKey = true; setTimeout(() => gKey = false, 1200); return; }
  const n = /^[1-5]$/.test(k) ? +k - 1 : /^[a-e]$/i.test(k) && k.length === 1 ? LET.indexOf(k.toUpperCase()) : -1;
  if (v === 'run' && active){
    if (n >= 0){ const b = document.querySelector(`.ta-opt[data-i="${n}"]`); if (b){ b.click(); e.preventDefault(); } }
    else if (k === 'ArrowRight' || k === 'Enter'){ const b = $('#enext'); if (b) b.click(); }
    else if (k === 'ArrowLeft'){ const b = $('#eprev'); if (b && !b.disabled) b.click(); }
    else if (k.toLowerCase() === 'f') $('#flag').click();
    return;
  }
  if (v === 'cards'){ if (k === ' '){ e.preventDefault(); const f = $('#flash'); if (f) f.click(); } else if (k === 'ArrowRight' && $('#cnext')) $('#cnext').click(); else if (k === 'ArrowLeft' && $('#cprev')) $('#cprev').click(); return; }
  const live = document.querySelector('.ta-q[data-live]');
  if (live && n >= 0){ const b = live.querySelector(`.ta-opt[data-i="${n}"]`); if (b){ b.click(); e.preventDefault(); } return; }
  if (k === 'Enter'){ if (live){ const c = live.querySelector('.ta-check'); if (c && !c.disabled){ c.click(); e.preventDefault(); } } else if (v === 'practice' && $('#pnext') && !$('#pnext').disabled){ $('#pnext').click(); e.preventDefault(); } return; }
  if (v === 'practice'){ if (k === 'ArrowRight' && !$('#pnext').disabled) $('#pnext').click(); else if (k === 'ArrowLeft' && !$('#pprev').disabled) $('#pprev').click(); }
});
if ($('#kbd')) $('#kbd').onclick = help;

/* ---------- Điều hướng ---------- */
function view(){ const h = location.hash.slice(1); if (active && h.startsWith('exam')) return 'run'; return h.split('/')[0] || 'home'; }
function render(){
  const h = location.hash.slice(1), [v, arg] = h.split('/');
  clearInterval(timerH);
  $$('#nav a[data-v]').forEach(x => x.setAttribute('aria-current', x.dataset.v === (v || 'home') || (x.dataset.v === 'learn' && v === 'review') ? 'page' : 'false'));
  if (v === 'learn') arg ? (arg.startsWith('ch') ? viewLearn(+arg.slice(2)) : viewSection(arg)) : viewLearn();
  else if (v === 'review') viewReview();
  else if (v === 'practice') viewPractice();
  else if (v === 'cards') viewCards();
  else if (v === 'exam') viewExam();
  else if (v === 'result') viewResult(arg);
  else viewHome();
  document.title = 'The QA Lab · ' + cert.code;
}
let lastV = null;
window.addEventListener('hashchange', () => { const v = location.hash.split('/')[0]; render(); if (v !== lastV || location.hash.startsWith('#learn/')) window.scrollTo(0, 0); lastV = v; });
if (active && Date.now() > active.endsAt) submit(true); else render();
window.QALAB_APP = {cert, genExam, isRight, labCalc};
})();
