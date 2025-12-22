/* ============================================
   SCREENSHOT CAPTURE UTILITY
   Client-side canvas-based screenshot with full graphics
   ============================================ */

// Generate full graphics screenshot with all slide content
export async function generatePageImage(pageData, pageType) {
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1350; // Taller for more content (LinkedIn format)
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#0a0a1a');
    bgGradient.addColorStop(0.3, '#1a1a2e');
    bgGradient.addColorStop(0.6, '#16213e');
    bgGradient.addColorStop(1, '#0f0f23');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Stars
    for (let i = 0; i < 80; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
        ctx.fill();
    }

    // Glow orbs
    const drawGlow = (x, y, r, color, opacity = 0.15) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`));
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    };
    drawGlow(150, 150, 400, 'rgb(0, 240, 255)');
    drawGlow(930, 1200, 400, 'rgb(139, 0, 255)');
    drawGlow(540, 675, 300, 'rgb(255, 0, 168)', 0.08);

    // Card background
    const cx = 60, cy = 100, cw = 960, ch = 1150;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(cx, cy, cw, ch, 30);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Logo header
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '600 28px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ AI Wrapped 2025', 540, 160);

    // Page-specific full content
    ctx.textAlign = 'center';

    switch (pageType) {
        case 'year':
            drawYearSlide(ctx, pageData, width, height);
            break;
        case 'personality':
            drawPersonalitySlide(ctx, pageData, width, height);
            break;
        case 'topic':
            drawTopicSlide(ctx, pageData, width, height);
            break;
        case 'tokens':
            drawTokensSlide(ctx, pageData, width, height);
            break;
        case 'speed':
            drawSpeedSlide(ctx, pageData, width, height);
            break;
        case 'stats':
            drawStatsSlide(ctx, pageData, width, height);
            break;
        case 'badges':
            drawBadgesSlide(ctx, pageData, width, height);
            break;
        default:
            drawDefaultSlide(ctx, pageData, width, height);
    }

    // Watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '400 24px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Get yours at aiwrapped.com', 540, 1300);

    return canvas;
}

// Year Slide - Full graphics
function drawYearSlide(ctx, data, w, h) {
    const conversations = data.totalConversations || 847;
    const personality = data.type || 'The Explorer';
    const icon = data.icon || '🧪';

    // Title
    ctx.fillStyle = 'white';
    ctx.font = '700 42px Inter, Arial, sans-serif';
    ctx.fillText('Your 2025 AI Year', 540, 250);

    // Main stat with glow effect
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#00f0ff';
    ctx.font = '900 160px Inter, Arial, sans-serif';
    ctx.fillText(conversations.toString(), 540, 480);
    ctx.shadowBlur = 0;

    // Label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '500 36px Inter, Arial, sans-serif';
    ctx.fillText('conversations', 540, 550);

    // Divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(340, 620);
    ctx.lineTo(740, 620);
    ctx.stroke();

    // Personality section
    ctx.font = '80px Inter, Arial, sans-serif';
    ctx.fillText(icon, 540, 740);

    ctx.fillStyle = 'white';
    ctx.font = '700 48px Inter, Arial, sans-serif';
    ctx.fillText(personality, 540, 830);

    // Description
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '400 28px Inter, Arial, sans-serif';
    const description = data.description || 'You love exploring new ideas with AI';
    wrapText(ctx, description, 540, 900, 800, 38);

    // Badges row
    const badges = data.badges?.filter(b => b.earned)?.slice(0, 5) || [];
    if (badges.length > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '500 24px Inter, Arial, sans-serif';
        ctx.fillText('Badges Earned', 540, 1020);

        ctx.font = '50px Inter, Arial, sans-serif';
        const badgeText = badges.map(b => b.icon).join('  ');
        ctx.fillText(badgeText, 540, 1090);
    }

    // Stats row
    drawStatsRow(ctx, data, 540, 1170);
}

// Personality Slide - Full graphics
function drawPersonalitySlide(ctx, data, w, h) {
    const icon = data.icon || '🧪';
    const type = data.type || 'The Explorer';
    const description = data.description || 'You love diving deep into topics and exploring new ideas.';
    const traits = data.traits || ['Curious', 'Analytical', 'Creative'];

    // Title
    ctx.fillStyle = 'white';
    ctx.font = '700 42px Inter, Arial, sans-serif';
    ctx.fillText('Your AI Personality', 540, 250);

    // Large icon
    ctx.font = '200px Inter, Arial, sans-serif';
    ctx.fillText(icon, 540, 520);

    // Type with gradient effect
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#00f0ff';
    ctx.font = '700 64px Inter, Arial, sans-serif';
    ctx.fillText(type, 540, 650);
    ctx.shadowBlur = 0;

    // Description
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '400 30px Inter, Arial, sans-serif';
    wrapText(ctx, description, 540, 740, 800, 42);

    // Traits as pills
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '500 24px Inter, Arial, sans-serif';
    ctx.fillText('Your traits', 540, 880);

    const traitWidth = 160;
    const startX = 540 - ((traits.length - 1) * traitWidth / 2);
    traits.forEach((trait, i) => {
        const x = startX + i * traitWidth;
        // Pill background
        ctx.fillStyle = 'rgba(139, 0, 255, 0.2)';
        ctx.beginPath();
        ctx.roundRect(x - 70, 910, 140, 45, 22);
        ctx.fill();
        ctx.strokeStyle = 'rgba(139, 0, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        // Text
        ctx.fillStyle = '#c77dff';
        ctx.font = '500 22px Inter, Arial, sans-serif';
        ctx.fillText(trait, x, 940);
    });

    // Stats at bottom
    drawStatsRow(ctx, data, 540, 1100);
}

// Topic Slide - Full graphics
function drawTopicSlide(ctx, data, w, h) {
    const icon = data.icon || '💻';
    const name = (data.name || 'Coding').toUpperCase();
    const conversations = data.conversations || 150;
    const percentage = data.percentage || 35;

    // Title
    ctx.fillStyle = 'white';
    ctx.font = '700 42px Inter, Arial, sans-serif';
    ctx.fillText('Your #1 Topic', 540, 250);

    // Topic icon
    ctx.font = '150px Inter, Arial, sans-serif';
    ctx.fillText(icon, 540, 470);

    // Topic name
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#00f0ff';
    ctx.font = '800 72px Inter, Arial, sans-serif';
    ctx.fillText(name, 540, 600);
    ctx.shadowBlur = 0;

    // Progress bar
    const barWidth = 700;
    const barHeight = 20;
    const barX = 540 - barWidth / 2;
    const barY = 680;

    // Background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barWidth, barHeight, 10);
    ctx.fill();

    // Fill
    const gradient = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
    gradient.addColorStop(0, '#00f0ff');
    gradient.addColorStop(1, '#8b00ff');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(barX, barY, barWidth * (percentage / 100), barHeight, 10);
    ctx.fill();

    // Percentage
    ctx.fillStyle = 'white';
    ctx.font = '800 100px Inter, Arial, sans-serif';
    ctx.fillText(`${percentage}%`, 540, 830);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '400 32px Inter, Arial, sans-serif';
    ctx.fillText('of your conversations', 540, 890);

    // Conversation count
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '500 28px Inter, Arial, sans-serif';
    ctx.fillText(`${conversations} conversations about ${data.name || 'this topic'}`, 540, 980);

    // Fun fact
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '400 26px Inter, Arial, sans-serif';
    const insight = data.insight || `You're clearly passionate about ${data.name || 'this'}!`;
    wrapText(ctx, insight, 540, 1080, 800, 36);
}

