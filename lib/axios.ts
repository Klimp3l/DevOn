import axios, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

// Tipos para as respostas da API
interface AuthResponse {
    token: string;
    refreshToken: string;
}

interface UserResponse {
    userxId: number;
    name: string;
    loginName: string;
    email: string;
    status: string;
    accountId: number;
    locale: string;
    timezone: string;
    createdAt: string;
    updatedAt: string;
    roles: Array<{
        roleId: number;
        key: string;
        description: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        resources: Array<{
            resourceId: number;
            description: string;
            resource: string;
            method: string;
            fetchCountLimit: number;
            status: string;
            resourceTypeId: number;
            createdAt: string;
            updatedAt: string;
        }>;
    }>;
}

interface MenuItem {
    label: string;
    url: string;
    children: MenuItem[];
}

// Criar instância axios configurada para usar o proxy
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        // Usar o proxy Next.js em vez da API externa diretamente
        baseURL: '/api/proxy',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor: injeta Authorization com accessToken obtido da sessão NextAuth
    instance.interceptors.request.use(
        async (config) => {
            try {
                if (typeof window !== 'undefined') {
                    const session = await getSession();
                    const accessToken = (session as any)?.accessToken as string | undefined;
                    if (accessToken) {
                        config.headers = config.headers || {};
                        (config.headers as any).Authorization = `Bearer ${accessToken}`;
                    }
                }
            } catch {}
            return config;
        },
        (error) => {
            console.error('❌ Erro no request interceptor:', error);
            return Promise.reject(error);
        }
    );

    // Response interceptor para logging
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            console.log('❌ Erro na resposta do proxy:', error.response?.status, error.config?.url);
            return Promise.reject(error);
        }
    );

    return instance;
};

// Exportar instância axios configurada
export const apiClient = createAxiosInstance();

// Funções auxiliares para autenticação
export const authAPI = {
    login: async (login: string, password: string): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/login', { login, password });
        const { token, refreshToken } = response.data;
        return { token, refreshToken };
    },

    refresh: async (refreshToken: string): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/refresh', { refreshToken });
        const { token, refreshToken: newRefreshToken } = response.data;
        return { token, refreshToken: newRefreshToken };
    },

    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Erro no logout:', error);
        }
    }
};

// Funções para usuários
export const userAPI = {
    getById: async (id: number): Promise<UserResponse> => {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    }
};

// Funções para menu
export const menuAPI = {
    getMenu: async (): Promise<MenuItem[]> => {
        const response = await apiClient.get('/app/menu');
        return response.data;
    }
};

// Função para obter token atual (mantida para compatibilidade)
export async function getAuthToken(): Promise<string | null> {
    try {
        const session = await getSession();
        return (session as any)?.accessToken ?? null;
    } catch {
        return null;
    }
}

// Função para configurar token manualmente (deprecated - mantida para compatibilidade)
export async function setAuthToken(token: string) {
    console.warn('setAuthToken é deprecated. Use o sistema de cookies automático.');
}

// Exportar tipos para uso em outros arquivos
export type { AuthResponse, UserResponse, MenuItem }; 