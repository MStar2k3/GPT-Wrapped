/* ============================================
   AI WRAPPED - PREMIUM GRAPHICS GENERATOR
   Matches webapp appearance exactly with shooting stars
   ============================================ */

// Color palettes matching wrapped.css
const COLORS = {
    cyan: '#00f0ff',
    purple: '#8b00ff',
    pink: '#ff00a8',
    green: '#00ff88',
    gold: '#ffd700',
    orange: '#ff6b00',
    bgDark: '#0a0a1a',
    bgGradient: ['#0a0a12', '#0f0f1a', '#050510']
};

// Draw the exact webapp background with orbs and shooting stars
export function drawWebappBackground(ctx, width, height) {
    // Dark gradient background (exact match to wrapped-container)
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#0a0a12');
    bgGrad.addColorStop(0.5, '#0f0f1a');
    bgGrad.addColorStop(1, '#050510');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Orbs (matching .orb-cyan, .orb-purple, .orb-pink)
    drawOrb(ctx, width * 0.1, height * 0.1, 300, 'rgba(0, 240, 255, 0.15)');
    drawOrb(ctx, width * 0.85, height * 0.8, 250, 'rgba(139, 0, 255, 0.12)');
    drawOrb(ctx, width * 0.7, height * 0.3, 180, 'rgba(255, 0, 168, 0.1)');

    // Shooting stars
    for (let i = 0; i < 60; i++) {
        const x = Math.random() * width * 1.3;
        const y = Math.random() * height * 0.6;
        const len = Math.random() * 60 + 20;
        drawShootingStar(ctx, x, y, len, 'rgba(0, 240, 255, 0.6)');
    }

    // Larger prominent meteors
    for (let i = 0; i < 3; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.4;
        drawShootingStar(ctx, x, y, 120, COLORS.cyan, 2);
    }

    // Twinkling stars
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
        ctx.fill();
    }
}

function drawOrb(ctx, x, y, size, color) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

function drawShootingStar(ctx, x, y, length, color, thickness = 1.2) {
    const angle = Math.PI / 6;
    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;

    const gradient = ctx.createLinearGradient(x, y, endX, endY);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Star head
    ctx.beginPath();
    ctx.arc(x, y, thickness + 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
}

// Draw text with glow effect (matching .text-glow-cyan)
export function drawGlowText(ctx, text, x, y, fontSize, color = COLORS.cyan, align = 'center') {
    ctx.save();
    ctx.font = `bold ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';

    // Glow layers
    ctx.shadowColor = color;
    ctx.shadowBlur = 25;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);

    ctx.shadowBlur = 10;
    ctx.fillText(text, x, y);

    // Core text
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, x, y);
    ctx.restore();
}

// Draw gradient text (matching .text-gradient)
export function drawGradientText(ctx, text, x, y, fontSize) {
    ctx.save();
    ctx.font = `bold ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const metrics = ctx.measureText(text);
    const gradient = ctx.createLinearGradient(x - metrics.width / 2, y, x + metrics.width / 2, y);
    gradient.addColorStop(0, COLORS.cyan);
    gradient.addColorStop(0.5, COLORS.purple);
    gradient.addColorStop(1, COLORS.pink);

    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y);
    ctx.restore();
}

