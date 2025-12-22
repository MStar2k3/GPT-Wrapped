/* ============================================
   AI WRAPPED - SCREENSHOT GENERATION SERVICE
   Puppeteer-based screenshot capture
   ============================================ */

import express from 'express';
import puppeteer from 'puppeteer';
import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

// Ensure directories exist
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Platform format configurations
const PLATFORM_FORMATS = {
    linkedin: { width: 1080, height: 1350, format: 'png', quality: 95 },
    instagram_square: { width: 1080, height: 1080, format: 'jpeg', quality: 90 },
    instagram_story: { width: 1080, height: 1920, format: 'png', quality: 95 },
    twitter: { width: 1200, height: 675, format: 'jpeg', quality: 85 },
    highres: { width: 2160, height: 2700, format: 'png', quality: 95 }
};

// Card type to template mapping
const CARD_TEMPLATES = {
    personality: 'personality-card.html',
    topic: 'topic-card.html',
    stats: 'stats-card.html',
    speed: 'speed-card.html',
    achievement: 'achievement-card.html',
    year: 'year-card.html'
};

// Generate HTML content for a card
function generateCardHtml(cardType, data, width, height) {
    const styles = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        
        body {
            width: ${width}px;
            height: ${height}px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 30%, #16213e 60%, #0f0f23 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }
        
        .stars {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        
        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            opacity: 0.6;
        }
        
        .glow-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.15;
        }
        
        .glow-cyan {
            background: #00f0ff;
            width: ${width * 0.4}px;
            height: ${width * 0.4}px;
            top: -10%;
            left: -10%;
        }
        
        .glow-purple {
            background: #8b00ff;
            width: ${width * 0.35}px;
            height: ${width * 0.35}px;
            bottom: -10%;
            right: -10%;
        }
        
        .card {
            position: relative;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: ${Math.min(width, height) * 0.03}px;
            padding: ${Math.min(width, height) * 0.06}px;
            width: 85%;
            max-width: ${width * 0.85}px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }
        
        .logo {
            font-size: ${Math.min(width, height) * 0.025}px;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: ${Math.min(width, height) * 0.03}px;
        }
        
        .icon {
            font-size: ${Math.min(width, height) * 0.12}px;
            margin-bottom: ${Math.min(width, height) * 0.02}px;
        }
        
        .title {
            font-size: ${Math.min(width, height) * 0.045}px;
            font-weight: 800;
            margin-bottom: ${Math.min(width, height) * 0.015}px;
        }
        
        .title-gradient {
            background: linear-gradient(90deg, #00f0ff, #8b00ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .stat-number {
            font-size: ${Math.min(width, height) * 0.15}px;
            font-weight: 900;
            background: linear-gradient(90deg, #00f0ff, #8b00ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.1;
        }
        
        .stat-label {
            font-size: ${Math.min(width, height) * 0.035}px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: ${Math.min(width, height) * 0.03}px;
        }
        
        .description {
            font-size: ${Math.min(width, height) * 0.025}px;
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.5;
            margin-top: ${Math.min(width, height) * 0.02}px;
        }
        
        .badges {
            display: flex;
            justify-content: center;
            gap: ${Math.min(width, height) * 0.02}px;
            margin-top: ${Math.min(width, height) * 0.03}px;
        }
        
        .badge {
            font-size: ${Math.min(width, height) * 0.04}px;
        }
        
        .watermark {
            position: absolute;
            bottom: ${Math.min(width, height) * 0.03}px;
            left: 50%;
            transform: translateX(-50%);
            font-size: ${Math.min(width, height) * 0.02}px;
            color: rgba(255, 255, 255, 0.4);
        }
        
        .trait-tags {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: ${Math.min(width, height) * 0.01}px;
            margin-top: ${Math.min(width, height) * 0.02}px;
        }
        
        .trait-tag {
            padding: ${Math.min(width, height) * 0.01}px ${Math.min(width, height) * 0.02}px;
            background: rgba(139, 0, 255, 0.2);
            border: 1px solid rgba(139, 0, 255, 0.4);
            border-radius: ${Math.min(width, height) * 0.03}px;
            font-size: ${Math.min(width, height) * 0.02}px;
            color: #c77dff;
        }
    `;

    // Generate random stars
    let starsHtml = '';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.6 + 0.2;
        starsHtml += `<div class="star" style="left: ${x}%; top: ${y}%; opacity: ${opacity}"></div>`;
    }

    // Generate card-specific content
    let cardContent = '';

    switch (cardType) {
        case 'personality':
            cardContent = `
                <div class="icon">${data.icon || '🧪'}</div>
                <div class="title">Your AI Personality</div>
                <div class="stat-number" style="font-size: ${Math.min(width, height) * 0.06}px">${data.type || 'The Explorer'}</div>
                <div class="description">${data.description || 'You love diving deep into topics.'}</div>
                <div class="trait-tags">
                    ${(data.traits || ['Curious', 'Analytical', 'Creative']).map(t => `<span class="trait-tag">${t}</span>`).join('')}
                </div>
            `;
            break;

        case 'topic':
            cardContent = `
                <div class="icon">${data.icon || '💻'}</div>
                <div class="title">Your #1 Topic</div>
                <div class="stat-number" style="font-size: ${Math.min(width, height) * 0.05}px">${data.name || 'CODING'}</div>
                <div class="stat-label">${data.conversations || 150} conversations • ${data.percentage || 35}% of total</div>
                <div class="description">${data.insight || 'You spent most of your time exploring this topic.'}</div>
            `;
            break;

        case 'stats':
        case 'year':
            cardContent = `
                <div class="icon">${data.icon || '🤖'}</div>
                <div class="title">Your 2025 AI Year</div>
                <div class="stat-number">${data.totalConversations || 847}</div>
                <div class="stat-label">conversations</div>
                <div class="description">You explored ${data.topicsExplored || 12} topics across ${data.platforms || 1} AI platforms</div>
                <div class="badges">
                    ${(data.badges || ['🏆', '🎯', '⚡', '🌟']).slice(0, 4).map(b => `<span class="badge">${b}</span>`).join('')}
                </div>
            `;
            break;

        case 'speed':
            cardContent = `
                <div class="icon">⚡</div>
                <div class="title">Speed Stats</div>
                <div class="stat-number" style="font-size: ${Math.min(width, height) * 0.08}px">${data.avgResponseTime || '2.5'}s</div>
                <div class="stat-label">average response time</div>
                <div class="description">Your fastest platform: ${data.fastestPlatform || 'ChatGPT'}</div>
            `;
            break;

        case 'achievement':
            cardContent = `
                <div class="icon">🏆</div>
                <div class="title">Achievements</div>
                <div class="stat-number" style="font-size: ${Math.min(width, height) * 0.1}px">${data.count || 5}</div>
                <div class="stat-label">badges earned</div>
                <div class="badges">
                    ${(data.badges || [{ icon: '🌙' }, { icon: '🔥' }, { icon: '💬' }, { icon: '🎯' }, { icon: '⚡' }]).slice(0, 5).map(b => `<span class="badge">${b.icon || b}</span>`).join('')}
                </div>
            `;
            break;

        default:
            cardContent = `
                <div class="icon">✨</div>
                <div class="title">AI Wrapped 2025</div>
                <div class="stat-number">${data.value || '---'}</div>
                <div class="stat-label">${data.label || 'Your stats'}</div>
            `;
    }

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>${styles}</style>
        </head>
        <body>
            <div class="stars">${starsHtml}</div>
            <div class="glow-orb glow-cyan"></div>
            <div class="glow-orb glow-purple"></div>
            <div class="card">
                <div class="logo">✨ AI Wrapped 2025</div>
                ${cardContent}
            </div>
            <div class="watermark">✨ aiwrapped.com</div>
        </body>
        </html>
    `;
}

// Generate screenshot with Puppeteer
async function generateScreenshot(cardType, data, platform) {
    const format = PLATFORM_FORMATS[platform];
    if (!format) {
        throw new Error(`Unknown platform: ${platform}`);
    }

    // Puppeteer launch options for Railway/container environment
    const launchOptions = {
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    };

    // Use system Chromium if available (for Railway)
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    }

    const browser = await puppeteer.launch(launchOptions);

    try {
        const page = await browser.newPage();
        await page.setViewport({
            width: format.width,
            height: format.height,
            deviceScaleFactor: platform === 'highres' ? 2 : 1
        });

        const html = generateCardHtml(cardType, data, format.width, format.height);
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Wait for fonts to load
        await page.evaluateHandle('document.fonts.ready');
        await new Promise(r => setTimeout(r, 500));

        const filename = `${Date.now()}-${cardType}-${platform}.${format.format === 'jpeg' ? 'jpg' : 'png'}`;
        const filepath = path.join(SCREENSHOTS_DIR, filename);

        await page.screenshot({
            path: filepath,
            type: format.format,
            quality: format.format === 'jpeg' ? format.quality : undefined,
            fullPage: false
        });

        return { filename, filepath, format: format.format };
    } finally {
        await browser.close();
    }
}

// API: Generate single screenshot
router.post('/generate', async (req, res) => {
    try {
        const { cardType, data, platform } = req.body;

        if (!cardType || !platform) {
            return res.status(400).json({ error: 'Missing cardType or platform' });
        }

        console.log(`📸 Generating screenshot: ${cardType} for ${platform}`);
        const result = await generateScreenshot(cardType, data || {}, platform);

        res.json({
            success: true,
            filename: result.filename,
            url: `/screenshots/${result.filename}`,
            format: result.format
        });
    } catch (error) {
        console.error('Screenshot generation error:', error);
        res.status(500).json({ error: 'Failed to generate screenshot', details: error.message });
    }
});

// API: Generate batch screenshots
router.post('/batch', async (req, res) => {
    try {
        const { cards, platforms } = req.body;

        if (!cards || !Array.isArray(cards) || !platforms || !Array.isArray(platforms)) {
            return res.status(400).json({ error: 'Missing cards or platforms array' });
        }

        console.log(`📸 Generating batch: ${cards.length} cards x ${platforms.length} platforms`);

        const results = [];
        for (const card of cards) {
            for (const platform of platforms) {
                try {
                    const result = await generateScreenshot(card.type, card.data || {}, platform);
                    results.push({
                        cardType: card.type,
                        platform,
                        filename: result.filename,
                        url: `/screenshots/${result.filename}`,
                        format: result.format
                    });
                } catch (err) {
                    results.push({
                        cardType: card.type,
                        platform,
                        error: err.message
                    });
                }
            }
        }

        res.json({ success: true, results });
    } catch (error) {
        console.error('Batch generation error:', error);
        res.status(500).json({ error: 'Batch generation failed', details: error.message });
    }
});

// API: Create ZIP download
router.post('/zip', async (req, res) => {
    try {
        const { files } = req.body;

        if (!files || !Array.isArray(files)) {
            return res.status(400).json({ error: 'Missing files array' });
        }

        const zipFilename = `ai-wrapped-${Date.now()}.zip`;
        const zipPath = path.join(SCREENSHOTS_DIR, zipFilename);

        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`📦 ZIP created: ${archive.pointer()} bytes`);
            res.json({
                success: true,
                filename: zipFilename,
                url: `/screenshots/${zipFilename}`,
                size: archive.pointer()
            });
        });

        archive.on('error', (err) => {
            throw err;
        });

        archive.pipe(output);

        // Add files to ZIP with folder structure
        for (const file of files) {
            const filePath = path.join(SCREENSHOTS_DIR, file.filename);
            if (fs.existsSync(filePath)) {
                const folder = file.platform || 'general';
                archive.file(filePath, { name: `${folder}/${file.filename}` });
            }
        }

        await archive.finalize();
    } catch (error) {
        console.error('ZIP creation error:', error);
        res.status(500).json({ error: 'Failed to create ZIP', details: error.message });
    }
});

// API: Get available platforms
router.get('/platforms', (req, res) => {
    res.json({
        platforms: Object.entries(PLATFORM_FORMATS).map(([key, value]) => ({
            id: key,
            name: key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            dimensions: `${value.width}x${value.height}`,
            format: value.format
        }))
    });
});

// Cleanup old files (files older than 24 hours)
function cleanupOldFiles() {
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    const now = Date.now();

    fs.readdir(SCREENSHOTS_DIR, (err, files) => {
        if (err) return;

        files.forEach(file => {
            const filePath = path.join(SCREENSHOTS_DIR, file);
            fs.stat(filePath, (err, stats) => {
                if (err) return;
                if (now - stats.mtimeMs > maxAge) {
                    fs.unlink(filePath, () => { });
                }
            });
        });
    });
}

// Run cleanup every hour
setInterval(cleanupOldFiles, 60 * 60 * 1000);

export default router;
