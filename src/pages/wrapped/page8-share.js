/* ============================================
   AI CHATBOT WRAPPED - PAGE 8: SHARE
   Multi-platform screenshot & direct posting
   ============================================ */

import { createConfetti } from '../../utils/animations.js';

const API_BASE = 'http://localhost:3001';

// Platform format configurations
const PLATFORM_FORMATS = {
  linkedin: { name: 'LinkedIn', dimensions: '1080×1350', icon: '💼' },
  instagram_square: { name: 'Instagram (Square)', dimensions: '1080×1080', icon: '📷' },
  instagram_story: { name: 'Instagram (Story)', dimensions: '1080×1920', icon: '📱' },
  twitter: { name: 'Twitter/X', dimensions: '1200×675', icon: '🐦' },
  highres: { name: 'High Resolution', dimensions: '2160×2700', icon: '🖼️' }
};

// Card types available for download/share
const CARD_TYPES = [
  { id: 'year', name: 'Your AI Year', icon: '✨' },
  { id: 'personality', name: 'AI Personality', icon: '🧪' },
  { id: 'topic', name: 'Top Topic', icon: '💻' },
  { id: 'stats', name: 'Your Stats', icon: '📊' },
  { id: 'speed', name: 'Speed Stats', icon: '⚡' },
  { id: 'achievement', name: 'Achievements', icon: '🏆' }
];

