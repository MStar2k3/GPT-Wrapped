/* ============================================
   AI CHATBOT WRAPPED - MAIN ENTRY POINT
   Application initialization and routing
   ============================================ */

import { router } from './utils/router.js';
import { renderLanding } from './pages/landing.js';
import { renderImport } from './pages/import.js';
import { renderWrapped } from './pages/wrapped/index.js';

// Import additional styles
import './styles/landing.css';
import './styles/auth.css';
import './styles/wrapped.css';

// Initialize application
function init() {
  const app = document.getElementById('app');

  if (!app) {
    console.error('App container not found');
    return;
  }

  // Register routes
  router
    .register('/', () => renderLanding())
    .register('/import', () => renderImport())
    .register('/wrapped', () => renderWrapped())
    .register('/dashboard', () => renderDashboardPlaceholder());

  // Initialize router
  router.init(app);
}

// Placeholder for dashboard
function renderDashboardPlaceholder() {
  const container = document.createElement('div');
  container.className = 'page page-centered';
  container.innerHTML = `
    <div class="bg-animated">
      <div class="orb orb-cyan" style="width: 400px; height: 400px; top: -100px; left: -100px;"></div>
      <div class="orb orb-purple" style="width: 300px; height: 300px; bottom: -50px; right: -50px;"></div>
    </div>
    <div class="container" style="text-align: center;">
      <h1 class="text-display text-gradient" style="margin-bottom: var(--space-4);">Dashboard</h1>
      <p class="text-secondary" style="margin-bottom: var(--space-8);">Your connected platforms and settings.</p>
      
      <div class="card" style="max-width: 400px; margin: 0 auto var(--space-6);">
        <h3 style="margin-bottom: var(--space-4);">Connected Platforms</h3>
        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          <div class="platform-connected">
            <span>🤖</span> ChatGPT <span class="badge badge-cyan">Connected</span>
          </div>
          <div class="platform-connected">
            <span>🧠</span> Claude <span class="badge badge-cyan">Connected</span>
          </div>
        </div>
      </div>
      
      <a href="/wrapped" class="btn btn-primary btn-lg">View Your Wrapped</a>
      <br><br>
      <a href="/" class="btn btn-ghost">← Back to Home</a>
    </div>
  `;

  setTimeout(() => {
    container.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(link.getAttribute('href'));
      });
    });
  }, 0);

  return container;
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
