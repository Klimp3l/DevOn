import { apiClient, authAPI, userAPI, menuAPI, type MenuItem, type UserResponse } from '@/lib/axios';
import { signIn } from 'next-auth/react';

// Tipos para o estado global
interface AppState {
    user: UserResponse | null;
    menu: MenuItem[];
    isLoading: boolean;
    error: string | null;
}

// Estado global simples (pode ser substituído por Zustand, Redux, etc.)
class AppService {
    private state: AppState = {
        user: null,
        menu: [],
        isLoading: false,
        error: null,
    };

    private listeners: Array<(state: AppState) => void> = [];

    // Getters
    getState(): AppState {
        return { ...this.state };
    }

    getUser(): UserResponse | null {
        return this.state.user;
    }

    getMenu(): MenuItem[] {
        return this.state.menu;
    }

    getIsLoading(): boolean {
        return this.state.isLoading;
    }

    getError(): string | null {
        return this.state.error;
    }

    // Setters
    private setState(newState: Partial<AppState>): void {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    // Método público para limpar estado
    clearState(): void {
        this.setState({
            user: null,
            menu: [],
            isLoading: false,
            error: null
        });
    }

    // Sistema de listeners para reatividade
    subscribe(listener: (state: AppState) => void): () => void {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener(this.state));
    }

    // Métodos de autenticação
    async login(login: string, password: string): Promise<boolean> {
        try {
            this.setState({ isLoading: true, error: null });
            
            const result = await signIn('credentials', {
                login,
                password,
                redirect: false,
            });
            if ((result as any)?.error) {
                throw new Error((result as any).error);
            }
            
            // Buscar menu após login
            await this.fetchMenu();
            
            this.setState({ isLoading: false });
            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro no login';
            this.setState({ 
                isLoading: false, 
                error: errorMessage 
            });
            return false;
        }
    }

    async logout(): Promise<void> {
        try {
            this.setState({ isLoading: true });
            
            await authAPI.logout();
            this.clearState();
        } catch (error) {
            console.error('Erro no logout:', error);
            this.setState({ isLoading: false });
        }
    }

    async fetchMenu(): Promise<MenuItem[]> {
        try {
            this.setState({ isLoading: true, error: null });
            
            const menu = await menuAPI.getMenu();
            this.setState({ menu, isLoading: false });

            return menu;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar menu';
            console.log('error', error);

            this.setState({ 
                isLoading: false, 
                error: errorMessage 
            });
            return [];
        }
    }

    async fetchUserById(id: number): Promise<UserResponse | null> {
        try {
            this.setState({ isLoading: true, error: null });
            
            const user = await userAPI.getById(id);
            this.setState({ isLoading: false });
            return user;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar usuário';
            this.setState({ 
                isLoading: false, 
                error: errorMessage 
            });
            return null;
        }
    }

    // Método para inicializar dados automaticamente
    async initializeData(): Promise<void> {
        try {
            // Carregar menu se autenticado (o interceptor usará o token da sessão)
            await this.fetchMenu();
        } catch (error) {
            console.error('❌ Erro ao inicializar dados:', error);
        }
    }

    // Métodos para gerenciar estado
    clearError(): void {
        this.setState({ error: null });
    }

    setLoading(loading: boolean): void {
        this.setState({ isLoading: loading });
    }

    // Métodos para requisições customizadas
    async makeRequest<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        url: string,
        data?: any,
        config?: any
    ): Promise<T> {
        try {
            this.setState({ isLoading: true, error: null });
            
            const response = await apiClient.request({
                method,
                url,
                data,
                ...config,
            });
            
            this.setState({ isLoading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro na requisição';
            this.setState({ 
                isLoading: false, 
                error: errorMessage 
            });
            throw error;
        }
    }

    // Métodos específicos para diferentes recursos
    async getResource<T>(url: string): Promise<T> {
        return this.makeRequest<T>('GET', url);
    }

    async postResource<T>(url: string, data: any): Promise<T> {
        return this.makeRequest<T>('POST', url, data);
    }

    async putResource<T>(url: string, data: any): Promise<T> {
        return this.makeRequest<T>('PUT', url, data);
    }

    async deleteResource<T>(url: string): Promise<T> {
        return this.makeRequest<T>('DELETE', url);
    }

    async patchResource<T>(url: string, data: any): Promise<T> {
        return this.makeRequest<T>('PATCH', url, data);
    }
}

// Instância singleton do service
export const apiService = new AppService();

// Hooks para React (opcional - pode ser usado em componentes)
export const useApiService = () => {
    return {
        // Estado
        state: apiService.getState(),
        user: apiService.getUser(),
        menu: apiService.getMenu(),
        isLoading: apiService.getIsLoading(),
        error: apiService.getError(),
        
        // Métodos
        login: apiService.login.bind(apiService),
        logout: apiService.logout.bind(apiService),
        fetchMenu: apiService.fetchMenu.bind(apiService),
        fetchUserById: apiService.fetchUserById.bind(apiService),
        initializeData: apiService.initializeData.bind(apiService),
        clearError: apiService.clearError.bind(apiService),
        setLoading: apiService.setLoading.bind(apiService),
        clearState: apiService.clearState.bind(apiService),
        makeRequest: apiService.makeRequest.bind(apiService),
        getResource: apiService.getResource.bind(apiService),
        postResource: apiService.postResource.bind(apiService),
        putResource: apiService.putResource.bind(apiService),
        deleteResource: apiService.deleteResource.bind(apiService),
        patchResource: apiService.patchResource.bind(apiService),
        
        // Sistema de listeners
        subscribe: apiService.subscribe.bind(apiService),
    };
};

// Exportar tipos
export type { AppState, MenuItem, UserResponse }; 