// Tokens Slide - Full graphics
function drawTokensSlide(ctx, data, w, h) {
    const totalTokens = data.totalTokens || 2500000;
    const avgPerConversation = data.avgTokensPerConversation || 3000;
    const booksEquivalent = data.booksEquivalent || Math.round(totalTokens / 100000);

    // Title
    ctx.fillStyle = 'white';
    ctx.font = '700 42px Inter, Arial, sans-serif';
    ctx.fillText('Token Consumption', 540, 250);

    // Token icon
    ctx.font = '100px Inter, Arial, sans-serif';
    ctx.fillText('🔣', 540, 400);

    // Main stat
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#00f0ff';
    ctx.font = '900 100px Inter, Arial, sans-serif';
    ctx.fillText(formatNumber(totalTokens), 540, 550);
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '500 36px Inter, Arial, sans-serif';
    ctx.fillText('tokens processed', 540, 610);

    // Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(340, 680);
    ctx.lineTo(740, 680);
    ctx.stroke();

    // Fun comparison
    ctx.font = '60px Inter, Arial, sans-serif';
    ctx.fillText('📚', 540, 780);

    ctx.fillStyle = 'white';
    ctx.font = '700 48px Inter, Arial, sans-serif';
    ctx.fillText(`That's ${booksEquivalent} books!`, 540, 860);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '400 26px Inter, Arial, sans-serif';
    ctx.fillText('worth of text processed by AI', 540, 910);

    // Average stat
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '500 28px Inter, Arial, sans-serif';
    ctx.fillText(`~${formatNumber(avgPerConversation)} tokens per conversation`, 540, 1020);

    // Visual representation
    drawTokenBars(ctx, totalTokens, 540, 1120);
}

