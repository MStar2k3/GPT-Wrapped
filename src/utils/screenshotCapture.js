/* ============================================
   SCREENSHOT CAPTURE UTILITY - NEW 22-SLIDE DESIGN
   Generates images matching the new gradient slide designs
   ============================================ */

import { SLIDES } from '../data/slides.js';

// Color parsing for canvas gradients
const GRADIENT_COLORS = {
    purple: ['#667eea', '#764ba2'],
    orange: ['#f093fb', '#f5576c'],
    teal: ['#4facfe', '#00f2fe'],
    blue: ['#667eea', '#764ba2'],
    pink: ['#f093fb', '#f5576c'],
    yellow: ['#f5af19', '#f12711'],
    green: ['#11998e', '#38ef7d'],
    cyan: ['#00c6fb', '#005bea'],
    red: ['#eb3349', '#f45c43'],
    gold: ['#f7971e', '#ffd200'],
    deepPurple: ['#6a11cb', '#2575fc'],
    sunset: ['#fa709a', '#fee140'],
    ocean: ['#2193b0', '#6dd5ed'],
    forest: ['#134e5e', '#71b280'],
    fire: ['#f12711', '#f5af19'],
    violet: ['#7f00ff', '#e100ff'],
    aqua: ['#13547a', '#80d0c7'],
    coral: ['#ff9a9e', '#fecfef'],
    midnight: ['#232526', '#414345'],
    electric: ['#00f260', '#0575e6'],
    rose: ['#ee9ca7', '#ffdde1'],
    lavender: ['#a18cd1', '#fbc2eb']
};

// Get gradient colors for a slide
function getSlideGradient(slideIndex) {
    const slide = SLIDES[slideIndex];
    if (!slide) return ['#667eea', '#764ba2'];

    // Parse the gradient type from the slide config
    const gradientStr = slide.gradient;
    for (const [name, colors] of Object.entries(GRADIENT_COLORS)) {
        if (gradientStr.includes(colors[0])) {
            return colors;
        }
    }
    return ['#667eea', '#764ba2'];
}

// Generate slide image with new gradient design
export async function generatePageImage(pageData, pageType, slideIndex = 0) {
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1920; // 9:16 aspect ratio for stories
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Determine slide index if not provided
    if (typeof pageType === 'string') {
        slideIndex = SLIDES.findIndex(s => s.type === pageType);
        if (slideIndex === -1) slideIndex = 0;
    }

    const slide = SLIDES[slideIndex];
    const colors = getSlideGradient(slideIndex);
    const data = slide ? slide.getData(pageData) : {};
    const emoji = typeof slide?.emoji === 'function' ? slide.emoji(pageData) : (slide?.emoji || '✨');

    // Draw gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, colors[0]);
    bgGradient.addColorStop(1, colors[1]);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle noise texture overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3 + 1, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw emoji
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(emoji, width / 2, 450);

    // Draw label
    ctx.font = '700 28px Arial, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(slide?.label || '', width / 2, 550);

    // Draw main content based on slide type
    ctx.fillStyle = '#fff';

    switch (slide?.type) {
        case 'year_intro':
        case 'total_prompts':
        case 'conversations':
        case 'avg_prompt_length':
        case 'total_words':
        case 'most_active_day':
        case 'peak_hour':
        case 'carried_score':
        case 'touch_grass':
        case 'most_used_model':
        case 'curiosity_score':
        case 'delulu_index':
            drawBigStatSlide(ctx, data, width, height);
            break;

        case 'top_topics':
            drawTopicsSlide(ctx, data, width, height);
            break;

        case 'day_vs_night':
            drawDayNightSlide(ctx, data, width, height);
            break;

        case 'longest_convo':
        case 'villain_arc':
            drawConvoSlide(ctx, data, slide.type, width, height);
            break;

        case 'fbi_concern':
        case 'rizzless_prompt':
            drawQuoteSlide(ctx, data, slide.type, width, height);
            break;

        case 'summary_sentence':
            drawSentenceSlide(ctx, data, width, height);
            break;

        case 'badges':
            drawBadgesSlide(ctx, data, width, height);
            break;

        case 'quirky_facts':
            drawFactsSlide(ctx, data, width, height);
            break;

        case 'final_wrap':
            drawFinalSlide(ctx, data, width, height);
            break;

        default:
            drawBigStatSlide(ctx, data, width, height);
    }

    // Draw caption pill at bottom
    if (slide?.caption) {
        const captionWidth = ctx.measureText(slide.caption).width + 60;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.roundRect((width - captionWidth) / 2, height - 280, captionWidth, 50, 25);
        ctx.fill();

        ctx.font = '500 18px Arial, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.textAlign = 'center';
        ctx.fillText(slide.caption, width / 2, height - 247);
    }

    // Watermark
    ctx.font = '400 20px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textAlign = 'center';
    ctx.fillText('gptwrapped.app #GPTWrapped2025', width / 2, height - 80);

    return canvas;
}

