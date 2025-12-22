/* ============================================
   AI CHATBOT WRAPPED - WRAPPED EXPERIENCE
   8-Page Sequential Storytelling Container
   ============================================ */

import mockUserData from '../../data/mockData.js';
import { getWrappedData } from '../../utils/chatgptParser.js';
import { animateCounter, createConfetti, delay } from '../../utils/animations.js';
import { ShootingStars } from '../../utils/shootingStars.js';
import { createFloatingButtons } from '../../utils/screenshotCapture.js';

// Page component imports
import { renderPage1 } from './page1-your-ai-year.js';
import { renderPage2 } from './page2-heatmap.js';
import { renderPage3 } from './page3-topics.js';
import { renderPage4 } from './page4-personality.js';
import { renderPage5 } from './page5-tokens.js';
import { renderPage6 } from './page6-speed.js';
import { renderPage7 } from './page7-stats.js';
import { renderPage8 } from './page8-share.js';

const PAGES = [
    { id: 1, title: 'Your AI Year', render: renderPage1 },
    { id: 2, title: 'Heat Map', render: renderPage2 },
    { id: 3, title: 'Topics', render: renderPage3 },
    { id: 4, title: 'Personality', render: renderPage4 },
    { id: 5, title: 'Tokens', render: renderPage5 },
    { id: 6, title: 'Speed', render: renderPage6 },
    { id: 7, title: 'Stats', render: renderPage7 },
    { id: 8, title: 'Share', render: renderPage8 }
];

let currentPage = 0;
let isTransitioning = false;
let shootingStarsInstance = null;

