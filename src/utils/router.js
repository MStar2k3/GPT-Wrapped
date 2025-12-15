/* ============================================
   AI CHATBOT WRAPPED - ROUTER
   Client-side routing for SPA
   ============================================ */

class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.app = null;

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname, false);
        });
    }

    init(appElement) {
        this.app = appElement;
        this.navigate(window.location.pathname, false);
    }

    register(path, handler) {
        this.routes.set(path, handler);
        return this;
    }

    async navigate(path, pushState = true) {
        // Find matching route
        let handler = this.routes.get(path);

        // Try wildcard routes
        if (!handler) {
            for (const [routePath, routeHandler] of this.routes) {
                if (routePath.includes(':')) {
                    const regex = new RegExp('^' + routePath.replace(/:\w+/g, '([^/]+)') + '$');
                    const match = path.match(regex);
                    if (match) {
                        handler = routeHandler;
                        break;
                    }
                }
            }
        }

        // Default to landing page
        if (!handler) {
            handler = this.routes.get('/') || this.routes.values().next().value;
        }

        if (pushState) {
            window.history.pushState({}, '', path);
        }

        this.currentRoute = path;

        // Transition animation
        if (this.app) {
            this.app.classList.add('page-exit');
            await new Promise(resolve => setTimeout(resolve, 200));

            // Render new page
            const content = await handler();
            this.app.innerHTML = '';
            if (typeof content === 'string') {
                this.app.innerHTML = content;
            } else {
                this.app.appendChild(content);
            }

            this.app.classList.remove('page-exit');
            this.app.classList.add('page-enter');
            await new Promise(resolve => setTimeout(resolve, 50));
            this.app.classList.remove('page-enter');
        }
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}

export const router = new Router();
export default router;
