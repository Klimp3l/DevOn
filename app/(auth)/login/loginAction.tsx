'use server'

import { signIn } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInSchema } from "@/lib/zod";

export default async function loginAction(_prevState: any, formData: FormData) {
    try {
        const raw = {
            login: formData.get("login"),
            password: formData.get("password"),
        };

        const parsed = signInSchema.safeParse(raw);
        if (!parsed.success) {
            return { success: false, message: 'Informe usuário e senha válidos.' }
        }

        await signIn('credentials', {
            login: parsed.data.login,
            password: parsed.data.password,
            redirect: true,
            redirectTo: '/',
        });

        return { success: true }
    } catch (e: any) {
        if (isRedirectError(e)) {
            throw e;
        }

        if (e.type === 'CredentialsSignin') {
            console.error('Erro de credenciais inválidas');
            return { success: false, message: 'Usuário ou senha inválido(s). Por favor, tente novamente.' }
        }

        console.error('Erro no login:', e?.message || e);
        return { success: false, message: 'Não foi possível entrar agora. Tente novamente.' }
    }
}