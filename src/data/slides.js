/* ============================================
   GPT WRAPPED - 22 SLIDE CONFIGURATIONS
   Each slide has: type, title, gradient, emoji, caption
   ============================================ */

// Gradient color presets
const GRADIENTS = {
    purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    orange: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    teal: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    blue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pink: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    yellow: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
    green: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    cyan: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
    red: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
    gold: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    deepPurple: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ocean: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    forest: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    fire: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
    violet: 'linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)',
    aqua: 'linear-gradient(135deg, #13547a 0%, #80d0c7 100%)',
    coral: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    midnight: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    electric: 'linear-gradient(135deg, #00f260 0%, #0575e6 100%)',
    rose: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
    lavender: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
};

// All 22 slides configuration
export const SLIDES = [
    {
        id: 1,
        type: 'year_intro',
        label: 'YOUR YEAR IN AI',
        emoji: '✨',
        gradient: GRADIENTS.purple,
        caption: 'Let\'s see what you\'ve been up to...',
        getData: (data) => ({
            bigStat: '2025',
            subtext: 'GPT Wrapped'
        })
    },
    {
        id: 2,
        type: 'total_prompts',
        label: 'YOU SENT',
        emoji: '📩',
        gradient: GRADIENTS.orange,
        caption: 'Keyboard cardio, completed.',
        getData: (data) => ({
            bigStat: data?.summary?.totalPrompts?.toLocaleString() || '504',
            subtext: 'prompts'
        })
    },
    {
        id: 3,
        type: 'conversations',
        label: 'YOU HAD',
        emoji: '💬',
        gradient: GRADIENTS.teal,
        caption: 'Therapy? No, just ChatGPT.',
        getData: (data) => ({
            bigStat: data?.summary?.totalConversations?.toLocaleString() || '127',
            subtext: 'conversations'
        })
    },
    {
        id: 4,
        type: 'top_topics',
        label: 'YOUR TOP TOPICS',
        emoji: '📚',
        gradient: GRADIENTS.blue,
        caption: 'You had range, we\'ll give you that.',
        getData: (data) => ({
            topics: data?.topics?.slice(0, 5) || [
                { name: 'Coding', count: 89 },
                { name: 'Research', count: 45 },
                { name: 'Writing', count: 32 },
                { name: 'General', count: 28 }
            ]
        })
    },
    {
        id: 5,
        type: 'curiosity_score',
        label: 'CURIOSITY SCORE',
        emoji: '🔍',
        gradient: GRADIENTS.pink,
        caption: 'Google is sweating.',
        getData: (data) => ({
            bigStat: (data?.personality?.curiosityScore || 78) + '/100',
            subtext: data?.personality?.curiosityLabel || 'Curious Mind'
        })
    },
    {
        id: 6,
        type: 'avg_prompt_length',
        label: 'AVERAGE PROMPT LENGTH',
        emoji: '📝',
        gradient: GRADIENTS.yellow,
        caption: 'You love the fine print.',
        getData: (data) => ({
            bigStat: data?.summary?.avgPromptWords || '42',
            subtext: 'words per prompt'
        })
    },
    {
        id: 7,
        type: 'total_words',
        label: 'TOTAL WORDS TYPED',
        emoji: '📄',
        gradient: GRADIENTS.green,
        caption: 'That\'s basically a novel, bestie.',
        getData: (data) => {
            const words = data?.summary?.totalWords || 21168;
            const pages = Math.round(words / 500);
            return {
                bigStat: words.toLocaleString(),
                subtext: `That's like ${pages} pages!`
            };
        }
    },
    {
        id: 8,
        type: 'most_active_day',
        label: 'MOST ACTIVE DAY',
        emoji: '📆',
        gradient: GRADIENTS.fire,
        caption: 'Someone had deadlines.',
        getData: (data) => ({
            bigStat: data?.activity?.mostActiveDay?.weekday || 'Wednesday',
            subtext: `${data?.activity?.mostActiveDay?.count || 34} prompts that day`
        })
    },
    {
        id: 9,
        type: 'peak_hour',
        label: 'PEAK CHATTING HOUR',
        emoji: '⏰',
        gradient: GRADIENTS.cyan,
        caption: 'Brain: online. Productivity: maybe.',
        getData: (data) => ({
            bigStat: data?.activity?.peakHour?.label || '10 PM',
            subtext: `${data?.activity?.peakHour?.count || 45} messages at this hour`
        })
    },
    {
        id: 10,
        type: 'day_vs_night',
        label: 'DAY WALKER OR NIGHT OWL?',
        emoji: data => (data?.activity?.dayPercentage || 40) > 50 ? '☀️' : '🌙',
        gradient: GRADIENTS.deepPurple,
        caption: 'Circadian rhythm? Heard of it.',
        getData: (data) => ({
            dayPercentage: data?.activity?.dayPercentage || 40,
            nightPercentage: data?.activity?.nightPercentage || 60,
            title: (data?.activity?.dayPercentage || 40) > 50 ? 'Day Walker' : 'Night Owl'
        })
    },
    {
        id: 11,
        type: 'carried_score',
        label: 'CARRIED BY GPT SCORE',
        emoji: '🔧',
        gradient: GRADIENTS.ocean,
        caption: 'Leaning on AI like a crutch bestie.',
        getData: (data) => ({
            bigStat: (data?.personality?.assistScore || 72) + '%',
            subtext: data?.personality?.assistLabel || 'Assisted Living 🤝'
        })
    },
    {
        id: 12,
        type: 'delulu_index',
        label: 'DELULU INDEX',
        emoji: '💫',
        gradient: GRADIENTS.rose,
        caption: 'Your imagination pays rent.',
        getData: (data) => ({
            bigStat: (data?.personality?.deluluScore || 34) + '/100',
            subtext: data?.personality?.deluluLabel || 'Realist 📊'
        })
    },
    {
        id: 13,
        type: 'longest_convo',
        label: 'LONGEST CONVERSATION',
        emoji: '🤿',
        gradient: GRADIENTS.aqua,
        caption: 'This chat went DEEP!',
        getData: (data) => ({
            title: data?.highlights?.longestConvo?.title || '"Debugging that weird error"',
            messageCount: data?.highlights?.longestConvo?.messages || 47,
            wordCount: data?.highlights?.longestConvo?.words || 2840
        })
    },
    {
        id: 14,
        type: 'villain_arc',
        label: 'VILLAIN ARC STARTER PACK',
        emoji: '😈',
        gradient: GRADIENTS.red,
        caption: 'Someone was having a day...',
        getData: (data) => ({
            title: data?.highlights?.villainArc?.title || '"Why isn\'t this working?!"',
            messageCount: data?.highlights?.villainArc?.messages || 23,
            frustrationScore: data?.highlights?.villainArc?.frustration || 'High'
        })
    },
    {
        id: 15,
        type: 'fbi_concern',
        label: 'FBI AGENT CONCERN LEVEL',
        emoji: '🕵️',
        gradient: GRADIENTS.sunset,
        caption: 'Purely for research, obviously.',
        getData: (data) => ({
            bigStat: (data?.personality?.fbiConcern || 28) + '%',
            promptSnippet: data?.highlights?.spicyPrompt || '"How to explain to my boss..."'
        })
    },
    {
        id: 16,
        type: 'touch_grass',
        label: 'TOUCH GRASS AWARD',
        emoji: '🌱',
        gradient: GRADIENTS.forest,
        caption: 'Be fr, go outside.',
        getData: (data) => ({
            bigStat: (data?.personality?.screenAddiction || 67) + '%',
            subtext: 'screen addiction level'
        })
    },
    {
        id: 17,
        type: 'most_used_model',
        label: 'MOST USED MODEL',
        emoji: '🤖',
        gradient: GRADIENTS.electric,
        caption: 'Brand loyalty: confirmed.',
        getData: (data) => ({
            bigStat: data?.summary?.mostUsedModel || 'GPT-4',
            subtext: `${data?.summary?.modelUsagePercent || 100}% of your chats`
        })
    },
    {
        id: 18,
        type: 'summary_sentence',
        label: 'YOUR YEAR IN ONE SENTENCE',
        emoji: '✍️',
        gradient: GRADIENTS.lavender,
        caption: 'The AI knows you too well.',
        getData: (data) => ({
            sentence: data?.summary?.yearSummary || '"2025 was a year of thoughtful conversations about science, business, and life with ChatGPT."'
        })
    },
    {
        id: 19,
        type: 'rizzless_prompt',
        label: 'RIZZLESS PROMPT OF THE YEAR',
        emoji: '😬',
        gradient: GRADIENTS.coral,
        caption: 'Not your finest moment, bestie.',
        getData: (data) => ({
            prompt: data?.highlights?.rizzlessPrompt || '"In the Retail Policy Issuance – STP process..."'
        })
    },
    {
        id: 20,
        type: 'badges',
        label: 'BADGES EARNED',
        emoji: '🏆',
        gradient: GRADIENTS.gold,
        caption: 'Achievement unlocked: AI Power User',
        getData: (data) => ({
            badges: data?.badges || [
                { icon: '👑', name: 'Token Titan' },
                { icon: '🌊', name: 'Word Tsunami' },
                { icon: '🎯', name: 'Prompt Prodigy' },
                { icon: '🦉', name: '3 AM Thinker' },
                { icon: '🔥', name: 'Streak Master' },
                { icon: '👺', name: 'Code Goblin' }
            ]
        })
    },
    {
        id: 21,
        type: 'quirky_facts',
        label: 'FUN FACTS',
        emoji: '🎲',
        gradient: GRADIENTS.violet,
        caption: 'The numbers don\'t lie.',
        getData: (data) => ({
            facts: data?.quirkyFacts || [
                'You said "please" 47 times. Manners maketh the human! 🥹',
                'Your longest conversation was 47 messages. That\'s a journey! 🎢',
                'You had 23 late-night sessions. Night owl energy! 🦉'
            ]
        })
    },
    {
        id: 22,
        type: 'final_wrap',
        label: '',
        emoji: '✨',
        gradient: GRADIENTS.purple,
        caption: '#GPTWrapped',
        getData: () => ({
            title: "That's a Wrap!",
            subtext: 'See you in 2026'
        })
    }
];

export default SLIDES;
