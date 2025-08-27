'use client'

import { useActionState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import registerAction from './registerAction';
import AuthFormShell from '@/app/_components/_auth/AuthFormShell';

export default function RegisterClient() {
    const [state, formAction, isPending] = useActionState(registerAction, null);

    return (
        <AuthFormShell isRegister={true} state={state} isPending={isPending} formAction={formAction}>
            <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" name="name" type="text" placeholder="Seu nome completo" required autoComplete="name" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="exemplo@email.com" required autoComplete="email" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="login">Nome de Usuário</Label>
                <Input id="login" name="login" placeholder="exemplo" required autoComplete="username" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required autoComplete="new-password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required autoComplete="new-password" />
            </div>
        </AuthFormShell>
    );
}


