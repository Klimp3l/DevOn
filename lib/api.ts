// Re-exportar tudo do novo sistema axios
export * from './axios';
export * from './services/apiService';

// Não exportar useApiService aqui para evitar conflito
// export * from './hooks/useApiService';

// Manter compatibilidade com código existente
import { apiClient, authAPI, userAPI, menuAPI } from './axios';
import { apiService } from './services/apiService';

// Exportar instâncias para compatibilidade
export { apiClient, authAPI, userAPI, menuAPI, apiService }; 