export function renderPage8(data) {
  const container = document.createElement('div');
  container.className = 'wrapped-page page-8';

  const summary = data.summary;
  const personality = data.personality;
  const earnedBadges = data.badges.filter(b => b.earned);

  container.innerHTML = `
    <div class="wrapped-content share-page">
      <div class="page-label animate-on-enter">Your 2025 AI Wrapped</div>
      
      <h2 class="page-title animate-on-enter">
        Share Your <span class="text-gradient">Story</span>
      </h2>
      
      <!-- Card Selector -->
      <div class="card-selector animate-on-enter">
        <h4 class="selector-title">🎴 Select Cards to Share</h4>
        <div class="card-options">
          ${CARD_TYPES.map((card, i) => `
            <label class="card-option" data-card="${card.id}">
              <input type="checkbox" name="card" value="${card.id}" ${i === 0 ? 'checked' : ''}>
              <span class="card-icon">${card.icon}</span>
              <span class="card-name">${card.name}</span>
            </label>
          `).join('')}
        </div>
        <button class="btn btn-ghost btn-sm" id="select-all-cards" style="margin-top: 8px;">
          Select All
        </button>
      </div>
      
      <!-- Platform Format Selector -->
      <div class="platform-selector animate-on-enter">
        <h4 class="selector-title">📱 Choose Format</h4>
        <div class="platform-options">
          ${Object.entries(PLATFORM_FORMATS).map(([id, fmt]) => `
            <label class="platform-option" data-platform="${id}">
              <input type="radio" name="platform" value="${id}" ${id === 'instagram_square' ? 'checked' : ''}>
              <span class="platform-icon">${fmt.icon}</span>
              <span class="platform-name">${fmt.name}</span>
              <span class="platform-dims">${fmt.dimensions}</span>
            </label>
          `).join('')}
        </div>
      </div>
      
      <!-- Preview Card -->
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
      
      <!-- Progress Indicator -->
      <div class="download-progress hidden" id="download-progress">
        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill"></div>
        </div>
        <p class="progress-text" id="progress-text">Generating...</p>
      </div>
      
      <!-- Download Actions -->
      <div class="download-actions animate-on-enter">
        <button class="btn btn-primary btn-lg" id="download-selected">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span id="download-btn-text">Download Selected</span>
        </button>
        
        <button class="btn btn-secondary" id="download-all-zip">
          📦 Download All Formats (ZIP)
        </button>
      </div>
      
      <!-- Direct Share Actions -->
      <div class="share-actions animate-on-enter">
        <h4 class="selector-title">📤 Share Directly</h4>
        <div class="share-buttons">
          <button class="btn btn-social btn-linkedin" id="share-linkedin">
            💼 Post to LinkedIn
          </button>
          <button class="btn btn-social btn-instagram" id="share-instagram">
            📷 Share to Instagram
          </button>
          <button class="btn btn-social btn-twitter" id="share-twitter">
            🐦 Tweet
          </button>
        </div>
        <p class="share-note" style="font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 8px;">
          📱 On mobile, these will open your native share sheet
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

function setupShareListeners(container, data) {
  createConfetti(container, 30);

  const summary = data.summary;
  const personality = data.personality;
  const topTopic = data.topTopic;
  const earnedBadges = data.badges.filter(b => b.earned);

  // Get selections
  function getSelectedCards() {
    return [...container.querySelectorAll('input[name="card"]:checked')].map(el => el.value);
  }

  function getSelectedPlatform() {
    return container.querySelector('input[name="platform"]:checked')?.value || 'instagram_square';
  }

  // Select all cards
  container.querySelector('#select-all-cards')?.addEventListener('click', () => {
    const checkboxes = container.querySelectorAll('input[name="card"]');
    const allChecked = [...checkboxes].every(cb => cb.checked);
    checkboxes.forEach(cb => { cb.checked = !allChecked; });
    container.querySelector('#select-all-cards').textContent = allChecked ? 'Select All' : 'Deselect All';
  });

  // Prepare card data for API
  function getCardData(cardType) {
    switch (cardType) {
      case 'year':
        return {
          icon: '✨',
          totalConversations: summary.totalConversations,
          topicsExplored: summary.uniqueTopics,
          platforms: 1,
          badges: earnedBadges.slice(0, 4).map(b => b.icon)
        };
      case 'personality':
        return {
          icon: personality.icon,
          type: personality.type,
          description: personality.description,
          traits: personality.traits
        };
      case 'topic':
        return {
          icon: topTopic?.icon || '💻',
          name: topTopic?.name || 'CODING',
          conversations: topTopic?.conversations || 0,
          percentage: topTopic?.percentage || 0,
          insight: topTopic?.insight || ''
        };
      case 'stats':
        return {
          icon: '📊',
          totalConversations: summary.totalConversations,
          topicsExplored: summary.uniqueTopics,
          platforms: 1,
          badges: earnedBadges.slice(0, 4).map(b => b.icon)
        };
      case 'speed':
        return { avgResponseTime: summary.avgResponseTime || 2.5, fastestPlatform: 'ChatGPT' };
      case 'achievement':
        return { count: earnedBadges.length, badges: earnedBadges.slice(0, 5) };
      default:
        return { value: summary.totalConversations, label: 'conversations' };
    }
  }

  // Progress helpers
  function showProgress(show, text = 'Generating...') {
    const el = container.querySelector('#download-progress');
    el.classList.toggle('hidden', !show);
    container.querySelector('#progress-text').textContent = text;
  }

  function updateProgress(pct, text) {
    container.querySelector('#progress-fill').style.width = `${pct}%`;
    if (text) container.querySelector('#progress-text').textContent = text;
  }

  // Generate screenshots and get files
  async function generateScreenshots(cards, platform) {
    const results = [];
    let completed = 0;

    for (const cardType of cards) {
      const response = await fetch(`${API_BASE}/api/screenshots/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardType, platform, data: getCardData(cardType) })
      });
      const result = await response.json();
      if (result.success) {
        results.push({ ...result, cardType, platform });
      }
      completed++;
      updateProgress((completed / cards.length) * 80, `Generated ${completed}/${cards.length}...`);
    }
    return results;
  }

  // Fetch image as blob
  async function fetchImageBlob(url) {
    const response = await fetch(url);
    return await response.blob();
  }

  // Download Selected
  container.querySelector('#download-selected')?.addEventListener('click', async () => {
    const btn = container.querySelector('#download-selected');
    const btnText = container.querySelector('#download-btn-text');
    const cards = getSelectedCards();
    const platform = getSelectedPlatform();

    if (cards.length === 0) {
      alert('Please select at least one card.');
      return;
    }

    btn.disabled = true;
    btnText.textContent = 'Generating...';
    showProgress(true, 'Generating screenshots...');

    try {
      const results = await generateScreenshots(cards, platform);

      if (results.length > 1) {
        updateProgress(90, 'Creating ZIP...');
        const zipResponse = await fetch(`${API_BASE}/api/screenshots/zip`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ files: results.map(r => ({ filename: r.filename, platform: r.platform })) })
        });
        const zipResult = await zipResponse.json();
        if (zipResult.success) {
          window.open(`${API_BASE}${zipResult.url}`, '_blank');
        }
      } else if (results.length === 1) {
        window.open(`${API_BASE}${results[0].url}`, '_blank');
      }

      updateProgress(100, 'Done!');
      btnText.textContent = '✅ Downloaded!';
    } catch (error) {
      console.error('Download error:', error);
      btnText.textContent = '❌ Error';
    }

    setTimeout(() => { btnText.textContent = 'Download Selected'; showProgress(false); btn.disabled = false; }, 2000);
  });

  // Download All Formats ZIP
  container.querySelector('#download-all-zip')?.addEventListener('click', async () => {
    const btn = container.querySelector('#download-all-zip');
    const cards = getSelectedCards();

    if (cards.length === 0) {
      alert('Please select at least one card.');
      return;
    }

    btn.disabled = true;
    btn.textContent = '📦 Generating...';
    showProgress(true, 'Generating all formats...');

    try {
      const allPlatforms = Object.keys(PLATFORM_FORMATS);
      const cardsData = cards.map(cardType => ({ type: cardType, data: getCardData(cardType) }));

      const response = await fetch(`${API_BASE}/api/screenshots/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cards: cardsData, platforms: allPlatforms })
      });

      updateProgress(70, 'Creating ZIP...');
      const result = await response.json();

      if (result.success) {
        const files = result.results.filter(r => !r.error).map(r => ({ filename: r.filename, platform: r.platform }));
        const zipResponse = await fetch(`${API_BASE}/api/screenshots/zip`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ files })
        });
        const zipResult = await zipResponse.json();
        if (zipResult.success) {
          updateProgress(100, 'Done!');
          window.open(`${API_BASE}${zipResult.url}`, '_blank');
        }
      }

      btn.textContent = '✅ Downloaded!';
    } catch (error) {
      console.error('Batch download error:', error);
      btn.textContent = '❌ Error';
    }

    setTimeout(() => { btn.textContent = '📦 Download All Formats (ZIP)'; showProgress(false); btn.disabled = false; }, 2000);
  });

  // Share to LinkedIn
  container.querySelector('#share-linkedin')?.addEventListener('click', async () => {
    const btn = container.querySelector('#share-linkedin');
    const cards = getSelectedCards();

    if (cards.length === 0) {
      alert('Please select at least one card to share.');
      return;
    }

    btn.disabled = true;
    btn.textContent = '⏳ Generating...';
    showProgress(true, 'Generating images for LinkedIn...');

    try {
      // Generate images for LinkedIn format
      const results = await generateScreenshots(cards, 'linkedin');

      if (results.length === 0) {
        throw new Error('No images generated');
      }

      // Try Web Share API first (mobile)
      if (navigator.share && navigator.canShare) {
        const files = [];
        for (const result of results) {
          const blob = await fetchImageBlob(`${API_BASE}${result.url}`);
          const file = new File([blob], `ai-wrapped-${result.cardType}.png`, { type: 'image/png' });
          files.push(file);
        }

        const shareData = {
          title: 'My AI Wrapped 2025',
          text: `Just got my AI Wrapped for 2025! 🤖✨ ${summary.totalConversations} conversations. My AI personality: "${personality.type}". Get yours at aiwrapped.com #AIWrapped2025`,
          files
        };

        if (navigator.canShare(shareData)) {
          updateProgress(100, 'Opening share sheet...');
          await navigator.share(shareData);
          btn.textContent = '✅ Shared!';
          showProgress(false);
          setTimeout(() => { btn.textContent = '💼 Post to LinkedIn'; btn.disabled = false; }, 2000);
          return;
        }
      }

      // Desktop fallback: Check if LinkedIn OAuth is available
      const statusResponse = await fetch(`${API_BASE}/api/share/linkedin/status`);
      const status = await statusResponse.json();

      if (status.configured) {
        // Download images first, then open LinkedIn OAuth
        for (const result of results) {
          const link = document.createElement('a');
          link.href = `${API_BASE}${result.url}`;
          link.download = `ai-wrapped-linkedin-${result.cardType}.png`;
          link.click();
        }

        updateProgress(100, 'Images downloaded!');

        // Open LinkedIn with text
        const text = `Just got my AI Wrapped for 2025! 🤖✨\n\n📊 ${summary.totalConversations} conversations\n🧪 My AI personality: "${personality.type}"\n\nGet yours at aiwrapped.com\n\n#AIWrapped2025 #AI #ChatGPT`;

        // Open LinkedIn post composer
        window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`, '_blank');

        btn.textContent = '✅ Images Ready!';
        alert('Images downloaded! Upload them to your LinkedIn post that just opened.');
      } else {
        // No OAuth, just download and show instructions
        for (const result of results) {
          const link = document.createElement('a');
          link.href = `${API_BASE}${result.url}`;
          link.download = `ai-wrapped-linkedin-${result.cardType}.png`;
          link.click();
        }

        const text = `Just got my AI Wrapped for 2025! 🤖✨ ${summary.totalConversations} conversations. My AI personality: "${personality.type}". Get yours at aiwrapped.com`;
        window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`, '_blank');

        btn.textContent = '✅ Downloaded!';
        alert('Images downloaded! Upload them to the LinkedIn post that just opened.');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('LinkedIn share error:', error);
        btn.textContent = '❌ Error';
      }
    }

    showProgress(false);
    setTimeout(() => { btn.textContent = '💼 Post to LinkedIn'; btn.disabled = false; }, 2000);
  });

  // Share to Instagram
  container.querySelector('#share-instagram')?.addEventListener('click', async () => {
    const btn = container.querySelector('#share-instagram');
    const cards = getSelectedCards();

    if (cards.length === 0) {
      alert('Please select at least one card to share.');
      return;
    }

    btn.disabled = true;
    btn.textContent = '⏳ Generating...';
    showProgress(true, 'Generating images for Instagram...');

    try {
      // Generate images for Instagram format
      const platform = cards.length === 1 ? 'instagram_story' : 'instagram_square';
      const results = await generateScreenshots(cards, platform);

      if (results.length === 0) {
        throw new Error('No images generated');
      }

      // Try Web Share API (mobile - works great for Instagram!)
      if (navigator.share && navigator.canShare) {
        const files = [];
        for (const result of results) {
          const blob = await fetchImageBlob(`${API_BASE}${result.url}`);
          const ext = result.format === 'jpeg' ? 'jpg' : 'png';
          const file = new File([blob], `ai-wrapped-${result.cardType}.${ext}`, { type: `image/${result.format || 'png'}` });
          files.push(file);
        }

        const shareData = {
          title: 'My AI Wrapped 2025',
          text: 'Check out my AI Wrapped 2025! 🤖✨ #AIWrapped2025 #ChatGPT',
          files
        };

        if (navigator.canShare(shareData)) {
          updateProgress(100, 'Opening share sheet...');
          await navigator.share(shareData);
          btn.textContent = '✅ Shared!';
          showProgress(false);
          setTimeout(() => { btn.textContent = '📷 Share to Instagram'; btn.disabled = false; }, 2000);
          return;
        }
      }

      // Desktop fallback: Download images
      for (const result of results) {
        const link = document.createElement('a');
        link.href = `${API_BASE}${result.url}`;
        link.download = `ai-wrapped-instagram-${result.cardType}.${result.format === 'jpeg' ? 'jpg' : 'png'}`;
        link.click();
      }

      updateProgress(100, 'Downloaded!');
      btn.textContent = '✅ Downloaded!';

      // Show instructions
      showInstagramModal(container, results.length);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Instagram share error:', error);
        btn.textContent = '❌ Error';
      }
    }

    showProgress(false);
    setTimeout(() => { btn.textContent = '📷 Share to Instagram'; btn.disabled = false; }, 2000);
  });

  // Share to Twitter
  container.querySelector('#share-twitter')?.addEventListener('click', async () => {
    const btn = container.querySelector('#share-twitter');
    const cards = getSelectedCards();

    btn.disabled = true;
    btn.textContent = '⏳ Generating...';

    try {
      // Generate image for Twitter if cards selected
      if (cards.length > 0) {
        showProgress(true, 'Generating image...');
        const results = await generateScreenshots([cards[0]], 'twitter');

        if (results.length > 0 && navigator.share && navigator.canShare) {
          const blob = await fetchImageBlob(`${API_BASE}${results[0].url}`);
          const file = new File([blob], 'ai-wrapped-twitter.jpg', { type: 'image/jpeg' });

          const shareData = {
            title: 'My AI Wrapped 2025',
            text: `My 2025 AI Wrapped is here! 🤖✨\n\n${summary.totalConversations} conversations\n"${personality.type}"\n\nGet yours at aiwrapped.com #AIWrapped2025`,
            files: [file]
          };

          if (navigator.canShare(shareData)) {
            updateProgress(100, 'Opening share sheet...');
            await navigator.share(shareData);
            showProgress(false);
            btn.textContent = '✅ Shared!';
            setTimeout(() => { btn.textContent = '🐦 Tweet'; btn.disabled = false; }, 2000);
            return;
          }
        }
      }

      // Fallback: Open Twitter intent
      const text = `My 2025 AI Wrapped is here! 🤖✨

${summary.totalConversations} conversations
"${personality.type}"

Get yours at aiwrapped.com #AIWrapped2025`;

      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
      btn.textContent = '✅ Opened!';
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Twitter share error:', error);
        btn.textContent = '❌ Error';
      }
    }

    showProgress(false);
    setTimeout(() => { btn.textContent = '🐦 Tweet'; btn.disabled = false; }, 2000);
  });
}

