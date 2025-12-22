/* ============================================
   SLIDE RENDERER - Renders any slide type
   Handles all 22 slide variations with download/share buttons
   ============================================ */

// Helper to create slide HTML based on type
export function renderSlide(slideConfig, userData) {
    const data = slideConfig.getData(userData);
    const emoji = typeof slideConfig.emoji === 'function' ? slideConfig.emoji(userData) : slideConfig.emoji;

    const container = document.createElement('div');
    container.className = 'slide-card';
    container.style.background = slideConfig.gradient;
    container.dataset.slideId = slideConfig.id;

    let contentHTML = '';

    switch (slideConfig.type) {
        case 'year_intro':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat">${data.bigStat}</div>
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
                <div class="slide-big-stat">${data.bigStat}</div>
                <div class="slide-subtext">${data.subtext}</div>
            `;
            break;

        case 'total_words':
        case 'most_active_day':
        case 'peak_hour':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat">${data.bigStat}</div>
                <div class="slide-subtext">${data.subtext}</div>
            `;
            break;

        case 'top_topics':
            const topicsHTML = (data.topics || []).map((topic, i) => `
                <div class="topic-row">
                    <span class="topic-name">${topic.name}</span>
                    <span class="topic-count">${topic.count}</span>
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
                <div class="slide-big-stat">${data.bigStat}</div>
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
                        <span class="split-percent">${data.dayPercentage}%</span>
                        <span class="split-label">Daytime</span>
                    </div>
                    <div class="split-divider"></div>
                    <div class="split-side">
                        <span class="split-emoji">🌙</span>
                        <span class="split-percent">${data.nightPercentage}%</span>
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
                    <span>${data.messageCount} messages</span>
                    <span class="stat-divider">|</span>
                    <span>${slideConfig.type === 'villain_arc' ? data.frustrationScore + ' frustration' : data.wordCount + ' words'}</span>
                </div>
            `;
            break;

        case 'fbi_concern':
            contentHTML = `
                <div class="slide-emoji">${emoji}</div>
                <div class="slide-label">${slideConfig.label}</div>
                <div class="slide-big-stat">${data.bigStat}</div>
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
            const badgesHTML = (data.badges || []).slice(0, 6).map(badge => `
                <div class="badge-item">
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
            const factsHTML = (data.facts || []).slice(0, 3).map(fact => `
                <div class="fact-item">${fact}</div>
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

    return container;
}

export default { renderSlide };
