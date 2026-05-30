// ═══════════════════════════════════════════
//  app.js — Main App Controller
//  Kanoon Ki Roshni — SaaS Dashboard
// ═══════════════════════════════════════════

const App = (() => {

  let selectedDocType = 'auto'; // auto-detect by default
  let currentImageDataUrl = null;
  let currentAnalysis = null;

  // Stats tracking
  let stats = {
    scanned: 0,
    alerts: 0,
    safe: 0
  };

  // ── Screen navigation ──────────────────────
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    if (screen) {
      screen.classList.add('active');
      // Re-trigger animation
      screen.style.animation = 'none';
      screen.offsetHeight; // force reflow
      screen.style.animation = '';
    }

    // Update sidebar active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.screen === id) {
        item.classList.add('active');
      }
    });

    // Close mobile sidebar
    closeSidebar();
    window.scrollTo(0, 0);
  }

  function navigateTo(screenId) {
    showScreen(screenId);
  }

  function goHome() {
    showScreen('screen-home');
    currentImageDataUrl = null;
    currentAnalysis = null;
    // Reset preview
    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) previewContainer.classList.add('hidden');
    const previewImg = document.getElementById('previewImg');
    if (previewImg) previewImg.src = '';
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';
  }

  function goToScan() {
    showScreen('screen-scan');
  }

  // ── Sidebar toggle (mobile) ────────────────
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  }

  function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
  }

  // ── Language selector ──────────────────────
  function toggleLangDropdown() {
    const selector = document.getElementById('langSelector');
    selector.classList.toggle('open');
  }

  function closeLangDropdown() {
    const selector = document.getElementById('langSelector');
    if (selector) selector.classList.remove('open');
  }

  function changeLang(langCode) {
    I18N.setLang(langCode);

    // Update dropdown button label
    const langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = I18N.getLangName(langCode);

    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.remove('active');
      if (opt.dataset.lang === langCode) opt.classList.add('active');
    });

    closeLangDropdown();
    showToast(`✅ ${I18N.getLangName(langCode)}`);
  }

  // ── Doc type selection ────────────────────
  function selectDoc(type) {
    selectedDocType = type;
    document.querySelectorAll('.premium-action-card, .doc-card').forEach(c => c.classList.remove('selected'));
    if (event && event.currentTarget) {
      event.currentTarget.classList.add('selected');
    }
    showToast(`${getDocLabel(type)} ✓`);
    // Auto-navigate to scan after short delay
    setTimeout(() => goToScan(), 600);
  }

  function getDocLabel(type) {
    const labels = { fir: 'FIR', land: 'ज़मीन दस्तावेज़', rent: 'किराया समझौता', loan: 'लोन दस्तावेज़', auto: 'दस्तावेज़' };
    return labels[type] || 'दस्तावेज़';
  }

  // ── File handling ─────────────────────────
  function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      currentImageDataUrl = e.target.result;
      document.getElementById('previewImg').src = currentImageDataUrl;
      document.getElementById('previewContainer').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  // ── Sample document (for demo without camera) ──
  function useSampleDoc() {
    // Creates a canvas with sample text to simulate a document
    const canvas = document.createElement('canvas');
    canvas.width = 600; canvas.height = 800;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fffef0';
    ctx.fillRect(0, 0, 600, 800);
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 20px serif';
    ctx.fillText('RENTAL AGREEMENT', 180, 50);
    ctx.font = '14px serif';

    const lines = [
      'This agreement is made on 1st January 2024',
      'Between: Ramesh Kumar (Landlord)',
      'And: Suresh Singh (Tenant)',
      '',
      'CLAUSE 1: Monthly rent Rs. 8000/-',
      'The landlord reserves the right to increase',
      'rent by 20% every 6 months without notice.',
      '',
      'CLAUSE 2: The tenant shall vacate within',
      '24 hours if landlord demands, without any',
      'prior notice or compensation.',
      '',
      'CLAUSE 3: Security deposit of Rs. 50,000',
      'is non-refundable under any circumstances.',
      '',
      'CLAUSE 4: Tenant is responsible for all',
      'repairs and maintenance of the property.',
      '',
      'CLAUSE 5: Subletting is strictly prohibited.',
      'Violation will result in immediate eviction.',
      '',
      'Signature: _______________',
    ];

    lines.forEach((line, i) => ctx.fillText(line, 40, 90 + i * 26));

    currentImageDataUrl = canvas.toDataURL('image/png');
    document.getElementById('previewImg').src = currentImageDataUrl;
    document.getElementById('previewContainer').classList.remove('hidden');
    selectedDocType = 'rent';
    showToast('📄 Sample loaded ✓');
  }

  // ── Analyze flow ──────────────────────────
  async function analyzeDocument() {
    if (!currentImageDataUrl) {
      showToast('⚠️ ' + I18N.t('scan.hint'));
      return;
    }

    // Check API key
    const apiKey = localStorage.getItem('groq_api_key');
    if (!apiKey) {
      showModal();
      return;
    }

    showScreen('screen-processing');
    setProgress(10, I18N.t('proc.ocr'), I18N.t('proc.reading'));

    try {
      // Step 1: OCR
      const extractedText = await OCR.extractText(currentImageDataUrl, (p) => {
        setProgress(10 + p * 0.4, I18N.t('proc.ocr'), `${Math.round(p)}%`);
      });

      setProgress(55, I18N.t('proc.ai'), I18N.t('proc.ai.sub'));

      // Step 2: AI Analysis
      const analysis = await AI.analyze(extractedText, selectedDocType, apiKey, I18N.getLang());

      setProgress(85, I18N.t('proc.render'), I18N.t('proc.render.sub'));

      currentAnalysis = analysis;

      // Step 3: Render results
      await new Promise(r => setTimeout(r, 500));
      setProgress(100, I18N.t('proc.done'), I18N.t('proc.done.sub'));
      await new Promise(r => setTimeout(r, 400));

      // Update stats
      stats.scanned++;
      if (analysis.risk_level === 'high') stats.alerts++;
      else if (analysis.risk_level === 'low') stats.safe++;
      updateStatsDisplay();

      renderResults(analysis);
      showScreen('screen-results');

    } catch (err) {
      console.error(err);
      showScreen('screen-scan');
      showToast('❌ ' + (err.message || 'Error occurred. Please try again.'));
    }
  }

  function setProgress(pct, step, substep) {
    document.getElementById('progressFill').style.width = pct + '%';
    document.getElementById('processingStep').textContent = step;
    document.getElementById('processingSubStep').textContent = substep;
  }

  // ── Update stats on dashboard ─────────────
  function updateStatsDisplay() {
    const cards = document.querySelectorAll('.stat-luxury-card, .stat-card');
    if (cards[0]) animateCounter(cards[0].querySelector('.stat-value'), stats.scanned);
    if (cards[1]) animateCounter(cards[1].querySelector('.stat-value'), stats.alerts);
    if (cards[2]) animateCounter(cards[2].querySelector('.stat-value'), stats.safe);
  }

  function animateCounter(el, target) {
    if (!el) return;
    const current = parseInt(el.textContent) || 0;
    if (current === target) return;

    const duration = 600;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(current + (target - current) * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ── Render results ────────────────────────
  function renderResults(analysis) {
    // Doc type label
    document.getElementById('resultDocType').textContent =
      getDocLabel(analysis.document_type || selectedDocType);

    // AR doc image
    document.getElementById('arDocImg').src = currentImageDataUrl;

    // Risk summary
    const riskEl = document.getElementById('riskSummary');
    riskEl.className = 'risk-summary ' + (analysis.risk_level || 'medium');
    const riskEmoji = { high: '🔴', medium: '🟡', low: '🟢' }[analysis.risk_level] || '🟡';
    riskEl.innerHTML = `<strong>${riskEmoji} ${getRiskLabel(analysis.risk_level)}</strong><br/>${analysis.summary_hindi || ''}`;

    // AR bubbles
    AR.renderBubbles(analysis.clauses || []);

    // Clause cards
    const clausesList = document.getElementById('clausesList');
    clausesList.innerHTML = '';
    (analysis.clauses || []).forEach((clause, i) => {
      const card = document.createElement('div');
      card.className = `clause-card ${clause.risk}`;
      card.style.animationDelay = `${i * 0.08}s`;
      const emoji = { high: '🔴', medium: '🟡', low: '🟢' }[clause.risk] || '🟡';
      card.innerHTML = `
        <button class="clause-speak" onclick="TTS.speak('${escapeForAttr(clause.explanation_hindi)}')" title="सुनें">🔊</button>
        <div class="clause-risk">${emoji} ${getRiskLabel(clause.risk)}</div>
        <div class="clause-hindi">${clause.explanation_hindi}</div>
        <div class="clause-action">${clause.what_to_do || ''}</div>
      `;
      clausesList.appendChild(card);
    });

    // Next steps
    const stepsEl = document.getElementById('nextSteps');
    stepsEl.innerHTML = '';
    (analysis.next_steps || []).forEach((step, i) => {
      const div = document.createElement('div');
      div.className = 'step-item';
      div.style.animationDelay = `${i * 0.08}s`;
      div.innerHTML = `<div class="step-num">${i+1}</div><div class="step-text">${step}</div>`;
      stepsEl.appendChild(div);
    });
  }

  function getRiskLabel(risk) {
    return I18N.t(`risk.${risk}`);
  }

  function escapeForAttr(str) {
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;').substring(0, 200);
  }

  // ── Speak all ─────────────────────────────
  function speakAll() {
    if (!currentAnalysis) return;
    const text = currentAnalysis.summary_hindi + '. ' +
      (currentAnalysis.clauses || []).map(c => c.explanation_hindi).join('. ');
    TTS.speak(text);
  }

  // ── API Key Modal ─────────────────────────
  function showModal() {
    document.getElementById('apiKeyModal').classList.remove('hidden');
    setTimeout(() => document.getElementById('apiKeyInput').focus(), 300);
  }

  function closeModal() {
    document.getElementById('apiKeyModal').classList.add('hidden');
  }

  function saveApiKey() {
    const key = document.getElementById('apiKeyInput').value.trim();
    if (!key.startsWith('gsk_') && !key.startsWith('sk-')) {
      showToast('⚠️ Please enter a valid API key (starts with gsk_)');
      return;
    }
    localStorage.setItem('groq_api_key', key);
    closeModal();
    showToast('✅ API Key saved');
    // Retry analysis
    setTimeout(() => analyzeDocument(), 500);
  }

  // ── Toast ─────────────────────────────────
  function showToast(msg, duration = 3000) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.remove('hidden');
    // Re-trigger animation
    t.style.animation = 'none';
    t.offsetHeight;
    t.style.animation = '';
    setTimeout(() => t.classList.add('hidden'), duration);
  }

  // ── Init ──────────────────────────────────
  function init() {
    // Initialize i18n
    I18N.init();
    const savedLang = I18N.getLang();
    const langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = I18N.getLangName(savedLang);

    // Mark active language in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === savedLang);
    });

    // Check if API key already saved
    let savedKey = localStorage.getItem('groq_api_key');
    if (savedKey) {
      document.getElementById('apiKeyInput').value = savedKey;
    }

    // Load saved stats
    const savedStats = localStorage.getItem('kanoon_stats');
    if (savedStats) {
      try {
        stats = JSON.parse(savedStats);
        updateStatsDisplay();
      } catch (e) {}
    }

    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);

    const sidebarOverlay = document.getElementById('sidebarOverlay');
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    // Close lang dropdown on outside click
    document.addEventListener('click', (e) => {
      const langSelector = document.getElementById('langSelector');
      if (langSelector && !langSelector.contains(e.target)) {
        closeLangDropdown();
      }
    });

    showScreen('screen-home');
    console.log('Kanoon Ki Roshni — Dashboard initialized ✓');
  }

  // Save stats on unload
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('kanoon_stats', JSON.stringify(stats));
  });

  document.addEventListener('DOMContentLoaded', init);

  return {
    selectDoc, goHome, goToScan, handleFile, useSampleDoc, analyzeDocument,
    speakAll, showModal, closeModal, saveApiKey, showToast,
    navigateTo, toggleSidebar, toggleLangDropdown, changeLang
  };

})();
