/* ============================================
   AI CHATBOT WRAPPED - MOCK DATA (ChatGPT Only)
   Real ChatGPT usage statistics for accurate percentiles
   ============================================ */

// Real ChatGPT Usage Statistics (Nov 2025)
// Based on: 123M daily active users, 2.5B prompts/day globally
// Average: 20-21 prompts/user/day = ~7,300 prompts/year
const USAGE_BENCHMARKS = {
    promptsPerDay: {
        light: { min: 5, max: 10 },      // ~2,000-3,600/year
        regular: { min: 20, max: 30 },   // ~7,300-11,000/year (Average)
        power: { min: 100, max: 200 },   // ~36,500-73,000/year
        heavyPower: { min: 300, max: 1000 } // ~110,000-365,000/year
    },
    avgPromptsPerYear: 7300,
    totalDailyActiveUsers: 123000000,
    totalWeeklyActiveUsers: 800000000
};

export const mockUserData = {
    user: {
        name: "Alex",
        email: "alex@example.com",
        joinedDate: "2025-01-15",
        avatarUrl: null
    },

    // Summary Stats
    summary: {
        totalConversations: 847,
        totalPrompts: 12450,
        totalTokensInput: 1245000,
        totalTokensOutput: 2156000,
        totalTokens: 3401000,
        topicsExplored: 23,
        activeDays: 312,
        averageConversationLength: 8.5,
        longestStreak: 45,
        currentStreak: 12
    },

    // ChatGPT Only
    platforms: {
        chatgpt: {
            name: "ChatGPT",
            conversations: 847,
            percentage: 100,
            tokensInput: 1245000,
            tokensOutput: 2156000,
            color: "#10a37f",
            icon: "🤖",
            avgResponseTime: 2.3
        }
    },

    primaryPlatform: "chatgpt",

    // Topic Categories
    topics: [
        { name: "Coding & Debug Wars", percentage: 35, conversations: 296, icon: "💻", color: "#00f0ff" },
        { name: "Creative Chaos", percentage: 22, conversations: 186, icon: "✍️", color: "#ff00a8" },
        { name: "Research Rabbit Holes", percentage: 18, conversations: 153, icon: "🔬", color: "#8b00ff" },
        { name: "Learning Sprints", percentage: 15, conversations: 127, icon: "📚", color: "#00ff88" },
        { name: "Productivity Hacks", percentage: 7, conversations: 59, icon: "⚡", color: "#ffee00" },
        { name: "Existential Chats", percentage: 3, conversations: 26, icon: "🌌", color: "#ff6b00" }
    ],

    topTopic: {
        name: "Coding & Debug Wars",
        conversations: 296,
        percentage: 35,
        icon: "💻",
        insight: "You battled 296 bugs this year. The bugs lost. Mostly."
    },

    // Personality
    personality: {
        type: "The Debug Demon 🔥",
        icon: "🧪",
        description: "You don't just code—you wage war against bugs at 2 AM with the ferocity of a caffeinated raccoon. ChatGPT is basically your rubber duck, except it actually talks back.",
        traits: [
            "Nocturnal problem-solver",
            "Stack Overflow deserter",
            "Caffeine-powered thinker",
            "\"It works on my machine\" advocate"
        ],
        percentile: 92,
        comparison: "Only 8% of users match your chaotic energy 🌊"
    },

    // Monthly data
    monthlyRoasts: {
        busiest: { month: "October", conversations: 96, roast: "October you went FERAL. 96 conversations? Touch grass maybe?" },
        quietest: { month: "July", conversations: 62, roast: "July was suspicious. Either vacation or existential crisis." },
        growth: "+30% from last year. Your AI dependency is *chef's kiss* concerning."
    },

    peakTimes: {
        bestHour: "10:00 AM",
        bestDay: "Tuesday",
        insight: "Peak productivity: Tuesday 10 AM. The rest of the week? Vibes only."
    },

    // Tokens
    tokens: {
        input: 1245000,
        output: 2156000,
        ratio: 1.73,
        equivalentWords: 850000,
        equivalentBooks: 11.3,
        equivalentTweets: 3035,
        trend: "+23%",
        efficiency: "Your questions got 15% shorter but somehow 40% more chaotic. Growth?"
    },

    // Percentile calculations
    comparisons: {
        conversationsPercentile: 78,
        tokensPercentile: 85,
        diversityPercentile: 75,
        consistencyPercentile: 92,
        insights: [
            "With 12,450 prompts, you're in the top 22% of ChatGPT users globally 🌍",
            "Average user sends ~7,300 prompts/year. You sent 70% more!",
            "312 active days puts you in the top 8% for consistency 🔥"
        ],
        context: {
            globalDailyUsers: "123 million",
            avgPromptsPerUser: "20-21/day",
            userPromptsPerDay: "34/day",
            userCategory: "Power User"
        }
    },

    // Speed Rankings (for page 6)
    speedRankings: {
        overall: [
            { rank: '🥇', platform: 'ChatGPT', avgTime: 2.3, icon: '🤖', color: '#10a37f' },
            { rank: '🥈', platform: 'Claude', avgTime: 3.1, icon: '🧠', color: '#8b00ff' },
            { rank: '🥉', platform: 'Gemini', avgTime: 4.2, icon: '✨', color: '#4285f4' }
        ],
        byCategory: {
            coding: { winner: 'ChatGPT', time: 2.1 },
            creative: { winner: 'ChatGPT', time: 2.5 },
            research: { winner: 'ChatGPT', time: 2.8 },
            analysis: { winner: 'ChatGPT', time: 2.4 }
        },
        insight: "ChatGPT dominated your speed rankings with an average response time of 2.3 seconds! ⚡"
    },

    // Badges
    badges: [
        { id: "token-titan", name: "Token Titan", description: "Fed ChatGPT 1M+ tokens.", icon: "👑", earned: true, earnedDate: "2025-06-15", color: "#00f0ff" },
        { id: "word-tsunami", name: "Word Tsunami", description: "500+ total conversations", icon: "🌊", earned: true, earnedDate: "2025-07-18", color: "#1fb8cd" },
        { id: "prompt-prodigy", name: "Prompt Prodigy", description: "Sent 10,000+ prompts this year", icon: "🎯", earned: true, earnedDate: "2025-09-01", color: "#ff00a8" },
        { id: "3am-thinker", name: "3 AM Thinker", description: "Asked ChatGPT questions after midnight", icon: "🦉", earned: true, earnedDate: "2025-03-22", color: "#8b00ff" },
        { id: "consistency-monarch", name: "Consistency Monarch", description: "Active 300+ days.", icon: "🏰", earned: true, earnedDate: "2025-11-10", color: "#ff00a8" },
        { id: "streak-master", name: "Streak Master", description: "30+ day conversation streak", icon: "🔥", earned: true, earnedDate: "2025-04-15", color: "#cc785c" },
        { id: "code-goblin", name: "Code Goblin", description: "100+ coding conversations.", icon: "👺", earned: true, earnedDate: "2025-04-22", color: "#00ff88" },
        { id: "creative-muse", name: "Creative Muse", description: "100+ creative writing conversations", icon: "✍️", earned: true, earnedDate: "2025-06-28", color: "#ff0066" },
        { id: "polite-prompter", name: "Polite Prompter", description: "Said 'please' and 'thank you' 100+ times", icon: "🤝", earned: true, earnedDate: "2025-02-28", color: "#10a37f" },
        { id: "debug-detective", name: "Debug Detective", description: "Solved 50+ bugs with AI help", icon: "🔍", earned: true, earnedDate: "2025-07-30", color: "#10a37f" }
    ],

    // Fun facts
    quirkyFacts: [
        "You said 'please' to ChatGPT 127 times. It appreciated that. 🥹",
        "Your longest conversation was 47 messages. That's a therapy session.",
        "You asked 'why isn't this working' 89 times. We felt that.",
        "At 3:47 AM on a Tuesday, you asked about regex. Are you okay?",
        "You thanked ChatGPT 64 times. Manners maketh the human.",
        "You used more prompts than 78% of ChatGPT's 123 million daily users 🌍"
    ],

    // Heatmap Data
    heatmapData: generateHeatmapData(),

    // Usage benchmarks
    usageBenchmarks: USAGE_BENCHMARKS
};

function generateHeatmapData() {
    const data = [];
    const startDate = new Date('2025-01-01');

    for (let i = 0; i < 365; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const dayOfWeek = date.getDay();
        const month = date.getMonth();

        let baseActivity = dayOfWeek === 0 || dayOfWeek === 6 ? 1 : 3;
        if (month >= 2 && month <= 4) baseActivity += 1;
        if (month >= 8 && month <= 10) baseActivity += 1.5;

        const activity = Math.max(0, Math.min(5, Math.floor(baseActivity + (Math.random() * 3 - 1))));

        data.push({
            date: date.toISOString().split('T')[0],
            count: activity,
            level: activity
        });
    }

    return data;
}

export const {
    summary,
    platforms,
    topics,
    personality,
    badges,
    tokens,
    comparisons,
    peakTimes,
    heatmapData,
    quirkyFacts,
    monthlyRoasts,
    usageBenchmarks
} = mockUserData;

export default mockUserData;