// Draw large platform icon (matching .platform-icon-large)
function drawPlatformIcon(ctx, emoji, x, y, size, color) {
    ctx.save();

    // Glow ring
    const ringGrad = ctx.createRadialGradient(x, y, size * 0.8, x, y, size * 1.2);
    ringGrad.addColorStop(0, color + '40');
    ringGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = ringGrad;
    ctx.beginPath();
    ctx.arc(x, y, size * 1.1, 0, Math.PI * 2);
    ctx.fill();

    // Icon background
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = color + '60';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Emoji
    ctx.font = `${size}px Inter, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(emoji, x, y + 3);

    ctx.restore();
}

// Draw page label (matching .page-label)
function drawPageLabel(ctx, text, x, y) {
    ctx.font = '600 22px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(text, x, y);
}

// Draw hero stat number (matching .hero-stat-number)
function drawHeroStatNumber(ctx, number, x, y, isStory) {
    const fontSize = isStory ? 160 : 120;
    drawGlowText(ctx, String(number), x, y, fontSize, COLORS.cyan);
}

// Draw insight text (matching .hero-insight)
function drawInsightText(ctx, text, x, y, maxWidth) {
    ctx.font = '400 24px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    wrapText(ctx, text, x, y, maxWidth, 32);
}

// Page 1: Your AI Year (exact webapp match)
export function generatePage1Card(ctx, width, height, data) {
    const isStory = height > width;
    const centerX = width / 2;

    drawWebappBackground(ctx, width, height);

    // Page label
    drawPageLabel(ctx, 'Your 2025 AI Year', centerX, isStory ? 180 : 100);

    // Platform icon
    const iconY = isStory ? 380 : 240;
    drawPlatformIcon(ctx, data.icon || '🤖', centerX, iconY, isStory ? 80 : 60, data.color || COLORS.green);

    // Platform name with glow
    drawGlowText(ctx, data.platformName || 'ChatGPT', centerX, iconY + (isStory ? 130 : 95), isStory ? 48 : 36, data.color || COLORS.green);

    // "was your top AI"
    ctx.font = '400 22px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText('was your top AI', centerX, iconY + (isStory ? 175 : 130));

    // Hero stat number
    const statY = isStory ? 680 : 430;
    drawHeroStatNumber(ctx, data.totalConversations || '847', centerX, statY, isStory);

    // Stat label
    ctx.font = '500 28px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText('conversations this year', centerX, statY + (isStory ? 90 : 70));

    // Insight text
    const insightY = isStory ? 880 : 550;
    ctx.font = '400 22px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillText(`You explored ${data.topics || 23} topics across AI platforms`, centerX, insightY);

    // Watermark
    drawWatermark(ctx, centerX, height - 60);
}

// Page 2: Personality (exact webapp match)
export function generatePersonalityCard(ctx, width, height, data) {
    const isStory = height > width;
    const centerX = width / 2;

    drawWebappBackground(ctx, width, height);

    drawPageLabel(ctx, 'Based on your vibes...', centerX, isStory ? 180 : 100);

    // Title
    ctx.font = 'bold 36px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('Your AI ', centerX - 80, isStory ? 280 : 180);
    drawGradientText(ctx, 'Personality', centerX + 60, isStory ? 280 : 180, 36);

    // Personality icon with glow
    const iconY = isStory ? 480 : 320;
    drawPlatformIcon(ctx, data.icon || '🧠', centerX, iconY, isStory ? 70 : 55, COLORS.purple);

    // Personality type
    const typeY = iconY + (isStory ? 140 : 100);
    drawGlowText(ctx, data.type || 'THE DEBUG DEMON 🔥', centerX, typeY, isStory ? 40 : 32, COLORS.purple);

    // Description
    const descY = typeY + (isStory ? 100 : 70);
    ctx.font = '400 20px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    wrapText(ctx, data.description || 'You approach AI with methodical curiosity.', centerX, descY, width - 150, 28);

    // Traits
    if (data.traits && data.traits.length > 0) {
        const traitsY = isStory ? height - 350 : height - 200;
        ctx.font = '400 18px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(data.traits.slice(0, 3).join(' • '), centerX, traitsY);
    }

    drawWatermark(ctx, centerX, height - 60);
}

// Page 3: Top Topic (exact webapp match)  
export function generateTopicCard(ctx, width, height, data) {
    const isStory = height > width;
    const centerX = width / 2;

    drawWebappBackground(ctx, width, height);

    drawPageLabel(ctx, 'What You Explored', centerX, isStory ? 180 : 100);

    // Title
    ctx.font = 'bold 36px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('You Asked ', centerX, isStory ? 280 : 180);

    // Topic icon with glow
    const iconY = isStory ? 480 : 320;
    drawPlatformIcon(ctx, data.icon || '💻', centerX, iconY, isStory ? 80 : 60, COLORS.cyan);

    // Topic name
    const nameY = iconY + (isStory ? 150 : 110);
    drawGlowText(ctx, data.name || 'CODING & DEBUG WARS', centerX, nameY, isStory ? 44 : 34, COLORS.cyan);

    // Stats
    ctx.font = '500 26px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${data.conversations || 296} conversations`, centerX, nameY + (isStory ? 70 : 55));

    ctx.font = '400 22px Inter, system-ui, sans-serif';
    ctx.fillStyle = COLORS.cyan;
    ctx.fillText(`${data.percentage || 35}% of your chats`, centerX, nameY + (isStory ? 110 : 90));

    // Insight
    if (data.insight) {
        const insightY = isStory ? height - 280 : height - 180;
        ctx.font = 'italic 20px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        wrapText(ctx, `"${data.insight}"`, centerX, insightY, width - 150, 28);
    }

    drawWatermark(ctx, centerX, height - 60);
}

