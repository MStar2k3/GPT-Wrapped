/* ============================================
   AI CHATBOT WRAPPED - DATA IMPORT PAGE
   Upload PDF/JSON or connect via OAuth
   ============================================ */

import { router } from '../utils/router.js';
import { parseUploadedFile, storeWrappedData } from '../utils/chatgptParser.js';

export function renderImport() {
  const container = document.createElement('div');
  container.className = 'import-page';

  container.innerHTML = `
    <!-- Animated Background -->
    <div class="bg-animated">
      <div class="orb orb-cyan" style="width: 500px; height: 500px; top: -150px; left: -100px;"></div>
      <div class="orb orb-purple" style="width: 400px; height: 400px; bottom: -100px; right: -50px;"></div>
    </div>

    <!-- Back Link -->
    <a href="/" class="back-home" id="back-home">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Back</span>
    </a>

    <div class="import-container">
      <div class="import-header">
        <h1 class="import-title">Import Your <span class="text-gradient">AI Data</span></h1>
        <p class="import-subtitle">Upload your chat export or connect your account to generate your wrapped</p>
      </div>

      <!-- Tab Selector -->
      <div class="import-tabs">
        <button class="import-tab active" data-tab="upload">
          <span class="tab-icon">📤</span>
          Upload File
        </button>
        <button class="import-tab" data-tab="connect">
          <span class="tab-icon">🔗</span>
          Connect Account
        </button>
      </div>

      <!-- Upload Tab Content -->
      <div class="import-content" id="upload-content">
        <div class="upload-zone" id="upload-zone">
          <div class="upload-icon">📁</div>
          <h3 class="upload-title">Drop your chat export here</h3>
          <p class="upload-subtitle">or click to browse files</p>
          <p class="upload-formats">Supports: ZIP (ChatGPT export), JSON, HTML (Max 750MB)</p>
          <input type="file" id="file-input" accept=".zip,.json,.html" hidden>
        </div>

        <div class="upload-help">
          <h4>📖 How to export your ChatGPT data:</h4>
          <div class="export-guides">
            <details class="export-guide" open>
              <summary>
                <span class="guide-icon">🤖</span>
                ChatGPT Export Guide
              </summary>
              <ol>
                <li>Go to <a href="https://chat.openai.com" target="_blank">chat.openai.com</a></li>
                <li>Click your profile icon (bottom left)</li>
                <li>Select <strong>Settings</strong></li>
                <li>Go to <strong>Data Controls</strong></li>
                <li>Click <strong>Export data</strong></li>
                <li>Wait for email, download ZIP, and upload here!</li>
              </ol>
            </details>
          </div>
        </div>

        <!-- Processing State (hidden initially) -->
        <div class="processing-state hidden" id="processing-state">
          <div class="processing-animation">
            <div class="processing-ring"></div>
            <span class="processing-icon">🤖</span>
          </div>
          <h3 class="processing-title">Analyzing your ChatGPT journey...</h3>
          <p class="processing-subtitle" id="processing-text">Extracting conversations...</p>
          <div class="processing-bar">
            <div class="processing-fill" id="processing-fill"></div>
          </div>
        </div>
      </div>

      <!-- Connect Tab Content -->
      <div class="import-content hidden" id="connect-content">
        <div class="connect-platforms">
          <button class="connect-platform" data-platform="chatgpt">
            <span class="connect-icon" style="background: rgba(16, 163, 127, 0.2); color: #10a37f;">🤖</span>
            <div class="connect-info">
              <span class="connect-name">ChatGPT</span>
              <span class="connect-status">Connect via OpenAI</span>
            </div>
            <span class="connect-arrow">→</span>
          </button>
        </div>

        <div class="connect-note">
          <span class="note-icon">🔒</span>
          <p>We only read metadata (timestamps, message counts). Your actual conversations stay private.</p>
        </div>
        
        <div class="connect-info-box">
          <p><strong>Note:</strong> OpenAI OAuth integration requires server-side setup. For now, please upload your data export using the "Upload File" tab above.</p>
        </div>
      </div>

      <!-- Skip Option -->
      <div class="import-skip">
        <button class="btn btn-ghost" id="skip-btn">
          Skip for now → Try with demo data
        </button>
      </div>
    </div>
  `;

  // Setup event listeners
  setTimeout(() => setupImportListeners(container), 0);

  return container;
}

