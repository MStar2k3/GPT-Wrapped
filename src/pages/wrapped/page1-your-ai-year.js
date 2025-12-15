/* ============================================
   AI CHATBOT WRAPPED - PAGE 1: YOUR AI YEAR
   Hero stat with dominant AI platform
   ============================================ */

import { animateCounter } from '../../utils/animations.js';

export function renderPage1(data) {
  const container = document.createElement('div');
  container.className = 'wrapped-page page-1';

  const primaryPlatform = data.platforms[data.primaryPlatform];

  container.innerHTML = `
    <div class="wrapped-content">
      <div class="page-label animate-on-enter">Your 2025 AI Year</div>
      
      <div class="primary-platform animate-on-enter">
        <div class="platform-icon-large" style="--platform-color: ${primaryPlatform.color}">
          ${primaryPlatform.icon}
        </div>
        <div class="platform-name text-glow-cyan">${primaryPlatform.name}</div>
        <div class="platform-subtitle">was your top AI</div>
      </div>
      
      <div class="hero-stat animate-on-enter">
        <div class="hero-stat-number" id="total-convos">${data.summary.totalConversations}</div>
        <div class="hero-stat-label">conversations this year</div>
      </div>
      
      <p class="hero-insight animate-on-enter">
        You explored <span class="highlight">${data.summary.topicsExplored} different topics</span> 
        across <span class="highlight">${Object.keys(data.platforms).length} AI platforms</span>
      </p>

      <div class="platforms-mini animate-on-enter">
        ${Object.values(data.platforms).map(p => `
          <div class="platform-mini" style="--platform-color: ${p.color}">
            <span class="platform-mini-icon">${p.icon}</span>
            <span class="platform-mini-percent">${p.percentage}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Animate counter after render
  setTimeout(() => {
    const counterEl = container.querySelector('#total-convos');
    if (counterEl) {
      counterEl.textContent = '0';
      animateCounter(counterEl, data.summary.totalConversations, 2000);
    }
  }, 500);

  return container;
}

export default renderPage1;
