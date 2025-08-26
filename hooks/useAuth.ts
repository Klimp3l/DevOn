import { useSession, signOut } from "next-auth/react";
import { useCallback } from "react";
import { authAPI } from "@/lib/axios";

export const useAuth = () => {
    const { data: session, status } = useSession();

    const logout = useCallback(async () => {
        try {
            await authAPI.logout();
        } catch {}
        await signOut({ redirect: true, callbackUrl: '/login' });
    }, []);

    return {
        session,
        status,
        isAuthenticated: status === 'authenticated',
        isLoading: status === 'loading',
        logout,
        user: session?.user,
        accessToken: session?.accessToken,
    };
};