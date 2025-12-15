/* ============================================
   AI CHATBOT WRAPPED - PAGE 5: TOKENS
   Token usage visualization
   ============================================ */

import { animateCounter, formatNumber } from '../../utils/animations.js';

export function renderPage5(data) {
    const container = document.createElement('div');
    container.className = 'wrapped-page page-5';

    const tokens = data.tokens;

    container.innerHTML = `
    <div class="wrapped-content">
      <div class="page-label animate-on-enter">Your Token Journey</div>
      
      <h2 class="page-title animate-on-enter">
        <span class="text-gradient">Token</span> Journey
      </h2>
      
      <div class="token-total animate-on-enter">
        <div class="token-total-number" id="token-count">${formatNumber(tokens.input + tokens.output)}</div>
        <div class="token-total-label">total tokens processed</div>
      </div>
      
      <div class="token-breakdown animate-on-enter">
        <div class="token-type token-input">
          <div class="token-type-bar">
            <div class="token-bar-inner" style="height: ${(tokens.input / (tokens.input + tokens.output)) * 100}%"></div>
          </div>
          <div class="token-type-value">${formatNumber(tokens.input)}</div>
          <div class="token-type-label">Input Tokens</div>
          <div class="token-type-sublabel">Your questions</div>
        </div>
        
        <div class="token-ratio">
          <div class="ratio-visual">
            <span class="ratio-number">${tokens.ratio.toFixed(1)}x</span>
          </div>
          <div class="ratio-label">Output ratio</div>
        </div>
        
        <div class="token-type token-output">
          <div class="token-type-bar">
            <div class="token-bar-inner" style="height: ${(tokens.output / (tokens.input + tokens.output)) * 100}%"></div>
          </div>
          <div class="token-type-value">${formatNumber(tokens.output)}</div>
          <div class="token-type-label">Output Tokens</div>
          <div class="token-type-sublabel">AI responses</div>
        </div>
      </div>
      
      <div class="token-equivalents animate-on-enter">
        <div class="equivalent-card">
          <div class="equivalent-icon">📖</div>
          <div class="equivalent-value">${tokens.equivalentBooks.toFixed(1)}</div>
          <div class="equivalent-label">novels worth of text</div>
        </div>
        <div class="equivalent-card">
          <div class="equivalent-icon">📝</div>
          <div class="equivalent-value">${formatNumber(tokens.equivalentWords)}</div>
          <div class="equivalent-label">words processed</div>
        </div>
      </div>
      
      <p class="page-insight animate-on-enter">
        <span class="trend-badge">${tokens.trend}</span> ${tokens.efficiency}
      </p>
    </div>
  `;

    return container;
}

export default renderPage5;
