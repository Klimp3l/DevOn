'use client';

import { useMenu, useApiService } from '@/hooks/useApiService';
import { useAuth } from '@/hooks/useAuth';
import MenuList from '@/components/SideBar/MenuIList';
import { useEffect } from 'react';
import MenuListLoader from '@/components/SideBar/MenuListLoader';

export default function MenuListComponent() {
    const { menu, isLoading } = useMenu();
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const { initializeData } = useApiService();
    // Inicializar dados no mount (após redirecionamento de login)
    useEffect(() => {
        initializeData();
    }, [initializeData]);

    // Inicializar dados automaticamente quando autenticado
    useEffect(() => {
        if (isAuthenticated) {
            initializeData();
        }
    }, [isAuthenticated, initializeData]);


    if (isLoading || isAuthLoading || !isAuthenticated) {
        return (
            <MenuListLoader />
        );
    }

    return <MenuList menu={menu} />;
}