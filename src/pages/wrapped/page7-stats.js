/* ============================================
   AI CHATBOT WRAPPED - PAGE 7: STATS
   Aggregate metrics dashboard
   ============================================ */

import { formatNumber } from '../../utils/animations.js';

export function renderPage7(data) {
  const container = document.createElement('div');
  container.className = 'wrapped-page page-7';

  const summary = data.summary;
  const comparisons = data.comparisons;

  container.innerHTML = `
    <div class="wrapped-content">
      <div class="page-label animate-on-enter">Year at a Glance</div>
      
      <h2 class="page-title animate-on-enter">
        Your <span class="text-gradient">Stats</span>
      </h2>
      
      <div class="stats-grid animate-on-enter">
        <div class="stat-card">
          <div class="stat-icon">💬</div>
          <div class="stat-value">${summary.totalConversations}</div>
          <div class="stat-label">Total Conversations</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-value">${summary.activeDays}</div>
          <div class="stat-label">Active Days</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-value">${summary.longestStreak}</div>
          <div class="stat-label">Day Streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-value">${summary.topicsExplored}</div>
          <div class="stat-label">Topics Explored</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-value">${formatNumber(summary.totalTokens)}</div>
          <div class="stat-label">Tokens Processed</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📏</div>
          <div class="stat-value">${summary.averageConversationLength}</div>
          <div class="stat-label">Avg Messages/Chat</div>
        </div>
      </div>
      
      <div class="percentile-section animate-on-enter">
        <div class="percentile-header">
          <h4 class="percentile-title">How You Compare</h4>
          <div class="info-tooltip-wrapper">
            <button class="info-btn" aria-label="How scoring works">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </button>
            <div class="info-tooltip">
              <div class="info-tooltip-title">📊 How We Calculate Percentiles</div>
              <div class="info-tooltip-content">
                <p><strong>Based on Real ChatGPT Stats (Nov 2025):</strong></p>
                <ul class="info-stats-list">
                  <li>🌍 <strong>123 million</strong> daily active users</li>
                  <li>📝 <strong>20-21 prompts/day</strong> average per user</li>
                  <li>📅 <strong>~7,300 prompts/year</strong> for typical user</li>
                </ul>
                <p><strong>User Categories:</strong></p>
                <ul class="info-stats-list">
                  <li>Light: 5-10/day → ~2,000-3,600/year</li>
                  <li>Regular: 20-30/day → ~7,300-11,000/year</li>
                  <li>Power: 100-200/day → ~36,500-73,000/year</li>
                </ul>
                <p class="info-note">🔒 We compare your usage against this global distribution to calculate your percentile.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="percentile-bars">
          <div class="percentile-bar-row">
            <span class="percentile-label">Activity</span>
            <div class="percentile-bar">
              <div class="percentile-fill" style="width: ${comparisons.conversationsPercentile}%"></div>
            </div>
            <span class="percentile-value">Top ${100 - comparisons.conversationsPercentile}%</span>
          </div>
          <div class="percentile-bar-row">
            <span class="percentile-label">Token Usage</span>
            <div class="percentile-bar">
              <div class="percentile-fill" style="width: ${comparisons.tokensPercentile}%"></div>
            </div>
            <span class="percentile-value">Top ${100 - comparisons.tokensPercentile}%</span>
          </div>
          <div class="percentile-bar-row">
            <span class="percentile-label">Consistency</span>
            <div class="percentile-bar">
              <div class="percentile-fill" style="width: ${comparisons.consistencyPercentile}%"></div>
            </div>
            <span class="percentile-value">Top ${100 - comparisons.consistencyPercentile}%</span>
          </div>
        </div>
      </div>
      
      <div class="insights-list animate-on-enter">
        ${comparisons.insights.map(insight => `
          <div class="insight-item">
            <span class="insight-bullet">✨</span>
            <span class="insight-text">${insight}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return container;
}

export default renderPage7;
