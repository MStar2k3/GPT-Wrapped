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
        case 'relationship':
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
                <div class="slide-main-message">${data.mainMessage || "Your AI year is wrapped, but our services? They're never on pause. Download our brochure to see what else we can help you with. 📊"}</div>
                <div class="slide-subtext">${data.subtext}</div>
                <div class="slide-hashtag">${data.hashtag || '#GPTWrapped'}</div>
            `;
            break;

        default:
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat">--</div>
            `;
    }

    // Add caption pill at bottom - handle both static and dynamic captions
    const captionValue = typeof slideConfig.caption === 'function'
        ? slideConfig.caption(userData)
        : slideConfig.caption;
    const captionHTML = captionValue ? `
        <div class="slide-caption-pill">${captionValue}</div>
    ` : '';

    // Generate floating orbs HTML with varying positions and sizes
    const orbsHTML = `
        <div class="slide-orb orb-1"></div>
        <div class="slide-orb orb-2"></div>
        <div class="slide-orb orb-3"></div>
    `;

    // Logo watermark button (larger on final slide, regular on other slides)
    const isFinalSlide = slideConfig.type === 'final_wrap';
    const logoHTML = `
        <a href="https://themscconsultancy.com/" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="logo-watermark ${isFinalSlide ? 'logo-watermark-large' : ''}"
           title="${isFinalSlide ? 'Learn more about our services' : ''}">
            <img src="/logo-watermark.png" alt="Company Logo" />
            ${isFinalSlide ? '<span class="logo-tooltip">Our services</span>' : ''}
        </a>
    `;

    container.innerHTML = `
        ${orbsHTML}
        <div class="slide-content">
            ${contentHTML}
        </div>
        ${captionHTML}
        ${logoHTML}
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