// Instagram instructions modal
function showInstagramModal(container, imageCount) {
  const modal = document.createElement('div');
  modal.className = 'instagram-modal';
  modal.innerHTML = `
    <div class="instagram-modal-content">
      <button class="instagram-modal-close">×</button>
      <div class="instagram-modal-icon">📸</div>
      <h3>${imageCount > 1 ? `${imageCount} Images` : 'Image'} Downloaded!</h3>
      <p>To share on Instagram:</p>
      <ol style="text-align: left; padding-left: 20px;">
        <li>Open Instagram on your phone</li>
        <li>Create a new ${imageCount > 1 ? 'carousel' : 'post'}</li>
        <li>Select the downloaded ${imageCount > 1 ? 'images' : 'image'}</li>
        <li>Add: <strong>#AIWrapped2025</strong></li>
      </ol>
      <button class="btn btn-primary" id="modal-close-btn">Got it!</button>
    </div>
  `;

  modal.style.cssText = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex;
    align-items: center; justify-content: center; z-index: 1000;
  `;

  modal.querySelector('.instagram-modal-content').style.cssText = `
    background: #1a1a2e; padding: 24px; border-radius: 16px; max-width: 400px;
    text-align: center; border: 1px solid rgba(255,255,255,0.1);
  `;

  container.appendChild(modal);

  const closeModal = () => modal.remove();
  modal.querySelector('.instagram-modal-close')?.addEventListener('click', closeModal);
  modal.querySelector('#modal-close-btn')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

export default renderPage8;
