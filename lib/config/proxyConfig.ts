// Configuração do proxy para API externa
export const PROXY_CONFIG = {
    // Rotas permitidas para proxy
    ALLOWED_ROUTES: [
        '/auth/login',
        '/auth/logout',
        '/auth/refresh',
        '/app/menu'
    ],

    // Configuração da API externa
    API_BASE_URL: process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT,

    // Headers padrão
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
    },

    // Timeout padrão
    TIMEOUT: 10000,

    // Configuração de retry
    RETRY_CONFIG: {
        maxRetries: 1,
        retryDelay: 1000,
    }
};

// Função para verificar se uma rota é permitida
export function isRouteAllowed(path: string): boolean {
    return PROXY_CONFIG.ALLOWED_ROUTES.some(route => path.startsWith(route));
}

// Função para obter a URL completa da API externa
export function getExternalApiUrl(path: string): string {
    return `${PROXY_CONFIG.API_BASE_URL}${path}`;
}

// Função para validar e sanitizar path
export function sanitizePath(path: string): string {
    // Remover barras duplas e caracteres perigosos
    return path.replace(/\/+/g, '/').replace(/[^a-zA-Z0-9\/\-_]/g, '');
} 