import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface RouteAccessResult {
    hasAccess: boolean | null;
    isLoading: boolean;
    currentPath: string;
    checkRouteAccess: (url: string) => boolean;
}

/**
 * Hook para verificar acesso às rotas baseado no menu retornado pela API
 * 
 * @returns {RouteAccessResult} Objeto com informações sobre o acesso
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { hasAccess, isLoading, checkRouteAccess } = useRouteAccess();
 *   
 *   if (isLoading) return <div>Carregando...</div>;
 *   if (!hasAccess) return <div>Acesso negado</div>;
 *   
 *   return <div>Conteúdo da página</div>;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // Verificar acesso a uma rota específica
 * const canAccessAdmin = checkRouteAccess('/admin');
 * ```
 */
export const useRouteAccess = (): RouteAccessResult => {
    // const { menu, isLoading } = useMenu();$
    const menu: any[] = [];
    const isLoading = false;
    const pathname = usePathname();
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);

    // Rotas que sempre devem estar disponíveis
    const alwaysAllowedRoutes = [
        '/',
        '/settings'
    ];

    // Função para verificar se uma rota está disponível no menu
    const checkRouteAccess = (url: string): boolean => {
        // Verificar se é uma rota sempre permitida
        if (alwaysAllowedRoutes.includes(url)) {
            console.log(`Rota sempre permitida: ${url}`);
            return true;
        }

        const checkRecursive = (menuItems: any[]): boolean => {
            for (const item of menuItems) {
                // Verificar se a URL exata corresponde
                if (item.url === url) {
                    console.log(`Rota encontrada no menu: ${url}`);
                    return true;
                }
                
                // Verificar se a URL começa com o item do menu (para sub-rotas)
                if (url.startsWith(item.url + '/')) {
                    console.log(`Sub-rota permitida: ${url} (base: ${item.url})`);
                    return true;
                }
                
                // Verificar filhos recursivamente
                if (item.children && item.children.length > 0) {
                    if (checkRecursive(item.children)) return true;
                }
            }
            return false;
        };

        const hasAccess = checkRecursive(menu);
        
        if (!hasAccess) {
            console.warn(`Acesso negado para rota: ${url}`);
        }
        
        return hasAccess;
    };

    useEffect(() => {
        if (!isLoading && menu.length > 0) {
            console.log('Verificando acesso para rota:', pathname);
            const access = checkRouteAccess(pathname);
            setHasAccess(access);
            
            console.log('Resultado da verificação:', {
                path: pathname,
                hasAccess: access,
                menuItems: menu.length
            });
        } else if (!isLoading && menu.length === 0) {
            // Se o menu está vazio mas não está carregando, verificar se é uma rota sempre permitida
            const access = checkRouteAccess(pathname);
            setHasAccess(access);
        }
    }, [pathname, menu, isLoading]);

    return {
        hasAccess,
        isLoading,
        currentPath: pathname,
        checkRouteAccess
    };
}; 