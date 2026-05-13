// ── NAVIGATION ────────────────────────────────────────────────────────────────
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`${page}-page`).classList.add('active');
    if (page === 'cart') renderCartPage();
    else if (page === 'checkout') renderCheckoutPage();
    updateCartBar();
    window.scrollTo(0, 0);
}

// ── CHECKOUT SUBMIT ───────────────────────────────────────────────────────────
function handleCheckout(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const pm = fd.getAll('paymentMethod');
    if (!pm.length) { showToast(t('toastError'), t('errorPayment')); return; }
    const method = fd.get('planMethod') || 'text';
    showReceiptModal({
        student: { name: fd.get('name'), school: fd.get('school'), grade: fd.get('grade'), class: fd.get('class') || '' },
        actionPlan: { method, text: fd.get('actionPlanText') || '', drawing: (method !== 'text' && canvas && !isBlankCanvas(canvas)) ? canvas.toDataURL() : '' },
        goals: getCart(),
        date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString()
    });
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
let _toastTimer;
function showToast(title, desc) {
    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-desc').textContent = desc;
    const el = document.getElementById('toast');
    el.classList.add('show');
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

// ── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lang-current-name').textContent = T[currentLang].langNative;
    ['ko','en','ja','id'].forEach(l => {
        const chk = document.getElementById(`chk-${l}`);
        const btn = document.querySelector(`[data-lang="${l}"]`);
        if (chk) chk.textContent = l === currentLang ? '✓' : '';
        if (btn) btn.classList.toggle('active', l === currentLang);
    });

    applyTranslations();
    updateCarouselText();
    renderGuideSteps();
    renderSDGCards();
    initCardClickHandler();
    initCarouselButtons();
    updateCartBadge();
    updateCartBar();
    initCanvas();

    startCarousel();

    // 다른 탭에서 장바구니 변경 시 동기화
    window.addEventListener('storage', e => {
        if (e.key === CART_KEY) {
            updateCartBadge();
            updateCartBar();
            renderSDGCards();
        }
    });
});
