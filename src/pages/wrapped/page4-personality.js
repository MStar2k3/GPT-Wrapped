/* ============================================
   AI CHATBOT WRAPPED - PAGE 4: PERSONALITY (QUIRKY)
   Fun AI personality archetype reveal
   ============================================ */

export function renderPage4(data) {
  const container = document.createElement('div');
  container.className = 'wrapped-page page-4';

  const personality = data.personality;
  const quirkyFact = data.quirkyFacts?.[Math.floor(Math.random() * data.quirkyFacts.length)] || '';

  container.innerHTML = `
    <div class="wrapped-content">
      <div class="page-label animate-on-enter">Based on your vibes...</div>
      
      <h2 class="page-title animate-on-enter">
        Your AI <span class="text-gradient">Personality</span>
      </h2>
      
      <div class="personality-reveal animate-on-enter">
        <div class="personality-icon-container">
          <div class="personality-icon">${personality.icon}</div>
          <div class="personality-glow"></div>
        </div>
        
        <h3 class="personality-type text-glow-purple">${personality.type}</h3>
        
        <p class="personality-description">${personality.description}</p>
      </div>
      
      <div class="personality-traits animate-on-enter">
        ${personality.traits.map((trait, i) => `
          <div class="trait-tag" style="animation-delay: ${i * 100}ms">
            ${trait}
          </div>
        `).join('')}
      </div>
      
      <div class="quirky-fact-card animate-on-enter">
        <div class="quirky-icon">🎯</div>
        <p class="quirky-text">${quirkyFact}</p>
      </div>
      
      <div class="personality-comparison animate-on-enter">
        <div class="comparison-bar">
          <div class="comparison-fill" style="width: ${personality.percentile}%"></div>
          <div class="comparison-marker" style="left: ${personality.percentile}%"></div>
        </div>
        <p class="comparison-text">${personality.comparison}</p>
      </div>
    </div>
  `;

  return container;
}

export default renderPage4;
