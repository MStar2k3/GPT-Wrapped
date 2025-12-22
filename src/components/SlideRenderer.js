/* ============================================
   SLIDE RENDERER - Renders any slide type
   Handles all 22 slide variations with counting animations
   ============================================ */

// Animate counting up effect
function animateCountUp(element, targetValue, duration = 1500) {
    // Parse the target value - handle numbers with commas, percentages, /100 format
    let numericValue = 0;
    let prefix = '';
    let suffix = '';

    const valueStr = String(targetValue);

    // Handle formats like "78/100", "72%", "21,168", "504"
    if (valueStr.includes('/')) {
        const parts = valueStr.split('/');
        numericValue = parseInt(parts[0].replace(/,/g, '')) || 0;
        suffix = '/' + parts[1];
    } else if (valueStr.includes('%')) {
        numericValue = parseInt(valueStr.replace('%', '').replace(/,/g, '')) || 0;
        suffix = '%';
    } else {
        numericValue = parseInt(valueStr.replace(/,/g, '')) || 0;
    }

    // Skip animation for non-numeric values (like "Wednesday", "GPT-4")
    if (isNaN(numericValue) || numericValue === 0) {
        element.textContent = targetValue;
        return;
    }

    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (numericValue - startValue) * easeOut);

        // Format with commas if original had them
        const formattedValue = valueStr.includes(',')
            ? currentValue.toLocaleString()
            : currentValue;

        element.textContent = prefix + formattedValue + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Helper to create slide HTML based on type
export function renderSlide(slideConfig, userData) {
    const data = slideConfig.getData(userData);
    const emoji = typeof slideConfig.emoji === 'function' ? slideConfig.emoji(userData) : slideConfig.emoji;

    const container = document.createElement('div');
    container.className = 'slide-card';
    container.style.background = slideConfig.gradient;
    container.dataset.slideId = slideConfig.id;

    let contentHTML = '';
    const animateClass = 'count-animate';

    switch (slideConfig.type) {
        case 'year_intro':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat ${animateClass}" data-target="${data.bigStat}">${data.bigStat}</div>
                <div class="slide-subtext">${data.subtext}</div>
            `;
            break;

        case 'total_prompts':
        case 'conversations':
        case 'avg_prompt_length':
        case 'touch_grass':
        case 'carried_score':
        case 'most_used_model':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat ${animateClass}" data-target="${data.bigStat}">${data.bigStat}</div>
                <div class="slide-subtext">${data.subtext}</div>
            `;
            break;

        case 'total_words':
        case 'most_active_day':
        case 'peak_hour':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat ${animateClass}" data-target="${data.bigStat}">${data.bigStat}</div>
                <div class="slide-subtext">${data.subtext}</div>
            `;
            break;

        case 'top_topics':
            const topicsHTML = (data.topics || []).map((topic, i) => `
                <div class="topic-row" style="animation-delay: ${i * 0.1}s">
                    <span class="topic-name">${topic.name}</span>
                    <span class="topic-count ${animateClass}" data-target="${topic.count}">${topic.count}</span>
                </div>
            `).join('');
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="topics-list">${topicsHTML}</div>
            `;
            break;

        case 'curiosity_score':
        case 'delulu_index':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat ${animateClass}" data-target="${data.bigStat}">${data.bigStat}</div>
                <div class="slide-subtext">${data.subtext}</div>
            `;
            break;

        case 'day_vs_night':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${data.title}</div>
                <div class="day-night-split">
                    <div class="split-side">
                        <span class="split-emoji">☀️</span>
                        <span class="split-percent ${animateClass}" data-target="${data.dayPercentage}%">${data.dayPercentage}%</span>
                        <span class="split-label">Daytime</span>
                    </div>
                    <div class="split-divider"></div>
                    <div class="split-side">
                        <span class="split-emoji">🌙</span>
                        <span class="split-percent ${animateClass}" data-target="${data.nightPercentage}%">${data.nightPercentage}%</span>
                        <span class="split-label">Nighttime</span>
                    </div>
                </div>
            `;
            break;

        case 'longest_convo':
        case 'villain_arc':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-title-quote">${data.title}</div>
                <div class="slide-substats">
                    <span class="${animateClass}" data-target="${data.messageCount}">${data.messageCount}</span><span> messages</span>
                    <span class="stat-divider">|</span>
                    <span>${slideConfig.type === 'villain_arc' ? data.frustrationScore + ' frustration' : `<span class="${animateClass}" data-target="${data.wordCount}">${data.wordCount}</span> words`}</span>
                </div>
            `;
            break;

        case 'fbi_concern':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat ${animateClass}" data-target="${data.bigStat}">${data.bigStat}</div>
                <div class="slide-quote-box">${data.promptSnippet}</div>
            `;
            break;

        case 'summary_sentence':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-sentence">${data.sentence}</div>
            `;
            break;

        case 'rizzless_prompt':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-quote-box">${data.prompt}</div>
            `;
            break;

        case 'badges':
            const badgesHTML = (data.badges || []).slice(0, 6).map((badge, i) => `
                <div class="badge-item" style="animation-delay: ${i * 0.1}s">
                    <span class="badge-icon">${badge.icon}</span>
                    <span class="badge-name">${badge.name}</span>
                </div>
            `).join('');
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="badges-grid">${badgesHTML}</div>
            `;
            break;

        case 'quirky_facts':
            const factsHTML = (data.facts || []).slice(0, 3).map((fact, i) => `
                <div class="fact-item" style="animation-delay: ${i * 0.15}s">${fact}</div>
            `).join('');
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="facts-list">${factsHTML}</div>
            `;
            break;

        case 'final_wrap':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-final-title">${data.title}</div>
                <div class="slide-subtext">${data.subtext}</div>
                <div class="slide-hashtag">#GPTWrapped</div>
            `;
            break;

        default:
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat">--</div>
            `;
    }

    // Add caption pill at bottom
    const captionHTML = slideConfig.caption ? `
        <div class="slide-caption-pill">${slideConfig.caption}</div>
    ` : '';

    // Add download/share buttons
    const buttonsHTML = `
        <div class="slide-action-buttons">
            <button class="slide-action-btn slide-download-btn" data-slide="${slideConfig.id}" aria-label="Download">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            </button>
            <button class="slide-action-btn slide-share-btn" data-slide="${slideConfig.id}" aria-label="Share">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
            </button>
        </div>
    `;

    container.innerHTML = `
        <div class="slide-content">
            ${contentHTML}
        </div>
        ${captionHTML}
        ${buttonsHTML}
    `;

    // Trigger counting animations after a short delay
    requestAnimationFrame(() => {
        const countElements = container.querySelectorAll('.count-animate');
        countElements.forEach((el, i) => {
            const target = el.dataset.target;
            if (target) {
                // Stagger the start of animations slightly
                setTimeout(() => {
                    animateCountUp(el, target, 1200);
                }, 100 + (i * 50));
            }
        });
    });

    return container;
}

export default { renderSlide };