function setupImportListeners(container) {
  const tabs = container.querySelectorAll('.import-tab');
  const uploadContent = container.querySelector('#upload-content');
  const connectContent = container.querySelector('#connect-content');
  const uploadZone = container.querySelector('#upload-zone');
  const fileInput = container.querySelector('#file-input');
  const processingState = container.querySelector('#processing-state');

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (tab.dataset.tab === 'upload') {
        uploadContent.classList.remove('hidden');
        connectContent.classList.add('hidden');
      } else {
        uploadContent.classList.add('hidden');
        connectContent.classList.remove('hidden');
      }
    });
  });

  // File upload
  uploadZone.addEventListener('click', () => fileInput.click());

  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) processFile(file, container);
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) processFile(file, container);
  });

  // Connect platform buttons
  container.querySelectorAll('.connect-platform').forEach(btn => {
    btn.addEventListener('click', () => {
      // Simulate OAuth flow with loading state
      btn.innerHTML = `
        <span class="connect-icon" style="background: var(--bg-glass);">⏳</span>
        <div class="connect-info">
          <span class="connect-name">Connecting...</span>
          <span class="connect-status">Please wait</span>
        </div>
      `;

      setTimeout(() => {
        simulateProcessing(container);
      }, 1000);
    });
  });

  // Skip button
  container.querySelector('#skip-btn')?.addEventListener('click', () => {
    router.navigate('/wrapped');
  });

  // Back home
  container.querySelector('#back-home')?.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate('/');
  });
}

async function processFile(file, container) {
  console.log('Processing file:', file.name);

  const uploadZone = container.querySelector('#upload-zone');
  const processingState = container.querySelector('#processing-state');
  const processingText = container.querySelector('#processing-text');
  const processingFill = container.querySelector('#processing-fill');

  // Show that we received the file
  uploadZone.innerHTML = `
    <div class="upload-success">
      <span class="success-icon">✅</span>
      <h3>File received!</h3>
      <p>${file.name} (${(file.size / 1024).toFixed(1)} KB)</p>
    </div>
  `;

  // Brief pause then start processing
  await new Promise(r => setTimeout(r, 500));

  // Switch to processing view
  if (uploadZone) uploadZone.classList.add('hidden');
  container.querySelector('.upload-help')?.classList.add('hidden');
  processingState?.classList.remove('hidden');

  try {
    // Step 1: Loading file
    updateProgress(processingText, processingFill, "Loading file...", 10);
    await new Promise(r => setTimeout(r, 300));

    // Step 2: Parse the file
    updateProgress(processingText, processingFill, "Extracting conversations...", 25);
    const wrappedData = await parseUploadedFile(file);

    // Step 3: Analyzing
    updateProgress(processingText, processingFill, "Analyzing message patterns...", 50);
    await new Promise(r => setTimeout(r, 400));

    // Step 4: Processing
    updateProgress(processingText, processingFill, "Calculating your AI personality...", 75);
    await new Promise(r => setTimeout(r, 400));

    // Step 5: Store the data
    updateProgress(processingText, processingFill, "Generating your wrapped... 🎉", 100);
    storeWrappedData(wrappedData);

    console.log('Parsed data:', wrappedData);
    console.log(`Found ${wrappedData.summary.totalConversations} conversations, ${wrappedData.summary.totalPrompts} prompts`);

    await new Promise(r => setTimeout(r, 500));

    // Navigate to wrapped
    router.navigate('/wrapped');

  } catch (error) {
    console.error('Error parsing file:', error);

    // Show error state
    processingState.innerHTML = `
      <div class="processing-error">
        <span class="error-icon">❌</span>
        <h3>Oops! Something went wrong</h3>
        <p>${error.message}</p>
        <p class="error-hint">
          Make sure you're uploading your ChatGPT export file.<br>
          The ZIP or JSON file from Settings → Data Controls → Export data
        </p>
        <button class="btn btn-primary" id="retry-btn">Try Again</button>
        <button class="btn btn-ghost" id="use-demo-btn">Use Demo Data</button>
      </div>
    `;

    document.getElementById('retry-btn')?.addEventListener('click', () => {
      router.navigate('/import');
    });

    document.getElementById('use-demo-btn')?.addEventListener('click', () => {
      router.navigate('/wrapped');
    });
  }
}

function updateProgress(textEl, fillEl, text, percent) {
  if (textEl) textEl.textContent = text;
  if (fillEl) fillEl.style.width = percent + '%';
}

export default renderImport;

