/* ============================================
   AI CHATBOT WRAPPED - LANDING PAGE (ENHANCED)
   Hero section with sign-in modal and data import
   ============================================ */

import { router } from '../utils/router.js';
import { API_BASE } from '../utils/config.js';

let currentModal = null;

export function renderLanding() {
  const container = document.createElement('div');
  container.className = 'landing-page';

  container.innerHTML = `
    <!-- Animated Background -->
    <div class="bg-animated">
      <div class="orb orb-cyan" style="width: 600px; height: 600px; top: -200px; left: -100px;"></div>
      <div class="orb orb-purple" style="width: 500px; height: 500px; bottom: -150px; right: -100px;"></div>
      <div class="orb orb-pink" style="width: 400px; height: 400px; top: 50%; left: 60%;"></div>
    </div>

    <!-- Navigation -->
    <nav class="landing-nav">
      <div class="container flex justify-between items-center">
        <div class="logo">
          <span class="logo-icon">✨</span>
          <span class="logo-text">AI Wrapped</span>
        </div>
        <div class="nav-links">
          <a href="#features" class="nav-link">Features</a>
          <a href="#how-it-works" class="nav-link">How It Works</a>
          <button class="btn btn-ghost btn-sm" id="sign-in-btn">Sign In</button>
          <button class="btn btn-primary btn-sm" id="get-started-btn">Get Started</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge badge badge-cyan animate-fade-in">
            <span>🎉</span> 2025 Wrapped is Here
          </div>
          
          <h1 class="hero-title animate-fade-in-up">
            <span class="text-gradient">Celebrate</span><br>
            Your AI Year
          </h1>
          
          <p class="hero-subtitle animate-fade-in-up delay-200">
            Upload your ChatGPT, Claude, or any AI chatbot data dump and discover 
            your unique AI journey with personalized insights and shareable recaps.
          </p>
          
          <div class="hero-cta animate-fade-in-up delay-400">
            <button class="btn btn-primary btn-lg" id="hero-cta">
              <span>Get Your Wrapped</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 15L12 10L7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <button class="btn btn-secondary btn-lg" id="demo-cta">
              <span>🎬</span> View Demo
            </button>
          </div>

          <div class="hero-trust animate-fade-in-up delay-600">
            <div class="trust-avatars">
              <div class="trust-avatar">👨‍💻</div>
              <div class="trust-avatar">👩‍🎨</div>
              <div class="trust-avatar">🧑‍🔬</div>
              <div class="trust-avatar">👨‍🏫</div>
              <div class="trust-avatar">+50K</div>
            </div>
            <p class="trust-text">Join 50,000+ AI enthusiasts who've discovered their wrapped</p>
          </div>
        </div>

        <div class="hero-visual animate-fade-in-up delay-300">
          <div class="hero-card hero-card-large">
            <div class="hero-card-glow"></div>
            <div class="hero-card-content">
              <div class="hero-card-header">
                <span class="platform-icon platform-chatgpt">🤖</span>
                <div>
                  <div class="hero-card-title">Your Top AI</div>
                  <div class="hero-card-subtitle">ChatGPT</div>
                </div>
              </div>
              
              <div class="hero-card-stat hero-card-stat-large">
                <span class="stat-number text-glow-cyan" id="hero-stat-number">12,450</span>
                <span class="stat-text">prompts in 2025</span>
              </div>
              
              <div class="hero-card-percentile">
                <span class="percentile-badge">🏆 Top 22% of 123M users</span>
              </div>
              
              <div class="hero-card-personality">
                <span class="personality-badge">🔥 The Debug Demon</span>
              </div>
              
              <div class="hero-card-badges">
                <span class="mini-badge" title="Token Titan">👑</span>
                <span class="mini-badge" title="3 AM Thinker">🦉</span>
                <span class="mini-badge" title="Code Goblin">👺</span>
                <span class="mini-badge" title="Streak Master">🔥</span>
                <span class="mini-badge" title="Polite Prompter">🤝</span>
              </div>
              
              <div class="hero-card-footer">
                <span class="hero-card-watermark">✨ aiwrapped.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Supported Platform -->
    <section class="platforms-section">
      <div class="container">
        <p class="platforms-title">Analyze your ChatGPT usage</p>
        <div class="platforms-logos">
          <div class="platform-logo platform-featured">
            <span class="platform-emoji">🤖</span>
            <span>ChatGPT</span>
          </div>
        </div>
        <p class="platforms-note">Export your ChatGPT data and upload it here to see your personalized AI Wrapped!</p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Your AI Story, <span class="text-gradient">Visualized</span></h2>
          <p class="section-subtitle">Eight stunning pages that reveal your unique AI journey</p>
        </div>

        <div class="features-grid">
          <div class="feature-card animate-on-scroll">
            <div class="feature-icon" style="--glow-color: var(--neon-cyan);">📤</div>
            <h3 class="feature-title">Easy Data Import</h3>
            <p class="feature-description">Upload your ChatGPT export PDF or connect via OAuth. Your data stays private.</p>
          </div>

          <div class="feature-card animate-on-scroll">
            <div class="feature-icon" style="--glow-color: var(--neon-pink);">🎯</div>
            <h3 class="feature-title">Quirky Insights</h3>
            <p class="feature-description">Fun, personalized roasts and compliments based on your AI usage patterns.</p>
          </div>

          <div class="feature-card animate-on-scroll">
            <div class="feature-icon" style="--glow-color: var(--neon-purple);">🧠</div>
            <h3 class="feature-title">AI Personality</h3>
            <p class="feature-description">Discover your unique AI interaction style with fun archetype reveals.</p>
          </div>

          <div class="feature-card animate-on-scroll">
            <div class="feature-icon" style="--glow-color: var(--neon-green);">🏆</div>
            <h3 class="feature-title">Achievement Badges</h3>
            <p class="feature-description">Earn badges for milestones like "3AM Thinker", "Code Goblin", and more.</p>
          </div>

          <div class="feature-card animate-on-scroll">
            <div class="feature-icon" style="--glow-color: var(--neon-orange);">📸</div>
            <h3 class="feature-title">Insta-Ready Cards</h3>
            <p class="feature-description">Download or share directly to Instagram with beautiful branded graphics.</p>
          </div>

          <div class="feature-card animate-on-scroll">
            <div class="feature-icon" style="--glow-color: var(--neon-blue);">🔒</div>
            <h3 class="feature-title">Privacy First</h3>
            <p class="feature-description">Analysis happens in your browser. We never store your conversations.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works" id="how-it-works">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Get Your Wrapped in <span class="text-gradient">3 Steps</span></h2>
        </div>

        <div class="steps">
          <div class="step animate-on-scroll">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3 class="step-title">Export Your Data</h3>
              <p class="step-description">Download your chat history from ChatGPT, Claude, or any AI tool as PDF/JSON.</p>
            </div>
          </div>

          <div class="step animate-on-scroll">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3 class="step-title">Upload &amp; Analyze</h3>
              <p class="step-description">Drop your file and we'll crunch the numbers with quirky AI-powered analysis.</p>
            </div>
          </div>

          <div class="step animate-on-scroll">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3 class="step-title">Share &amp; Flex</h3>
              <p class="step-description">Download your wrapped or share directly to Instagram, LinkedIn and Twitter.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Badges Section -->
    <section class="badges-section" id="badges">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Unlock <span class="text-gradient">30 Achievement Badges</span></h2>
          <p class="section-subtitle">Earn fun badges based on your AI usage patterns</p>
        </div>

        <div class="badges-showcase">
          <!-- Usage Milestones -->
          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #00f0ff;">
            <div class="badge-showcase-icon">👑</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Token Titan</div>
              <div class="badge-showcase-desc">Processed over 1M tokens</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #1fb8cd;">
            <div class="badge-showcase-icon">🌊</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Word Tsunami</div>
              <div class="badge-showcase-desc">500+ conversations</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ff00a8;">
            <div class="badge-showcase-icon">🎯</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Prompt Prodigy</div>
              <div class="badge-showcase-desc">10,000+ prompts sent</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #8b00ff;">
            <div class="badge-showcase-icon">🧠</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Mega Mind</div>
              <div class="badge-showcase-desc">3M+ tokens processed</div>
            </div>
          </div>

          <!-- Time-based -->
          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #8b00ff;">
            <div class="badge-showcase-icon">🦉</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">3 AM Thinker</div>
              <div class="badge-showcase-desc">Late night AI sessions</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ffee00;">
            <div class="badge-showcase-icon">🐦</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Early Bird</div>
              <div class="badge-showcase-desc">Prompt before 6 AM</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ff6b00;">
            <div class="badge-showcase-icon">⚔️</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Weekend Warrior</div>
              <div class="badge-showcase-desc">100+ weekend chats</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #10a37f;">
            <div class="badge-showcase-icon">🥪</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Lunch Learner</div>
              <div class="badge-showcase-desc">Peak lunch hour user</div>
            </div>
          </div>

          <!-- Consistency -->
          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ff00a8;">
            <div class="badge-showcase-icon">🏰</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Consistency Monarch</div>
              <div class="badge-showcase-desc">Active 300+ days</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #cc785c;">
            <div class="badge-showcase-icon">🔥</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Streak Master</div>
              <div class="badge-showcase-desc">30+ day streak</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #4285f4;">
            <div class="badge-showcase-icon">📅</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Daily Devotee</div>
              <div class="badge-showcase-desc">AI every day for a month</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #00ff88;">
            <div class="badge-showcase-icon">💪</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Never Skip Day</div>
              <div class="badge-showcase-desc">200+ active days in a row</div>
            </div>
          </div>

          <!-- Topics & Skills -->
          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #00ff88;">
            <div class="badge-showcase-icon">👺</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Code Goblin</div>
              <div class="badge-showcase-desc">100+ coding sessions</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ff0066;">
            <div class="badge-showcase-icon">✍️</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Creative Muse</div>
              <div class="badge-showcase-desc">100+ creative writing</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ffee00;">
            <div class="badge-showcase-icon">🐰</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Research Rabbit</div>
              <div class="badge-showcase-desc">50+ rabbit holes</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #1fb8cd;">
            <div class="badge-showcase-icon">📊</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Data Wizard</div>
              <div class="badge-showcase-desc">50+ data analysis</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #00ccff;">
            <div class="badge-showcase-icon">🎓</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Lifelong Learner</div>
              <div class="badge-showcase-desc">100+ learning sessions</div>
            </div>
          </div>

          <!-- Personality & Behavior -->
          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #10a37f;">
            <div class="badge-showcase-icon">🤝</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Polite Prompter</div>
              <div class="badge-showcase-desc">"Please" & "thank you"</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #0066ff;">
            <div class="badge-showcase-icon">🌌</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Existential Explorer</div>
              <div class="badge-showcase-desc">Asked about life meaning</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ff6b00;">
            <div class="badge-showcase-icon">⏰</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Procrastinator Pro</div>
              <div class="badge-showcase-desc">Deadlines while procrastinating</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #cc785c;">
            <div class="badge-showcase-icon">🤔</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Certified Overthinker</div>
              <div class="badge-showcase-desc">Rephrased 5+ times</div>
            </div>
          </div>

          <!-- Platform & Tech -->
          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ffee00;">
            <div class="badge-showcase-icon">🐇</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Platform Hopper</div>
              <div class="badge-showcase-desc">Used 4+ AI tools</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #8b00ff;">
            <div class="badge-showcase-icon">🗣️</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">AI Polyglot</div>
              <div class="badge-showcase-desc">Fluent in multiple AIs</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #00f0ff;">
            <div class="badge-showcase-icon">🧪</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Beta Tester</div>
              <div class="badge-showcase-desc">3+ new AI tools tried</div>
            </div>
          </div>

          <!-- Fun & Quirky -->
          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ff00a8;">
            <div class="badge-showcase-icon">😂</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Meme Lord</div>
              <div class="badge-showcase-desc">20+ meme explanations</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ffee00;">
            <div class="badge-showcase-icon">🎉</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Emoji Enthusiast</div>
              <div class="badge-showcase-desc">500+ emojis in prompts</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ff0066;">
            <div class="badge-showcase-icon">📖</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Novel Writer</div>
              <div class="badge-showcase-desc">10,000+ word conversation</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #00f0ff;">
            <div class="badge-showcase-icon">⚡</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Speed Demon</div>
              <div class="badge-showcase-desc">50+ prompts in one hour</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #ffd700;">
            <div class="badge-showcase-icon">👑</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Context King</div>
              <div class="badge-showcase-desc">100+ message context</div>
            </div>
          </div>

          <div class="badge-showcase-item animate-on-scroll" style="--badge-color: #10a37f;">
            <div class="badge-showcase-icon">🔍</div>
            <div class="badge-showcase-info">
              <div class="badge-showcase-name">Debug Detective</div>
              <div class="badge-showcase-desc">50+ bugs solved</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-glow"></div>
          <h2 class="cta-title">Ready to See Your AI Year?</h2>
          <p class="cta-subtitle">Join 50,000+ users who've already discovered their AI wrapped.</p>
          <button class="btn btn-primary btn-lg" id="final-cta">
            Get Started Free
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 15L12 10L7 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <span class="logo-icon">✨</span>
            <span class="logo-text">AI Wrapped</span>
          </div>
          <p class="footer-text">Made with 💜 for AI enthusiasts everywhere</p>
          <div class="footer-links">
            <a href="#" class="footer-link">Privacy</a>
            <a href="#" class="footer-link">Terms</a>
            <a href="#" class="footer-link">Twitter</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Auth Modal -->
    <div class="modal-overlay hidden" id="auth-modal">
      <div class="modal">
        <button class="modal-close" id="modal-close">×</button>
        <div class="modal-content" id="modal-content">
          <!-- Content injected dynamically -->
        </div>
      </div>
    </div>
  `;

  // Add event listeners after render
  setTimeout(() => {
    setupEventListeners(container);
    setupScrollObserver();
  }, 0);

  return container;
}