// Speed Slide - Full graphics
function drawSpeedSlide(ctx, data, w, h) {
    const avgTime = data.avgResponseTime || 2.5;
    const fastestTime = data.fastestResponseTime || 0.8;

    // Title
    ctx.fillStyle = 'white';
    ctx.font = '700 42px Inter, Arial, sans-serif';
    ctx.fillText('Speed Stats', 540, 250);

    // Lightning icon
    ctx.font = '120px Inter, Arial, sans-serif';
    ctx.fillText('⚡', 540, 430);

    // Main stat
    ctx.shadowColor = '#ffee00';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#ffee00';
    ctx.font = '900 120px Inter, Arial, sans-serif';
    ctx.fillText(`${avgTime}s`, 540, 600);
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '500 36px Inter, Arial, sans-serif';
    ctx.fillText('average response time', 540, 670);

    // Fastest time
    ctx.fillStyle = 'white';
    ctx.font = '700 36px Inter, Arial, sans-serif';
    ctx.fillText(`Fastest: ${fastestTime}s`, 540, 780);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '400 24px Inter, Arial, sans-serif';
    ctx.fillText('Lightning fast AI responses! ⚡', 540, 830);

    // Speed meter visual
    drawSpeedMeter(ctx, avgTime, 540, 1000);
}

// Stats Slide - Full graphics
function drawStatsSlide(ctx, data, w, h) {
    // Title
    ctx.fillStyle = 'white';
    ctx.font = '700 42px Inter, Arial, sans-serif';
    ctx.fillText('Your Stats Overview', 540, 250);

    const stats = [
        { icon: '💬', value: data.totalConversations || 847, label: 'Conversations' },
        { icon: '📅', value: data.activeDays || 180, label: 'Active Days' },
        { icon: '🔤', value: formatNumber(data.totalTokens || 2500000), label: 'Tokens' },
        { icon: '📊', value: data.topicsExplored || 12, label: 'Topics' }
    ];

    const gridStartY = 380;
    const cellWidth = 400;
    const cellHeight = 250;

    stats.forEach((stat, i) => {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const x = 340 + col * cellWidth;
        const y = gridStartY + row * cellHeight;

        // Cell background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.beginPath();
        ctx.roundRect(x - 180, y - 50, 360, 200, 20);
        ctx.fill();

        // Icon
        ctx.font = '60px Inter, Arial, sans-serif';
        ctx.fillText(stat.icon, x, y + 30);

        // Value
        ctx.fillStyle = '#00f0ff';
        ctx.font = '700 52px Inter, Arial, sans-serif';
        ctx.fillText(stat.value.toString(), x, y + 100);

        // Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '400 24px Inter, Arial, sans-serif';
        ctx.fillText(stat.label, x, y + 140);
    });

    // Streak if available
    if (data.longestStreak) {
        ctx.fillStyle = 'white';
        ctx.font = '700 32px Inter, Arial, sans-serif';
        ctx.fillText(`🔥 ${data.longestStreak} day streak!`, 540, 950);
    }
}

