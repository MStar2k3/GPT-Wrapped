/* ============================================
   API Configuration
   Automatically uses correct API URL for production/development
   ============================================ */

// API base URL - automatically detects environment
// In production (Netlify), set VITE_API_URL environment variable
// Or deploy backend to a service like Railway/Render and update this
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export { API_BASE };
export default API_BASE;
