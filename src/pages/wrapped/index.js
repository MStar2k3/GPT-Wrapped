/* ============================================
   AI CHATBOT WRAPPED - WRAPPED EXPERIENCE
   8-Page Sequential Storytelling Container
   ============================================ */

import mockUserData from '../../data/mockData.js';
import { getWrappedData } from '../../utils/chatgptParser.js';
import { animateCounter, createConfetti, delay } from '../../utils/animations.js';
import { ShootingStars } from '../../utils/shootingStars.js';

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
    <!-- Animated Background -->
    <div class="bg-animated">
      <div class="orb orb-cyan" style="width: 500px; height: 500px; top: -150px; left: -100px;"></div>
      <div class="orb orb-purple" style="width: 400px; height: 400px; bottom: -100px; right: -50px;"></div>
      <div class="orb orb-pink" style="width: 300px; height: 300px; top: 40%; left: 70%;"></div>
    </div>

    <!-- Navigation Dots -->
    <nav class="nav-dots" aria-label="Page navigation">
      ${PAGES.map((page, i) => `
        <button class="nav-dot ${i === 0 ? 'active' : ''}" data-page="${i}" aria-label="Page ${i + 1}: ${page.title}"></button>
      `).join('')}
    </nav>

    <!-- Progress Bar -->
    <div class="wrapped-progress">
      <div class="wrapped-progress-bar" style="width: ${(1 / PAGES.length) * 100}%"></div>
    </div>

    <!-- Page Container -->
    <div class="wrapped-pages">
      <div class="wrapped-page-wrapper" id="page-wrapper">
        <!-- Pages will be rendered here -->
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button class="nav-arrow nav-arrow-prev hidden" id="prev-btn" aria-label="Previous page">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <button class="nav-arrow nav-arrow-next" id="next-btn" aria-label="Next page">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

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
    const navDots = container.querySelectorAll('.nav-dot');
    const prevBtn = container.querySelector('#prev-btn');
    const nextBtn = container.querySelector('#next-btn');
    const progressBar = container.querySelector('.wrapped-progress-bar');
    const backHome = container.querySelector('#back-home');

    // Render first page
    renderCurrentPage(pageWrapper);

    // Navigation dot clicks
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isTransitioning && index !== currentPage) {
                navigateToPage(index, pageWrapper, navDots, progressBar, prevBtn, nextBtn);
            }
        });
    });

    // Arrow navigation
    prevBtn.addEventListener('click', () => {
        if (!isTransitioning && currentPage > 0) {
            navigateToPage(currentPage - 1, pageWrapper, navDots, progressBar, prevBtn, nextBtn);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (!isTransitioning && currentPage < PAGES.length - 1) {
            navigateToPage(currentPage + 1, pageWrapper, navDots, progressBar, prevBtn, nextBtn);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (!isTransitioning && currentPage < PAGES.length - 1) {
                navigateToPage(currentPage + 1, pageWrapper, navDots, progressBar, prevBtn, nextBtn);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (!isTransitioning && currentPage > 0) {
                navigateToPage(currentPage - 1, pageWrapper, navDots, progressBar, prevBtn, nextBtn);
            }
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
                    navigateToPage(currentPage + 1, pageWrapper, navDots, progressBar, prevBtn, nextBtn);
                } else if (diffX < 0 && currentPage > 0) {
                    navigateToPage(currentPage - 1, pageWrapper, navDots, progressBar, prevBtn, nextBtn);
                }
            }
        } else {
            if (Math.abs(diffY) > 50) {
                if (diffY > 0 && currentPage < PAGES.length - 1) {
                    navigateToPage(currentPage + 1, pageWrapper, navDots, progressBar, prevBtn, nextBtn);
                } else if (diffY < 0 && currentPage > 0) {
                    navigateToPage(currentPage - 1, pageWrapper, navDots, progressBar, prevBtn, nextBtn);
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

async function navigateToPage(newPage, wrapper, dots, progressBar, prevBtn, nextBtn) {
    if (isTransitioning) return;
    isTransitioning = true;

    const direction = newPage > currentPage ? 1 : -1;

    // Animate out current page
    wrapper.style.transform = `translateX(${-direction * 30}px)`;
    wrapper.style.opacity = '0';

    await delay(300);

    // Update current page
    currentPage = newPage;

    // Update UI
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentPage);
    });

    progressBar.style.width = `${((currentPage + 1) / PAGES.length) * 100}%`;

    // Update arrow visibility
    prevBtn.classList.toggle('hidden', currentPage === 0);
    nextBtn.classList.toggle('hidden', currentPage === PAGES.length - 1);

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
