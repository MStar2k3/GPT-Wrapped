/* ============================================
   AI CHATBOT WRAPPED - ANIMATION UTILITIES
   Helper functions for animations
   ============================================ */

// Animate number counting up
export function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeProgress);

        element.textContent = prefix + current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Animate percentage counter
export function animatePercentage(element, target, duration = 1500) {
    animateCounter(element, target, duration, '', '%');
}

// Intersection Observer for scroll animations
export function setupScrollAnimations(selector = '.animate-on-scroll') {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
    });

    return observer;
}

// Stagger animation delay for multiple elements
export function staggerAnimation(elements, baseDelay = 100) {
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * baseDelay}ms`;
    });
}

// Create confetti burst
export function createConfetti(container, count = 50) {
    const colors = ['#00f0ff', '#ff00a8', '#8b00ff', '#00ff88', '#ffee00'];

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
      position: absolute;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      top: -20px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `;
        container.appendChild(confetti);

        // Clean up after animation
        setTimeout(() => confetti.remove(), 5500);
    }
}

// Create particle burst from a point
export function createParticleBurst(x, y, container, count = 20) {
    const colors = ['#00f0ff', '#ff00a8', '#8b00ff'];

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / count;
        const velocity = Math.random() * 100 + 50;

        particle.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      --tx: ${Math.cos(angle) * velocity}px;
      --ty: ${Math.sin(angle) * velocity}px;
      animation: particleBurst 0.8s ease-out forwards;
      pointer-events: none;
    `;

        container.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

// Typewriter effect
export function typewriter(element, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}

// Smooth scroll to element
export function scrollToElement(element, offset = 0) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
        top,
        behavior: 'smooth'
    });
}

// Wait for animation to complete
export function waitForAnimation(element) {
    return new Promise(resolve => {
        function handleAnimationEnd() {
            element.removeEventListener('animationend', handleAnimationEnd);
            resolve();
        }
        element.addEventListener('animationend', handleAnimationEnd);
    });
}

// Delay helper
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Format large numbers (1000 -> 1K, 1000000 -> 1M)
export function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
}

// Format duration
export function formatDuration(seconds) {
    if (seconds < 60) {
        return `${seconds.toFixed(1)}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
}

export default {
    animateCounter,
    animatePercentage,
    setupScrollAnimations,
    staggerAnimation,
    createConfetti,
    createParticleBurst,
    typewriter,
    scrollToElement,
    waitForAnimation,
    delay,
    formatNumber,
    formatDuration
};
