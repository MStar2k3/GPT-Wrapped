/* ============================================
   AI CHATBOT WRAPPED - PAGE 2: HEAT MAP
   Calendar visualization of activity
   ============================================ */

export function renderPage2(data) {
    const container = document.createElement('div');
    container.className = 'wrapped-page page-2';

    container.innerHTML = `
    <div class="wrapped-content">
      <div class="page-label animate-on-enter">Your Year in Activity</div>
      
      <h2 class="page-title animate-on-enter">
        Heat Map <span class="text-gradient">Moments</span>
      </h2>
      
      <div class="heatmap-container animate-on-enter">
        <div class="heatmap-months">
          ${['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map(m => `<span>${m}</span>`).join('')}
        </div>
        <div class="heatmap-grid" id="heatmap-grid">
          ${generateHeatmapCells(data.heatmapData)}
        </div>
        <div class="heatmap-legend">
          <span class="legend-label">Less</span>
          <div class="legend-cells">
            ${[0, 1, 2, 3, 4, 5].map(level => `<div class="legend-cell" data-level="${level}"></div>`).join('')}
          </div>
          <span class="legend-label">More</span>
        </div>
      </div>
      
      <div class="peak-times animate-on-enter">
        <div class="peak-time-card">
          <div class="peak-time-icon">⏰</div>
          <div class="peak-time-value">${data.peakTimes.bestHour}</div>
          <div class="peak-time-label">Peak Hour</div>
        </div>
        <div class="peak-time-card">
          <div class="peak-time-icon">📅</div>
          <div class="peak-time-value">${data.peakTimes.bestDay}</div>
          <div class="peak-time-label">Best Day</div>
        </div>
        <div class="peak-time-card">
          <div class="peak-time-icon">🔥</div>
          <div class="peak-time-value">${data.summary.longestStreak}</div>
          <div class="peak-time-label">Day Streak</div>
        </div>
      </div>
      
      <p class="page-insight animate-on-enter">
        ${data.peakTimes.insight}
      </p>
    </div>
  `;

    // Animate heatmap cells
    setTimeout(() => {
        const cells = container.querySelectorAll('.heatmap-cell');
        cells.forEach((cell, i) => {
            cell.style.animationDelay = `${i * 2}ms`;
            cell.classList.add('animate-in');
        });
    }, 300);

    return container;
}

function generateHeatmapCells(heatmapData) {
    // Generate 52 weeks x 7 days grid
    let html = '';
    for (let week = 0; week < 52; week++) {
        for (let day = 0; day < 7; day++) {
            const index = week * 7 + day;
            const data = heatmapData[index] || { level: 0 };
            html += `<div class="heatmap-cell" data-level="${data.level}" data-date="${data.date || ''}"></div>`;
        }
    }
    return html;
}

export default renderPage2;
