/* ============================================
   AI CHATBOT WRAPPED - PAGE 6: SPEED
   AI platform speed rankings
   ============================================ */

export function renderPage6(data) {
    const container = document.createElement('div');
    container.className = 'wrapped-page page-6';

    const speed = data.speedRankings;

    container.innerHTML = `
    <div class="wrapped-content">
      <div class="page-label animate-on-enter">Response Speed Rankings</div>
      
      <h2 class="page-title animate-on-enter">
        Speed <span class="text-gradient">Champions</span>
      </h2>
      
      <div class="speed-leaderboard animate-on-enter">
        ${speed.overall.map((item, i) => `
          <div class="speed-rank-card ${i === 0 ? 'winner' : ''}" style="animation-delay: ${i * 150}ms">
            <div class="rank-position">${item.rank}</div>
            <div class="rank-platform">
              <span class="rank-icon" style="color: ${item.color}">${item.icon}</span>
              <span class="rank-name">${item.platform}</span>
            </div>
            <div class="rank-time">
              <span class="time-value">${item.avgTime}s</span>
              <span class="time-label">avg</span>
            </div>
            ${i === 0 ? '<div class="winner-badge">🏆 Fastest</div>' : ''}
          </div>
        `).join('')}
      </div>
      
      <div class="speed-by-category animate-on-enter">
        <h4 class="category-title">Best For...</h4>
        <div class="category-grid">
          <div class="category-card">
            <div class="category-icon">💻</div>
            <div class="category-name">Coding</div>
            <div class="category-winner">${speed.byCategory.coding.winner}</div>
            <div class="category-time">${speed.byCategory.coding.time}s</div>
          </div>
          <div class="category-card">
            <div class="category-icon">✍️</div>
            <div class="category-name">Creative</div>
            <div class="category-winner">${speed.byCategory.creative.winner}</div>
            <div class="category-time">${speed.byCategory.creative.time}s</div>
          </div>
          <div class="category-card">
            <div class="category-icon">🔍</div>
            <div class="category-name">Research</div>
            <div class="category-winner">${speed.byCategory.research.winner}</div>
            <div class="category-time">${speed.byCategory.research.time}s</div>
          </div>
          <div class="category-card">
            <div class="category-icon">📊</div>
            <div class="category-name">Analysis</div>
            <div class="category-winner">${speed.byCategory.analysis.winner}</div>
            <div class="category-time">${speed.byCategory.analysis.time}s</div>
          </div>
        </div>
      </div>
      
      <p class="page-insight animate-on-enter">
        ${speed.insight}
      </p>
    </div>
  `;

    return container;
}

export default renderPage6;
