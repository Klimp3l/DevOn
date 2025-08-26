'use client'

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card';
import { Loader2, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";
import Form from 'next/form'
import { usePathname } from 'next/navigation';
import { useActionState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import loginAction from './login/loginAction';
import registerAction from './register/registerAction';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isRegister = pathname.includes('register');
    const [state, formAction, isPending] = useActionState(isRegister ? registerAction : loginAction, null)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-devon-light p-4">
            <Card className="w-full max-w-md mx-4">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center">
                        <Link href="/" className="text-2xl font-bold text-devon-green">
                            <Image
                                src="/Logo.png"
                                alt="Logo"
                                width={592}
                                height={311}
                                className="h-30 w-auto"
                            />
                        </Link>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">
                        {isRegister ? 'Crie sua conta' : 'Bem-vindo de volta'}
                    </CardTitle>
                    <CardDescription className="text-center">
                        {isRegister ? 'Preencha os campos abaixo para começar' : 'Entre com seu usuário e senha para acessar sua conta'}
                    </CardDescription>
                </CardHeader>
                <Form action={formAction} className="w-full">
                    <CardContent className="space-y-4">
                        {
                            state?.success === false && (
                                <Alert variant="destructive" className="mb-2">
                                    <AlertDescription>{state?.message}</AlertDescription>
                                </Alert>
                            )
                        }
                        {children}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 mt-4">
                        <Button
                            type="submit"
                            className="w-full min-h-[44px]"
                            disabled={isPending}
                            onClick={(e) => {
                                // Garantir que o botão seja clicável no mobile
                                if (isPending) {
                                    e.preventDefault();
                                    return;
                                }
                            }}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Aguarde...
                                </>
                            ) : (
                                isRegister ? (
                                    <>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Criar Conta
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Entrar
                                    </>
                                )
                            )}
                        </Button>
                        <p className="text-center text-sm text-gray-600">
                            {isRegister ? 'Já tem uma conta?' : 'Não tem uma conta?'}
                            {' '}
                            <Link href={isRegister ? '/login' : '/register'} className="text-devon-green hover:underline font-medium">
                                {isRegister ? 'Entre aqui' : 'Registre-se'}
                            </Link>
                        </p>
                    </CardFooter>
                </Form>
            </Card>
        </div>
    );
}