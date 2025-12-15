/* ============================================
   AI CHATBOT WRAPPED - PAGE 3: TOPICS
   Top conversation topics
   ============================================ */

export function renderPage3(data) {
    const container = document.createElement('div');
    container.className = 'wrapped-page page-3';

    container.innerHTML = `
    <div class="wrapped-content">
      <div class="page-label animate-on-enter">What You Explored</div>
      
      <h2 class="page-title animate-on-enter">
        You Asked <span class="text-gradient">About</span>
      </h2>
      
      <div class="top-topic animate-on-enter">
        <div class="top-topic-icon">${data.topTopic.name.includes('Coding') ? '💻' : '📊'}</div>
        <div class="top-topic-name">${data.topTopic.name}</div>
        <div class="top-topic-stat">
          <span class="top-topic-number">${data.topTopic.conversations}</span> conversations
        </div>
        <div class="top-topic-insight">${data.topTopic.insight}</div>
      </div>
      
      <div class="topics-grid animate-on-enter">
        ${data.topics.map((topic, i) => `
          <div class="topic-card" style="--topic-color: ${topic.color}; animation-delay: ${i * 100}ms">
            <div class="topic-icon">${topic.icon}</div>
            <div class="topic-info">
              <div class="topic-name">${topic.name}</div>
              <div class="topic-count">${topic.conversations} chats</div>
            </div>
            <div class="topic-bar">
              <div class="topic-bar-fill" style="width: ${topic.percentage}%"></div>
            </div>
            <div class="topic-percentage">${topic.percentage}%</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

    // Animate bars
    setTimeout(() => {
        const bars = container.querySelectorAll('.topic-bar-fill');
        bars.forEach((bar, i) => {
            setTimeout(() => {
                bar.style.transition = 'width 1s ease';
                bar.style.width = bar.style.width;
            }, i * 150);
        });
    }, 500);

    return container;
}

export default renderPage3;
