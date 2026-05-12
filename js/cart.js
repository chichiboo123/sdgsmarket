// ── CART STORAGE ──────────────────────────────────────────────────────────────
const CART_KEY = 'sdg-cart-v2';

function normalizeGoalId(value) {
    const parsed = parseInt(String(value), 10);
    return Number.isFinite(parsed) ? parsed : NaN;
}

function getCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (raw) {
            const ids = JSON.parse(raw);
            if (Array.isArray(ids)) {
                return ids.map(id => SDG_DATA.find(g => g.id === normalizeGoalId(id))).filter(Boolean);
            }
        }
        // Migrate old format
        const old = localStorage.getItem('sdg-cart-storage');
        if (old) {
            const items = JSON.parse(old).state?.items || [];
            const ids = items.map(item => normalizeGoalId(item && item.id)).filter(Number.isFinite);
            localStorage.setItem(CART_KEY, JSON.stringify(ids));
            localStorage.removeItem('sdg-cart-storage');
            return ids.map(id => SDG_DATA.find(g => g.id === normalizeGoalId(id))).filter(Boolean);
        }
    } catch(e) {}
    return [];
}

function saveCart(goals) {
    localStorage.setItem(CART_KEY, JSON.stringify(goals.map(g => normalizeGoalId(g.id)).filter(Number.isFinite)));
    updateCartBadge();
    updateCartBar();
}

function addToCart(goalId) {
    const goal = SDG_DATA.find(g => g.id === goalId);
    if (!goal) return;
    const cart = getCart();
    if (!cart.find(g => g.id === goalId)) {
        cart.push(goal);
        saveCart(cart);
        showToast(t('toastAddTitle'), t('toastAddDesc')(goal[currentLang].title));
        renderSDGCards();
    }
}

function removeFromCart(goalId) {
    saveCart(getCart().filter(g => g.id !== goalId));
    renderCartPage();
}

function isInCart(goalId) { return getCart().some(g => g.id === goalId); }

// ── BADGE & BAR ───────────────────────────────────────────────────────────────
function updateCartBadge() {
    const n = getCart().length;
    const b = document.getElementById('cart-badge');
    b.textContent = n;
    b.classList.toggle('hidden', n === 0);
}

function updateCartBar() {
    const cart = getCart();
    const isHome = document.getElementById('home-page').classList.contains('active');
    const show = cart.length > 0 && isHome;
    document.getElementById('cart-bar').classList.toggle('hidden', !show);
    document.getElementById('cart-bar-spacer').classList.toggle('hidden', !show);
    if (show) {
        document.getElementById('cart-bar-count').textContent = `${cart.length}${t('countUnit')}`;
    }
}
