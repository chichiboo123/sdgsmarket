// ── GUIDE MODAL ───────────────────────────────────────────────────────────────
function renderGuideSteps() {
    const el = document.getElementById('guide-steps');
    if (!el) return;
    el.innerHTML = T[currentLang].guideSteps.map((s, i) =>
        `<li class="guide-step">
            <span class="guide-num">${i+1}</span>
            <span class="guide-text"><strong>${s.label}:</strong> ${s.desc}</span>
        </li>`
    ).join('');
}
function openGuideModal() { document.getElementById('guide-modal').classList.add('active'); }
function closeGuideModal() { document.getElementById('guide-modal').classList.remove('active'); }

// ── SDGs INFO MODAL ───────────────────────────────────────────────────────────
function openSdgsInfoModal() {
    const el = document.getElementById('sdgs-info-goal-dots');
    if (el) {
        el.innerHTML = SDG_DATA.map(g =>
            `<div class="sdgs-goal-dot" style="background:${g.color};" title="SDG ${g.id}: ${(g[currentLang] || g.ko).title}">${g.id}</div>`
        ).join('');
    }
    document.getElementById('sdgs-info-modal').classList.add('active');
}
function closeSdgsInfoModal() {
    document.getElementById('sdgs-info-modal').classList.remove('active');
}

// ── SDGs DICTIONARY MODAL ─────────────────────────────────────────────────────
function openSdgsDictModal() {
    renderSdgsDictionary();
    document.getElementById('sdgs-dict-modal').classList.add('active');
}
function closeSdgsDictModal() {
    document.getElementById('sdgs-dict-modal').classList.remove('active');
}

function toggleDictItem(id) {
    const body = document.getElementById('dict-body-' + id);
    const arrow = document.getElementById('dict-arrow-' + id);
    if (body) {
        const isOpen = body.classList.toggle('open');
        if (arrow) arrow.classList.toggle('open', isOpen);
    }
}

function renderSdgsDictionary() {
    const el = document.getElementById('sdgs-dict-content');
    if (!el) return;
    const html = SDG_DATA.map(function(goal) {
        const g = goal[currentLang] || goal.ko;
        const targets = g.targets || (goal.en && goal.en.targets) || [];
        const id = goal.id;
        const goalNum = id < 10 ? '0' + id : String(id);
        const pastelBg = hexAlpha(goal.color, 0.12);
        const pastelHover = hexAlpha(goal.color, 0.18);

        return '<div class="sdg-dict-item">' +
            '<div class="sdg-dict-header" data-dict-id="' + id + '" style="background:' + pastelBg + ';" ' +
                 'onmouseover="this.style.background=\'' + pastelHover + '\'" ' +
                 'onmouseout="this.style.background=\'' + pastelBg + '\'">' +
                '<span class="sdg-dict-num" style="background:' + goal.color + ';">SDG ' + goalNum + '</span>' +
                '<span class="sdg-dict-icon">' + goal.icon + '</span>' +
                '<div class="sdg-dict-title-wrap">' +
                    '<p class="sdg-dict-title">' + g.title + '</p>' +
                    '<p class="sdg-dict-subdesc">' + g.desc + '</p>' +
                '</div>' +
                '<span class="sdg-dict-toggle" id="dict-arrow-' + id + '">▼</span>' +
            '</div>' +
            '<div class="sdg-dict-body" id="dict-body-' + id + '">' +
                (targets.length > 0
                    ? '<ul class="sdg-dict-targets">' +
                        targets.map(function(tgt) {
                            return '<li><span class="sdg-dict-bullet" style="background:' + goal.color + ';"></span><span>' + tgt + '</span></li>';
                        }).join('') +
                      '</ul>'
                    : '<p style="font-size:0.8rem;color:var(--color-text-sub);">' + g.desc + '</p>') +
            '</div>' +
        '</div>';
    }).join('');
    el.innerHTML = html;

    if (!el._toggleInit) {
        el._toggleInit = true;
        el.addEventListener('click', function(e) {
            const header = e.target.closest('.sdg-dict-header[data-dict-id]');
            if (!header) return;
            toggleDictItem(parseInt(header.dataset.dictId, 10));
        });
    }
}
