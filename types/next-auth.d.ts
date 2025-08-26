// types/next-auth.d.ts
import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

// Tipos baseados na resposta da API
interface UserRole {
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
}

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        accessTokenExpiresAt?: number;
        token?: string; // alias opcional
        user?: DefaultSession["user"] & {
            userxId?: number;
            name?: string;
            loginName?: string;
            email?: string;
            status?: string;
            accountId?: number;
            locale?: string;
            timezone?: string;
            createdAt?: string;
            updatedAt?: string;
            roles?: UserRole[];
        };
    }

    interface User extends DefaultUser {
        userxId?: number;
        name?: string;
        loginName?: string;
        email?: string;
        status?: string;
        accountId?: number;
        locale?: string;
        timezone?: string;
        createdAt?: string;
        updatedAt?: string;
        roles?: UserRole[];
        accessToken?: string;
        refreshToken?: string; // não expor no client
        accessTokenExpiresAt?: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        accessToken?: string;
        token?: string; // alias opcional
        refreshToken?: string; // somente no JWT
        accessTokenExpiresAt?: number;
        user?: {
            userxId?: number;
            name?: string;
            loginName?: string;
            email?: string;
            status?: string;
            accountId?: number;
            locale?: string;
            timezone?: string;
            createdAt?: string;
            updatedAt?: string;
            roles?: UserRole[];
            [key: string]: any;
        };
    }
}
