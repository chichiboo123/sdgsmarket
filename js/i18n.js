// ── LANGUAGE ─────────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('sdg-lang') || 'ko';

function t(key) { return T[currentLang][key] ?? T.ko[key] ?? key; }

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('sdg-lang', lang);
    document.documentElement.lang = lang;
    document.getElementById('lang-menu').classList.add('hidden');
    document.getElementById('lang-toggle').setAttribute('aria-expanded', 'false');

    document.getElementById('lang-current-name').textContent = T[lang].langNative;

    ['ko','en','ja','id'].forEach(l => {
        const chk = document.getElementById(`chk-${l}`);
        const btn = document.querySelector(`[data-lang="${l}"]`);
        if (chk) chk.textContent = l === lang ? '✓' : '';
        if (btn) btn.classList.toggle('active', l === lang);
    });

    applyTranslations();
    updateCarouselText();
    renderGuideSteps();
    renderSDGCards();
    if (document.getElementById('cart-page').classList.contains('active')) renderCartPage();
    if (document.getElementById('checkout-page').classList.contains('active')) {
        _checkoutLang = null;  // 언어 변경 시에는 폼 전체 재렌더 허용
        renderCheckoutPage();
    }
    updateCartBar();
}

function toggleLangMenu(e) {
    e.stopPropagation();
    const menu = document.getElementById('lang-menu');
    const isHidden = menu.classList.toggle('hidden');
    document.getElementById('lang-toggle').setAttribute('aria-expanded', String(!isHidden));
}

document.addEventListener('click', () => {
    document.getElementById('lang-menu').classList.add('hidden');
    document.getElementById('lang-toggle').setAttribute('aria-expanded', 'false');
});

// ── TRANSLATIONS APPLY ────────────────────────────────────────────────────────
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const v = T[currentLang][el.dataset.i18n];
        if (typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const v = T[currentLang][el.dataset.i18nPh];
        if (v) el.placeholder = v;
    });
    const gs = document.getElementById('grade-select');
    if (gs) {
        gs.options[0].textContent = t('gradeSelect');
        for (let i = 1; i <= 6; i++) gs.options[i].textContent = t('gradeOption')(i);
    }
    const dm = document.getElementById('delivery-memos');
    if (dm) dm.innerHTML = T[currentLang].deliveryMemos.map(m =>
        `<label class="form-check"><input type="checkbox" name="deliveryMemos" value="${m}"><span>${m}</span></label>`
    ).join('');
    const pm = document.getElementById('payment-methods');
    if (pm) pm.innerHTML = T[currentLang].paymentMethods.map((m, i) =>
        `<label class="form-check"><input type="checkbox" name="paymentMethod" value="${T[currentLang].paymentValues[i]}"><span>${m}</span></label>`
    ).join('');
    const pr = document.getElementById('plan-radios');
    if (pr) {
        pr.innerHTML = T[currentLang].planMethods.map((m, i) =>
            `<label class="form-radio"><input type="radio" name="planMethod" value="${T[currentLang].planValues[i]}" ${i===0?'checked':''} onchange="updatePlanMethod()"><span>${m}</span></label>`
        ).join('');
        updatePlanMethod();
    }
}
