// ── CAROUSEL ──────────────────────────────────────────────────────────────────
let currentSlide = 0;
const TOTAL_SLIDES = 3;
let carouselTimer = null;

function showSlide(i) {
    document.querySelectorAll('.carousel-slide').forEach((s, j) => s.classList.toggle('active', j === i));
    document.querySelectorAll('.carousel-dot').forEach((d, j) => d.classList.toggle('active', j === i));
    currentSlide = i;
}
function nextSlide() { showSlide((currentSlide + 1) % TOTAL_SLIDES); }
function previousSlide() { showSlide((currentSlide - 1 + TOTAL_SLIDES) % TOTAL_SLIDES); }
function goToSlide(i) { pauseCarousel(); showSlide(i); }

function startCarousel() {
    if (carouselTimer) clearInterval(carouselTimer);
    carouselTimer = setInterval(nextSlide, 6000);
}
function pauseCarousel() {
    if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
}

function updateCarouselText() {
    T[currentLang].carousel.forEach((s, i) => {
        const q = k => document.querySelector(`[data-carousel="${i}-${k}"]`);
        if (q('title')) q('title').textContent = s.title;
        if (q('desc'))  q('desc').textContent  = s.desc;
        if (q('btn'))   q('btn').textContent   = s.btn;
    });
}

let touchStartX = null;
let touchEndX = null;
function onCarouselTouchStart(e) {
    touchStartX = e.changedTouches[0].clientX;
}
function onCarouselTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    if (touchStartX === null || touchEndX === null) return;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 40) return;
    pauseCarousel();
    if (delta < 0) nextSlide();
    else previousSlide();
    touchStartX = null;
    touchEndX = null;
}

function initCarouselButtons() {
    const container = document.getElementById('carousel-container');
    if (!container || container._btnInit) return;
    container._btnInit = true;
    container.addEventListener('touchstart', onCarouselTouchStart, { passive: true });
    container.addEventListener('touchend', onCarouselTouchEnd, { passive: true });
    container.addEventListener('click', function(e) {
        const btn = e.target.closest('button[data-slide-action]');
        if (!btn) return;
        pauseCarousel();
        const action = btn.dataset.slideAction;
        if (action === 'anim') {
            window.open('https://youtu.be/kwzSaqlcpHI?feature=shared', '_blank', 'noopener,noreferrer');
        } else if (action === 'info') {
            openSdgsInfoModal();
        } else if (action === 'dict') {
            openSdgsDictModal();
        }
    });
}