// Page 4: Tokens (exact webapp match)
export function generateTokensCard(ctx, width, height, data) {
    const isStory = height > width;
    const centerX = width / 2;

    drawWebappBackground(ctx, width, height);

    drawPageLabel(ctx, 'Token Economy', centerX, isStory ? 180 : 100);

    // Title
    ctx.font = 'bold 36px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('You Processed', centerX, isStory ? 280 : 180);

    // Token count
    const tokenY = isStory ? 520 : 340;
    drawGlowText(ctx, data.totalTokens || '3.4M', centerX, tokenY, isStory ? 120 : 90, COLORS.purple);

    ctx.font = '500 32px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText('tokens', centerX, tokenY + (isStory ? 80 : 60));

    // Equivalent stats
    const statsY = isStory ? 750 : 480;
    ctx.font = '400 24px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(`📚 ${data.books || '11.3'} books worth of text`, centerX, statsY);
    ctx.fillText(`📝 ${data.words || '850K'} words processed`, centerX, statsY + 45);

    // Trend
    if (data.trend) {
        ctx.font = '500 22px Inter, system-ui, sans-serif';
        ctx.fillStyle = COLORS.green;
        ctx.fillText(`${data.trend} from last year`, centerX, statsY + 110);
    }

    drawWatermark(ctx, centerX, height - 60);
}

// Page 5: Achievements (exact webapp match)
export function generateAchievementCard(ctx, width, height, data) {
    const isStory = height > width;
    const centerX = width / 2;

    drawWebappBackground(ctx, width, height);

    drawPageLabel(ctx, 'Achievements', centerX, isStory ? 180 : 100);

    // Title
    ctx.font = 'bold 36px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('You Earned', centerX, isStory ? 280 : 180);

    // Badge count
    const countY = isStory ? 450 : 300;
    drawGlowText(ctx, String(data.count || 10), centerX, countY, isStory ? 140 : 100, COLORS.gold);

    ctx.font = '500 32px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText('badges', centerX, countY + (isStory ? 85 : 65));

    // Display badges (up to 6)
    const badges = data.badges || [];
    const badgeY = isStory ? 700 : 450;
    const spacing = isStory ? 120 : 90;
    const perRow = 3;

    badges.slice(0, 6).forEach((badge, i) => {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        const x = centerX + (col - 1) * spacing;
        const y = badgeY + row * (isStory ? 140 : 100);

        drawBadge(ctx, badge.icon || '🏆', x, y, isStory ? 40 : 32, badge.color || COLORS.cyan);

        ctx.font = '400 14px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.textAlign = 'center';
        ctx.fillText(badge.name || '', x, y + (isStory ? 55 : 45));
    });

    drawWatermark(ctx, centerX, height - 60);
}

// Draw badge with glow
function drawBadge(ctx, emoji, x, y, size, color) {
    ctx.save();

    // Glow
    const glow = ctx.createRadialGradient(x, y, 0, x, y, size + 10);
    glow.addColorStop(0, color + '40');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, size + 8, 0, Math.PI * 2);
    ctx.fill();

    // Background
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Emoji
    ctx.font = `${size * 0.8}px Inter`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, x, y + 2);

    ctx.restore();
}

// Watermark
function drawWatermark(ctx, x, y) {
    ctx.font = 'bold 22px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.textAlign = 'center';
    ctx.fillText('✨ aiwrapped.com', x, y);
}

// Helper: wrap text
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (const word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== '') {
            ctx.fillText(line.trim(), x, currentY);
            line = word + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line.trim(), x, currentY);
}

// Export all generators
export { drawShootingStar as drawShootingStarsBackground };

export default {
    generatePage1Card,
    generatePersonalityCard,
    generateTopicCard,
    generateTokensCard,
    generateAchievementCard,
    drawWebappBackground
};
