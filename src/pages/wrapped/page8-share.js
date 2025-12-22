/* ============================================
   AI CHATBOT WRAPPED - PAGE 8: SHARE
   Client-side canvas-based downloads & sharing
   ============================================ */

import { createConfetti } from '../../utils/animations.js';

export function renderPage8(data) {
  const container = document.createElement('div');
  container.className = 'wrapped-page page-8';

  const summary = data.summary;
  const personality = data.personality;
  const earnedBadges = data.badges.filter(b => b.earned);
  const topTopic = data.topTopic;

  container.innerHTML = `
    <div class="wrapped-content share-page">
      <div class="page-label animate-on-enter">Your 2025 AI Wrapped</div>
      
      <h2 class="page-title animate-on-enter">
        Share Your <span class="text-gradient">Story</span>
      </h2>
      
      <!-- Preview Card (this will be rendered to canvas) -->
      <div class="share-card-wrapper animate-on-enter">
        <div class="share-card" id="share-card">
          <div class="share-card-bg"></div>
          <div class="share-card-content">
            <div class="share-card-header">
              <span class="share-logo">✨ AI Wrapped 2025</span>
            </div>
            <div class="share-hero-stat">
              <div class="share-stat-number">${summary.totalConversations}</div>
              <div class="share-stat-label">conversations</div>
            </div>
            <div class="share-personality">
              <span class="share-personality-icon">${personality.icon}</span>
              <span class="share-personality-type">${personality.type}</span>
            </div>
            <div class="share-badges">
              ${earnedBadges.slice(0, 4).map(badge => `
                <span class="share-badge" title="${badge.name}">${badge.icon}</span>
              `).join('')}
            </div>
            <div class="share-watermark">✨ aiwrapped.com</div>
          </div>
        </div>
      </div>
      
      <!-- Hidden canvas for rendering -->
      <canvas id="download-canvas" style="display: none;"></canvas>
      
      <!-- Download Actions -->
      <div class="download-actions animate-on-enter">
        <button class="btn btn-primary btn-lg" id="download-png">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Download Image</span>
        </button>
      </div>
      
      <!-- Share Actions -->
      <div class="share-actions animate-on-enter">
        <h4 class="selector-title">📤 Share Directly</h4>
        <div class="share-buttons">
          <button class="btn btn-social btn-instagram" id="share-instagram">
            📷 Instagram
          </button>
          <button class="btn btn-social btn-twitter" id="share-twitter">
            🐦 Twitter/X
          </button>
          <button class="btn btn-social btn-linkedin" id="share-linkedin">
            💼 LinkedIn
          </button>
        </div>
        <p class="share-note" style="font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 8px; text-align: center;">
          📱 On mobile, these will open your share sheet
        </p>
      </div>
      
      <!-- Badges Earned -->
      <div class="badges-earned animate-on-enter">
        <h4 class="badges-title">🏆 Badges Earned (${earnedBadges.length})</h4>
        <div class="badges-grid">
          ${earnedBadges.slice(0, 6).map(badge => `
            <div class="badge-card" style="--badge-color: ${badge.color}">
              <div class="badge-icon">${badge.icon}</div>
              <div class="badge-name">${badge.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  setTimeout(() => setupShareListeners(container, data), 100);
  return container;
}

// Generate image using Canvas API (works entirely client-side)
async function generateShareImage(data, width = 1080, height = 1080) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, '#0a0a1a');
  bgGradient.addColorStop(0.3, '#1a1a2e');
  bgGradient.addColorStop(0.6, '#16213e');
  bgGradient.addColorStop(1, '#0f0f23');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Draw stars
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const opacity = Math.random() * 0.6 + 0.2;
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.fill();
  }

  // Glow orbs
  const drawGlowOrb = (x, y, radius, color) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color.replace(')', ', 0.15)').replace('rgb', 'rgba'));
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };
  drawGlowOrb(width * 0.1, height * 0.1, width * 0.4, 'rgb(0, 240, 255)');
  drawGlowOrb(width * 0.9, height * 0.9, width * 0.35, 'rgb(139, 0, 255)');

  // Card background
  const cardX = width * 0.1;
  const cardY = height * 0.15;
  const cardW = width * 0.8;
  const cardH = height * 0.7;
  const cardRadius = 30;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, cardRadius);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Logo
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = `${width * 0.03}px Inter, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('✨ AI Wrapped 2025', width / 2, cardY + height * 0.08);

  // Main stat - conversations
  const conversations = data.summary?.totalConversations || 847;
  ctx.fillStyle = '#00f0ff';
  ctx.font = `bold ${width * 0.14}px Inter, Arial, sans-serif`;
  ctx.fillText(conversations.toString(), width / 2, cardY + height * 0.28);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = `${width * 0.035}px Inter, Arial, sans-serif`;
  ctx.fillText('conversations', width / 2, cardY + height * 0.34);

  // Personality
  const personality = data.personality || { icon: '🧪', type: 'The Explorer' };
  ctx.font = `${width * 0.08}px Inter, Arial, sans-serif`;
  ctx.fillText(personality.icon, width / 2, cardY + height * 0.45);

  ctx.fillStyle = 'white';
  ctx.font = `bold ${width * 0.05}px Inter, Arial, sans-serif`;
  ctx.fillText(personality.type, width / 2, cardY + height * 0.54);

  // Badges
  const earnedBadges = data.badges?.filter(b => b.earned) || [];
  const badgeEmojis = earnedBadges.slice(0, 4).map(b => b.icon);
  if (badgeEmojis.length > 0) {
    ctx.font = `${width * 0.05}px Inter, Arial, sans-serif`;
    ctx.fillText(badgeEmojis.join(' '), width / 2, cardY + height * 0.62);
  }

  // Watermark
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = `${width * 0.025}px Inter, Arial, sans-serif`;
  ctx.fillText('✨ aiwrapped.com', width / 2, height * 0.95);

  return canvas;
}

// Convert canvas to blob
function canvasToBlob(canvas, type = 'image/png', quality = 0.92) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

// Download image
async function downloadImage(data, filename = 'ai-wrapped.png') {
  try {
    const canvas = await generateShareImage(data, 1080, 1080);
    const blob = await canvasToBlob(canvas);
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Download error:', error);
    return false;
  }
}

// Share using Web Share API (works on mobile)
async function shareImage(data, platform) {
  try {
    const canvas = await generateShareImage(data, 1080, 1080);
    const blob = await canvasToBlob(canvas);
    const file = new File([blob], 'ai-wrapped.png', { type: 'image/png' });

    const summary = data.summary || {};
    const personality = data.personality || {};

    const shareText = `My 2025 AI Wrapped is here! 🤖✨

