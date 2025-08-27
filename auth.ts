import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt"

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: true,
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

                    console.log('Token:', token);
                    console.log('Refresh Token:', refreshToken);

                    if (!token) {
                        console.error('Token não recebido da API');
                        return null;
                    }

                    // 2. Decodifica o token para obter dados do JWT
                    const tokenDecoded = jwtDecode<{ userxId: number; exp: number }>(token);
                    const accessTokenExpiresAt = tokenDecoded.exp * 1000;

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
    callbacks: {
        async jwt({ token, user }) {
            console.log(user)
            if (user) { // User is available during sign-in
              token.accessToken = user.accessToken;
              token.refreshToken = user.refreshToken;
              token.accessTokenExpiresAt = user.accessTokenExpiresAt;
            }

            if (Date.now() < token.accessTokenExpiresAt) {
                return token;
            }

            const data = await fetch(`${process.env.API_ENDPOINT}/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken: token.refreshToken }),
            });

            const { token: newToken, refreshToken } = await data.json();

            const tokenDecoded = jwtDecode<{ exp: number }>(newToken);
            const accessTokenExpiresAt = tokenDecoded.exp * 1000;


            token.accessToken = newToken;
            token.accessTokenExpiresAt = accessTokenExpiresAt;
            token.refreshToken = refreshToken;
            
            return token
        },
        session({ session, token }) {
            return {
                ...session,
                accessToken: token.accessToken,
                user: {
                  ...session.user,
                },
              }
        },
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    }
});

declare module "next-auth" {
    interface User {
        userxId: number;
        accessToken: string;
        refreshToken: string;
        accessTokenExpiresAt: number;
    }

    interface Session {
        accessToken: string;
        user: {
            userxId: number;
        }  & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        refreshToken: string;
        accessTokenExpiresAt: number;
    }
}