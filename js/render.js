// ── COLOR HELPERS ─────────────────────────────────────────────────────────────
function hexAlpha(hex, alpha) {
    const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
    return hex + a;
}

function darkenHex(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    const f = 0.65;
    return '#' + [r,g,b].map(c => Math.round(c*f).toString(16).padStart(2,'0')).join('');
}

// ── SDG CARDS ─────────────────────────────────────────────────────────────────
function renderSDGCards() {
    const grid = document.getElementById('sdg-grid');
    if (!grid) return;
    const html = SDG_DATA.map(function(goal) {
        const g = goal[currentLang] || goal.ko;
        const id = goal.id;
        const goalNum = id < 10 ? '0' + id : String(id);
        const inCart = isInCart(id);
        const pastelBg = hexAlpha(goal.color, 0.13);
        const titleColor = darkenHex(goal.color);

        const selectBtn = inCart
            ? '<button type="button" class="btn btn-sm btn-selected" data-action="deselect" data-id="' + id + '" style="flex:1;font-size:0.74rem;">✓ ' + t('selectedBtn') + '</button>'
            : '<button type="button" class="btn btn-secondary btn-sm" data-action="select" data-id="' + id + '" style="flex:1;font-size:0.74rem;">' + t('selectBtn') + '</button>';

        return '<div class="sdg-card">' +
            '<div class="sdg-card-top" style="background:' + pastelBg + ';">' +
                '<span class="sdg-goal-badge" style="background:' + goal.color + ';">SDG ' + goalNum + '</span>' +
                '<span class="sdg-card-emoji">' + goal.icon + '</span>' +
                '<p class="sdg-card-name" style="color:' + titleColor + ';">' + g.title + '</p>' +
            '</div>' +
            '<div class="sdg-card-bottom">' +
                '<p class="sdg-card-desc">' + g.desc + '</p>' +
                '<div class="sdg-card-actions">' +
                    selectBtn +
                    '<button type="button" class="btn btn-primary btn-sm" data-action="quick" data-id="' + id + '" style="flex:1;font-size:0.74rem;">' + t('quickBtn') + '</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }).join('');
    grid.innerHTML = html;
}

function initCardClickHandler() {
    const grid = document.getElementById('sdg-grid');
    if (!grid || grid._clickInit) return;
    grid._clickInit = true;
    grid.addEventListener('click', function(e) {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        const id = parseInt(btn.dataset.id, 10);
        if (Number.isNaN(id)) return;
        if (action === 'select') addToCart(id);
        else if (action === 'deselect') { saveCart(getCart().filter(g => g.id !== id)); renderSDGCards(); }
        else if (action === 'quick') quickPurchase(id);
    });
}

function quickPurchase(id) {
    if (!isInCart(id)) {
        const goal = SDG_DATA.find(g => g.id === id);
        if (goal) {
            const cart = getCart();
            if (!cart.find(g => g.id === id)) {
                cart.push(goal);
                saveCart(cart);
            }
        }
    }
    navigateTo('checkout');
}

// ── CART PAGE ─────────────────────────────────────────────────────────────────
function renderCartPage() {
    const cart = getCart();
    const el = document.getElementById('cart-content');
    if (!el) return;
    if (cart.length === 0) {
        el.innerHTML = `<div class="card"><div class="card-body text-center" style="padding:3rem 1.5rem;">
            <p style="color:var(--color-text-sub);margin-bottom:1rem;">${t('cartEmpty')}</p>
            <button class="btn btn-primary" onclick="navigateTo('home')">${t('goSelectBtn')}</button>
        </div></div>`;
        return;
    }
    el.innerHTML = `
        <div class="space-y mb-4">
            ${cart.map(goal => {
                const g = goal[currentLang];
                return `<div class="card"><div class="card-body" style="padding:1rem 1.25rem;">
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <div style="width:52px;height:52px;background:${goal.color}1A;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.625rem;flex-shrink:0;">${goal.icon}</div>
                            <div>
                                <p style="font-weight:700;font-size:0.95rem;">${g.title}</p>
                                <p style="font-size:0.75rem;color:var(--color-text-sub);margin-top:2px;">${t('goalLabel')} ${goal.id}</p>
                            </div>
                        </div>
                        <button class="btn btn-ghost btn-sm" onclick="removeFromCart(${goal.id})" style="color:#DC2626;flex-shrink:0;" aria-label="remove">🗑️</button>
                    </div>
                </div></div>`;
            }).join('')}
        </div>
        <div class="card"><div class="card-body">
            <div class="flex items-center justify-between mb-4" style="padding:0.25rem 0;">
                <span style="font-weight:600;font-size:0.9rem;">${t('totalGoals')}</span>
                <span style="font-weight:700;color:var(--color-primary);font-size:1.125rem;">${cart.length}${t('countUnit')}</span>
            </div>
            <button class="btn btn-primary btn-block btn-lg" onclick="navigateTo('checkout')">${t('toCheckoutBtn')}</button>
        </div></div>`;
}

// ── CHECKOUT PAGE ─────────────────────────────────────────────────────────────
function renderCheckoutPage() {
    const cart = getCart();
    if (cart.length === 0) { navigateTo('home'); return; }
    const el = document.getElementById('checkout-items');
    if (el) el.innerHTML = cart.map(item => {
        const g = item[currentLang];
        return `<div class="flex items-center gap-2" style="padding:0.75rem;background:var(--color-bg);border-radius:6px;border:1px solid #EBEBEB;">
            <span style="font-size:1.5rem;flex-shrink:0;">${item.icon}</span>
            <div>
                <p style="font-weight:600;font-size:0.875rem;">${g.title}</p>
                <p style="font-size:0.75rem;color:var(--color-text-sub);">${g.desc}</p>
            </div>
        </div>`;
    }).join('');
    applyTranslations();
}