${summary.totalConversations || 847} conversations
"${personality.type || 'The Explorer'}"

Get yours at aiwrapped.com #AIWrapped2025`;

    // Try native share API
    if (navigator.share && navigator.canShare) {
      const shareData = { title: 'My AI Wrapped 2025', text: shareText, files: [file] };

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return { success: true, method: 'native' };
      }
    }

    // Fallback: Download + open platform
    await downloadImage(data, `ai-wrapped-${platform}.png`);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      instagram: null, // Download only
      linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }

    return { success: true, method: 'download' };
  } catch (error) {
    console.error('Share error:', error);
    // Fallback to download
    await downloadImage(data, `ai-wrapped-${platform}.png`);
    return { success: true, method: 'download-fallback' };
  }
}

function setupShareListeners(container, data) {
  createConfetti(container, 30);

  // Helper for mobile-friendly event handling
  const addMobileHandler = (selector, handler) => {
    const el = container.querySelector(selector);
    if (!el) return;
    el.addEventListener('click', (e) => { e.preventDefault(); handler(e); });
    el.addEventListener('touchend', (e) => { e.preventDefault(); handler(e); }, { passive: false });
  };

  // Download button
  addMobileHandler('#download-png', async () => {
    const btn = container.querySelector('#download-png');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>⏳ Generating...</span>';
    btn.disabled = true;

    const success = await downloadImage(data);

    btn.innerHTML = success ? '<span>✅ Downloaded!</span>' : '<span>❌ Error</span>';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 2000);
  });

  // Instagram
  addMobileHandler('#share-instagram', async () => {
    const btn = container.querySelector('#share-instagram');
    btn.textContent = '⏳ Generating...';
    btn.disabled = true;

    const result = await shareImage(data, 'instagram');

    if (result.method === 'download' || result.method === 'download-fallback') {
      btn.textContent = '✅ Downloaded!';
      alert('Image downloaded! Open Instagram and upload from your gallery.');
    } else {
      btn.textContent = '✅ Shared!';
    }

    setTimeout(() => {
      btn.textContent = '📷 Instagram';
      btn.disabled = false;
    }, 2000);
  });

  // Twitter
  addMobileHandler('#share-twitter', async () => {
    const btn = container.querySelector('#share-twitter');
    btn.textContent = '⏳ Generating...';
    btn.disabled = true;

    await shareImage(data, 'twitter');
    btn.textContent = '✅ Opened!';

    setTimeout(() => {
      btn.textContent = '🐦 Twitter/X';
      btn.disabled = false;
    }, 2000);
  });

  // LinkedIn
  addMobileHandler('#share-linkedin', async () => {
    const btn = container.querySelector('#share-linkedin');
    btn.textContent = '⏳ Generating...';
    btn.disabled = true;

    const result = await shareImage(data, 'linkedin');
    btn.textContent = result.method === 'native' ? '✅ Shared!' : '✅ Downloaded!';

    if (result.method !== 'native') {
      alert('Image downloaded! Upload it to the LinkedIn post that opened.');
    }

    setTimeout(() => {
      btn.textContent = '💼 LinkedIn';
      btn.disabled = false;
    }, 2000);
  });
}

export default renderPage8;