// Badges Slide - Full graphics
function drawBadgesSlide(ctx, data, w, h) {
    const badges = data.badges?.filter(b => b.earned) || [];

    // Title
    ctx.fillStyle = 'white';
    ctx.font = '700 42px Inter, Arial, sans-serif';
    ctx.fillText('🏆 Badges Earned', 540, 250);

    // Count
    ctx.fillStyle = '#00f0ff';
    ctx.font = '800 80px Inter, Arial, sans-serif';
    ctx.fillText(badges.length.toString(), 540, 380);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '400 32px Inter, Arial, sans-serif';
    ctx.fillText('achievements unlocked', 540, 430);

    // Badge grid
    const displayBadges = badges.slice(0, 9);
    const gridCols = 3;
    const cellSize = 250;
    const startX = 540 - cellSize;
    const startY = 520;

    displayBadges.forEach((badge, i) => {
        const row = Math.floor(i / gridCols);
        const col = i % gridCols;
        const x = startX + col * cellSize;
        const y = startY + row * 220;

        // Badge background
        const badgeColor = badge.color || '#8b00ff';
        ctx.fillStyle = `${badgeColor}20`;
        ctx.beginPath();
        ctx.roundRect(x - 100, y - 40, 200, 180, 20);
        ctx.fill();
        ctx.strokeStyle = `${badgeColor}60`;
        ctx.stroke();

        // Icon
        ctx.font = '60px Inter, Arial, sans-serif';
        ctx.fillText(badge.icon, x, y + 40);

        // Name
        ctx.fillStyle = 'white';
        ctx.font = '500 22px Inter, Arial, sans-serif';
        ctx.fillText(badge.name.substring(0, 15), x, y + 100);
    });
}

// Default slide
function drawDefaultSlide(ctx, data, w, h) {
    ctx.fillStyle = 'white';
    ctx.font = '700 48px Inter, Arial, sans-serif';
    ctx.fillText('My AI Wrapped 2025', 540, 500);

    ctx.fillStyle = '#00f0ff';
    ctx.font = '900 120px Inter, Arial, sans-serif';
    ctx.fillText(data.totalConversations || '847', 540, 700);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '400 36px Inter, Arial, sans-serif';
    ctx.fillText('conversations', 540, 770);
}

// Helper: Draw stats row at bottom
function drawStatsRow(ctx, data, x, y) {
    const stats = [
        { value: data.activeDays || 180, label: 'days' },
        { value: data.topicsExplored || 12, label: 'topics' },
        { value: data.badges?.filter(b => b.earned)?.length || 5, label: 'badges' }
    ];

    ctx.font = '500 22px Inter, Arial, sans-serif';
    const spacing = 180;
    const startX = x - spacing;

    stats.forEach((stat, i) => {
        const sx = startX + i * spacing;
        ctx.fillStyle = '#00f0ff';
        ctx.font = '700 32px Inter, Arial, sans-serif';
        ctx.fillText(stat.value.toString(), sx, y);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '400 20px Inter, Arial, sans-serif';
        ctx.fillText(stat.label, sx, y + 28);
    });
}

// Helper: Draw token visualization bars
function drawTokenBars(ctx, tokens, x, y) {
    const barCount = 7;
    const barWidth = 60;
    const maxHeight = 80;
    const gap = 20;
    const startX = x - (barCount * (barWidth + gap)) / 2;

    for (let i = 0; i < barCount; i++) {
        const height = maxHeight * (0.3 + Math.random() * 0.7);
        const bx = startX + i * (barWidth + gap);

        const gradient = ctx.createLinearGradient(0, y, 0, y - height);
        gradient.addColorStop(0, '#00f0ff');
        gradient.addColorStop(1, '#8b00ff');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(bx, y - height, barWidth, height, 8);
        ctx.fill();
    }
}

