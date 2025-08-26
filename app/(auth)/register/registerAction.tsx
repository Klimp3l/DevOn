'use server'

import { signIn } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { registerSchema } from "@/lib/zod";

export default async function registerAction(_prevState: any, formData: FormData) {
    try {
        // Validação dos dados do formulário
        const formDataObj = {
            name: formData.get("name"),
            email: formData.get("email"),
            login: formData.get("login"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };

        const validation = registerSchema.safeParse(formDataObj);
        if (!validation.success) {
            console.error('Erro de validação:', validation.error);
            return { success: false, message: 'Dados inválidos. Verifique se todos os campos estão preenchidos corretamente.' }
        }

        // Validação de senha
        if (formData.get("password") !== formData.get("confirmPassword")) {
            return { success: false, message: 'Senhas diferentes. Por favor, tente novamente.' }
        }

        // Dados para o registro
        const registrationData = {
            name: formData.get("name") as string,
            loginName: formData.get("login") as string,
            email: formData.get("email") as string,
            password: `raw_pwd:${formData.get("password")}`,
            status: "A",
            locale: "pt_BR",
            timezone: "America/Sao_Paulo"
        };

        // Criar conta no endpoint /accounts usando fetch (sem interceptors)
        if (!process.env.API_ENDPOINT) {
            return { success: false, message: 'Configuração ausente: API_ENDPOINT não definido.' }
        }

        const registerRes = await fetch(
            `${process.env.API_ENDPOINT}/accounts`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registrationData),
            }
        );

        if (!registerRes.ok) {
            const errorText = await registerRes.text();
            console.error('Erro no registro:', registerRes.status, errorText);
            throw new Error(`Registration failed with status ${registerRes.status}`);
        }

        // Após registrar com sucesso, fazer login automático
        await signIn('credentials', {
            login: formData.get("login"),
            password: formData.get("password"),
            redirect: true,
            redirectTo: '/',
        });

        return { success: true }
    } catch (e: any) {
        if (isRedirectError(e)) {
            throw e;
        }

        // Tratamento de erros específicos da API
        if (e.message?.includes('400')) {
            return { success: false, message: 'Dados inválidos. Verifique se todos os campos estão preenchidos corretamente.' }
        } else if (e.message?.includes('409')) {
            return { success: false, message: 'Este email ou nome de usuário já está em uso.' }
        } else if (e.message?.includes('422')) {
            return { success: false, message: 'Dados fornecidos são inválidos. Verifique o formato do email e senha.' }
        } else if (e.message?.includes('403')) {
            return { success: false, message: 'Acesso negado. Verifique se a API está configurada corretamente.' }
        } else if (!process.env.API_ENDPOINT) {
            return { success: false, message: 'Configuração ausente: API_ENDPOINT não definido.' }
        }

        // Verificar se é erro de credenciais durante o login automático
        if (e.type === 'CredentialsSignin') {
            return { success: false, message: 'Conta criada com sucesso, mas houve erro no login automático. Tente fazer login manualmente.' }
        }

        console.error('Erro no registro:', e);
        return { success: false, message: 'Ops, algum erro aconteceu durante o registro!' }
    }
}