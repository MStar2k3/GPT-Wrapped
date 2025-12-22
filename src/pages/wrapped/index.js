/* ============================================
   GPT WRAPPED - 22 SLIDE STORYTELLING
   Dark background, no animations, per-slide buttons
   ============================================ */

import mockUserData from '../../data/mockData.js';
import { getWrappedData } from '../../utils/chatgptParser.js';
import { delay } from '../../utils/animations.js';
import { SLIDES } from '../../data/slides.js';
import { renderSlide } from '../../components/SlideRenderer.js';
import { downloadPageImage, sharePageImage } from '../../utils/screenshotCapture.js';

let currentPage = 0;
let isTransitioning = false;
let userData = null;

export function renderWrapped() {
    const container = document.createElement('div');
    container.className = 'wrapped-container wrapped-dark';

    // Get user data
    userData = getWrappedData() || mockUserData;

    container.innerHTML = `
    <!-- Instagram-Style Story Progress Bar -->
    <div class="story-progress-bar">
      ${SLIDES.map((slide, i) => `
        <div class="story-progress-segment ${i === 0 ? 'active' : ''}" data-page="${i}">
          <div class="story-progress-fill"></div>
        </div>
      `).join('')}
    </div>
    
    <!-- Page Counter -->
    <div class="page-counter">
      <span id="current-page-num">1</span> / <span id="total-pages">${SLIDES.length}</span>
    </div>

    <!-- Dark Static Background -->
    <div class="dark-bg"></div>

    <!-- Slide Container -->
    <div class="slide-container">
      <div class="slide-wrapper" id="slide-wrapper">
        <!-- Slide will be rendered here -->
      </div>
    </div>

    <!-- Mobile Navigation Buttons -->
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
          ${SLIDES.map((slide, i) => `
            <button class="grid-thumb" data-page="${i}" style="background: ${slide.gradient}">
              <span class="grid-thumb-num">${i + 1}</span>
              <span class="grid-thumb-emoji">${typeof slide.emoji === 'function' ? '📊' : slide.emoji}</span>
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
    setTimeout(() => initWrapped(container), 0);

    return container;
}

function initWrapped(container) {
    const slideWrapper = container.querySelector('#slide-wrapper');
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

    // Render first slide
    renderCurrentSlide(slideWrapper);
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
            navigateToSlide(currentPage - 1, slideWrapper, storySegments, pageCounter);
        }
    });

    addMobileHandler(mobileNext, () => {
        if (!isTransitioning && currentPage < SLIDES.length - 1) {
            navigateToSlide(currentPage + 1, slideWrapper, storySegments, pageCounter);
        }
    });

    // Story segment clicks
    storySegments.forEach((segment, index) => {
        addMobileHandler(segment, () => {
            if (!isTransitioning && index !== currentPage) {
                navigateToSlide(index, slideWrapper, storySegments, pageCounter);
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
                navigateToSlide(page, slideWrapper, storySegments, pageCounter);
            }
        });
    });

    // Toolbar share button
    addMobileHandler(shareBtn, async () => {
        shareBtn.innerHTML = '⏳';
        await sharePageImage(currentPage + 1, userData);
        setTimeout(() => {
            shareBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>`;
        }, 1500);
    });

    // Toolbar download button
    addMobileHandler(downloadBtn, async () => {
        downloadBtn.innerHTML = '⏳';
        await downloadPageImage(currentPage + 1, userData);
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
            if (!isTransitioning && currentPage < SLIDES.length - 1) {
                navigateToSlide(currentPage + 1, slideWrapper, storySegments, pageCounter);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (!isTransitioning && currentPage > 0) {
                navigateToSlide(currentPage - 1, slideWrapper, storySegments, pageCounter);
            }
        } else if (e.key === 'Escape') {
            gridModal.classList.add('hidden');
        }
    });

    // Touch/Swipe support
    let touchStartY = 0;
    let touchStartX = 0;

    slideWrapper.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slideWrapper.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > 50) {
                if (diffX > 0 && currentPage < SLIDES.length - 1) {
                    navigateToSlide(currentPage + 1, slideWrapper, storySegments, pageCounter);
                } else if (diffX < 0 && currentPage > 0) {
                    navigateToSlide(currentPage - 1, slideWrapper, storySegments, pageCounter);
                }
            }
        } else {
            if (Math.abs(diffY) > 50) {
                if (diffY > 0 && currentPage < SLIDES.length - 1) {
                    navigateToSlide(currentPage + 1, slideWrapper, storySegments, pageCounter);
                } else if (diffY < 0 && currentPage > 0) {
                    navigateToSlide(currentPage - 1, slideWrapper, storySegments, pageCounter);
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

    // Setup slide action button listeners (delegated)
    container.addEventListener('click', async (e) => {
        const downloadBtn = e.target.closest('.slide-download-btn');
        const shareBtn = e.target.closest('.slide-share-btn');

        if (downloadBtn) {
            e.preventDefault();
            downloadBtn.innerHTML = '⏳';
            await downloadPageImage(currentPage + 1, userData);
            downloadBtn.innerHTML = '✅';
            setTimeout(() => {
                downloadBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>`;
            }, 1500);
        }

        if (shareBtn) {
            e.preventDefault();
            shareBtn.innerHTML = '⏳';
            await sharePageImage(currentPage + 1, userData);
            shareBtn.innerHTML = '✅';
            setTimeout(() => {
                shareBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>`;
            }, 1500);
        }
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

// Navigate to specific slide
async function navigateToSlide(newPage, wrapper, storySegments, pageCounter) {
    if (isTransitioning) return;
    isTransitioning = true;

    const direction = newPage > currentPage ? 1 : -1;

    // Animate out current slide
    wrapper.style.transform = `translateX(${-direction * 30}px)`;
    wrapper.style.opacity = '0';

    await delay(200);

    // Update current page
    currentPage = newPage;

    // Update story progress
    updateStoryProgress(storySegments, pageCounter);

    // Render new slide
    renderCurrentSlide(wrapper);

    // Animate in new slide
    wrapper.style.transform = `translateX(${direction * 30}px)`;
    await delay(50);
    wrapper.style.transform = 'translateX(0)';
    wrapper.style.opacity = '1';

    isTransitioning = false;
}

// Render the current slide
function renderCurrentSlide(wrapper) {
    const slideConfig = SLIDES[currentPage];
    wrapper.innerHTML = '';

    const slideElement = renderSlide(slideConfig, userData);
    wrapper.appendChild(slideElement);
}

export default renderWrapped;
