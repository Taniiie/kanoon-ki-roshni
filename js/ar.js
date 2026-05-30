// ═══════════════════════════════════════════
//  ar.js — AR Overlay Renderer
//  Renders color-coded bubbles over the
//  document image to simulate AR annotation
// ═══════════════════════════════════════════

const AR = (() => {

  /**
   * Render AR bubbles over the document image
   * @param {Array} clauses - analyzed clauses array
   */
  function renderBubbles(clauses) {
    const container = document.getElementById('arBubbles');
    container.innerHTML = '';

    if (!clauses || clauses.length === 0) return;

    // Distribute bubbles across the document image area
    const positions = generatePositions(clauses.length);

    clauses.forEach((clause, i) => {
      const pos = positions[i];
      const bubble = createBubble(clause, pos, i);
      container.appendChild(bubble);
    });
  }

  /**
   * Generate non-overlapping positions for bubbles
   */
  function generatePositions(count) {
    // Predefined positions that work well on most documents
    const basePositions = [
      { top: '8%',  left: '5%'  },
      { top: '8%',  right: '5%' },
      { top: '35%', left: '5%'  },
      { top: '35%', right: '5%' },
      { top: '62%', left: '5%'  },
      { top: '62%', right: '5%' },
    ];
    return basePositions.slice(0, count);
  }

  /**
   * Create a single AR bubble element
   */
  function createBubble(clause, pos, index) {
    const bubble = document.createElement('div');
    bubble.className = `ar-bubble ${clause.risk}`;

    // Apply position
    Object.entries(pos).forEach(([key, val]) => {
      bubble.style[key] = val;
    });

    // Stagger animation
    bubble.style.animationDelay = `${index * 0.15}s`;

    // Short label for the bubble
    const emoji  = { high: '🔴', medium: '🟡', low: '🟢' }[clause.risk] || '🟡';
    const label  = { high: 'खतरा!', medium: 'सावधान', low: 'ठीक है' }[clause.risk] || '';

    bubble.innerHTML = `${emoji} ${label}`;
    bubble.title = clause.explanation_hindi;

    // Tap to scroll to clause card
    bubble.addEventListener('click', () => {
      const clauseCards = document.querySelectorAll('.clause-card');
      if (clauseCards[index]) {
        clauseCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Brief highlight
        clauseCards[index].style.outline = '2px solid var(--gold)';
        setTimeout(() => clauseCards[index].style.outline = '', 1500);
      }
    });

    return bubble;
  }

  /**
   * Clear all AR bubbles
   */
  function clearBubbles() {
    const container = document.getElementById('arBubbles');
    if (container) container.innerHTML = '';
  }

  return { renderBubbles, clearBubbles };
})();
