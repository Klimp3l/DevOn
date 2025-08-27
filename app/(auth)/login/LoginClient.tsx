'use client'

import { useActionState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import loginAction from './loginAction';
import AuthFormShell from '@/app/_components/_auth/AuthFormShell';

export default function LoginClient() {
    const [state, formAction, isPending] = useActionState(loginAction, null);

    return (
        <AuthFormShell isRegister={false} state={state} isPending={isPending} formAction={formAction}>
            <div className="space-y-2">
                <Label htmlFor="login">Nome de Usuário</Label>
                <Input id="login" name="login" placeholder="exemplo" required autoComplete="username" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required autoComplete="current-password" />
            </div>
        </AuthFormShell>
    );
}