// Draw big stat centered slide
function drawBigStatSlide(ctx, data, w, h) {
    ctx.font = '800 120px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText(data.bigStat || '--', w / 2, h / 2 + 40);

    if (data.subtext) {
        ctx.font = '500 28px Arial, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(data.subtext, w / 2, h / 2 + 100);
    }
}

// Draw topics list slide
function drawTopicsSlide(ctx, data, w, h) {
    const topics = data.topics || [];
    const startY = h / 2 - (topics.length * 35);

    topics.forEach((topic, i) => {
        const y = startY + i * 70;

        // Topic row background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.roundRect(w / 2 - 200, y - 25, 400, 55, 12);
        ctx.fill();

        // Topic name
        ctx.font = '500 24px Arial, sans-serif';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left';
        ctx.fillText(topic.name, w / 2 - 180, y + 8);

        // Topic count
        ctx.textAlign = 'right';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(topic.count?.toString() || '', w / 2 + 180, y + 8);
    });

    ctx.textAlign = 'center';
}

// Draw day vs night split slide
function drawDayNightSlide(ctx, data, w, h) {
    const centerY = h / 2;

    // Day side
    ctx.font = '60px Arial';
    ctx.fillText('☀️', w / 2 - 120, centerY - 40);
    ctx.font = '800 56px Arial, sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(`${data.dayPercentage || 40}%`, w / 2 - 120, centerY + 30);
    ctx.font = '500 18px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('DAYTIME', w / 2 - 120, centerY + 70);

    // Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, centerY - 80);
    ctx.lineTo(w / 2, centerY + 80);
    ctx.stroke();

    // Night side
    ctx.font = '60px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('🌙', w / 2 + 120, centerY - 40);
    ctx.font = '800 56px Arial, sans-serif';
    ctx.fillText(`${data.nightPercentage || 60}%`, w / 2 + 120, centerY + 30);
    ctx.font = '500 18px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('NIGHTTIME', w / 2 + 120, centerY + 70);
}

// Draw conversation detail slide
function drawConvoSlide(ctx, data, type, w, h) {
    ctx.font = '600 28px Arial, sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';

    // Title
    const title = data.title || '"Unknown conversation"';
    wrapText(ctx, title, w / 2, h / 2 - 20, w - 200, 36);

    // Stats row
    ctx.font = '500 22px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    const statsText = type === 'villain_arc'
        ? `${data.messageCount || 0} messages  |  ${data.frustrationScore || 'High'} frustration`
        : `${data.messageCount || 0} messages  |  ${data.wordCount || 0} words`;
    ctx.fillText(statsText, w / 2, h / 2 + 80);
}

// Draw quote/prompt slide
function drawQuoteSlide(ctx, data, type, w, h) {
    // Big stat if FBI concern
    if (type === 'fbi_concern' && data.bigStat) {
        ctx.font = '800 80px Arial, sans-serif';
        ctx.fillStyle = '#fff';
        ctx.fillText(data.bigStat, w / 2, h / 2 - 60);
    }

    // Quote box
    const quote = data.promptSnippet || data.prompt || '';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 250, h / 2 + (type === 'fbi_concern' ? 0 : -80), 500, 120, 16);
    ctx.fill();

    ctx.font = '500 20px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    wrapText(ctx, quote, w / 2, h / 2 + (type === 'fbi_concern' ? 60 : -20), 460, 28);
}

// Draw sentence slide
function drawSentenceSlide(ctx, data, w, h) {
    ctx.font = '500 28px Arial, sans-serif';
    ctx.fillStyle = '#fff';
    wrapText(ctx, data.sentence || '', w / 2, h / 2, w - 150, 40);
}