function setupEventListeners(container) {
  // Helper to add both click and touch events for mobile
  const addMobileClickHandler = (selector, handler) => {
    const el = container.querySelector(selector);
    if (!el) return;

    // Click for desktop
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handler();
    });

    // Touch for mobile
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handler();
    }, { passive: false });
  };

  // Sign In button
  addMobileClickHandler('#sign-in-btn', () => showAuthModal('signin'));

  // Get Started buttons
  ['#get-started-btn', '#hero-cta', '#final-cta'].forEach(id => {
    addMobileClickHandler(id, () => showAuthModal('signup'));
  });

  // Demo button - direct navigation
  addMobileClickHandler('#demo-cta', () => {
    console.log('Demo button clicked - navigating to /wrapped');
    router.navigate('/wrapped');
  });

  // Modal close
  container.querySelector('#modal-close')?.addEventListener('click', closeModal);
  container.querySelector('#auth-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'auth-modal') closeModal();
  });

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function showAuthModal(type) {
  const modal = document.getElementById('auth-modal');
  const content = document.getElementById('modal-content');

  if (!modal || !content) return;

  if (type === 'signin') {
    content.innerHTML = `
      <h2 class="modal-title">Welcome Back! 👋</h2>
      <p class="modal-subtitle">Sign in to see your AI wrapped</p>
      
      <div class="social-auth">
        <button class="btn btn-social btn-google" id="google-signin">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <button class="btn btn-social btn-github">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Continue with GitHub
        </button>
      </div>
      
      <div class="divider"><span>or</span></div>
      
      <form class="auth-form" id="signin-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="you@example.com" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Sign In</button>
      </form>
      
      <p class="auth-switch">
        Don't have an account? <a href="#" id="switch-to-signup">Sign up</a>
      </p>
    `;
  } else {
    content.innerHTML = `
      <h2 class="modal-title">Get Your AI Wrapped ✨</h2>
      <p class="modal-subtitle">Create an account to save and share your wrapped</p>
      
      <div class="social-auth">
        <button class="btn btn-social btn-google" id="google-signin">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>
        <button class="btn btn-social btn-github">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          Continue with GitHub
        </button>
      </div>
      
      <div class="divider"><span>or</span></div>
      
      <form class="auth-form" id="signup-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Your name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="you@example.com" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Create Account</button>
      </form>
      
      <p class="auth-switch">
        Already have an account? <a href="#" id="switch-to-signin">Sign in</a>
      </p>
    `;
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Add form listeners
  setTimeout(() => {
    document.getElementById('switch-to-signup')?.addEventListener('click', (e) => {
      e.preventDefault();
      showAuthModal('signup');
    });
    document.getElementById('switch-to-signin')?.addEventListener('click', (e) => {
      e.preventDefault();
      showAuthModal('signin');
    });

    // Form submissions - go to import page
    document.getElementById('signin-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      router.navigate('/import');
    });
    document.getElementById('signup-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      router.navigate('/import');
    });

    // Google auth button - check backend status first
    document.getElementById('google-signin')?.addEventListener('click', async () => {
      try {
        const response = await fetch(`${API_BASE}/health`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          mode: 'cors'
        });
        const data = await response.json();

        if (data.oauth) {
          window.location.href = `${API_BASE}/auth/google`;
        } else {
          // OAuth not configured, redirect to import page
          closeModal();
          router.navigate('/import');
        }
      } catch (e) {
        // Backend not available - still allow user to continue with file upload
        console.log('Backend not available, redirecting to import page');
        closeModal();
        router.navigate('/import');
      }
    });

    // Apple auth button - show coming soon (Apple OAuth requires more setup)
    document.getElementById('apple-signin')?.addEventListener('click', () => {
      alert('Apple Sign-In coming soon! Please use Google or upload your ChatGPT export.');
    });

    // Fallback for any .btn-social not specifically handled
    document.querySelectorAll('.btn-social:not(#google-signin):not(#apple-signin)').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal();
        router.navigate('/import');
      });
    });
  }, 0);
}

function closeModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function setupScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

export default renderLanding;
