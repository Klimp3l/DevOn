import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import { jwtDecode } from "jwt-decode";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                login: { label: "Login", type: "text", placeholder: "DevOn" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "********",
                },
            },
            authorize: async (credentials) => {
                const creds = await signInSchema.safeParse(credentials);
                if (!creds.success) {
                    console.error('Validação de credenciais falhou:', creds.error);
                    return null;
                }

                try {
                    // 1. Login na API usando fetch (server-side)
                    if (!process.env.API_ENDPOINT) {
                        console.error('API_ENDPOINT não definido no ambiente');
                        return null;
                    }

                    const loginRes = await fetch(
                        `${process.env.API_ENDPOINT}/auth/login`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(creds.data),
                        }
                    );

                    if (!loginRes.ok) {
                        const errorText = await loginRes.text();
                        console.error('Erro na resposta do login:', errorText);
                        return null;
                    }

                    const { token, refreshToken } = await loginRes.json();

                    if (!token) {
                        console.error('Token não recebido da API');
                        return null;
                    }

                    // 2. Decodifica o token para obter dados do JWT
                    const tokenDecoded = jwtDecode<{ userxId: number; exp?: number }>(token);

                    // 3. Buscar dados do usuário usando fetch
                    const userRes = await fetch(
                        `${process.env.API_ENDPOINT}/users/${tokenDecoded.userxId}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (!userRes.ok) {
                        const errorText = await userRes.text();
                        console.error('Erro ao buscar dados do usuário:', errorText);
                        return null;
                    }

                    const user = await userRes.json();

                    const accessTokenExpiresAt = tokenDecoded?.exp
                        ? tokenDecoded.exp * 1000
                        : Date.now() + 15 * 60 * 1000; // fallback: 15min

                    return {
                        ...user,
                        accessToken: token,
                        refreshToken,
                        accessTokenExpiresAt,
                    };
                } catch (error) {
                    console.error('Erro no login:', error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    callbacks: {
        async jwt({ token, user }) {
            // Na primeira vez (login)
            if (user) {
                token.user = user as any;
                token.accessToken = (user as any).accessToken as string;
                token.refreshToken = (user as any).refreshToken as string;
                token.accessTokenExpiresAt = (user as any).accessTokenExpiresAt as number;
                return token;
            }

            // Se ainda não estiver expirado, retornar
            const accessTokenExpiresAt = (token as any).accessTokenExpiresAt as number | undefined;
            if (accessTokenExpiresAt && Date.now() < accessTokenExpiresAt - 30_000) {
                return token;
            }

            // Renovar token usando refreshToken
            try {
                const refreshToken = (token as any).refreshToken as string | undefined;
                if (!refreshToken) return token;

                const refreshRes = await fetch(`${process.env.API_ENDPOINT}/auth/refresh`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken }),
                });

                if (!refreshRes.ok) {
                    console.error('Falha ao renovar token');
                    return token;
                }

                const { token: newAccessToken, refreshToken: newRefreshToken } = await refreshRes.json();

                const decoded = jwtDecode<{ exp?: number }>(newAccessToken);
                const newExpiresAt = decoded?.exp ? decoded.exp * 1000 : Date.now() + 15 * 60 * 1000;

                (token as any).accessToken = newAccessToken;
                (token as any).refreshToken = newRefreshToken ?? refreshToken;
                (token as any).accessTokenExpiresAt = newExpiresAt;

                return token;
            } catch (e) {
                console.error('Erro ao renovar accessToken:', e);
                return token;
            }
        },
        async session({ session, token }) {
            // Dados do usuário
            if ((token as any).user) {
                session.user = {
                    ...session.user,
                    ...(token as any).user,
                } as typeof session.user;
            }

            // Expor apenas o accessToken e metadados seguros
            if ((token as any).accessToken) {
                (session as any).accessToken = (token as any).accessToken as string;
                (session as any).accessTokenExpiresAt = (token as any).accessTokenExpiresAt as number | undefined;
            }

            // NUNCA expor refreshToken no client
            if ((session as any).refreshToken) delete (session as any).refreshToken;

            return session;
        },
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth;
        },
        async signIn() {
            // Sem side effects de cookies; NextAuth gerencia cookies httpOnly
            return true;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    events: {},
});