export function renderWrapped() {
    const container = document.createElement('div');
    container.className = 'wrapped-container';

    container.innerHTML = `
    <!-- Instagram-Style Story Progress Bar -->
    <div class="story-progress-bar">
      ${PAGES.map((page, i) => `
        <div class="story-progress-segment ${i === 0 ? 'active' : ''}" data-page="${i}">
          <div class="story-progress-fill"></div>
        </div>
      `).join('')}
    </div>
    
    <!-- Page Counter -->
    <div class="page-counter">
      <span id="current-page-num">1</span> / <span id="total-pages">${PAGES.length}</span>
    </div>

    <!-- Animated Background -->
    <div class="bg-animated">
      <div class="orb orb-cyan" style="width: 500px; height: 500px; top: -150px; left: -100px;"></div>
      <div class="orb orb-purple" style="width: 400px; height: 400px; bottom: -100px; right: -50px;"></div>
      <div class="orb orb-pink" style="width: 300px; height: 300px; top: 40%; left: 70%;"></div>
    </div>

    <!-- Page Container -->
    <div class="wrapped-pages">
      <div class="wrapped-page-wrapper" id="page-wrapper">
        <!-- Pages will be rendered here -->
      </div>
    </div>

    <!-- Mobile Navigation Buttons (Left/Right edges) -->
    <button class="mobile-nav-btn mobile-nav-prev" id="mobile-prev" aria-label="Previous">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button class="mobile-nav-btn mobile-nav-next" id="mobile-next" aria-label="Next">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Bottom Toolbar -->
    <div class="bottom-toolbar">
      <div class="toolbar-pill toolbar-year">
        <span>2025</span>
      </div>
      <button class="toolbar-btn toolbar-grid" id="toolbar-grid" aria-label="View all slides">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1.5"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
      </button>
      <button class="toolbar-btn toolbar-share" id="toolbar-share" aria-label="Share">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
      </button>
      <button class="toolbar-btn toolbar-download" id="toolbar-download" aria-label="Download">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </button>
    </div>

    <!-- Grid View Modal -->
    <div class="grid-modal hidden" id="grid-modal">
      <div class="grid-modal-content">
        <button class="grid-modal-close" id="grid-modal-close">×</button>
        <h3>All Slides</h3>
        <div class="grid-thumbnails" id="grid-thumbnails">
          ${PAGES.map((page, i) => `
            <button class="grid-thumb" data-page="${i}">
              <span class="grid-thumb-num">${i + 1}</span>
              <span class="grid-thumb-title">${page.title}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Back to Home -->
    <a href="/" class="back-home" id="back-home">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Back</span>
    </a>
  `;

    // Initialize after render
    setTimeout(() => {
        initWrapped(container);
        // Initialize shooting stars
        shootingStarsInstance = new ShootingStars(container);
    }, 0);

    return container;
}

function initWrapped(container) {
    const pageWrapper = container.querySelector('#page-wrapper');
    const storySegments = container.querySelectorAll('.story-progress-segment');
    const pageCounter = container.querySelector('#current-page-num');
    const mobilePrev = container.querySelector('#mobile-prev');
    const mobileNext = container.querySelector('#mobile-next');
    const gridBtn = container.querySelector('#toolbar-grid');
    const shareBtn = container.querySelector('#toolbar-share');
    const downloadBtn = container.querySelector('#toolbar-download');
    const gridModal = container.querySelector('#grid-modal');
    const gridClose = container.querySelector('#grid-modal-close');
    const gridThumbs = container.querySelectorAll('.grid-thumb');
    const backHome = container.querySelector('#back-home');

    // Render first page
    renderCurrentPage(pageWrapper);
    updateStoryProgress(storySegments, pageCounter);

    // Mobile touch handler helper
    const addMobileHandler = (el, handler) => {
        if (!el) return;
        el.addEventListener('click', (e) => { e.preventDefault(); handler(e); });
        el.addEventListener('touchend', (e) => { e.preventDefault(); handler(e); }, { passive: false });
    };

    // Mobile navigation buttons
    addMobileHandler(mobilePrev, () => {
        if (!isTransitioning && currentPage > 0) {
            navigateToPage(currentPage - 1, pageWrapper, storySegments, pageCounter);
        }
    });

    addMobileHandler(mobileNext, () => {
        if (!isTransitioning && currentPage < PAGES.length - 1) {
            navigateToPage(currentPage + 1, pageWrapper, storySegments, pageCounter);
        }
    });

    // Story segment clicks
    storySegments.forEach((segment, index) => {
        addMobileHandler(segment, () => {
            if (!isTransitioning && index !== currentPage) {
                navigateToPage(index, pageWrapper, storySegments, pageCounter);
            }
        });
    });

    // Grid view
    addMobileHandler(gridBtn, () => {
        gridModal.classList.remove('hidden');
    });

    addMobileHandler(gridClose, () => {
        gridModal.classList.add('hidden');
    });

    gridThumbs.forEach((thumb) => {
        addMobileHandler(thumb, () => {
            const page = parseInt(thumb.dataset.page);
            gridModal.classList.add('hidden');
            if (!isTransitioning && page !== currentPage) {
                navigateToPage(page, pageWrapper, storySegments, pageCounter);
            }
        });
    });

    // Share button
    addMobileHandler(shareBtn, async () => {
        shareBtn.innerHTML = '⏳';
        await shareCurrentSlide();
        setTimeout(() => {
            shareBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>`;
        }, 1500);
    });

    // Download button
    addMobileHandler(downloadBtn, async () => {
        downloadBtn.innerHTML = '⏳';
        await downloadCurrentSlide();
        setTimeout(() => {
            downloadBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>`;
        }, 1500);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (!isTransitioning && currentPage < PAGES.length - 1) {
                navigateToPage(currentPage + 1, pageWrapper, storySegments, pageCounter);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (!isTransitioning && currentPage > 0) {
                navigateToPage(currentPage - 1, pageWrapper, storySegments, pageCounter);
            }
        } else if (e.key === 'Escape') {
            gridModal.classList.add('hidden');
        }
    });

    // Touch/Swipe support
    let touchStartY = 0;
    let touchStartX = 0;

    pageWrapper.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    pageWrapper.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;

        // Use the larger movement direction
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > 50) {
                if (diffX > 0 && currentPage < PAGES.length - 1) {
                    navigateToPage(currentPage + 1, pageWrapper, storySegments, pageCounter);
                } else if (diffX < 0 && currentPage > 0) {
                    navigateToPage(currentPage - 1, pageWrapper, storySegments, pageCounter);
                }
            }
        } else {
            if (Math.abs(diffY) > 50) {
                if (diffY > 0 && currentPage < PAGES.length - 1) {
                    navigateToPage(currentPage + 1, pageWrapper, storySegments, pageCounter);
                } else if (diffY < 0 && currentPage > 0) {
                    navigateToPage(currentPage - 1, pageWrapper, storySegments, pageCounter);
                }
            }
        }
    }, { passive: true });

    // Back home
    backHome.addEventListener('click', (e) => {
        e.preventDefault();
        import('../../utils/router.js').then(({ router }) => {
            router.navigate('/');
        });
    });
}

// Update story progress bar
function updateStoryProgress(segments, counter) {
    segments.forEach((seg, i) => {
        seg.classList.remove('active', 'completed');
        if (i < currentPage) {
            seg.classList.add('completed');
        } else if (i === currentPage) {
            seg.classList.add('active');
        }
    });
    if (counter) {
        counter.textContent = currentPage + 1;
    }
}

// Share current slide
async function shareCurrentSlide() {
    const { sharePageImage } = await import('../../utils/screenshotCapture.js');
    const data = getWrappedData() || mockUserData;
    await sharePageImage(currentPage + 1, data);
}

// Download current slide
async function downloadCurrentSlide() {
    const { downloadPageImage } = await import('../../utils/screenshotCapture.js');
    const data = getWrappedData() || mockUserData;
    await downloadPageImage(currentPage + 1, data);
}

async function navigateToPage(newPage, wrapper, storySegments, pageCounter) {
    if (isTransitioning) return;
    isTransitioning = true;

    const direction = newPage > currentPage ? 1 : -1;

    // Animate out current page
    wrapper.style.transform = `translateX(${-direction * 30}px)`;
    wrapper.style.opacity = '0';

    await delay(300);

    // Update current page
    currentPage = newPage;

    // Update story progress
    updateStoryProgress(storySegments, pageCounter);

    // Render new page
    renderCurrentPage(wrapper);

    // Animate in new page
    wrapper.style.transform = `translateX(${direction * 30}px)`;
    await delay(50);
    wrapper.style.transform = 'translateX(0)';
    wrapper.style.opacity = '1';

    isTransitioning = false;
}

function renderCurrentPage(wrapper) {
    const page = PAGES[currentPage];
    wrapper.innerHTML = '';

    // Get real data from sessionStorage, fallback to mock data
    const storedData = getWrappedData();
    const userData = storedData || mockUserData;

    // Detailed logging to debug data issues
    console.log(`📊 Page ${currentPage + 1} (${page.title}):`, {
        usingRealData: !!storedData,
        totalConversations: userData.summary?.totalConversations,
        topTopicName: userData.topTopic?.name,
        topTopicConversations: userData.topTopic?.conversations,
        topicsCount: userData.topics?.length,
        firstTopicConvs: userData.topics?.[0]?.conversations
    });

    try {
        const pageElement = page.render(userData);
        wrapper.appendChild(pageElement);

        // Map page titles to page types for screenshot capture
        const pageTypeMap = {
            'Your AI Year': 'year',
            'Heat Map': 'stats',
            'Topics': 'topic',
            'Personality': 'personality',
            'Tokens': 'tokens',
            'Speed': 'speed',
            'Stats': 'stats',
            'Share': 'badges'
        };
        const pageType = pageTypeMap[page.title] || 'year';

        // Add floating capture/share buttons (except on Share page which has its own)
        if (page.title !== 'Share') {
            const pageData = {
                ...userData.summary,
                ...userData.personality,
                ...userData.topTopic,
                badges: userData.badges,
                icon: userData.personality?.icon || userData.topTopic?.icon || '✨',
                type: userData.personality?.type,
                name: userData.topTopic?.name,
                percentage: userData.topTopic?.conversations ?
                    Math.round((userData.topTopic.conversations / userData.summary.totalConversations) * 100) : 0
            };

            // Use document body for floating buttons
            setTimeout(() => {
                createFloatingButtons(document.body, pageData, pageType);
            }, 200);
        } else {
            // Remove floating buttons on share page
            const existing = document.querySelector('.floating-actions');
            if (existing) existing.remove();
        }

        // Trigger page-specific animations
        setTimeout(() => {
            const animatedElements = wrapper.querySelectorAll('.animate-on-enter');
            animatedElements.forEach((el, i) => {
                el.style.animationDelay = `${i * 100}ms`;
                el.classList.add('is-visible');
            });
        }, 100);
    } catch (error) {
        console.error(`Error rendering page ${page.id}:`, error);
        wrapper.innerHTML = `
            <div class="wrapped-content" style="text-align: center; padding: 2rem;">
                <h2 style="color: #ff6b6b;">Oops! Something went wrong</h2>
                <p style="color: rgba(255,255,255,0.7);">Error loading ${page.title}</p>
                <p style="color: rgba(255,255,255,0.5); font-size: 0.8rem;">${error.message}</p>
            </div>
        `;
    }
}

export default renderWrapped;
