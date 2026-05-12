// ── RECEIPT ───────────────────────────────────────────────────────────────────
function showReceiptModal(data) {
    window._receiptData = data;
    document.getElementById('receipt-content').innerHTML = `
        <div class="receipt-head">
            <p style="font-size:1.25rem;font-weight:700;color:var(--color-blue);">SDGs 마켓</p>
            <p style="font-weight:600;margin-top:0.25rem;">${t('receiptSubtitle')}</p>
            <p style="font-size:0.75rem;color:var(--color-text-sub);margin-top:0.25rem;">${data.date} ${data.time}</p>
        </div>
        <div class="receipt-section">
            <h3>${t('receiptOrdererInfo')}</h3>
            <div class="receipt-infobox">
                <p><strong>${t('receiptName')}</strong> ${data.student.name}</p>
                <p><strong>${t('receiptSchool')}</strong> ${data.student.school}</p>
                <p><strong>${t('receiptGrade')}</strong> ${T[currentLang].gradeOption(data.student.grade)} ${data.student.class}</p>
            </div>
        </div>
        <div class="receipt-section">
            <h3>${t('receiptGoals')}</h3>
            ${data.goals.map(g => `<div class="receipt-row">
                <div class="flex items-center gap-2"><span>${g.icon}</span><span>${g[currentLang].title}</span></div>
                <span style="color:var(--color-text-sub);">${t('goalLabel')} ${g.id}</span>
            </div>`).join('')}
            <div style="text-align:right;margin-top:0.625rem;font-weight:700;font-size:0.875rem;">
                ${t('receiptTotalGoals')} ${data.goals.length}${t('countUnit')}
            </div>
        </div>
        ${data.actionPlan.text||data.actionPlan.drawing ? `<div class="receipt-section">
            <h3>${t('receiptPlanTitle')}</h3>
            ${data.actionPlan.text ? `<div style="background:#EFF6FF;padding:0.875rem;border-radius:6px;font-size:0.8rem;white-space:pre-wrap;margin-bottom:0.5rem;">${data.actionPlan.text}</div>` : ''}
            ${data.actionPlan.drawing ? `<div style="background:var(--color-bg);padding:0.875rem;border-radius:6px;">
                <p style="font-size:0.75rem;color:var(--color-text-sub);margin-bottom:0.375rem;">${t('receiptDrawingTitle')}</p>
                <img src="${data.actionPlan.drawing}" style="max-width:100%;border:1px solid #EBEBEB;border-radius:4px;" alt="drawing">
            </div>` : ''}
        </div>` : ''}
        <div class="receipt-foot">
            <p>${t('receiptFooter')}</p>
            <p style="margin-top:0.375rem;font-weight:600;color:var(--color-primary);">${t('receiptFooter2')}</p>
        </div>`;
    document.getElementById('receipt-modal').classList.add('active');
}

function closeReceiptModal() { document.getElementById('receipt-modal').classList.remove('active'); }

const RECEIPT_PRINT_STYLES = `
    body{font-family:sans-serif;padding:20px;line-height:1.6;max-width:600px;margin:0 auto;}
    .receipt-head{text-align:center;border-bottom:1px solid #ddd;padding-bottom:1rem;margin-bottom:1.25rem;}
    .receipt-section{margin-bottom:1.25rem;}.receipt-section h3{font-weight:600;margin-bottom:0.5rem;font-size:0.9rem;}
    .receipt-infobox{background:#f9fafb;padding:0.875rem;border-radius:6px;font-size:0.85rem;line-height:1.9;}
    .receipt-row{display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid #f3f4f6;font-size:0.85rem;}
    .receipt-foot{text-align:center;border-top:1px solid #ddd;padding-top:0.75rem;font-size:0.75rem;color:#666;}
    .flex{display:flex;}.items-center{align-items:center;}.gap-2{gap:0.5rem;}
`;

function downloadReceipt() {
    const html = document.getElementById('receipt-content').innerHTML;
    const blob = new Blob([`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${RECEIPT_PRINT_STYLES}</style></head><body>${html}</body></html>`], {type:'text/html'});
    const a = Object.assign(document.createElement('a'), {href:URL.createObjectURL(blob), download:'sdg-receipt.html'});
    a.click(); URL.revokeObjectURL(a.href);
    showToast(t('toastDownload'), t('toastDownloadDesc'));
}

function printReceipt() {
    const win = window.open('','_blank');
    if (!win) { showToast(t('toastPrintFail'), t('toastPrintFailDesc')); return; }
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${RECEIPT_PRINT_STYLES}@media print{body{margin:0;}}</style></head><body>${document.getElementById('receipt-content').innerHTML}</body></html>`);
    win.document.close();
    setTimeout(() => { win.print(); win.close(); }, 300);
    showToast(t('toastPrint'), t('toastPrintDesc'));
}

function showCompletionModal() {
    closeReceiptModal();
    document.getElementById('completion-modal').classList.add('active');
}

function completeAndReset() {
    document.getElementById('completion-modal').classList.remove('active');
    saveCart([]);
    navigateTo('home');
    renderSDGCards();
}
