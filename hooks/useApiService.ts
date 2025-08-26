import { useState, useEffect, useCallback, useMemo } from 'react';
import { apiService, type AppState, type MenuItem, type UserResponse } from '@/lib/services/apiService';

export const useApiService = () => {
    const [state, setState] = useState<AppState>(apiService.getState());

    useEffect(() => {
        // Inscrever no service para receber atualizações
        const unsubscribe = apiService.subscribe((newState) => {
            setState(newState);
        });

        // Cleanup ao desmontar
        return unsubscribe;
    }, []);

    // Métodos de autenticação
    const login = useCallback(async (login: string, password: string): Promise<boolean> => {
        return await apiService.login(login, password);
    }, []);

    const logout = useCallback(async (): Promise<void> => {
        await apiService.logout();
    }, []);

    const fetchMenu = useCallback(async (): Promise<MenuItem[]> => {
        return await apiService.fetchMenu();
    }, []);

    const fetchUserById = useCallback(async (id: number): Promise<UserResponse | null> => {
        return await apiService.fetchUserById(id);
    }, []);

    // Método para inicializar dados automaticamente
    const initializeData = useCallback(async (): Promise<void> => {
        return await apiService.initializeData();
    }, []);

    // Métodos para gerenciar estado
    const clearError = useCallback((): void => {
        apiService.clearError();
    }, []);

    const setLoading = useCallback((loading: boolean): void => {
        apiService.setLoading(loading);
    }, []);

    // Métodos para requisições customizadas
    const makeRequest = useCallback(async <T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        url: string,
        data?: any,
        config?: any
    ): Promise<T> => {
        return await apiService.makeRequest<T>(method, url, data, config);
    }, []);

    const getResource = useCallback(async <T>(url: string): Promise<T> => {
        return await apiService.getResource<T>(url);
    }, []);

    const postResource = useCallback(async <T>(url: string, data: any): Promise<T> => {
        return await apiService.postResource<T>(url, data);
    }, []);

    const putResource = useCallback(async <T>(url: string, data: any): Promise<T> => {
        return await apiService.putResource<T>(url, data);
    }, []);

    const deleteResource = useCallback(async <T>(url: string): Promise<T> => {
        return await apiService.deleteResource<T>(url);
    }, []);

    const patchResource = useCallback(async <T>(url: string, data: any): Promise<T> => {
        return await apiService.patchResource<T>(url, data);
    }, []);

                return {
                // Estado
                state,
                user: state.user,
                menu: state.menu,
                isLoading: state.isLoading,
                error: state.error,
                
                // Métodos
                login,
                logout,
                fetchMenu,
                fetchUserById,
                initializeData,
                clearError,
                setLoading,
                makeRequest,
                getResource,
                postResource,
                putResource,
                deleteResource,
                patchResource,
            };
};

// Hook específico para menu
export const useMenu = () => {
    const { menu, fetchMenu, isLoading, error } = useApiService();

    const refreshMenu = useCallback(async () => {
        return await fetchMenu();
    }, [fetchMenu]);

    // Adicionar rotas sempre disponíveis ao menu e posicionar Dashboard primeiro e Configurações último
    const enhancedMenu = useMemo(() => {
        const defaultDashboard: MenuItem = {
            label: 'Dashboard',
            url: '/',
            children: []
        };
        const defaultSettings: MenuItem = {
            label: 'Configurações',
            url: '/settings',
            children: []
        };

        // Sem menu da API: apenas padrão com ordem fixa
        if (!menu || menu.length === 0) {
            return [defaultDashboard, defaultSettings];
        }

        // Preferir itens da API se existirem
        const apiItemsByUrl = new Map(menu.map(item => [item.url, item] as const));
        const dashboardItem = apiItemsByUrl.get('/') ?? defaultDashboard;
        const settingsItem = apiItemsByUrl.get('/settings') ?? defaultSettings;

        // Itens intermediários (exclui dashboard e configurações)
        const middleItems = menu.filter(item => item.url !== '/' && item.url !== '/settings');

        return [dashboardItem, ...middleItems, settingsItem];
    }, [menu]);

    return {
        menu: enhancedMenu,
        refreshMenu,
        isLoading,
        error,
    };
};

// Hook específico para usuário
export const useUser = () => {
    const { user, fetchUserById, isLoading, error } = useApiService();

    const refreshUser = useCallback(async () => {
        return;
    }, []);

    const getUserById = useCallback(async (id: number) => {
        return await fetchUserById(id);
    }, [fetchUserById]);

    return {
        user,
        refreshUser,
        getUserById,
        isLoading,
        error,
    };
};

// Hook específico para autenticação
export const useAuth = () => {
    const { user, login, logout, isLoading, error } = useApiService();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar se há token no cookie para determinar autenticação
    useEffect(() => {
        const checkAuth = () => {
            if (typeof window !== 'undefined') {
                const cookies = document.cookie.split(';');
                const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt_token='));
                const hasToken = !!jwtCookie;
                setIsAuthenticated(hasToken);
            }
        };

        // Verificar apenas uma vez ao montar o componente
        checkAuth();
        
        // Opcional: Verificar quando a página ganha foco (para casos de logout em outras abas)
        const handleFocus = () => {
            checkAuth();
        };

        window.addEventListener('focus', handleFocus);
        
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return {
        user,
        login,
        logout,
        isLoading,
        error,
        isAuthenticated,
    };
}; 