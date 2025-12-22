/* ============================================
   SCREENSHOT CAPTURE UTILITY
   Client-side canvas-based screenshot for all pages
   ============================================ */

// Generate image from any page element using Canvas API
export async function captureElement(element, options = {}) {
    const { width = 1080, height = 1080, title = 'AI Wrapped 2025' } = options;

    const canvas = document.createElement('canvas');
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

    // Draw stars
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const opacity = Math.random() * 0.6 + 0.2;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
    }

    // Glow orbs
    const drawGlowOrb = (x, y, radius, color) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color.replace(')', ', 0.15)').replace('rgb', 'rgba'));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    };
    drawGlowOrb(width * 0.1, height * 0.1, width * 0.4, 'rgb(0, 240, 255)');
    drawGlowOrb(width * 0.9, height * 0.9, width * 0.35, 'rgb(139, 0, 255)');

    // Card background
    const cardX = width * 0.08;
    const cardY = height * 0.12;
    const cardW = width * 0.84;
    const cardH = height * 0.76;
    const cardRadius = 25;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, cardRadius);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Logo at top
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = `${width * 0.028}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✨ AI Wrapped 2025', width / 2, cardY + height * 0.06);

    // Title
    ctx.fillStyle = '#00f0ff';
    ctx.font = `bold ${width * 0.045}px Inter, Arial, sans-serif`;
    ctx.fillText(title, width / 2, cardY + height * 0.14);

    // Watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = `${width * 0.022}px Inter, Arial, sans-serif`;
    ctx.fillText('✨ aiwrapped.com', width / 2, height * 0.95);

    return canvas;
}

// Generate share image with specific content
export async function generatePageImage(pageData, pageType) {
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1080;
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
    for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
        ctx.fill();
    }

    // Glow orbs
    const drawGlow = (x, y, r, color) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color.replace(')', ', 0.12)').replace('rgb', 'rgba'));
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    };
    drawGlow(100, 100, 400, 'rgb(0, 240, 255)');
    drawGlow(980, 980, 350, 'rgb(139, 0, 255)');

    // Card
    const cx = 80, cy = 120, cw = 920, ch = 840;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.roundRect(cx, cy, cw, ch, 25);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();

    // Logo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '28px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('✨ AI Wrapped 2025', 540, 175);

    // Page-specific content
    ctx.textAlign = 'center';

    switch (pageType) {
        case 'year':
            ctx.fillStyle = '#00f0ff';
            ctx.font = 'bold 140px Inter, Arial';
            ctx.fillText(pageData.totalConversations || '847', 540, 420);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '36px Inter, Arial';
            ctx.fillText('conversations in 2025', 540, 480);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Inter, Arial';
            ctx.fillText(pageData.personalityType || '🧪 The Explorer', 540, 600);
            break;

        case 'personality':
            ctx.font = '100px Inter, Arial';
            ctx.fillText(pageData.icon || '🧪', 540, 380);
            ctx.fillStyle = '#00f0ff';
            ctx.font = 'bold 56px Inter, Arial';
            ctx.fillText(pageData.type || 'The Explorer', 540, 480);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '28px Inter, Arial';
            const desc = pageData.description || 'You love diving deep into topics';
            wrapText(ctx, desc, 540, 550, 800, 35);
            break;

        case 'topic':
            ctx.font = '80px Inter, Arial';
            ctx.fillText(pageData.icon || '💻', 540, 360);
            ctx.fillStyle = 'white';
            ctx.font = 'bold 60px Inter, Arial';
            ctx.fillText((pageData.name || 'CODING').toUpperCase(), 540, 460);
            ctx.fillStyle = '#00f0ff';
            ctx.font = 'bold 100px Inter, Arial';
            ctx.fillText(`${pageData.percentage || 35}%`, 540, 580);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '32px Inter, Arial';
            ctx.fillText('of your conversations', 540, 640);
            break;

        case 'tokens':
            ctx.fillStyle = '#00f0ff';
            ctx.font = 'bold 100px Inter, Arial';
            ctx.fillText(formatNumber(pageData.totalTokens || 2500000), 540, 400);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '36px Inter, Arial';
            ctx.fillText('tokens processed', 540, 470);
            ctx.fillStyle = 'white';
            ctx.font = '32px Inter, Arial';
            ctx.fillText(`That's ${pageData.booksEquivalent || 15} books worth of text!`, 540, 560);
            break;

        case 'speed':
            ctx.font = '60px Inter, Arial';
            ctx.fillText('⚡', 540, 340);
            ctx.fillStyle = '#00f0ff';
            ctx.font = 'bold 90px Inter, Arial';
            ctx.fillText(`${pageData.avgResponseTime || 2.5}s`, 540, 450);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '36px Inter, Arial';
            ctx.fillText('average response time', 540, 520);
            break;

        case 'stats':
            ctx.fillStyle = '#00f0ff';
            ctx.font = 'bold 80px Inter, Arial';
            ctx.fillText(pageData.totalConversations || '847', 540, 380);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '32px Inter, Arial';
            ctx.fillText('conversations', 540, 440);
            ctx.fillStyle = 'white';
            ctx.font = '28px Inter, Arial';
            ctx.fillText(`${pageData.activeDays || 180} active days • ${pageData.topicsExplored || 12} topics`, 540, 520);
            break;

        case 'badges':
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Inter, Arial';
            ctx.fillText('🏆 Badges Earned', 540, 320);
            const badges = pageData.badges || [];
            const badgeEmojis = badges.filter(b => b.earned).slice(0, 6).map(b => b.icon);
            ctx.font = '60px Inter, Arial';
            ctx.fillText(badgeEmojis.join(' '), 540, 450);
            ctx.font = '36px Inter, Arial';
            ctx.fillText(`${badgeEmojis.length} achievements unlocked!`, 540, 540);
            break;

        default:
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Inter, Arial';
            ctx.fillText('My AI Wrapped 2025', 540, 450);
    }

    // Watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '24px Inter, Arial';
    ctx.fillText('✨ aiwrapped.com', 540, 1020);

    return canvas;
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
export function canvasToBlob(canvas, type = 'image/png', quality = 0.92) {
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
        }
    });

    // Share button
    container.querySelector('.fab-share')?.addEventListener('click', async (e) => {
        e.stopPropagation();
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

export default { captureElement, generatePageImage, downloadImage, shareToSocial, createFloatingButtons };