// Draw badges grid slide
function drawBadgesSlide(ctx, data, w, h) {
    const badges = (data.badges || []).slice(0, 6);
    const cols = 3;
    const startX = w / 2 - 180;
    const startY = h / 2 - 100;

    badges.forEach((badge, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * 130;
        const y = startY + row * 140;

        // Badge background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.roundRect(x - 45, y - 40, 100, 110, 12);
        ctx.fill();

        // Badge emoji
        ctx.font = '48px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText(badge.icon || '🏆', x + 5, y + 15);

        // Badge name
        ctx.font = '600 12px Arial, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(badge.name || '', x + 5, y + 55);
    });
}

// Draw quirky facts slide
function drawFactsSlide(ctx, data, w, h) {
    const facts = (data.facts || []).slice(0, 3);
    const startY = h / 2 - (facts.length * 40);

    facts.forEach((fact, i) => {
        const y = startY + i * 100;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.roundRect(w / 2 - 230, y - 25, 460, 70, 12);
        ctx.fill();

        ctx.font = '500 18px Arial, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        wrapText(ctx, fact, w / 2, y + 10, 430, 24);
    });
}

// Draw final wrap slide
function drawFinalSlide(ctx, data, w, h) {
    ctx.font = '800 64px Arial, sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(data.title || "That's a Wrap!", w / 2, h / 2 - 20);

    ctx.font = '500 28px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(data.subtext || 'See you in 2026', w / 2, h / 2 + 40);

    ctx.font = '600 24px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText('#GPTWrapped', w / 2, h / 2 + 100);
}

// Text wrap helper
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    if (!text) return;
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => {
        ctx.fillText(line.trim(), x, startY + i * lineHeight);
    });
}

// Convert canvas to blob
export function canvasToBlob(canvas, type = 'image/png', quality = 0.95) {
    return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
    });
}

// Download image
export async function downloadImage(canvas, filename = 'gpt-wrapped.png') {
    try {
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
    } catch (err) {
        console.error('Download failed:', err);
        return false;
    }
}

// Share using Web Share API
export async function shareToSocial(canvas, platform, shareText) {
    try {
        const blob = await canvasToBlob(canvas);
        const file = new File([blob], 'gpt-wrapped.png', { type: 'image/png' });

        // Try native share API first
        if (navigator.share && navigator.canShare) {
            const shareData = { title: 'GPT Wrapped 2025', text: shareText, files: [file] };
            if (navigator.canShare(shareData)) {
                await navigator.share(shareData);
                return { success: true, method: 'native' };
            }
        }

        // Fallback: download and show message
        await downloadImage(canvas, 'gpt-wrapped.png');
        return { success: true, method: 'download' };
    } catch (err) {
        console.error('Share failed:', err);
        // Still download as fallback
        await downloadImage(canvas, 'gpt-wrapped.png');
        return { success: true, method: 'download-fallback' };
    }
}

// Download a specific slide as image
export async function downloadPageImage(slideNum, data) {
    try {
        const slideIndex = slideNum - 1;
        const slide = SLIDES[slideIndex];
        const canvas = await generatePageImage(data, slide?.type || 'default', slideIndex);
        await downloadImage(canvas, `gpt-wrapped-slide-${slideNum}.png`);
        return true;
    } catch (err) {
        console.error('Download slide failed:', err);
        return false;
    }
}

// Share a specific slide
export async function sharePageImage(slideNum, data) {
    try {
        const slideIndex = slideNum - 1;
        const slide = SLIDES[slideIndex];
        const canvas = await generatePageImage(data, slide?.type || 'default', slideIndex);

        const shareText = `My GPT Wrapped 2025 🤖✨
Get yours at gptwrapped.app #GPTWrapped2025`;

        await shareToSocial(canvas, 'default', shareText);
        return true;
    } catch (err) {
        console.error('Share slide failed:', err);
        return false;
    }
}

// Legacy function for backwards compatibility
export function createFloatingButtons(container, pageData, pageType) {
    // This is now handled by the per-slide buttons
    console.log('createFloatingButtons is deprecated - use per-slide buttons instead');
}