// Helper: Draw speed meter
function drawSpeedMeter(ctx, avgTime, x, y) {
    // Arc background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.arc(x, y, 100, Math.PI, 2 * Math.PI);
    ctx.stroke();

    // Speed indicator
    const speed = Math.min(avgTime / 5, 1);
    const gradient = ctx.createLinearGradient(x - 100, y, x + 100, y);
    gradient.addColorStop(0, '#00ff88');
    gradient.addColorStop(0.5, '#ffee00');
    gradient.addColorStop(1, '#ff6b6b');
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 100, Math.PI, Math.PI + (Math.PI * (1 - speed)));
    ctx.stroke();
}

// Text wrap helper
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let testY = y;

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line.trim(), x, testY);
            line = words[n] + ' ';
            testY += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line.trim(), x, testY);
}

// Format number helper
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
}

// Convert canvas to blob
export function canvasToBlob(canvas, type = 'image/png', quality = 0.95) {
    return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
    });
}

// Download image
export async function downloadImage(canvas, filename = 'ai-wrapped.png') {
    try {
        const blob = await canvasToBlob(canvas);
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);

        return true;
    } catch (error) {
        console.error('Download error:', error);
        return false;
    }
}

// Share using Web Share API
export async function shareToSocial(canvas, platform, shareText) {
    try {
        const blob = await canvasToBlob(canvas);
        const file = new File([blob], 'ai-wrapped.png', { type: 'image/png' });

        // Try native share API (works on mobile)
        if (navigator.share && navigator.canShare) {
            const shareData = {
                title: 'My AI Wrapped 2025',
                text: shareText,
                files: [file]
            };

            if (navigator.canShare(shareData)) {
                await navigator.share(shareData);
                return { success: true, method: 'native' };
            }
        }

        // Fallback: Download + open platform
        await downloadImage(canvas, `ai-wrapped-${platform}.png`);

        const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
            instagram: null,
            linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank');
        }

        return { success: true, method: 'download' };
    } catch (error) {
        console.error('Share error:', error);
        await downloadImage(canvas, `ai-wrapped-${platform}.png`);
        return { success: true, method: 'download-fallback' };
    }
}

// Create floating action buttons for any page
export function createFloatingButtons(container, pageData, pageType) {
    // Remove existing buttons if any
    const existing = container.querySelector('.floating-actions');
    if (existing) existing.remove();

    const buttonsHtml = `
    <div class="floating-actions">
      <button class="fab fab-download" title="Download Image" aria-label="Download">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </button>
      <button class="fab fab-share" title="Share" aria-label="Share">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
        </svg>
      </button>
    </div>
  `;

    container.insertAdjacentHTML('beforeend', buttonsHtml);

    const shareText = `My 2025 AI Wrapped is here! 🤖✨\n\nGet yours at aiwrapped.com #AIWrapped2025`;

    // Download button
    container.querySelector('.fab-download')?.addEventListener('click', async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const btn = e.currentTarget;
        btn.classList.add('loading');

        try {
            const canvas = await generatePageImage(pageData, pageType);
            await downloadImage(canvas, `ai-wrapped-${pageType}.png`);
            btn.classList.remove('loading');
            btn.classList.add('success');
            setTimeout(() => btn.classList.remove('success'), 2000);
        } catch (err) {
            console.error('Capture failed:', err);
            btn.classList.remove('loading');
            alert('Download completed! Check your downloads folder.');
        }
    });

    // Share button
    container.querySelector('.fab-share')?.addEventListener('click', async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const btn = e.currentTarget;
        btn.classList.add('loading');

        try {
            const canvas = await generatePageImage(pageData, pageType);
            await shareToSocial(canvas, 'default', shareText);
            btn.classList.remove('loading');
            btn.classList.add('success');
            setTimeout(() => btn.classList.remove('success'), 2000);
        } catch (err) {
            console.error('Share failed:', err);
            btn.classList.remove('loading');
        }
    });
}

export default { generatePageImage, downloadImage, shareToSocial, createFloatingButtons };
